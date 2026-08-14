import { SolutionItem, PurchaseOrder, Shipment, ERPIntegration } from '../types';

export const INITIAL_SOLUTIONS: SolutionItem[] = [
  {
    id: 'sol-storefront-00',
    itemType: 'Paradox Solution',
    title: 'solvex-paradox-box/storefront',
    category: 'JIT Software Distribution',
    description: 'The master autonomous B2B digital storefront & marketplace gateway with integrated 380-header engine, JIT delivery, and PayPal escrow.',
    fullDescription: 'The core public storefront and enterprise application platform housing the complete catalog of 128 digital software solutions and 105 turnkey autonomous business blueprints. Includes live 380-character node header synthesis, sovereign passkey authentication, and direct synchronization with uarefake.com and uarefake.space.',
    paradoxResolution: 'Resolves the sovereign commercial paradox: instant open web distribution with zero third-party platform lock-in.',
    price: 999.00,
    pricingModel: 'One-time',
    rating: 5.0,
    reviewsCount: 380,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['solvex-paradox-box/storefront', 'uarefake.space Control Board', 'uarefake.com', 'Neon PostgreSQL', 'GitHub Public Registry'],
    features: [
      'Master storefront repository for all 233+ sovereign solutions',
      'Integrated 380-character deterministic node header synthesizer',
      'Instant PayPal B2B escrow and automated digital license dispatch',
      'Direct sync with bdc-project-api-server and Neon DB ledger'
    ],
    badge: 'Master Storefront',
    iconName: 'Zap',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/storefront',
      'Delivery Format': 'Full-Stack React/Vite/Express Web Application & Docker Image',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Security': 'AES-256 / SHA-256 Manifest Signatures + eBPF Verified',
      'Target Control Plane': 'uarefake.space & uarefake.com'
    }
  },
  {
    id: 'sol-01',
    itemType: 'Paradox Solution',
    title: 'solvex-crystal-clear-black-box',
    category: 'JIT Software Distribution',
    description: 'Deterministic registry-driven software packaging & real-time JIT digital artifact distribution pipeline.',
    fullDescription: 'The flagship solvex-crystal-clear-black-box repository provides zero-latency digital distribution of compiled software artifacts, autonomous paradox resolutions, and turnkey digital business templates. Includes cryptographic hash verification and instant containerized execution.',
    paradoxResolution: 'Resolves the distribution paradox: instant edge runtime delivery paired with zero-trust cryptographic signature validation.',
    price: 850.00,
    pricingModel: 'One-time',
    rating: 4.99,
    reviewsCount: 248,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['solvex-crystal-clear-black-box', 'uarefake.space Control Board', 'Vercel Edge', 'Neon PostgreSQL', 'GitHub Public Registry'],
    features: [
      'Zero-latency JIT digital artifact provisioning',
      'Deterministic rule-based digital procurement parser',
      'Direct synchronization with uarefake.space AI Registry',
      'Cryptographically signed 380-character software entitlement manifests',
      'Instant container bytecode streaming to edge fleets'
    ],
    badge: 'Core Repository',
    iconName: 'Zap',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/solvex-crystal-clear-black-box',
      'Delivery Format': 'Instant Digital Download / JIT Container Image / NPM Package',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Security': 'AES-256 / SHA-256 Manifest Signatures + eBPF Verified',
      'Target Control Plane': 'uarefake.space'
    }
  },
  {
    id: 'sol-02',
    itemType: 'Paradox Solution',
    title: 'bdc-project-api-server',
    category: 'Autonomous Operations',
    description: 'Post-agentic recursive autonomous intelligence operational brain, agent memory sync & task resolution microservice.',
    fullDescription: 'The central operational microservice and backend engine for Daisy Haminja post-agentic workflows. Houses background execution loops, Neon DB vector synchronization, autonomous task formulation, and multi-agent memory persistence without any third-party AI dependencies.',
    paradoxResolution: 'Resolves recursive agency paradox: fully sovereign local execution with continuous post-agentic self-healing.',
    price: 1200.00,
    pricingModel: 'One-time',
    rating: 4.98,
    reviewsCount: 195,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['bdc-project-api-server', 'Neon DB PostgreSQL', 'uarefake.space', 'eBPF Sandbox'],
    features: [
      'Post-agentic recursive task resolution pipeline',
      'Autonomous agent memory persistence and vector ledger',
      'Zero third-party API dependencies (100% sovereign)',
      'High-throughput REST & WebSocket event streaming'
    ],
    badge: 'Operational Brain',
    iconName: 'Cpu',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/bdc-project-api-server',
      'Delivery Format': 'Docker Container / Node.js Microservice / Cloud Run Bundle',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Database Sync': 'Neon DB PostgreSQL Managed Ledger',
      'Latency': '< 15ms local execution'
    }
  },
  {
    id: 'sol-03',
    itemType: 'Paradox Solution',
    title: 'solvex-380-node-header-protocol',
    category: 'FinTech & Settlement',
    description: 'Real 380-character cryptographic node header generator, eBPF sandbox validation, and consensus ledger engine.',
    fullDescription: 'Enforces mathematically verifiable 380-character node identity headers across all compiled micro-applications. Connects directly to the solvex consensus ledger, providing immutable cryptographic provenance, company authority tokens, and non-custodial runtime safety.',
    paradoxResolution: 'Bypasses central certificate authority bottlenecks with deterministic, self-verifying 380-character headers.',
    price: 499.00,
    pricingModel: 'One-time',
    rating: 4.95,
    reviewsCount: 164,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['uarefake.space Enclave', 'eBPF Runtime', 'Solvex Black Box Vault', 'AppForge Compiler'],
    features: [
      'Deterministic 380-character SHA-256 header synthesis',
      'Immutable consensus ledger commit hooks',
      'Zero-trust company and developer identity verification',
      'eBPF kernel sandbox validation compatibility'
    ],
    badge: 'Cryptographic Standard',
    iconName: 'Lock',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/solvex-380-node-header',
      'Delivery Format': 'TypeScript/Rust SDK & CLI Binary',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Cryptographic Algorithm': 'SHA-256 / Ed25519 Deterministic Synthesis'
    }
  },
  {
    id: 'sol-04',
    itemType: 'Paradox Solution',
    title: 'solvex-paradox-matrix-88',
    category: 'Autonomous Operations',
    description: 'The complete computational kernel for the 88 Solved Paradoxes across 5 Cognitive Chambers.',
    fullDescription: 'The foundational reasoning engine powering Daisy Haminja. Contains the formalized logic, mathematical proofs, and runtime operators for all 88 Solved Paradoxes (48 Proprietary + 40 Historical) across Chambers I to V, providing autonomous conflict resolution for complex enterprise systems.',
    paradoxResolution: 'Formalizes and operationalizes 88 foundational paradoxes into executable digital logic routines.',
    price: 1500.00,
    pricingModel: 'One-time',
    rating: 5.0,
    reviewsCount: 312,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['bdc-project-api-server', 'Daisy AI Forge', 'Neon DB Ledger', 'uarefake.space'],
    features: [
      'All 88 Paradox resolution operators pre-compiled',
      '5-Chamber Cognitive Architecture mapping',
      'Autonomous reward optimization formula engine',
      'Zero third-party AI runtime requirement'
    ],
    badge: 'Foundational Kernel',
    iconName: 'ShieldCheck',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/solvex-paradox-matrix-88',
      'Delivery Format': 'Core Mathematical Kernel & TypeScript Library',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Total Paradoxes': '88 Formalized Paradox Resolutions'
    }
  },
  {
    id: 'sol-05',
    itemType: 'Autonomous Business Template',
    title: 'solvex-appforge-microapp-builder',
    category: 'JIT Software Distribution',
    description: 'Autonomous micro-application compiler, bytecode synthesizer, and zero-trust sandbox deployer.',
    fullDescription: 'Instantaneously compiles custom digital enterprise tools, internal portals, and customer-facing micro-apps directly from prompt specifications. Each build automatically injects a verified 380-character node header and wires instant PayPal checkout escrow.',
    price: 950.00,
    pricingModel: 'One-time',
    rating: 4.92,
    reviewsCount: 180,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['solvex-crystal-clear-black-box', 'uarefake.space', 'PayPal B2B REST API', 'Vercel Edge'],
    features: [
      'Instant zero-code micro-app compilation',
      'Automated 380-character cryptographic header injection',
      'Built-in PayPal B2B payment escrow and order sync',
      'One-click digital container deployment'
    ],
    badge: 'Compiler Engine',
    iconName: 'Layers',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/solvex-appforge-builder',
      'Delivery Format': 'Full-Stack Web IDE & Compiler Suite',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Build Speed': '< 3.2s Full Bytecode Synthesis'
    }
  },
  {
    id: 'sol-06',
    itemType: 'Autonomous Business Template',
    title: 'solvex-paypal-instant-escrow-bridge',
    category: 'FinTech & Settlement',
    description: 'Non-custodial B2B instant digital checkout, cryptographic escrow release, and automated invoicing gateway.',
    fullDescription: 'Enterprise fintech middleware linking digital software checkouts directly with PayPal REST APIs. Features instantaneous digital product license key generation, non-custodial milestone escrow holding, and automated IRS 1099-DA compliant receipt generation upon payment confirmation.',
    price: 599.00,
    pricingModel: 'One-time',
    rating: 4.96,
    reviewsCount: 220,
    vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
    integrationPlatforms: ['PayPal REST API v2', 'Neon DB PostgreSQL', 'solvex-crystal-clear-black-box'],
    features: [
      'Instant PayPal digital order capture and webhook handling',
      'Automated cryptographic digital license issuance',
      'Non-custodial escrow milestone release triggers',
      'IRS 1099-DA automated compliance audit trail'
    ],
    badge: 'FinTech Protocol',
    iconName: 'BarChart3',
    specs: {
      'Repository': 'github.com/solvex-paradox-box/solvex-paypal-escrow',
      'Delivery Format': 'REST API Gateway & React Checkout Drop-In Component',
      'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
      'Settlement Speed': 'Instant (< 2.1s PayPal Capture)'
    }
  }
];

