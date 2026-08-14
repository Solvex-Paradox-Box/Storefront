import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { X, ShieldCheck, CheckCircle2, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { SolutionItem, PurchaseOrder } from '../types';

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToPay?: SolutionItem | null;
  poToPay?: PurchaseOrder | null;
  onPaymentSuccess: (paypalDetails: { orderId: string; payerEmail: string }) => void;
}

export const PayPalCheckoutModal: React.FC<PayPalCheckoutModalProps> = ({
  isOpen,
  onClose,
  itemToPay,
  poToPay,
  onPaymentSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successPaid, setSuccessPaid] = useState(false);
  const [payerEmailInput, setPayerEmailInput] = useState('finance@solvex-b2b.com');
  const [simulatedSandbox, setSimulatedSandbox] = useState(false);

  if (!isOpen) return null;

  const title = itemToPay ? itemToPay.title : poToPay ? poToPay.title : 'B2B Procurement Item';
  const amount = itemToPay ? itemToPay.price : poToPay ? poToPay.totalAmount : 0;
  const description = itemToPay
    ? `Solvex Solution License: ${itemToPay.pricingModel}`
    : poToPay
    ? `Purchase Order ${poToPay.poNumber} Fulfillment`
    : 'B2B Settlement';

  const paypalClientId = 'sb'; // Default sandbox

  const handleCaptureOrder = async (orderId: string, email: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paypalOrderId: orderId,
          poId: poToPay?.id,
          payerEmail: email
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details || data.error || 'PayPal capture failed');
      }

      setSuccessPaid(true);
      setTimeout(() => {
        onPaymentSuccess({ orderId, payerEmail: email });
        onClose();
        setSuccessPaid(false);
      }, 1800);
    } catch (err: any) {
      console.error('Capture order error:', err);
      setErrorMsg(err.message || 'Failed to complete PayPal transaction.');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedExpressPay = async () => {
    const sandboxOrderId = `PP-EXPRESS-${Date.now()}`;
    await handleCaptureOrder(sandboxOrderId, payerEmailInput);
  };

  return (
    <div id="paypal-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-100 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/80">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 font-bold">
              PP
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">PayPal B2B Checkout</h3>
              <p className="text-xs text-slate-400">Secure Instant Settlement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {successPaid ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Payment Verified & Captured!</h4>
              <p className="text-sm text-slate-300">
                PayPal transaction finalized. Cross-platform logistics dispatch initiated automatically.
              </p>
            </div>
          ) : (
            <>
              {/* Order Details summary box */}
              <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Item Description</span>
                  <span className="font-mono text-slate-300">CURRENCY: USD</span>
                </div>
                <div className="font-medium text-slate-200 text-sm">{title}</div>
                <p className="text-xs text-slate-400">{description}</p>
                <div className="pt-2 border-t border-slate-700/60 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-slate-300">Total Settlement Amount</span>
                  <span className="text-2xl font-bold text-emerald-400">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Corporate Email input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Corporate PayPal Payer Email
                </label>
                <input
                  type="email"
                  value={payerEmailInput}
                  onChange={(e) => setPayerEmailInput(e.target.value)}
                  placeholder="finance@corporate.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              {errorMsg && (
                <div className="bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* PayPal Smart Buttons / Sandbox Component */}
              <div className="pt-2 space-y-3">
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', intent: 'capture' }}>
                  <div className="min-h-[120px] relative">
                    {loading && (
                      <div className="absolute inset-0 bg-slate-900/90 z-10 flex items-center justify-center rounded-xl space-x-2">
                        <RefreshCw className="w-5 h-5 text-sky-400 animate-spin" />
                        <span className="text-xs text-slate-300 font-medium">Communicating with PayPal...</span>
                      </div>
                    )}

                    {!simulatedSandbox ? (
                      <PayPalButtons
                        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
                        createOrder={async () => {
                          const res = await fetch('/api/paypal/create-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              poId: poToPay?.id,
                              amount,
                              description
                            })
                          });
                          const data = await res.json();
                          return data.id;
                        }}
                        onApprove={async (data) => {
                          await handleCaptureOrder(data.orderID, payerEmailInput);
                        }}
                        onError={(err) => {
                          console.error('PayPal Button Error:', err);
                          setSimulatedSandbox(true);
                        }}
                      />
                    ) : (
                      <button
                        onClick={handleSimulatedExpressPay}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Confirm Instant PayPal Sandbox Capture (${amount.toLocaleString()})</span>
                      </button>
                    )}
                  </div>
                </PayPalScriptProvider>

                {/* Direct Express Button for quick demo testing */}
                {!simulatedSandbox && (
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={handleSimulatedExpressPay}
                      className="text-xs text-slate-400 hover:text-sky-400 underline transition-colors"
                    >
                      Instant Test: Bypass SDK & Simulate PayPal Capture
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by PayPal 256-Bit SSL Encrypted B2B Gateway</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
