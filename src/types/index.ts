export interface SolutionItem {
  id: string;
  itemType: 'Paradox Solution' | 'Autonomous Business Template';
  title: string;
  category: 'Procurement AI' | 'Logistics Automation' | 'Customs & Compliance' | 'Supply Chain IoT' | 'ERP Connector' | 'Autonomous Operations' | 'FinTech & Settlement' | 'Global Trade Agent';
  description: string;
  fullDescription: string;
  paradoxResolution?: string;
  price: number; // in USD
  pricingModel: 'One-time' | 'Monthly Subscription' | 'Per-Transaction Fee' | 'Annual Enterprise';
  rating: number;
  reviewsCount: number;
  vendor: string;
  integrationPlatforms: string[];
  features: string[];
  badge?: string;
  iconName: string;
  specs: Record<string, string>;
}

export interface SupplierBid {
  id: string;
  supplierName: string;
  rating: number;
  unitPrice: number;
  totalPrice: number;
  estimatedDays: number;
  shippingCarrier: string;
  complianceScore: number;
  aiRecommendationScore: number; // 0 to 100
  notes: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  title: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: 'Draft' | 'RFQ Sent' | 'Bids Received' | 'Approved' | 'Payment Pending' | 'Paid & Processing' | 'In Transit' | 'Completed' | 'Cancelled';
  supplierName?: string;
  shippingAddress: string;
  destinationPort: string;
  carrier?: string;
  trackingNumber?: string;
  createdAt: string;
  paypalOrderId?: string;
  paypalPaymentStatus?: 'APPROVED' | 'COMPLETED' | 'PENDING';
  paypalPayerEmail?: string;
  logs: { timestamp: string; message: string; type: 'info' | 'success' | 'warning' }[];
}

export interface Shipment {
  id: string;
  poId: string;
  trackingNumber: string;
  carrier: 'FedEx' | 'DHL Freight' | 'Maersk Line' | 'DB Schenker' | 'UPS Supply Chain';
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  status: 'In Transit' | 'Dispatched' | 'In Port' | 'Customs Clearance' | 'Out for Delivery' | 'Delivered';
  transportMode: 'Ocean Freight' | 'Air Cargo' | 'Road Transport' | 'Rail Express';
  temperatureTelemetry?: string;
  gpsCoordinates: { lat: number; lng: number };
  milestones: { title: string; date: string; location: string; completed: boolean }[];
}

export interface ERPIntegration {
  id: string;
  name: string;
  category: 'ERP' | 'CRM' | 'WMS' | 'Supply Chain';
  status: 'Connected' | 'Syncing' | 'Disconnected' | 'Error';
  lastSync: string;
  totalEventsProcessed: number;
  icon: string;
}

export interface ProcurementAiRequest {
  prompt: string;
  targetBudget?: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  destination: string;
}

export interface ProcurementAiResponse {
  poTitle: string;
  summary: string;
  itemDescription: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
  estimatedTotal: number;
  recommendedSuppliers: SupplierBid[];
  logisticsAdvice: string;
  riskAssessment: string;
}
