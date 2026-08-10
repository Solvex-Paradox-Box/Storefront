import React, { useState } from 'react';
import { SolutionItem } from '../types';
import { Cpu, Truck, ShieldCheck, Radio, Layers, BarChart3, Star, Check, ArrowRight, Zap, Info, Filter, Layers3, Briefcase, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { AddSolutionModal } from './AddSolutionModal';

interface SolutionCatalogProps {
  solutions: SolutionItem[];
  searchQuery: string;
  onSelectSolutionForPurchase: (item: SolutionItem) => void;
  onCustomItemAdded?: (item: SolutionItem) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
    case 'Truck': return <Truck className="w-6 h-6 text-emerald-400" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-indigo-400" />;
    case 'Radio': return <Radio className="w-6 h-6 text-rose-400" />;
    case 'Layers': return <Layers className="w-6 h-6 text-amber-400" />;
    case 'BarChart3': return <BarChart3 className="w-6 h-6 text-sky-400" />;
    default: return <Cpu className="w-6 h-6 text-indigo-400" />;
  }
};

export const SolutionCatalog: React.FC<SolutionCatalogProps> = ({
  solutions,
  searchQuery,
  onSelectSolutionForPurchase,
  onCustomItemAdded
}) => {
  const [selectedType, setSelectedType] = useState<'All' | 'Paradox Solution' | 'Autonomous Business Template'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeDetailItem, setActiveDetailItem] = useState<SolutionItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const itemsPerPage = 12;

  const categories = [
    'All',
    'Procurement AI',
    'Logistics Automation',
    'Customs & Compliance',
    'Supply Chain IoT',
    'ERP Connector',
    'Autonomous Operations',
    'FinTech & Settlement',
    'Global Trade Agent'
  ];

  const filteredSolutions = solutions.filter(sol => {
    const matchesType = selectedType === 'All' || sol.itemType === selectedType;
    const matchesCategory = selectedCategory === 'All' || sol.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sol.paradoxResolution && sol.paradoxResolution.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSolutions.length / itemsPerPage) || 1;
  const paginatedSolutions = filteredSolutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTypeChange = (type: 'All' | 'Paradox Solution' | 'Autonomous Business Template') => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Banner / Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Solvex Paradox Engine • 105 Solved Paradoxes & 105 Ready-to-Go Templates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Autonomous B2B Solutions & Business Templates Catalog
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Deploy 105 solutions featuring cryptographic paradox resolution and 105 turnkey autonomous business templates with real enterprise market pricing and native PayPal B2B settlement.
          </p>
        </div>
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        {/* Top Toggle: All vs 105 Paradox Solutions vs 105 Business Templates */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleTypeChange('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedType === 'All'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Items ({solutions.length})
            </button>
            <button
              onClick={() => handleTypeChange('Paradox Solution')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedType === 'Paradox Solution'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>105 Paradox Solutions</span>
            </button>
            <button
              onClick={() => handleTypeChange('Autonomous Business Template')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedType === 'Autonomous Business Template'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>105 Autonomous Templates</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-xs font-mono text-slate-400">
              Showing <span className="text-white font-bold">{filteredSolutions.length}</span> entries • <span className="text-emerald-400 font-semibold">uarefake.space AI Registry Sync</span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSolutions.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-950/30 group"
          >
            <div>
              {/* Item Top header */}
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl group-hover:bg-slate-800 transition-colors">
                  {getCategoryIcon(item.iconName)}
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                    item.itemType === 'Paradox Solution'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                  }`}>
                    {item.itemType === 'Paradox Solution' ? 'Paradox Solved' : 'Turnkey Template'}
                  </span>
                  {item.badge && (
                    <span className="bg-indigo-950 text-indigo-300 border border-indigo-800/60 text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mb-2">{item.vendor} • {item.category}</p>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                {item.description}
              </p>

              {/* Paradox Resolution Box when applicable */}
              {item.paradoxResolution && (
                <div className="bg-amber-500/5 border border-amber-500/20 p-2.5 rounded-xl text-[11px] text-amber-200/90 space-y-1 mb-3">
                  <span className="font-bold uppercase text-[9px] text-amber-400 block tracking-wider">
                    Paradox Resolution:
                  </span>
                  <p className="line-clamp-2">{item.paradoxResolution}</p>
                </div>
              )}

              {/* Features bullet list preview */}
              <div className="space-y-1.5 mb-4">
                {item.features.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Item Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-white">
                  ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{item.pricingModel}</div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveDetailItem(item)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-xl transition-all"
                  title="View Specs & Details"
                >
                  <Info className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectSolutionForPurchase(item)}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-sky-500/20"
                >
                  <span className="font-semibold text-xs">PayPal Buy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 p-2 rounded-xl border border-slate-700 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 text-xs font-bold rounded-xl transition-all ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 p-2 rounded-xl border border-slate-700 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Solution Detail Modal */}
      {activeDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setActiveDetailItem(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl">
                {getCategoryIcon(activeDetailItem.iconName)}
              </div>
              <div>
                <span className="text-xs text-indigo-400 font-medium uppercase">{activeDetailItem.category}</span>
                <h2 className="text-xl font-bold text-white">{activeDetailItem.title}</h2>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {activeDetailItem.fullDescription}
            </p>

            {activeDetailItem.paradoxResolution && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mb-6 space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Cryptographic Paradox Resolution
                </span>
                <p className="text-xs text-amber-200">{activeDetailItem.paradoxResolution}</p>
              </div>
            )}

            {/* Specifications Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
                {Object.entries(activeDetailItem.specs).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-slate-500 block">{key}</span>
                    <span className="text-slate-200 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Automation Features</h4>
              <ul className="space-y-2">
                {activeDetailItem.features.map((feat, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing & Checkout Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">${activeDetailItem.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <div className="text-xs text-slate-400">{activeDetailItem.pricingModel}</div>
              </div>

              <button
                onClick={() => {
                  const item = activeDetailItem;
                  setActiveDetailItem(null);
                  onSelectSolutionForPurchase(item);
                }}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-2"
              >
                <span>Checkout with PayPal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Item Modal */}
      <AddSolutionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={(newItem) => {
          if (onCustomItemAdded) {
            onCustomItemAdded(newItem);
          }
        }}
      />
    </div>
  );
};
