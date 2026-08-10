import React, { useState } from 'react';
import { Network, Cpu, Truck, Layers, FileText, CheckCircle, Search, ShieldCheck, Lock, Unlock, Globe } from 'lucide-react';
import { DomainGuideModal } from './DomainGuideModal';

interface HeaderProps {
  activeTab: 'catalog' | 'procurement' | 'logistics' | 'integrations' | 'orders';
  setActiveTab: (tab: 'catalog' | 'procurement' | 'logistics' | 'integrations' | 'orders') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  ordersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  ordersCount
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
                Autonomous B2B Network • Updated via uarefake.space AI Registry
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
                placeholder="Search 210+ paradox solutions, RFQs, carriers, or templates..."
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Status & Domain Guide */}
          <div className="flex items-center space-x-2.5">
            {/* uarefake.space AI Registry Status */}
            <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>uarefake.space AI Registry Active</span>
            </div>

            {/* Domain Setup Button */}
            <button
              onClick={() => setDomainModalOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-800/80 text-indigo-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>uarefake.com DNS</span>
            </button>

            {/* PayPal Status */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
              <span className="font-semibold text-sky-400">PayPal B2B</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 border-t border-slate-800/80 overflow-x-auto py-1 scrollbar-none">
          <button
            id="tab-catalog"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-indigo-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Marketplace Solutions</span>
          </button>

          <button
            id="tab-procurement"
            onClick={() => setActiveTab('procurement')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'procurement'
                ? 'bg-indigo-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI Procurement Agent</span>
          </button>

          <button
            id="tab-logistics"
            onClick={() => setActiveTab('logistics')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'logistics'
                ? 'bg-indigo-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Cross-Platform Logistics</span>
          </button>

          <button
            id="tab-integrations"
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'integrations'
                ? 'bg-indigo-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>ERP & API Adapters</span>
          </button>

          <button
            id="tab-orders"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap relative ${
              activeTab === 'orders'
                ? 'bg-indigo-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Purchase Orders</span>
            {ordersCount > 0 && (
              <span className="ml-1 bg-indigo-500/40 text-indigo-200 text-xs px-1.5 py-0.2 rounded-full border border-indigo-400/30">
                {ordersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <DomainGuideModal
        isOpen={domainModalOpen}
        onClose={() => setDomainModalOpen(false)}
      />
    </header>
  );
};
