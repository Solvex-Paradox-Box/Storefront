import { SolutionItem, PurchaseOrder, Shipment, ERPIntegration } from '../types';

export const INITIAL_SOLUTIONS: SolutionItem[] = [
  {
    id: 'sol-01',
    itemType: 'Paradox Solution',
    title: 'Solvex Autonomous PO Dispatch Engine',
    category: 'Procurement AI',
    description: 'Automated RFQ distribution, real-time bid scoring, and purchase order auto-dispatch agent.',
    fullDescription: 'An enterprise-grade autonomous procurement agent that continuously monitors ERP inventory thresholds, auto-drafts structured Request for Quotes (RFQs), broadcasts them across vendor networks, and evaluates responses using multi-factor AI risk matrices.',
    paradoxResolution: 'Parallel ESG compliance scoring matched with zero-latency automated bid dispatch.',
    price: 499.00,
    pricingModel: 'Monthly Subscription',
    rating: 4.9,
    reviewsCount: 128,
    vendor: 'Solvex Core AI',
    integrationPlatforms: ['SAP S/4HANA', 'Oracle NetSuite', 'Salesforce Commerce Cloud'],
    features: [
      'Automated RFQ generation from low stock triggers',
      'Supplier compliance & ESG risk scoring',
      'Native PayPal B2B Invoice & Order Integration',
      'Multi-currency automated currency hedging alerts'
    ],
    badge: 'Popular',
    iconName: 'Cpu',
    specs: {
      'Deployment': 'Cloud Run Container / REST API',
      'Latency': '< 1.2s RFQ Parsing',
      'Security': 'SOC2 Type II Compliant',
      'Supported ERPs': 'SAP, Oracle, Dynamics 365, NetSuite'
    }
  },
  {
    id: 'sol-02',
    itemType: 'Autonomous Business Template',
    title: 'Cross-Platform Multi-Carrier Freight Matcher',
    category: 'Logistics Automation',
    description: 'Dynamic ocean, air, and road freight rate aggregator with real-time dispatch routing.',
    fullDescription: 'Connects directly with Maersk, DHL, FedEx, and regional freight brokers to dynamically query live spot rates, reserve container capacity, and print automated customs manifest documentation in seconds.',
    price: 850.00,
    pricingModel: 'One-time',
    rating: 4.8,
    reviewsCount: 94,
    vendor: 'LogiTech Autonomous Labs',
    integrationPlatforms: ['FedEx API', 'DHL Freight Hub', 'Maersk Ocean API', 'Freightos'],
    features: [
      'Real-time multi-carrier spot rate comparison',
      'Automated Bill of Lading (BoL) PDF generation',
      'Predictive delay risk alerts using weather & port congestion AI',
      'Automated customs duty calculation'
    ],
    badge: 'Enterprise Choice',
    iconName: 'Truck',
    specs: {
      'Supported Carriers': '120+ Global Freight Lines',
      'API Throughput': '10,000 requests/min',
      'Customs Coverage': '140 Countries'
    }
  },
  {
    id: 'sol-03',
    itemType: 'Paradox Solution',
    title: 'Smart Customs & Tariff Compliance Bot',
    category: 'Customs & Compliance',
    description: 'AI-driven HS Code classification, trade rule auditing, and tariff minimization assistant.',
    fullDescription: 'Eliminate customs clearance holds. This autonomous compliance module scans incoming invoice manifests, automatically verifies Harmonized System (HS) codes, checks regional trade deal eligibility (USMCA, EU-UK TCA), and flags potential sanctions risks.',
    paradoxResolution: 'Resolves strict cross-border trade friction while maintaining instant freight clearance.',
    price: 299.00,
    pricingModel: 'Monthly Subscription',
    rating: 4.95,
    reviewsCount: 210,
    vendor: 'BorderShield AI',
    integrationPlatforms: ['Customs ACE', 'EU TARIC', 'Oracle Trade Management'],
    features: [
      'Automated 10-digit HS Code lookup & validation',
      'Trade agreement duty savings optimization',
      'Real-time Restricted Party Screening (RPS)',
      'Digital Certificate of Origin auto-filling'
    ],
    iconName: 'ShieldCheck',
    specs: {
      'Accuracy Rate': '99.4% HS Code Classification',
      'Update Frequency': 'Daily Tariff Regulations Sync'
    }
  },
  {
    id: 'sol-04',
    itemType: 'Autonomous Business Template',
    title: 'IoT Cold-Chain Telemetry & Asset Tracker',
    category: 'Supply Chain IoT',
    description: 'Cellular & satellite real-time temperature, tilt, and GPS location monitor for high-value cargo.',
    fullDescription: 'Integrates hardware IoT telemetry feeds with autonomous procurement alerts. Automatically triggers insurance claim logs and supplier replacement orders if container temperature drifts beyond threshold during transit.',
    price: 1200.00,
    pricingModel: 'One-time',
    rating: 4.7,
    reviewsCount: 62,
    vendor: 'OmniTrack Systems',
    integrationPlatforms: ['AWS IoT Core', 'Azure IoT Hub', 'Kore Wireless'],
    features: [
      'Real-time shock, humidity, and temperature logging',
      'Automated breach notification to PayPal Escrow agent',
      'Interactive vector map telemetry visualizer',
      '45-day battery life per IoT tag'
    ],
    badge: 'Hardware Sync',
    iconName: 'Radio',
    specs: {
      'GPS Precision': '< 2.5 meters',
      'Sensors': 'Temp (-40C to 85C), Humidity, 3-Axis Gyro'
    }
  },
  {
    id: 'sol-05',
    itemType: 'Paradox Solution',
    title: 'Oracle & SAP Cross-Platform ERP Bridge',
    category: 'ERP Connector',
    description: 'Bi-directional real-time data sync middleware for legacy ERP and modern B2B marketplaces.',
    fullDescription: 'Seamlessly bridges fragmented enterprise architectures. Automatically synchronizes vendor master files, purchase requisitions, material masters, and PayPal settlement receipts directly into your core ledger.',
    paradoxResolution: 'Simultaneous legacy ERP data lock prevention with real-time cloud API synchronization.',
    price: 650.00,
    pricingModel: 'Monthly Subscription',
    rating: 4.85,
    reviewsCount: 88,
    vendor: 'Solvex Integration Grid',
    integrationPlatforms: ['SAP S/4HANA', 'Oracle ECC', 'Microsoft Dynamics 365', 'Workday'],
    features: [
      'Zero-code enterprise webhook builder',
      'Bi-directional PO and invoice reconciliation',
      'Automated PayPal instant transaction journal entries',
      'High-speed batch and streaming transformation'
    ],
    iconName: 'Layers',
    specs: {
      'Protocol Support': 'REST, OData, SOAP, gRPC, RFC',
      'Encryption': 'AES-256 at rest & TLS 1.3 in transit'
    }
  },
  {
    id: 'sol-06',
    itemType: 'Autonomous Business Template',
    title: 'Autonomous Supplier SLA & Performance Auditor',
    category: 'Procurement AI',
    description: 'Continuous AI monitoring of vendor delivery speed, quality rates, and contract compliance.',
    fullDescription: 'Evaluates global suppliers in real time by ingesting freight tracking data, quality inspection reports, and invoice timestamps. Dynamically ranks suppliers during RFQ auto-bidding.',
    price: 349.00,
    pricingModel: 'Monthly Subscription',
    rating: 4.78,
    reviewsCount: 156,
    vendor: 'Solvex Core AI',
    integrationPlatforms: ['SAP Ariba', 'Coupa Procurement', 'Jaggaer'],
    features: [
      'Vendor scorecards with automated penalty calculation',
      'Predictive delivery reliability forecasting',
      'PayPal automated milestone release triggers',
      'Automated supplier warning dispatch'
    ],
    iconName: 'BarChart3',
    specs: {
      'Data Sources': 'GPS, BoL, Invoices, Receiving Logs',
      'Reporting': 'Real-time Analytics Dashboard'
    }
  }
];

