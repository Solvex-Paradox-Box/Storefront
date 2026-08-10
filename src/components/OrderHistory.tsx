import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, Truck, ShieldCheck, ArrowRight, DollarSign, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PurchaseOrder } from '../types';

interface OrderHistoryProps {
  orders: PurchaseOrder[];
  onOpenPaypalForPo: (po: PurchaseOrder) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onOpenPaypalForPo }) => {
  const [expandedPoId, setExpandedPoId] = useState<string | null>(orders[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedPoId(prev => (prev === id ? null : id));
  };

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Completed</span>;
      case 'In Transit':
        return <span className="bg-sky-950 text-sky-300 border border-sky-800 text-xs px-2.5 py-0.5 rounded-full font-medium">In Transit</span>;
      case 'Paid & Processing':
        return <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Paid & Processing</span>;
      case 'Payment Pending':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Payment Pending</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">Purchase Orders Ledger</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Audit logs, PayPal payment receipts, and cross-platform fulfillment statuses for all corporate procurement orders.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            TOTAL ORDERS: {orders.length}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((po) => {
          const isExpanded = expandedPoId === po.id;
          return (
            <div
              key={po.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all shadow-lg"
            >
              {/* Order Row Header */}
              <div
                onClick={() => toggleExpand(po.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-indigo-400 text-sm">{po.poNumber}</span>
                    {getStatusBadge(po.status)}
                  </div>
                  <h3 className="font-bold text-white text-base">{po.title}</h3>
                  <p className="text-xs text-slate-400">
                    Supplier: <span className="text-slate-200 font-medium">{po.supplierName || 'Global Supplier Network'}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-white">
                      ${po.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {po.quantity} Units @ ${po.unitPrice}/unit
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expandable Order Details & Logs */}
              {isExpanded && (
                <div className="bg-slate-950 p-6 border-t border-slate-800/80 space-y-6 text-xs text-slate-300">
                  {/* Summary Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Shipping Terminal</span>
                      <span className="font-semibold text-slate-200">{po.shippingAddress}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Assigned Freight Carrier</span>
                      <span className="font-semibold text-slate-200">{po.carrier || 'Pending Dispatch'}</span>
                      {po.trackingNumber && (
                        <div className="font-mono text-cyan-400 text-[11px] mt-0.5">{po.trackingNumber}</div>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">PayPal Settlement</span>
                      {po.paypalPaymentStatus === 'COMPLETED' ? (
                        <div className="space-y-0.5 mt-0.5">
                          <span className="text-emerald-400 font-bold flex items-center space-x-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>VERIFIED ({po.paypalOrderId})</span>
                          </span>
                          <div className="text-[10px] text-slate-400">{po.paypalPayerEmail}</div>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPaypalForPo(po);
                            }}
                            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 transition-all"
                          >
                            <span>PayPal Settle Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Audit Event Log */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                      Automated Cross-Platform Audit Trail
                    </h4>

                    <div className="space-y-1.5 font-mono">
                      {po.logs.map((log, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60 text-[11px]"
                        >
                          <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                          <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-amber-400' : 'text-slate-300'}>
                            {log.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
