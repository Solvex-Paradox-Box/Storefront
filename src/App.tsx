import React, { useState, useEffect } from 'react';
import { Header, ActiveTabType, DomainMode } from './components/Header';
import { SolutionCatalog } from './components/SolutionCatalog';
import { ProcurementDesk } from './components/ProcurementDesk';
import { LogisticsHub } from './components/LogisticsHub';
import { IntegrationsPanel } from './components/IntegrationsPanel';
import { OrderHistory } from './components/OrderHistory';
import { CompanyNodeTracker } from './components/CompanyNodeTracker';
import { AppForgeBuilder } from './components/AppForgeBuilder';
import { BlackBoxAudit } from './components/BlackBoxAudit';
import { RfqMarketplace } from './components/RfqMarketplace';
import { CognitiveBrainHub } from './components/CognitiveBrainHub';
import { SovereignAuthModal } from './components/SovereignAuthModal';
import { ProtectedControlView } from './components/ProtectedControlView';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { PayPalCheckoutModal } from './components/PayPalCheckoutModal';
import { SolutionItem, PurchaseOrder, Shipment, ERPIntegration } from './types';
import { INITIAL_SOLUTIONS, INITIAL_ORDERS, INITIAL_SHIPMENTS, INITIAL_ERP_INTEGRATIONS } from './data/solvexData';
import { CompanyNode, INITIAL_COMPANY_NODES, generate380CharHeader } from './utils/nodeHeader';
import { Shield, ShoppingBag, Globe, ArrowRight, Brain, Server, CheckCircle2, Lock } from 'lucide-react';