export const INITIAL_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-1001',
    poNumber: 'PO-2026-8891',
    title: 'Industrial Lithium-Ion Battery Modules (100 kWh)',
    itemDescription: 'High-density LiFePO4 rack modules for energy storage deployment.',
    quantity: 40,
    unitPrice: 1250,
    totalAmount: 50000,
    currency: 'USD',
    status: 'In Transit',
    supplierName: 'PowerVolts B2B Global',
    shippingAddress: 'Facility North, 440 Industrial Parkway, Chicago IL',
    destinationPort: 'Port of Chicago',
    carrier: 'Maersk Line',
    trackingNumber: 'MSK-9920184-CH',
    createdAt: '2026-08-01T10:15:00Z',
    paypalOrderId: 'PP-ORD-8829104',
    paypalPaymentStatus: 'COMPLETED',
    paypalPayerEmail: 'procurement@enterprise-solvex.com',
    logs: [
      { timestamp: '2026-08-01 10:15', message: 'RFQ generated via Solvex Autonomous Agent', type: 'info' },
      { timestamp: '2026-08-01 11:30', message: '3 supplier bids evaluated. PowerVolts B2B selected (Score: 96/100)', type: 'info' },
      { timestamp: '2026-08-01 12:05', message: 'PayPal B2B Checkout completed ($50,000.00 USD captured)', type: 'success' },
      { timestamp: '2026-08-03 08:00', message: 'Freight dispatched via Maersk Line vessel CSCL Globe', type: 'info' }
    ]
  },
  {
    id: 'po-1002',
    poNumber: 'PO-2026-8892',
    title: 'Automated Micro-Optical Sensor Array',
    itemDescription: 'Precision CMOS optical inspection sensors for quality line automated scanning.',
    quantity: 200,
    unitPrice: 85,
    totalAmount: 17000,
    currency: 'USD',
    status: 'Payment Pending',
    supplierName: 'OptiSense Tech Corp',
    shippingAddress: 'Logistics Hub East, Pier 12, Newark NJ',
    destinationPort: 'Port of Newark',
    carrier: 'DHL Freight',
    createdAt: '2026-08-08T14:22:00Z',
    logs: [
      { timestamp: '2026-08-08 14:22', message: 'Natural language request parsed by Gemini AI', type: 'info' },
      { timestamp: '2026-08-08 14:23', message: 'RFQ dispatched to 4 approved optic vendors', type: 'info' },
      { timestamp: '2026-08-08 14:30', message: 'Winning bid selected: OptiSense Tech ($17,000 USD)', type: 'info' },
      { timestamp: '2026-08-08 14:31', message: 'Purchase Order created. Awaiting PayPal payment confirmation.', type: 'warning' }
    ]
  },
  {
    id: 'po-1003',
    poNumber: 'PO-2026-8893',
    title: 'Pneumatic Actuator Valves (Grade 316 Stainless)',
    itemDescription: 'Heavy-duty chemical-resistant pneumatic flow control valves.',
    quantity: 80,
    unitPrice: 320,
    totalAmount: 25600,
    currency: 'USD',
    status: 'Completed',
    supplierName: 'FluidControls Logistics',
    shippingAddress: 'Refinery Gate 4, Houston TX',
    destinationPort: 'Port of Houston',
    carrier: 'FedEx',
    trackingNumber: 'FDX-7740291-TX',
    createdAt: '2026-07-20T09:00:00Z',
    paypalOrderId: 'PP-ORD-7719201',
    paypalPaymentStatus: 'COMPLETED',
    paypalPayerEmail: 'payments@refinery-ops.com',
    logs: [
      { timestamp: '2026-07-20 09:00', message: 'Automated inventory reorder triggered by Oracle NetSuite bridge', type: 'info' },
      { timestamp: '2026-07-20 09:12', message: 'PayPal Checkout completed ($25,600.00 USD captured)', type: 'success' },
      { timestamp: '2026-07-25 16:45', message: 'Shipment delivered and verified via IoT sensor telemetry.', type: 'success' }
    ]
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-301',
    poId: 'po-1001',
    trackingNumber: 'MSK-9920184-CH',
    carrier: 'Maersk Line',
    origin: 'Ningbo-Zhoushan Port, CN',
    destination: 'Port of Chicago, USA',
    currentLocation: 'Pacific Ocean (En Route to Long Beach Gateway)',
    eta: '2026-08-16 (In 7 Days)',
    status: 'In Transit',
    transportMode: 'Ocean Freight',
    temperatureTelemetry: '21.4°C (Normal Range)',
    gpsCoordinates: { lat: 31.2304, lng: -142.5120 },
    milestones: [
      { title: 'Vessel Loaded & Departed Ningbo', date: '2026-08-03 08:00', location: 'Ningbo, CN', completed: true },
      { title: 'Customs Pre-Clearance Submitted', date: '2026-08-06 12:00', location: 'US Customs EDI', completed: true },
      { title: 'Mid-Pacific Waypoint Reached', date: '2026-08-09 10:00', location: 'Pacific Ocean', completed: true },
      { title: 'Arrival at Long Beach Gateway', date: '2026-08-14 06:00', location: 'Long Beach, CA', completed: false },
      { title: 'Rail Transfer to Chicago', date: '2026-08-16 14:00', location: 'Chicago Terminal', completed: false }
    ]
  },
  {
    id: 'ship-302',
    poId: 'po-1003',
    trackingNumber: 'FDX-7740291-TX',
    carrier: 'FedEx',
    origin: 'Stuttgart Industrial Park, DE',
    destination: 'Refinery Gate 4, Houston TX, USA',
    currentLocation: 'Delivered - Houston Facility Gate 4',
    eta: 'Delivered on 2026-07-25',
    status: 'Delivered',
    transportMode: 'Air Cargo',
    temperatureTelemetry: '24.1°C (Ambient)',
    gpsCoordinates: { lat: 29.7604, lng: -95.3698 },
    milestones: [
      { title: 'Pick up from Supplier Factory', date: '2026-07-21 09:30', location: 'Stuttgart, DE', completed: true },
      { title: 'Air Cargo Departed Frankfurt (FRA)', date: '2026-07-22 14:15', location: 'Frankfurt Airport', completed: true },
      { title: 'Arrived Houston Intercontinental (IAH)', date: '2026-07-24 02:20', location: 'Houston, TX', completed: true },
      { title: 'Delivered & Signed', date: '2026-07-25 16:45', location: 'Houston TX Facility', completed: true }
    ]
  }
];

export const INITIAL_ERP_INTEGRATIONS: ERPIntegration[] = [
  {
    id: 'erp-1',
    name: 'SAP S/4HANA Enterprise Cloud',
    category: 'ERP',
    status: 'Connected',
    lastSync: '2 mins ago',
    totalEventsProcessed: 14280,
    icon: 'Database'
  },
  {
    id: 'erp-2',
    name: 'Oracle NetSuite OneWorld',
    category: 'ERP',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 9840,
    icon: 'Server'
  },
  {
    id: 'erp-3',
    name: 'Salesforce B2B Commerce',
    category: 'CRM',
    status: 'Connected',
    lastSync: '12 mins ago',
    totalEventsProcessed: 6120,
    icon: 'Cloud'
  },
  {
    id: 'erp-4',
    name: 'Manhattan WMS Logistics',
    category: 'WMS',
    status: 'Syncing',
    lastSync: 'Sync in progress',
    totalEventsProcessed: 34100,
    icon: 'Box'
  }
];
