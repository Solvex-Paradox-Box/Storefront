import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SolutionCatalog } from './components/SolutionCatalog';
import { ProcurementDesk } from './components/ProcurementDesk';
import { LogisticsHub } from './components/LogisticsHub';
import { IntegrationsPanel } from './components/IntegrationsPanel';
import { OrderHistory } from './components/OrderHistory';
import { PayPalCheckoutModal } from './components/PayPalCheckoutModal';
import { SolutionItem, PurchaseOrder, Shipment, ERPIntegration } from './types';
import { INITIAL_SOLUTIONS, INITIAL_ORDERS, INITIAL_SHIPMENTS, INITIAL_ERP_INTEGRATIONS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'procurement' | 'logistics' | 'integrations' | 'orders'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');

  const [solutions, setSolutions] = useState<SolutionItem[]>(INITIAL_SOLUTIONS);
  const [orders, setOrders] = useState<PurchaseOrder[]>(INITIAL_ORDERS);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [integrations, setIntegrations] = useState<ERPIntegration[]>(INITIAL_ERP_INTEGRATIONS);

  // PayPal Checkout Modal state
  const [paypalModalOpen, setPaypalModalOpen] = useState(false);
  const [itemToPay, setItemToPay] = useState<SolutionItem | null>(null);
  const [poToPay, setPoToPay] = useState<PurchaseOrder | null>(null);

  // Initial backend fetch
  useEffect(() => {
    fetch('/api/solutions')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setSolutions(data))
      .catch(() => {});

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setOrders(data))
      .catch(() => {});

    fetch('/api/shipments')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setShipments(data))
      .catch(() => {});

    fetch('/api/integrations')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setIntegrations(data))
      .catch(() => {});
  }, []);

  const refreshOrdersAndShipments = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setOrders(data))
      .catch(() => {});

    fetch('/api/shipments')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setShipments(data))
      .catch(() => {});
  };

  const handleOpenPaypalForSolution = (item: SolutionItem) => {
    setItemToPay(item);
    setPoToPay(null);
    setPaypalModalOpen(true);
  };

  const handleOpenPaypalForPo = (po: PurchaseOrder) => {
    setPoToPay(po);
    setItemToPay(null);
    setPaypalModalOpen(true);
  };

  const handlePaymentSuccess = ({ orderId, payerEmail }: { orderId: string; payerEmail: string }) => {
    if (itemToPay) {
      // Create a Purchase Order for the purchased solution item
      const solutionPo: PurchaseOrder = {
        id: `po-sol-${Date.now()}`,
        poNumber: `PO-SOL-${Math.floor(1000 + Math.random() * 9000)}`,
        title: itemToPay.title,
        itemDescription: `License Deployment (${itemToPay.pricingModel})`,
        quantity: 1,
        unitPrice: itemToPay.price,
        totalAmount: itemToPay.price,
        currency: 'USD',
        status: 'In Transit',
        supplierName: itemToPay.vendor,
        shippingAddress: 'Cloud Deployment Container Endpoint',
        destinationPort: 'API Cloud Instance',
        carrier: 'Solvex Instant Auto-Provisioning',
        trackingNumber: `SOLVEX-KEY-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        paypalOrderId: orderId,
        paypalPaymentStatus: 'COMPLETED',
        paypalPayerEmail: payerEmail,
        logs: [
          { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: `PayPal payment captured ($${itemToPay.price}). License key deployed.`, type: 'success' }
        ]
      };
      setOrders(prev => [solutionPo, ...prev]);
    } else if (poToPay) {
      refreshOrdersAndShipments();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ordersCount={orders.length}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && (
          <SolutionCatalog
            solutions={solutions}
            searchQuery={searchQuery}
            onSelectSolutionForPurchase={handleOpenPaypalForSolution}
            onCustomItemAdded={(newItem) => setSolutions(prev => [newItem, ...prev])}
          />
        )}

        {activeTab === 'procurement' && (
          <ProcurementDesk
            onOrderCreated={(newPo) => setOrders(prev => [newPo, ...prev])}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {activeTab === 'logistics' && (
          <LogisticsHub
            shipments={shipments}
          />
        )}

        {activeTab === 'integrations' && (
          <IntegrationsPanel
            integrations={integrations}
            onSyncTriggered={(id) => {
              fetch('/api/integrations')
                .then(res => res.json())
                .then(data => Array.isArray(data) && setIntegrations(data));
            }}
          />
        )}

        {activeTab === 'orders' && (
          <OrderHistory
            orders={orders}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}
      </main>

      {/* PayPal Checkout Modal */}
      <PayPalCheckoutModal
        isOpen={paypalModalOpen}
        onClose={() => setPaypalModalOpen(false)}
        itemToPay={itemToPay}
        poToPay={poToPay}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-16 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Solvex Autonomous B2B Network</span>
            <span>• Cross-Platform Procurement & Logistics Hub</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Powered by PayPal B2B Settlement</span>
            <span>•</span>
            <span>Gemini AI Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
