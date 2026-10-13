import React from 'react';
import { 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Award,
  Crown,
  Building2
} from 'lucide-react';

export default function BusinessModelPME({ businessData, onOpenPricing, onJumpToInstitutional }) {
  if (!businessData) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 shadow-xl">
        Loading SaaS Monetization Blueprint...
      </div>
    );
  }

  const {
    targetMarketSegments,
    valueProposition,
    revenueStreams,
    financialProjectionsYear1
  } = businessData;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-950/40">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                CareerAI Pro — Commercial SaaS Monetization & Growth Engine
              </h2>
              <span className="text-[10px] bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 font-bold">
                High Margin SaaS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Consumer B2C subscriptions (₹299/mo), Institutional B2B campus licensing (₹75k–₹2.5L), and unit economics
            </p>
          </div>
        </div>

        {onOpenPricing && (
          <button
            onClick={onOpenPricing}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
          >
            <Crown className="w-4 h-4 text-amber-200" />
            <span>Open Pricing Checkout</span>
          </button>
        )}
      </div>

      {/* Target Customer Segments & Market Opportunity */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
          <Target className="w-4 h-4 text-indigo-400" />
          <span>Market Opportunity & Addressable Customer Segments (TAM / SAM / SOM)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {targetMarketSegments?.map((seg, sIdx) => (
            <div key={sIdx} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
              <span className="text-[10px] text-indigo-400 uppercase font-mono font-bold tracking-wider">Market Segment {sIdx + 1}</span>
              <h4 className="text-xs font-bold text-white mt-1">{seg.segment}</h4>
              <p className="text-xs text-emerald-400 mt-2 font-bold">{seg.size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Unique Value Proposition Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
          <Award className="w-4 h-4 text-purple-400" />
          <span>Competitive Value Moat vs. Conventional Career Counseling</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <h4 className="font-bold text-indigo-400 mb-1">24/7 Availability at Zero Human Marginal Cost</h4>
            <p className="text-slate-300 leading-relaxed">{valueProposition?.availability}</p>
          </div>
          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <h4 className="font-bold text-emerald-400 mb-1">90% Radical Cost Advantage Over 1-on-1 Mentors</h4>
            <p className="text-slate-300 leading-relaxed">{valueProposition?.costAdvantage}</p>
          </div>
          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <h4 className="font-bold text-amber-400 mb-1">Continuous Live Labor Market Synchronization</h4>
            <p className="text-slate-300 leading-relaxed">{valueProposition?.realTimeAccuracy}</p>
          </div>
          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <h4 className="font-bold text-purple-400 mb-1">Closed-Loop Adaptive Placement Feedback</h4>
            <p className="text-slate-300 leading-relaxed">{valueProposition?.continuousRefinement}</p>
          </div>
        </div>
      </div>

      {/* Multi-Tier Scalable Revenue Model */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Multi-Tier Scalable Revenue Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {revenueStreams?.map((tier, tIdx) => {
            const isFeatured = tIdx === 1;

            return (
              <div
                key={tIdx}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-950/50'
                    : 'bg-slate-950/70 border border-slate-800'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full shadow-md">
                    Most Popular B2C
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold text-white">{tier.tier}</h4>
                  <div className="text-xl font-black text-emerald-400 my-2">{tier.price}</div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-slate-800">
                    {tier.features}
                  </p>
                </div>

                <div className="mt-6">
                  {tIdx === 1 ? (
                    <button
                      onClick={onOpenPricing}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center justify-center space-x-2"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-300" />
                      <span>Subscribe to Pro (₹299/mo)</span>
                    </button>
                  ) : tIdx === 2 ? (
                    <button
                      onClick={onJumpToInstitutional}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center justify-center space-x-2"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Get Campus License Quote</span>
                    </button>
                  ) : (
                    <button
                      onClick={onOpenPricing}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      Free Tier Active
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Projections Year 1 */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Year-1 Financial Projections & Unit Economics</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 text-center">
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">User Funnel</p>
            <p className="text-sm sm:text-base font-black text-white mt-1">{financialProjectionsYear1?.projectedUsers}</p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Paid Pro Subscribers</p>
            <p className="text-sm sm:text-base font-black text-indigo-400 mt-1">{financialProjectionsYear1?.payingSubscribers}</p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">B2B Partner Campuses</p>
            <p className="text-sm sm:text-base font-black text-purple-400 mt-1">{financialProjectionsYear1?.institutionalPartnerColleges}</p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Gross ARR (Year 1)</p>
            <p className="text-sm sm:text-base font-black text-emerald-400 mt-1">{financialProjectionsYear1?.estimatedGrossAnnualRevenue}</p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl col-span-2 md:col-span-1">
            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Operating Margin</p>
            <p className="text-sm sm:text-base font-black text-emerald-400 mt-1">{financialProjectionsYear1?.operatingMargin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
