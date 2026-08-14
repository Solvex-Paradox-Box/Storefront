import React, { useState } from 'react';
import { Network, Cpu, Truck, Layers, FileText, CheckCircle, Search, ShieldCheck, Lock, Unlock, Globe, Server, Hammer, Eye, ShoppingBag, Shield, Key, Sparkles } from 'lucide-react';
import { DomainGuideModal } from './DomainGuideModal';

export type ActiveTabType = 'catalog' | 'forge' | 'blackbox' | 'rfq' | 'nodes' | 'procurement' | 'logistics' | 'integrations' | 'orders';

interface HeaderProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  ordersCount: number;
  nodesCount?: number;
  isMasterAdmin?: boolean;
  onOpenAuthModal?: () => void;
  onLockAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  ordersCount,
  nodesCount = 3,
  isMasterAdmin = false,
  onOpenAuthModal,
  onLockAdmin
}) => {
  const [domainModalOpen, setDomainModalOpen] = useState(false);

  return (
    <header id="solvex-header" className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">SOLVEX</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-700/50 font-mono font-medium">
                  uarefake.com
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Autonomous B2B Network • Integrated Execution Engine
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solutions, forged apps, RFQs, black box logs..."
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Status, Auth & Domain Guide */}
          <div className="flex items-center space-x-2.5">
            {/* Sovereign Trustee Gate Trigger */}
            {isMasterAdmin ? (
              <div className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-950 to-indigo-950 border border-purple-500/50 text-purple-200 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm">
                <span className="text-amber-400">👑</span>
                <span className="font-mono">Trustee: TJ</span>
                <button
                  onClick={onLockAdmin}
                  title="Lock Sovereign Console to Public View"
                  className="ml-1 p-0.5 hover:bg-purple-800/60 rounded text-purple-300 hover:text-white transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                title="Unlock Sovereign Control Board on uarefake.space"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Trustee Auth</span>
              </button>
            )}

            <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">uarefake.space Active</span>
              <span className="sm:hidden">.space</span>
            </div>

            <button
              onClick={() => setDomainModalOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-800/80 text-indigo-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Domain Setup</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs with Domain Category Distinctions */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 border-t border-slate-800/80 overflow-x-auto py-2 scrollbar-none">
          {/* .COM STOREFRONT SECTION */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            {/* Catalog */}
            <button
              onClick={() => setActiveTab('catalog')}
              title="[.com Storefront] Adjust public 210-item B2B solutions catalog, pricing & PayPal licensing"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 ring-1 ring-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-950/90 text-blue-300 border border-blue-700/50">
                .com
              </span>
              <Network className="w-3.5 h-3.5 text-blue-400" />
              <span>Solutions Catalog</span>
            </button>

            {/* RFQ */}
            <button
              onClick={() => setActiveTab('rfq')}
              title="[.com Storefront] Adjust public freelance & vendor RFQ proposals (Upwork, Fiverr, SAP, Oracle)"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'rfq'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30 ring-1 ring-amber-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-700/50">
                .com
              </span>
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>RFQ Bid Desk</span>
            </button>

            {/* AI Procurement */}
            <button
              onClick={() => setActiveTab('procurement')}
              title="[.com Storefront] Adjust proprietary AI quote generation & PO creation"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'procurement'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30 ring-1 ring-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-700/50">
                .com
              </span>
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Procurement</span>
            </button>

            {/* Logistics */}
            <button
              onClick={() => setActiveTab('logistics')}
              title="[.com Storefront] Adjust freight carrier tracking & container logistics"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'logistics'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700/50">
                .com
              </span>
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Logistics Hub</span>
            </button>

            {/* Orders */}
            <button
              onClick={() => setActiveTab('orders')}
              title="[.com Storefront] Adjust customer purchase orders & PayPal invoices"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap relative ${
                activeTab === 'orders'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30 ring-1 ring-sky-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-950/90 text-sky-300 border border-sky-700/50">
                .com
              </span>
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Orders & Billing</span>
              {ordersCount > 0 && (
                <span className="ml-1 bg-sky-900/90 text-sky-200 text-[10px] px-1.5 py-0.2 rounded-full border border-sky-400/40">
                  {ordersCount}
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-800 shrink-0 mx-1" />

          {/* .SPACE MASTER CONTROL BOARD & AI ENGINE SECTION */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            {/* Forge */}
            <button
              onClick={() => setActiveTab('forge')}
              title="[.space Control Board] AI compilation engine with integrated 23 Sovereign Infrastructure Solutions"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'forge'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30 ring-1 ring-purple-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-950/90 text-purple-300 border border-purple-700/50">
                .space
              </span>
              <Hammer className="w-3.5 h-3.5 text-purple-400" />
              <span>Daisy AI Forge</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>

            {/* Black Box Audit */}
            <button
              onClick={() => setActiveTab('blackbox')}
              title="[.space Control Board] 380-byte cryptographic consensus memory ledger & intrusion audit"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'blackbox'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30 ring-1 ring-teal-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-teal-950/90 text-teal-300 border border-teal-700/50">
                .space
              </span>
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span>Black Box Audit</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>

            {/* Node Fleet */}
            <button
              onClick={() => setActiveTab('nodes')}
              title="[.space Control Board] Manage hardware node deployments with 380-character cryptographic headers"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'nodes'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30 ring-1 ring-indigo-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-950/90 text-indigo-300 border border-indigo-700/50">
                .space
              </span>
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span>Node Fleet</span>
              <span className="ml-0.5 bg-indigo-950 text-indigo-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border border-indigo-700/60">
                NODE-0{nodesCount}
              </span>
            </button>

            {/* ERP Adapters */}
            <button
              onClick={() => setActiveTab('integrations')}
              title="[.space Control Board] Enterprise webhook bridges for SAP, Oracle & NetSuite"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'integrations'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-900/30 ring-1 ring-violet-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-violet-950/90 text-violet-300 border border-violet-700/50">
                .space
              </span>
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>ERP Bridges</span>
            </button>
          </div>
        </div>
      </div>

      <DomainGuideModal
        isOpen={domainModalOpen}
        onClose={() => setDomainModalOpen(false)}
      />
    </header>
  );
};