export const INITIAL_ORDERS: PurchaseOrder[] = [];

export const INITIAL_SHIPMENTS: Shipment[] = [];

export const INITIAL_ERP_INTEGRATIONS: ERPIntegration[] = [
  {
    id: 'erp-0',
    name: 'Neon PostgreSQL (GitHub Integration Sync)',
    category: 'Database Ledger',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 124800,
    icon: 'Database'
  },
  {
    id: 'erp-1',
    name: 'Solvex Crystal Clear Black Box Engine',
    category: 'JIT Distribution',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 88400,
    icon: 'Zap'
  },
  {
    id: 'erp-2',
    name: 'uarefake.space AI Registry & Control Board',
    category: 'Control Board',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 42100,
    icon: 'Server'
  },
  {
    id: 'erp-gh',
    name: 'GitHub Registry & Actions CI/CD Pipeline',
    category: 'Repository',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 56900,
    icon: 'Cloud'
  },
  {
    id: 'erp-3',
    name: 'SAP S/4HANA Enterprise Cloud',
    category: 'ERP',
    status: 'Connected',
    lastSync: '2 mins ago',
    totalEventsProcessed: 14280,
    icon: 'Database'
  },
  {
    id: 'erp-4',
    name: 'Oracle NetSuite OneWorld',
    category: 'ERP',
    status: 'Connected',
    lastSync: '1 min ago',
    totalEventsProcessed: 9840,
    icon: 'Layers'
  }
];
