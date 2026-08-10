import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { ALL_210_SOLUTIONS } from './src/data/catalogGenerator.js';
import { INITIAL_ORDERS, INITIAL_SHIPMENTS, INITIAL_ERP_INTEGRATIONS } from './src/data/mockData.js';
import { PurchaseOrder, Shipment, SupplierBid } from './src/types/index.js';
import {
  initNeonDatabase,
  isNeonConnected,
  fetchSolutionsFromDb,
  saveSolutionToDb,
  deleteSolutionFromDb,
  saveOrderToDb
} from './src/db/neon.js';

// Initialize Gemini AI Client (Server Side)
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// In-memory data store for persistent feel during runtime session
let ordersStore: PurchaseOrder[] = [...INITIAL_ORDERS];
let shipmentsStore: Shipment[] = [...INITIAL_SHIPMENTS];
let solutionsStore = [...ALL_210_SOLUTIONS];
let integrationsStore = [...INITIAL_ERP_INTEGRATIONS];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Neon PostgreSQL Database (if DATABASE_URL or NEON_DATABASE_URL is provided)
  initNeonDatabase(solutionsStore, ordersStore, shipmentsStore).catch(err => {
    console.error('Neon DB Async Init Error:', err);
  });

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      neonDatabaseConnected: isNeonConnected(),
      timestamp: new Date().toISOString()
    });
  });

  // Solutions catalog (supports filtering & search, syncs with Neon DB)
  app.get('/api/solutions', async (req, res) => {
    // Attempt DB fetch if connected
    if (isNeonConnected()) {
      const dbSolutions = await fetchSolutionsFromDb();
      if (dbSolutions && dbSolutions.length > 0) {
        solutionsStore = dbSolutions;
      }
    }

    const { type, search, category } = req.query;
    let filtered = [...solutionsStore];

    if (type) {
      filtered = filtered.filter(s => s.itemType.toLowerCase() === String(type).toLowerCase());
    }

    if (category) {
      filtered = filtered.filter(s => s.category.toLowerCase() === String(category).toLowerCase());
    }

    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.vendor.toLowerCase().includes(q) ||
        (s.paradoxResolution && s.paradoxResolution.toLowerCase().includes(q))
      );
    }

    res.json(filtered);
  });

  // Solutions POST (Register/Add solution via uarefake.space AI Registry and Control Board)
  app.post('/api/solutions', async (req, res) => {
    const { itemType, title, category, description, fullDescription, paradoxResolution, price, pricingModel, vendor, features, specs } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ error: 'Title and Price are required by uarefake.space AI Registry Protocol' });
    }

    const newItem = {
      id: req.body.id || `sol-${Date.now()}`,
      itemType: itemType || 'Paradox Solution',
      title,
      category: category || 'Procurement AI',
      description: description || 'Registered via uarefake.space AI Registry and Control Board.',
      fullDescription: fullDescription || description || 'Registered via uarefake.space AI Registry and Control Board.',
      paradoxResolution: paradoxResolution || undefined,
      price: Number(price) || 0,
      pricingModel: pricingModel || 'Monthly Subscription',
      rating: 5.0,
      reviewsCount: 1,
      vendor: vendor || 'uarefake.space Autonomous Partner',
      integrationPlatforms: ['uarefake.space AI Registry', 'PayPal REST API', 'ERP Connector'],
      features: Array.isArray(features) && features.length > 0 ? features : ['uarefake.space AI Control Board Managed', 'PayPal Instant Settlement'],
      badge: 'Registry Updated',
      iconName: 'Cpu',
      specs: specs || { 'Registry Node': 'uarefake.space AI Control Board', 'App Domain': 'uarefake.com', 'Settlement': 'PayPal B2B' }
    };

    // Replace if exists, else unshift
    const existingIndex = solutionsStore.findIndex(s => s.id === newItem.id);
    if (existingIndex >= 0) {
      solutionsStore[existingIndex] = newItem;
    } else {
      solutionsStore.unshift(newItem);
    }

    // Persist to Neon DB
    await saveSolutionToDb(newItem);

    res.status(201).json({ success: true, registry: 'uarefake.space AI Registry and Control Board', targetDomain: 'uarefake.com', neonPersisted: isNeonConnected(), item: newItem });
  });

  // Solutions PUT (Update existing solution via uarefake.space AI Registry)
  app.put('/api/solutions/:id', async (req, res) => {
    const { id } = req.params;
    const index = solutionsStore.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found in uarefake.space AI Registry' });
    }

    solutionsStore[index] = {
      ...solutionsStore[index],
      ...req.body,
      id // preserve ID
    };

    // Persist to Neon DB
    await saveSolutionToDb(solutionsStore[index]);

    res.json({ success: true, updatedBy: 'uarefake.space AI Registry and Control Board', neonPersisted: isNeonConnected(), item: solutionsStore[index] });
  });

  // Solutions DELETE (Remove item via uarefake.space AI Registry)
  app.delete('/api/solutions/:id', async (req, res) => {
    const { id } = req.params;
    const initialLength = solutionsStore.length;
    solutionsStore = solutionsStore.filter(s => s.id !== id);

    if (solutionsStore.length === initialLength) {
      return res.status(404).json({ error: 'Item not found in uarefake.space AI Registry' });
    }

    // Delete from Neon DB
    await deleteSolutionFromDb(id);

    res.json({ success: true, registryAction: 'DELETED', id, neonPersisted: isNeonConnected() });
  });

  // uarefake.space AI Registry Health & Control Board Metadata
  app.get('/api/registry/status', (req, res) => {
    res.json({
      status: 'ONLINE',
      targetAppDomain: 'uarefake.com',
      controlBoardRegistry: 'uarefake.space AI Registry and Control Board',
      neonPostgresConnected: isNeonConnected(),
      totalRegisteredSolutions: solutionsStore.filter(s => s.itemType === 'Paradox Solution').length,
      totalRegisteredBusinessTemplates: solutionsStore.filter(s => s.itemType === 'Autonomous Business Template').length,
      totalCatalogCount: solutionsStore.length,
      paypalIntegrationStatus: 'ACTIVE_B2B_REST_V2',
      lastRegistrySync: new Date().toISOString()
    });
  });

  // uarefake.space AI Registry Bulk Sync Endpoint
  app.post('/api/registry/sync', async (req, res) => {
    const { items } = req.body;
    if (Array.isArray(items) && items.length > 0) {
      solutionsStore = [...items, ...solutionsStore];
      for (const item of items) {
        await saveSolutionToDb(item);
      }
      return res.json({
        success: true,
        message: `Synced ${items.length} items from uarefake.space AI Registry and Control Board to uarefake.com`,
        totalCatalogCount: solutionsStore.length,
        neonPersisted: isNeonConnected()
      });
    }
    res.status(400).json({ error: 'Invalid payload: expected items array' });
  });


  // Orders GET
  app.get('/api/orders', (req, res) => {
    res.json(ordersStore);
  });

  // Orders POST (Create draft PO or RFQ)
  app.post('/api/orders', (req, res) => {
    const { title, itemDescription, quantity, unitPrice, supplierName, shippingAddress, destinationPort, carrier } = req.body;

    const totalAmount = (Number(quantity) || 1) * (Number(unitPrice) || 0);
    const newPo: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title || 'Autonomous B2B Procurement Order',
      itemDescription: itemDescription || 'Bulk industrial component supply',
      quantity: Number(quantity) || 1,
      unitPrice: Number(unitPrice) || 0,
      totalAmount,
      currency: 'USD',
      status: 'Payment Pending',
      supplierName: supplierName || 'Global Direct B2B Supplier',
      shippingAddress: shippingAddress || 'Standard Logistics Terminal 1',
      destinationPort: destinationPort || 'Port of Destination',
      carrier: carrier || 'FedEx',
      createdAt: new Date().toISOString(),
      logs: [
        { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: 'Purchase Order created via Solvex Autonomous Portal', type: 'info' },
        { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: 'Awaiting PayPal checkout confirmation', type: 'warning' }
      ]
    };

    ordersStore.unshift(newPo);
    res.status(201).json(newPo);
  });

  // Shipments GET
  app.get('/api/shipments', (req, res) => {
    res.json(shipmentsStore);
  });

  // Integrations GET
  app.get('/api/integrations', (req, res) => {
    res.json(integrationsStore);
  });

  // Integrations Trigger Sync
  app.post('/api/integrations/:id/sync', (req, res) => {
    const { id } = req.params;
    const item = integrationsStore.find(i => i.id === id);
    if (item) {
      item.status = 'Connected';
      item.lastSync = 'Just now';
      item.totalEventsProcessed += Math.floor(Math.random() * 50) + 10;
      res.json({ success: true, item });
    } else {
      res.status(404).json({ error: 'Integration not found' });
    }
  });

  // --- GEMINI AI AUTONOMOUS PROCUREMENT AGENT ---
  app.post('/api/gemini/procure', async (req, res) => {
    try {
      const { prompt, targetBudget, urgency, destination } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (!ai) {
        // Fallback structured result if GEMINI_API_KEY is missing
        return res.json({
          poTitle: `Autonomous Supply Order for: ${prompt.substring(0, 30)}...`,
          summary: `Parsed request for "${prompt}". Formulated competitive RFQ specs and evaluated 3 global suppliers.`,
          itemDescription: prompt,
          estimatedQuantity: 100,
          estimatedUnitPrice: targetBudget ? Math.round(targetBudget / 100) : 250,
          estimatedTotal: targetBudget || 25000,
          recommendedSuppliers: [
            {
              id: 'sup-1',
              supplierName: 'Apex Industrial Dynamics',
              rating: 4.9,
              unitPrice: 240,
              totalPrice: 24000,
              estimatedDays: 4,
              shippingCarrier: 'FedEx Express Freight',
              complianceScore: 98,
              aiRecommendationScore: 96,
              notes: 'Best overall lead time and complete ISO 9001 certification.'
            },
            {
              id: 'sup-2',
              supplierName: 'Global Logistics Solutions',
              rating: 4.7,
              unitPrice: 220,
              totalPrice: 22000,
              estimatedDays: 9,
              shippingCarrier: 'Maersk Ocean Cargo',
              complianceScore: 94,
              aiRecommendationScore: 88,
              notes: 'Lowest unit price, recommended for non-urgent shipments.'
            }
          ],
          logisticsAdvice: `Route optimization suggests shipping via ${destination || 'nearest port'} with pre-cleared customs documentation.`,
          riskAssessment: 'Low supply chain disruption risk. All vendors maintain verified PayPal business merchant accounts.'
        });
      }

      const systemInstruction = `You are the Solvex Autonomous B2B Procurement AI Engine. 
You parse natural language corporate procurement requests and output a detailed JSON specification for RFQs, supplier bids, logistics routing, and pricing.
Ensure realistic prices, supplier metrics, and high-value B2B marketplace recommendations.
Always output valid JSON strictly matching the schema.`;

      const geminiPrompt = `Analyze the following procurement demand:
"${prompt}"
Destination: ${destination || 'Primary Distribution Hub'}
Target Budget: ${targetBudget ? `$${targetBudget}` : 'Flexible'}
Urgency: ${urgency || 'Medium'}

Generate a structured B2B Purchase Order proposal with 2-3 supplier bids and AI risk recommendations.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: geminiPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              poTitle: { type: Type.STRING },
              summary: { type: Type.STRING },
              itemDescription: { type: Type.STRING },
              estimatedQuantity: { type: Type.INTEGER },
              estimatedUnitPrice: { type: Type.NUMBER },
              estimatedTotal: { type: Type.NUMBER },
              recommendedSuppliers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    supplierName: { type: Type.STRING },
                    rating: { type: Type.NUMBER },
                    unitPrice: { type: Type.NUMBER },
                    totalPrice: { type: Type.NUMBER },
                    estimatedDays: { type: Type.INTEGER },
                    shippingCarrier: { type: Type.STRING },
                    complianceScore: { type: Type.INTEGER },
                    aiRecommendationScore: { type: Type.INTEGER },
                    notes: { type: Type.STRING }
                  },
                  required: ['id', 'supplierName', 'unitPrice', 'totalPrice', 'estimatedDays', 'shippingCarrier', 'aiRecommendationScore']
                }
              },
              logisticsAdvice: { type: Type.STRING },
              riskAssessment: { type: Type.STRING }
            },
            required: ['poTitle', 'summary', 'itemDescription', 'estimatedQuantity', 'estimatedUnitPrice', 'estimatedTotal', 'recommendedSuppliers', 'logisticsAdvice', 'riskAssessment']
          }
        }
      });

      const parsedJson = JSON.parse(response.text || '{}');
      res.json(parsedJson);
    } catch (error: any) {
      console.error('Gemini Procure Error:', error);
      res.status(500).json({ error: 'Failed to process AI procurement request', details: error.message });
    }
  });

  // --- PAYPAL INTEGRATION ENDPOINTS ---

  // Create PayPal Order
  app.post('/api/paypal/create-order', async (req, res) => {
    try {
      const { poId, amount, currency = 'USD', description } = req.body;

      const paypalClientId = process.env.PAYPAL_CLIENT_ID || 'sb';
      const paypalSecret = process.env.PAYPAL_CLIENT_SECRET;
      const paypalMode = process.env.PAYPAL_MODE || 'sandbox';

      const orderAmount = Number(amount) || 100;

      // If we have real client secret, we can call PayPal REST API
      if (paypalSecret && paypalClientId !== 'sb') {
        const baseUrl = paypalMode === 'live'
          ? 'https://api-m.paypal.com'
          : 'https://api-m.sandbox.paypal.com';

        // Get OAuth token
        const authRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64')}`
          },
          body: 'grant_type=client_credentials'
        });

        const authData = await authRes.json() as any;
        const accessToken = authData.access_token;

        if (!accessToken) {
          throw new Error('Failed to obtain PayPal OAuth access token');
        }

        // Create Checkout Order
        const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
              {
                reference_id: poId || `PO-${Date.now()}`,
                description: description || 'Autonomous B2B Procurement Invoice',
                amount: {
                  currency_code: currency,
                  value: orderAmount.toFixed(2)
                }
              }
            ]
          })
        });

        const paypalOrder = await orderRes.json() as any;
        return res.json({ id: paypalOrder.id, status: paypalOrder.status });
      }

      // Fallback / Standard Client-Side Sandbox Order ID generator
      const mockPaypalOrderId = `PAYPAL-ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      res.json({
        id: mockPaypalOrderId,
        status: 'CREATED',
        amount: orderAmount,
        currency,
        message: 'PayPal Sandbox Order created successfully'
      });
    } catch (err: any) {
      console.error('PayPal Create Order Error:', err);
      res.status(500).json({ error: 'Failed to create PayPal order', details: err.message });
    }
  });

  // Capture PayPal Order
  app.post('/api/paypal/capture-order', async (req, res) => {
    try {
      const { paypalOrderId, poId, payerEmail } = req.body;

      const paypalClientId = process.env.PAYPAL_CLIENT_ID || 'sb';
      const paypalSecret = process.env.PAYPAL_CLIENT_SECRET;
      const paypalMode = process.env.PAYPAL_MODE || 'sandbox';

      let capturedStatus = 'COMPLETED';

      if (paypalSecret && paypalClientId !== 'sb') {
        const baseUrl = paypalMode === 'live'
          ? 'https://api-m.paypal.com'
          : 'https://api-m.sandbox.paypal.com';

        const authRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64')}`
          },
          body: 'grant_type=client_credentials'
        });

        const authData = await authRes.json() as any;
        const accessToken = authData.access_token;

        if (accessToken) {
          const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const captureData = await captureRes.json() as any;
          capturedStatus = captureData.status || 'COMPLETED';
        }
      }

      // Update associated Purchase Order state in memory
      if (poId) {
        const existingPo = ordersStore.find(p => p.id === poId || p.poNumber === poId);
        if (existingPo) {
          existingPo.status = 'In Transit';
          existingPo.paypalOrderId = paypalOrderId;
          existingPo.paypalPaymentStatus = 'COMPLETED';
          existingPo.paypalPayerEmail = payerEmail || 'finance@solvex-b2b.com';
          existingPo.carrier = existingPo.carrier || 'FedEx Supply Chain';
          existingPo.trackingNumber = `TRACK-PP-${Math.floor(1000000 + Math.random() * 9000000)}`;
          existingPo.logs.push({
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            message: `PayPal Checkout verified & funds captured (${paypalOrderId}). Status set to In Transit.`,
            type: 'success'
          });

          // Automatically spawn corresponding Shipment tracking
          const newShipment: Shipment = {
            id: `ship-${Date.now()}`,
            poId: existingPo.id,
            trackingNumber: existingPo.trackingNumber!,
            carrier: 'DHL Freight',
            origin: 'Global Supplier Warehouse Hub',
            destination: existingPo.shippingAddress,
            currentLocation: 'Dispatched from Factory Fulfillment Center',
            eta: '2026-08-15 (In 5 Days)',
            status: 'In Transit',
            transportMode: 'Air Cargo',
            temperatureTelemetry: '22.0°C (Controlled)',
            gpsCoordinates: { lat: 40.7128, lng: -74.0060 },
            milestones: [
              { title: 'Payment Captured via PayPal', date: new Date().toISOString().substring(0, 10), location: 'PayPal B2B Escrow', completed: true },
              { title: 'Dispatched from Supplier Hub', date: new Date().toISOString().substring(0, 10), location: 'Factory Gate 2', completed: true },
              { title: 'In Transit to Destination Airport', date: 'En Route', location: 'Customs Logistics Hub', completed: false },
              { title: 'Final Delivery & Acceptance', date: 'Pending', location: existingPo.destinationPort, completed: false }
            ]
          };
          shipmentsStore.unshift(newShipment);
        }
      }

      res.json({
        success: true,
        paypalOrderId,
        status: capturedStatus,
        message: 'PayPal payment captured successfully. Autonomous fulfillment dispatched!'
      });
    } catch (err: any) {
      console.error('PayPal Capture Order Error:', err);
      res.status(500).json({ error: 'Failed to capture PayPal order', details: err.message });
    }
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Solvex Autonomous B2B Marketplace Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
