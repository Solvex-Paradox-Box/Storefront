import pg from 'pg';
import { ALL_210_SOLUTIONS } from '../data/catalogGenerator.js';
import { INITIAL_ORDERS, INITIAL_SHIPMENTS } from '../data/solvexData.js';
import { PurchaseOrder, Shipment, SolutionItem } from '../types/index.js';

const { Pool } = pg;

let pool: pg.Pool | null = null;
let isConnected = false;
let isInitializing = false;

export function getDbPool(): pg.Pool | null {
  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!dbUrl || !dbUrl.trim() || dbUrl.includes('placeholder')) {
    return null;
  }
  if (!pool) {
    try {
      pool = new Pool({
        connectionString: dbUrl,
        ssl: {
          rejectUnauthorized: false
        },
        max: 5,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 3000,
        statement_timeout: 4000,
      });

      pool.on('error', (err) => {
        // Log cleanly and switch smoothly to memory mode on disconnect
        isConnected = false;
      });
    } catch (err) {
      isConnected = false;
      pool = null;
    }
  }
  return pool;
}

export function isNeonConnected(): boolean {
  return isConnected;
}

export async function initNeonDatabase(inMemorySolutions: SolutionItem[], inMemoryOrders: PurchaseOrder[], inMemoryShipments: Shipment[]) {
  const p = getDbPool();
  if (!p) {
    console.log('[Neon DB] No live DATABASE_URL provided. Operating in high-speed sovereign memory mode.');
    isConnected = false;
    return;
  }

  if (isInitializing) return;
  isInitializing = true;

  try {
    // Quick probe with timeout
    const clientPromise = p.connect();
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Neon connection timeout (3s limit)')), 3000)
    );

    const client = await Promise.race([clientPromise, timeoutPromise]);
    isConnected = true;
    console.log('[Neon DB] Connected to Neon PostgreSQL database.');

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS solutions_registry (
        id VARCHAR(255) PRIMARY KEY,
        item_type VARCHAR(100),
        title TEXT NOT NULL,
        category VARCHAR(100),
        description TEXT,
        full_description TEXT,
        paradox_resolution TEXT,
        price NUMERIC(12,2),
        pricing_model VARCHAR(100),
        rating NUMERIC(3,2),
        reviews_count INT,
        vendor VARCHAR(255),
        badge VARCHAR(100),
        icon_name VARCHAR(100),
        features JSONB,
        integration_platforms JSONB,
        specs JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS purchase_orders (
        id VARCHAR(255) PRIMARY KEY,
        po_number VARCHAR(100),
        buyer_org VARCHAR(255),
        supplier VARCHAR(255),
        item_id VARCHAR(255),
        item_title TEXT,
        amount NUMERIC(12,2),
        status VARCHAR(100),
        paypal_order_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        payload JSONB
      );

      CREATE TABLE IF NOT EXISTS shipments (
        id VARCHAR(255) PRIMARY KEY,
        tracking_number VARCHAR(100),
        origin VARCHAR(255),
        destination VARCHAR(255),
        carrier VARCHAR(100),
        status VARCHAR(100),
        hs_code VARCHAR(50),
        payload JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check count of solutions
    const countRes = await client.query('SELECT COUNT(*) FROM solutions_registry;');
    const count = parseInt(countRes.rows[0].count, 10);

    if (count === 0) {
      console.log(`[Neon DB] Seeding ${inMemorySolutions.length} solutions into Neon PostgreSQL...`);
      for (const item of inMemorySolutions) {
        await client.query(`
          INSERT INTO solutions_registry (
            id, item_type, title, category, description, full_description,
            paradox_resolution, price, pricing_model, rating, reviews_count,
            vendor, badge, icon_name, features, integration_platforms, specs
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          ON CONFLICT (id) DO NOTHING;
        `, [
          item.id,
          item.itemType,
          item.title,
          item.category,
          item.description,
          item.fullDescription,
          item.paradoxResolution || null,
          item.price,
          item.pricingModel,
          item.rating,
          item.reviewsCount,
          item.vendor,
          item.badge || null,
          item.iconName || 'Cpu',
          JSON.stringify(item.features || []),
          JSON.stringify(item.integrationPlatforms || []),
          JSON.stringify(item.specs || {})
        ]);
      }
      console.log('[Neon DB] Solutions successfully seeded.');
    }

    client.release();
  } catch (err: any) {
    isConnected = false;
    console.log('[Neon DB] Database unavailable or timed out. Gracefully falling back to sovereign in-memory data store.');
  } finally {
    isInitializing = false;
  }
}

export async function fetchSolutionsFromDb(): Promise<SolutionItem[] | null> {
  const p = getDbPool();
  if (!p || !isConnected) return null;

  try {
    const queryPromise = p.query('SELECT * FROM solutions_registry ORDER BY created_at DESC;');
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), 2500)
    );

    const res: any = await Promise.race([queryPromise, timeoutPromise]);
    if (!res || !res.rows) return null;

    return res.rows.map((row: any) => ({
      id: row.id,
      itemType: row.item_type,
      title: row.title,
      category: row.category,
      description: row.description,
      fullDescription: row.full_description,
      paradoxResolution: row.paradox_resolution,
      price: parseFloat(row.price),
      pricingModel: row.pricing_model,
      rating: parseFloat(row.rating),
      reviewsCount: parseInt(row.reviews_count, 10),
      vendor: row.vendor,
      badge: row.badge,
      iconName: row.icon_name,
      features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
      integrationPlatforms: typeof row.integration_platforms === 'string' ? JSON.parse(row.integration_platforms) : (row.integration_platforms || []),
      specs: typeof row.specs === 'string' ? JSON.parse(row.specs) : (row.specs || {})
    }));
  } catch (err) {
    isConnected = false;
    return null;
  }
}

