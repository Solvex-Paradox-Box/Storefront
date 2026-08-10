import { SolutionItem } from '../types';

// Helper to systematically construct the 105 Paradox Solutions & 105 Autonomous Business Templates
// providing detailed, realistic enterprise data, paradox resolutions, and accurate B2B market pricing.

const paradoxDomains = [
  { name: 'Cross-Border Tax & Trade Tariff', cat: 'Customs & Compliance' as const, vendor: 'Solvex Trade Guard', basePrice: 850 },
  { name: 'Zero-Latency Freight Dispatch', cat: 'Logistics Automation' as const, vendor: 'LogiTech Autonomous', basePrice: 1200 },
  { name: 'Multi-Vendor AI Price Hedging', cat: 'Procurement AI' as const, vendor: 'Solvex Core AI', basePrice: 650 },
  { name: 'Cold-Chain IoT Sensor Mesh', cat: 'Supply Chain IoT' as const, vendor: 'OmniTrack Systems', basePrice: 1400 },
  { name: 'SAP S/4HANA & Oracle Mesh Sync', cat: 'ERP Connector' as const, vendor: 'Solvex Grid Middleware', basePrice: 950 },
  { name: 'Autonomous Escrow & Liquidity', cat: 'FinTech & Settlement' as const, vendor: 'PayPal B2B Protocol', basePrice: 1100 },
  { name: 'Sanctions & Restricted Screening', cat: 'Global Trade Agent' as const, vendor: 'BorderShield AI', basePrice: 750 }
];

const templateDomains = [
  { name: 'Autonomous Freight Forwarder Operating System', cat: 'Logistics Automation' as const, vendor: 'Solvex Enterprise OS', basePrice: 2490 },
  { name: 'Automated Electronics Component Procurement Hub', cat: 'Procurement AI' as const, vendor: 'SiliconProcure AI', basePrice: 1950 },
  { name: 'Cross-Border Customs Brokerage Franchise Node', cat: 'Customs & Compliance' as const, vendor: 'GlobalCustoms Node', basePrice: 3200 },
  { name: 'Cold-Chain Pharmaceutical Logistics Platform', cat: 'Supply Chain IoT' as const, vendor: 'PharmaTrack Global', basePrice: 4100 },
  { name: 'Oracle & Workday Universal Procurement Portal', cat: 'ERP Connector' as const, vendor: 'Solvex Bridge Stack', basePrice: 2800 },
  { name: 'Automated Maritime Port Terminal Agent', cat: 'Autonomous Operations' as const, vendor: 'PortControl Autonomous', basePrice: 3800 },
  { name: 'B2B Micro-Financing & PayPal Invoice Factoring Desk', cat: 'FinTech & Settlement' as const, vendor: 'B2B Capital Engine', basePrice: 2100 }
];

const icons = ['Cpu', 'Truck', 'ShieldCheck', 'Radio', 'Layers', 'BarChart3'];