export default function App() {
  // Domain mode: .com (User Storefront) vs .space (Admin Control Plane)
  const [domainMode, setDomainMode] = useState<DomainMode>(() => {
    try {
      if (typeof window !== 'undefined') {
        const host = window.location.hostname.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        if (host.includes('space') || hash.includes('space') || search.includes('space')) {
          return 'space';
        }
      }
      return (localStorage.getItem('solvex_domain_mode') as DomainMode) || 'com';
    } catch {
      return 'com';
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTabType>(() => {
    return domainMode === 'space' ? 'brain' : 'catalog';
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [solutions, setSolutions] = useState<SolutionItem[]>(INITIAL_SOLUTIONS);
  const [orders, setOrders] = useState<PurchaseOrder[]>(INITIAL_ORDERS);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [integrations, setIntegrations] = useState<ERPIntegration[]>(INITIAL_ERP_INTEGRATIONS);
  const [companyNodes, setCompanyNodes] = useState<CompanyNode[]>(INITIAL_COMPANY_NODES);

  // Sovereign Trustee Master Authorization
  const [isMasterAdmin, setIsMasterAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('solvex_master_auth_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleDomainModeChange = (mode: DomainMode) => {
    setDomainMode(mode);
    try {
      localStorage.setItem('solvex_domain_mode', mode);
    } catch {}
  };

  const handleAuthenticateMaster = (success: boolean) => {
    if (success) {
      setIsMasterAdmin(true);
      try {
        localStorage.setItem('solvex_master_auth_v1', 'true');
      } catch {}
      addToast({
        title: 'Sovereign Trustee Verified',
        message: 'Master control board on uarefake.space is unlocked.',
        type: 'success'
      });
    }
  };

  const handleLockMaster = () => {
    setIsMasterAdmin(false);
    try {
      localStorage.removeItem('solvex_master_auth_v1');
    } catch {}
    addToast({
      title: 'Console Locked',
      message: 'Switched to Public Viewer mode. .space controls are sealed.',
      type: 'info'
    });
  };

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // PayPal Checkout Modal state
  const [paypalModalOpen, setPaypalModalOpen] = useState(false);
  const [itemToPay, setItemToPay] = useState<SolutionItem | null>(null);
  const [poToPay, setPoToPay] = useState<PurchaseOrder | null>(null);

  const addToast = (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = {
      ...toast,
      id,
      timestamp: new Date().toLocaleTimeString()
    };

    setToasts(prev => [newToast, ...prev]);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

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

  const handleAddNode = (newNode: CompanyNode) => {
    setCompanyNodes(prev => [...prev, newNode]);
    addToast({
      title: 'Company Device Node Provisioned',
      message: `Node ${newNode.nodeNumber} assigned for ${newNode.deviceName} (${newNode.location}).`,
      type: 'success',
      nodeHeader: newNode.companyMainHeader,
      nodeNumber: newNode.nodeNumber
    });
  };

  const handleForgeDeploy = (appName: string, nodeHeader: string, newNode: CompanyNode) => {
    setCompanyNodes(prev => [...prev, newNode]);

    // Create PO for forged software
    const forgePo: PurchaseOrder = {
      id: `po-forge-${Date.now()}`,
      poNumber: `PO-FORGE-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `Daisy App Forge: ${appName}`,
      itemDescription: `Custom JIT Application Package Compiled & Deployed`,
      quantity: 1,
      unitPrice: 0,
      totalAmount: 0,
      currency: 'USD',
      status: 'Completed',
      supplierName: 'Daisy Haminja App Forge Engine',
      shippingAddress: 'uarefake.space Edge Control Plane',
      destinationPort: newNode.location,
      carrier: 'Solvex JIT Auto-Deploy',
      trackingNumber: `380CHAR-${newNode.nodeNumber}`,
      createdAt: new Date().toISOString(),
      logs: [
        { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: `Forged software deployed to ${newNode.nodeNumber} with 380-character header.`, type: 'success' }
      ]
    };

    setOrders(prev => [forgePo, ...prev]);

    addToast({
      title: 'Daisy App Forge Deployment Successful!',
      message: `Forged application "${appName}" deployed to ${newNode.nodeNumber} (${newNode.deviceName}).`,
      type: 'success',
      nodeHeader: nodeHeader,
      nodeNumber: newNode.nodeNumber
    });
  };

  const handleProcurementOrderFinalized = (newPo: PurchaseOrder) => {
    setOrders(prev => [newPo, ...prev]);

    // Generate node header for new PO
    const nextNodeNum = `NODE-${String(companyNodes.length + 1).padStart(2, '0')}`;
    const header380 = generate380CharHeader(nextNodeNum);

    // Auto create company node for order
    const autoNode: CompanyNode = {
      id: `node-po-${Date.now()}`,
      nodeNumber: nextNodeNum,
      companyName: 'uarefake.com Enterprise Core',
      companyMainHeader: header380,
      deviceName: `Procurement Node (${newPo.title})`,
      location: newPo.destinationPort || 'Production Cluster',
      assignedSoftware: newPo.title,
      poId: newPo.id,
      status: 'Active',
      lastPing: 'Just now',
      ipAddress: `10.240.0.${30 + companyNodes.length}`
    };

    setCompanyNodes(prev => [...prev, autoNode]);

    // Trigger Toast
    addToast({
      title: 'Procurement Order Finalized!',
      message: `Purchase Order ${newPo.poNumber} finalized ($${newPo.totalAmount.toLocaleString()} USD). Software assigned to ${nextNodeNum}.`,
      type: 'success',
      nodeHeader: header380,
      nodeNumber: nextNodeNum
    });
  };

  const handlePaymentSuccess = ({ orderId, payerEmail }: { orderId: string; payerEmail: string }) => {
    const nextNodeNum = `NODE-${String(companyNodes.length + 1).padStart(2, '0')}`;
    const nodeHeader380 = generate380CharHeader(nextNodeNum);

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
          { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: `PayPal payment captured ($${itemToPay.price}). 380-char header assigned to ${nextNodeNum}.`, type: 'success' }
        ]
      };

      setOrders(prev => [solutionPo, ...prev]);

      // Register company node
      const purchasedNode: CompanyNode = {
        id: `node-pay-${Date.now()}`,
        nodeNumber: nextNodeNum,
        companyName: 'uarefake.com Enterprise Core',
        companyMainHeader: nodeHeader380,
        deviceName: `${itemToPay.title} Node Station`,
        location: 'uarefake.com Cloud Gateway',
        assignedSoftware: itemToPay.title,
        poId: solutionPo.id,
        status: 'Active',
        lastPing: 'Just now',
        ipAddress: `10.240.0.${35 + companyNodes.length}`
      };

      setCompanyNodes(prev => [...prev, purchasedNode]);

      // Trigger Toast Notification
      addToast({
        title: 'PayPal Payment Processed Successfully!',
        message: `Captured $${itemToPay.price.toFixed(2)} USD via PayPal for ${itemToPay.title}. Assigned to ${nextNodeNum}.`,
        type: 'success',
        nodeHeader: nodeHeader380,
        nodeNumber: nextNodeNum
      });
    } else if (poToPay) {
      refreshOrdersAndShipments();

      addToast({
        title: 'PayPal Settlement Completed!',
        message: `Payment captured for Purchase Order ${poToPay.poNumber}. Verification token dispatched.`,
        type: 'success',
        nodeHeader: nodeHeader380,
        nodeNumber: nextNodeNum
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      {/* Year 21010 Quantum Scanline & Matrix Backdrop */}
      <div className="fixed inset-0 grid-matrix-21010 opacity-70 pointer-events-none z-0" />
      <div className="fixed inset-0 scanline-overlay z-40 pointer-events-none opacity-30" />

      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

      {/* Top Header with Domain Switcher */}
      <Header
        domainMode={domainMode}
        setDomainMode={handleDomainModeChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ordersCount={orders.length}
        nodesCount={companyNodes.length}
        isMasterAdmin={isMasterAdmin}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLockAdmin={handleLockMaster}
      />

      {/* Domain Mode Context Indicator Banner */}
      <div className={`border-b py-2 px-4 text-xs font-mono transition-colors ${
        domainMode === 'com' 
          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
          : 'bg-purple-950/40 border-purple-900/50 text-purple-300'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {domainMode === 'com' ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong className="text-white">YouAreFake.com (uarefake.com)</strong> — <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/40">● LIVE IN PRODUCTION</span> Customer Storefront, 128 B2B Solutions, Instant PayPal Checkout & Key Auto-Provisioning
                </span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong className="text-white">uarefake.space</strong> — Admin & Sovereign Control Plane (88 Paradoxes, Daisy Forge, 380 Ledger, Sentinel Suite)
                </span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[11px] opacity-75">Status: Operational (Zero Latency)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* USER FRONT STORE (.COM) TABS                                              */}
        {/* ========================================================================= */}

        {activeTab === 'catalog' && (
          <SolutionCatalog
            solutions={solutions}
            searchQuery={searchQuery}
            onSelectSolutionForPurchase={handleOpenPaypalForSolution}
            onCustomItemAdded={(newItem) => setSolutions(prev => [newItem, ...prev])}
          />
        )}

        {activeTab === 'rfq' && (
          <RfqMarketplace
            onOrderCreated={handleProcurementOrderFinalized}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {activeTab === 'procurement' && (
          <ProcurementDesk
            onOrderCreated={handleProcurementOrderFinalized}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {activeTab === 'logistics' && (
          <LogisticsHub
            shipments={shipments}
          />
        )}

        {activeTab === 'orders' && (
          <OrderHistory
            orders={orders}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {/* ========================================================================= */}
        {/* ADMIN & SOVEREIGN CONTROL PLANE (.SPACE) TABS                             */}
        {/* ========================================================================= */}

        {activeTab === 'brain' && (
          isMasterAdmin ? (
            <CognitiveBrainHub />
          ) : (
            <ProtectedControlView
              title="88 Solved Paradoxes & Cognitive Brain Hub"
              moduleName="Cognitive Axiom Engine & Sentinel Suite"
              description="Chamber proofs, mathematical axiom matrices, and Sentinel Pre-Flight verification on uarefake.space require Sovereign Trustee authorization."
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'forge' && (
          isMasterAdmin ? (
            <AppForgeBuilder
              onDeployApp={handleForgeDeploy}
            />
          ) : (
            <ProtectedControlView
              title="Daisy AI App Forge Compiler"
              moduleName="Post-Agentic JIT Engine"
              description="JIT compilation, bytecode distribution, and automated Node assignments on uarefake.space are restricted to the Sovereign Trustee."
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'blackbox' && (
          isMasterAdmin ? (
            <BlackBoxAudit
              nodes={companyNodes}
            />
          ) : (
            <ProtectedControlView
              title="380-Byte Cryptographic Consensus Audit"
              moduleName="Black Box Memory Ledger"
              description="Cryptographic hash integrity, intrusion verification, and tamperproof telemetry on uarefake.space require Trustee clearance."
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'nodes' && (
          isMasterAdmin ? (
            <CompanyNodeTracker
              nodes={companyNodes}
              onAddNode={handleAddNode}
            />
          ) : (
            <ProtectedControlView
              title="380-Char Node Fleet Registry"
              moduleName="Hardware Node Registry (::NODE-01..03)"
              description="Live device node commands, 380-character cryptographic header rotation, and IP telemetry on uarefake.space are restricted to the Trustee."
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'integrations' && (
          isMasterAdmin ? (
            <IntegrationsPanel
              integrations={integrations}
              onSyncTriggered={(id) => {
                fetch('/api/integrations')
                  .then(res => res.json())
                  .then(data => Array.isArray(data) && setIntegrations(data));
              }}
            />
          ) : (
            <ProtectedControlView
              title="ERP & Webhook Integrations"
              moduleName="Enterprise Adapters (SAP, Oracle, NetSuite)"
              description="Live SAP, Oracle, and NetSuite production API credentials on uarefake.space require Trustee authorization."
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          )
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

      {/* Sovereign Master Trustee Auth Modal */}
      <SovereignAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateMaster}
        isAuthenticated={isMasterAdmin}
        onLock={handleLockMaster}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-16 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Solvex Autonomous B2B Network</span>
            <span>• Cross-Platform Storefront (<span className="text-blue-400 font-mono">uarefake.com</span>) & Admin Control (<span className="text-purple-400 font-mono">uarefake.space</span>)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Powered by PayPal B2B Settlement</span>
            <span>•</span>
            <span className="text-indigo-300 font-medium font-mono">dAIsy haMINJA Sentinel Intelligence Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
