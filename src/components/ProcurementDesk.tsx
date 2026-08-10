import React, { useState } from 'react';
import { Cpu, Send, RefreshCw, CheckCircle2, Shield, DollarSign, Truck, AlertTriangle, ArrowRight, Sparkles, FileCheck } from 'lucide-react';
import { ProcurementAiResponse, SupplierBid, PurchaseOrder } from '../types';

interface ProcurementDeskProps {
  onOrderCreated: (newPo: PurchaseOrder) => void;
  onOpenPaypalForPo: (po: PurchaseOrder) => void;
}

export const ProcurementDesk: React.FC<ProcurementDeskProps> = ({
  onOrderCreated,
  onOpenPaypalForPo
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [targetBudget, setTargetBudget] = useState<number | ''>('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [destinationPort, setDestinationPort] = useState('Port of Newark, NJ');
  
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiResult, setAiResult] = useState<ProcurementAiResponse | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierBid | null>(null);
  const [createdPo, setCreatedPo] = useState<PurchaseOrder | null>(null);

  const samplePrompts = [
    'Procure 300 heavy-duty hydraulic pump assemblies for oil rig maintenance, budget under $45,000.',
    'Order 50 industrial power inverter units (50kW) with expedited air freight to Chicago Terminal.',
    'Source 1,000 meters of stainless steel marine tubing with 3-day delivery and ISO 9001 compliance.'
  ];

  const handleRunAiProcurement = async (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput;
    if (!activePrompt.trim()) return;

    setLoadingAi(true);
    setAiResult(null);
    setCreatedPo(null);
    setSelectedSupplier(null);

    try {
      const res = await fetch('/api/gemini/procure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          targetBudget: targetBudget ? Number(targetBudget) : undefined,
          urgency,
          destination: destinationPort
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI procurement request failed');

      setAiResult(data);
      if (data.recommendedSuppliers && data.recommendedSuppliers.length > 0) {
        setSelectedSupplier(data.recommendedSuppliers[0]);
      }
    } catch (err: any) {
      console.error('Procurement error:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleCreatePurchaseOrder = async () => {
    if (!aiResult || !selectedSupplier) return;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aiResult.poTitle,
          itemDescription: aiResult.itemDescription,
          quantity: aiResult.estimatedQuantity,
          unitPrice: selectedSupplier.unitPrice,
          supplierName: selectedSupplier.supplierName,
          shippingAddress: `${destinationPort} Terminal Gate 3`,
          destinationPort,
          carrier: selectedSupplier.shippingCarrier
        })
      });

      const newPo = await res.json();
      setCreatedPo(newPo);
      onOrderCreated(newPo);
    } catch (err) {
      console.error('Create PO Error:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex items-start justify-between relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gemini Autonomous RFQ Engine</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Autonomous B2B Procurement Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              State your operational material requirements in plain language. Solvex Gemini AI parses technical specs, polls virtual suppliers, ranks bids, and prepares PayPal purchase orders automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Input Prompt Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Natural Language Procurement Prompt
        </label>
        
        <div className="relative">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            rows={3}
            placeholder="Describe what items or raw materials you need (e.g., 'Procure 200 industrial grade solar inverter controllers with sub-5 day delivery to Texas')..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-1 scrollbar-none">
          <span className="text-slate-400 font-semibold shrink-0">Try Sample:</span>
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(sample);
                handleRunAiProcurement(sample);
              }}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 rounded-lg px-2.5 py-1 text-[11px] truncate max-w-xs transition-all shrink-0"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Procurement Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Budget (USD)</label>
            <input
              type="number"
              value={targetBudget}
              onChange={(e) => setTargetBudget(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 50000"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Destination Logistics Port</label>
            <input
              type="text"
              value={destinationPort}
              onChange={(e) => setDestinationPort(e.target.value)}
              placeholder="Port or Logistics Terminal"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Fulfillment Urgency</label>
            <select
              value={urgency}
              onChange={(e: any) => setUrgency(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="Low">Low (Standard Freight)</option>
              <option value="Medium">Medium (Balanced)</option>
              <option value="High">High (Priority Air/Ocean)</option>
              <option value="Critical">Critical (Immediate Dispatch)</option>
            </select>
          </div>
        </div>

        {/* Trigger Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleRunAiProcurement()}
            disabled={loadingAi || !promptInput.trim()}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
          >
            {loadingAi ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Gemini AI Evaluating Suppliers & Bids...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Execute Autonomous RFQ & Bid Match</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Procurement Results */}
      {aiResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Box */}
          <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">{aiResult.poTitle}</h3>
              </div>
              <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800/80 px-2.5 py-1 rounded-full font-mono">
                QTY: {aiResult.estimatedQuantity} UNITS
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{aiResult.summary}</p>

            {/* Advice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <Truck className="w-4 h-4" />
                  <span>Logistics Strategy</span>
                </div>
                <p className="text-slate-300 text-[11px]">{aiResult.logisticsAdvice}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>AI Risk & Compliance Rating</span>
                </div>
                <p className="text-slate-300 text-[11px]">{aiResult.riskAssessment}</p>
              </div>
            </div>
          </div>

          {/* Bids Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Autonomous Supplier Bids Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiResult.recommendedSuppliers.map((sup) => {
                const isSelected = selectedSupplier?.id === sup.id;
                return (
                  <div
                    key={sup.id}
                    onClick={() => setSelectedSupplier(sup)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-950/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-100 text-sm">{sup.supplierName}</h4>
                      <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-md">
                        AI Score: {sup.aiRecommendationScore}/100
                      </span>
                    </div>

                    <div className="text-xl font-extrabold text-white mb-2">
                      ${sup.totalPrice.toLocaleString('en-US')}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        ($${sup.unitPrice}/unit)
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300 mb-3">
                      <div>Carrier: <span className="text-slate-100 font-medium">{sup.shippingCarrier}</span></div>
                      <div>Estimated Lead Time: <span className="text-slate-100 font-medium">{sup.estimatedDays} Days</span></div>
                      <div>Compliance Score: <span className="text-slate-100 font-medium">{sup.complianceScore}%</span></div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic border-t border-slate-800 pt-2">
                      "{sup.notes}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                {selectedSupplier && (
                  <div className="text-xs text-slate-300">
                    Selected: <span className="font-bold text-white">{selectedSupplier.supplierName}</span> (${selectedSupplier.totalPrice.toLocaleString()} USD)
                  </div>
                )}
              </div>

              {!createdPo ? (
                <button
                  onClick={handleCreatePurchaseOrder}
                  disabled={!selectedSupplier}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Generate Purchase Order (PO)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PO {createdPo.poNumber} Drafted</span>
                  </div>
                  <button
                    onClick={() => onOpenPaypalForPo(createdPo)}
                    className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <span>Settle with PayPal Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
