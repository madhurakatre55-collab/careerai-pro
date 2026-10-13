import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Crown, 
  Building2, 
  Tag, 
  AlertCircle 
} from 'lucide-react';

export default function PricingModal({ isOpen, onClose, student, onUpgradeSuccess }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const isPro = student?.subscription_tier === 'pro';

  const monthlyPrice = 299;
  const annualBasePrice = 1999;
  
  let currentBase = billingCycle === 'annual' ? annualBasePrice : monthlyPrice;
  let discountAmount = promoApplied ? Math.round(currentBase * 0.5) : 0;
  let finalPrice = currentBase - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LAUNCH50') {
      setPromoApplied(true);
      setErrorMsg(null);
    } else {
      setErrorMsg('Invalid promo code. Try "LAUNCH50" for 50% off!');
    }
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/billing/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: student?.id || 'student-user-001',
          plan: billingCycle === 'annual' ? 'pro_annual' : 'pro_monthly',
          payment_method: paymentMethod,
          promo_code: promoApplied ? 'LAUNCH50' : ''
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment processing failed');
      }

      if (onUpgradeSuccess) {
        onUpgradeSuccess(data.student, data.invoice);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-inner">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Upgrade to CareerAI Pro</h2>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  SaaS Edition
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Unlock autonomous AI career guidance, 32-D deep neural matching, and interview accelerators
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Billing Cycle Switch */}
          <div className="flex items-center justify-center space-x-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-indigo-600 transition-colors"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center space-x-1.5">
              <span className={`text-xs font-semibold ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded-full">
                SAVE 45%
              </span>
            </div>
          </div>

          {/* Plan Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Free Plan */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-slate-200">Basic Tier</h3>
                  <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">Free Forever</span>
                </div>
                <div className="text-2xl font-black text-white mb-3">₹0</div>
                <ul className="space-y-2 text-slate-400 text-[11px]">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>Basic Academic Profiling</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>Top 2 Career Path Matches</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>3 AI Mentor messages per day</span></li>
                  <li className="flex items-center space-x-2 text-slate-600"><X className="w-3.5 h-3.5 shrink-0" /><span>Stage 2 Deep Neural Network Insights</span></li>
                  <li className="flex items-center space-x-2 text-slate-600"><X className="w-3.5 h-3.5 shrink-0" /><span>Detailed Skill Gap Roadmap Checklists</span></li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-slate-500 text-[10px] text-center">
                Current baseline account
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-5 rounded-2xl border-2 border-indigo-500/80 bg-indigo-950/30 relative shadow-lg flex flex-col justify-between">
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
                MOST POPULAR
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
                    <span>CareerAI Pro</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h3>
                  <span className="text-[10px] font-bold bg-indigo-900/60 border border-indigo-700 text-indigo-300 px-2 py-0.5 rounded-md">
                    {billingCycle === 'annual' ? 'Billed Annually' : 'Billed Monthly'}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-3xl font-black text-white">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400">
                    /{billingCycle === 'annual' ? 'year' : 'month'}
                  </span>
                  {promoApplied && (
                    <span className="text-xs line-through text-slate-500 font-semibold">
                      ₹{currentBase.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-indigo-400 font-bold shrink-0" /><span><strong>Unlimited 24/7 AI Mentor</strong> Guidance & Chat</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-indigo-400 font-bold shrink-0" /><span><strong>32-D Deep Neural Matching</strong> & Softmax Confidence</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-indigo-400 font-bold shrink-0" /><span><strong>Interactive Roadmap Checklists</strong> with Course Links</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-indigo-400 font-bold shrink-0" /><span><strong>Live Market Salary Diagnostics</strong> & Company Targeting</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-indigo-400 font-bold shrink-0" /><span><strong>Placement Mock Interview</strong> Question Bank</span></li>
                </ul>
              </div>

              {/* Promo Code Box */}
              <div className="mt-4 pt-3 border-t border-indigo-900/50">
                {!promoApplied ? (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code (try: LAUNCH50)"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="p-2 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-emerald-300 text-[11px] font-semibold flex items-center justify-between">
                    <span>✓ Promo "LAUNCH50" applied (50% OFF)</span>
                    <button
                      type="button"
                      onClick={() => setPromoApplied(false)}
                      className="text-slate-400 hover:text-white underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Select Payment Method:
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/30 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>Card (Visa/MC)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/30 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>UPI (GPay/PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/30 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>NetBanking / Wire</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 text-sm transition-all"
            >
              <span>
                {isProcessing
                  ? 'Processing Secure Checkout...'
                  : `Complete Payment (₹${finalPrice.toLocaleString('en-IN')}) & Unlock Pro`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              🔒 256-bit SSL encrypted checkout. 7-day no-questions-asked money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