export async function saveSolutionToDb(item: SolutionItem): Promise<boolean> {
  const p = getDbPool();
  if (!p || !isConnected) return false;

  try {
    await p.query(`
      INSERT INTO solutions_registry (
        id, item_type, title, category, description, full_description,
        paradox_resolution, price, pricing_model, rating, reviews_count,
        vendor, badge, icon_name, features, integration_platforms, specs
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        item_type = EXCLUDED.item_type,
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        full_description = EXCLUDED.full_description,
        paradox_resolution = EXCLUDED.paradox_resolution,
        price = EXCLUDED.price,
        pricing_model = EXCLUDED.pricing_model,
        vendor = EXCLUDED.vendor,
        badge = EXCLUDED.badge,
        features = EXCLUDED.features,
        integration_platforms = EXCLUDED.integration_platforms,
        specs = EXCLUDED.specs;
    `, [
      item.id,
      item.itemType,
      item.title,
      item.category,
      item.description,
      item.fullDescription,
      item.paradoxResolution || null,
      item.price,
      item.pricingModel,
      item.rating,
      item.reviewsCount,
      item.vendor,
      item.badge || null,
      item.iconName || 'Cpu',
      JSON.stringify(item.features || []),
      JSON.stringify(item.integrationPlatforms || []),
      JSON.stringify(item.specs || {})
    ]);
    return true;
  } catch (err) {
    console.error('[Neon DB] Error saving solution to Neon DB:', err);
    return false;
  }
}

export async function deleteSolutionFromDb(id: string): Promise<boolean> {
  const p = getDbPool();
  if (!p || !isConnected) return false;

  try {
    await p.query('DELETE FROM solutions_registry WHERE id = $1;', [id]);
    return true;
  } catch (err) {
    console.error('[Neon DB] Error deleting solution from Neon DB:', err);
    return false;
  }
}

export async function saveOrderToDb(order: PurchaseOrder): Promise<boolean> {
  const p = getDbPool();
  if (!p || !isConnected) return false;

  try {
    await p.query(`
      INSERT INTO purchase_orders (id, po_number, buyer_org, supplier, item_id, item_title, amount, status, paypal_order_id, payload)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, payload = EXCLUDED.payload;
    `, [
      order.id,
      order.poNumber,
      order.shippingAddress || 'Enterprise Procurement',
      order.supplierName || 'uarefake.space Partner',
      order.id,
      order.title,
      order.totalAmount,
      order.status,
      order.paypalOrderId || null,
      JSON.stringify(order)
    ]);
    return true;
  } catch (err) {
    console.error('[Neon DB] Error saving order to Neon DB:', err);
    return false;
  }
}