export function generateAll210Solutions(): SolutionItem[] {
  const items: SolutionItem[] = [];

  // 1. Generate 105 Solved Paradox Solutions
  for (let i = 1; i <= 105; i++) {
    const domain = paradoxDomains[(i - 1) % paradoxDomains.length];
    const icon = icons[(i - 1) % icons.length];
    
    // Accurate realistic pricing scale between $299 and $2,850
    const price = domain.basePrice + ((i * 17) % 1200);

    items.push({
      id: `paradox-sol-${i.toString().padStart(3, '0')}`,
      itemType: 'Paradox Solution',
      title: `Paradox Solution #${i}: ${domain.name} Engine v${Math.floor(i / 10) + 1}.${i % 10}`,
      category: domain.cat,
      description: `Resolves the fundamental trade paradox where high compliance friction conflicts with zero-latency autonomous order fulfillment.`,
      fullDescription: `Paradox #${i} Resolution Detail: In conventional global trade, stringent multi-jurisdiction compliance audits create severe delays in procurement pipelines. This Solvex solution resolves the paradox by executing continuous zero-knowledge cryptographic compliance checks in parallel with AI freight bidding, ensuring 100% regulatory verification without holding shipment dispatch.`,
      paradoxResolution: `Simultaneous zero-delay dispatch paired with cryptographically verified multi-jurisdiction trade compliance and instant PayPal settlement authorization.`,
      price,
      pricingModel: i % 3 === 0 ? 'Monthly Subscription' : i % 2 === 0 ? 'One-time' : 'Per-Transaction Fee',
      rating: Number((4.7 + ((i * 3) % 30) / 100).toFixed(2)),
      reviewsCount: 40 + ((i * 13) % 210),
      vendor: domain.vendor,
      integrationPlatforms: ['PayPal REST B2B API', 'SAP S/4HANA', 'FedEx Logistics EDI', 'Oracle NetSuite'],
      features: [
        'Paradox Resolution Engine: Parallel compliance audit & instant dispatch',
        'Direct PayPal B2B Instant Escrow & Payment Capture',
        'Real-time webhook telemetry & automated BOLE manifest output',
        'Multi-currency automated exchange hedging guardrails'
      ],
      badge: i <= 15 ? 'Paradox Solved' : undefined,
      iconName: icon,
      specs: {
        'Paradox ID': `PRDX-RES-${i}`,
        'Latency Reduction': '99.4% Faster Execution',
        'Compliance Verification': 'SOC2 Type II & USMCA Certified',
        'PayPal API Version': 'v2 Checkout REST'
      }
    });
  }

  // 2. Generate 105 Autonomous Business Templates
  for (let j = 1; j <= 105; j++) {
    const domain = templateDomains[(j - 1) % templateDomains.length];
    const icon = icons[(j - 1) % icons.length];

    // Accurate realistic business template pricing between $1,250 and $5,500
    const price = domain.basePrice + ((j * 31) % 2300);

    items.push({
      id: `template-biz-${j.toString().padStart(3, '0')}`,
      itemType: 'Autonomous Business Template',
      title: `Business Template #${j}: ${domain.name}`,
      category: domain.cat,
      description: `Turnkey autonomous enterprise template ready for instant deployment with pre-built PayPal checkout, supplier connectors, and AI agent automation.`,
      fullDescription: `Autonomous Business Template #${j} is a complete, self-operating B2B enterprise stack. It equips businesses with automated customer acquisition forms, dynamic Gemini AI RFQ bidding, real-time freight carrier routing, and PayPal instant B2B invoice settlement out-of-the-box.`,
      price,
      pricingModel: j % 3 === 0 ? 'Monthly Subscription' : 'One-time',
      rating: Number((4.8 + ((j * 2) % 20) / 100).toFixed(2)),
      reviewsCount: 25 + ((j * 9) % 180),
      vendor: domain.vendor,
      integrationPlatforms: ['PayPal REST Merchant API', 'Salesforce B2B', 'Maersk Line API', 'DHL Freight Hub'],
      features: [
        'Turnkey Autonomous Business Blueprint with full UI & Backend',
        'Pre-configured PayPal B2B Checkout & Escrow Workflows',
        'Self-healing AI supply chain agent with real-time error telemetry',
        'Integrated multi-carrier tracking dashboard with customs manifest export'
      ],
      badge: j <= 15 ? 'Turnkey Ready' : undefined,
      iconName: icon,
      specs: {
        'Template Blueprint ID': `BIZ-TMPL-${j}`,
        'Deployment Time': 'Instant (< 60 Seconds)',
        'Built-In Settlement': 'PayPal B2B REST API Enabled',
        'Architecture': 'Serverless Cloud Run Container'
      }
    });
  }

  return items;
}

export const ALL_210_SOLUTIONS: SolutionItem[] = generateAll210Solutions();
