import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Compass,
  Crown
} from 'lucide-react';

export default function HeroSection({ onStartAssessment, onExploreMarket, onOpenPricing }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 border border-slate-800/90 p-6 md:p-8 mb-8 shadow-xl">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center space-x-2 bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs px-3.5 py-1.5 rounded-full mb-4 font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Autonomous Career Intelligence & Placement Acceleration Platform</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mb-3">
          AI Career Intelligence & Placement Acceleration for Students & Universities
        </h1>

        <p className="text-slate-300 text-sm md:text-base max-w-3xl mb-6 leading-relaxed">
          Democratizing world-class career guidance for every student and college worldwide. 
          Using our 32-D Deep Multi-Layer Perceptron (MLP) neural matching engine to provide 
          instant job fit probability, automated curriculum skill-gap diagnostics, and 24/7 AI mentorship.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={onStartAssessment}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
          >
            <span>Start Free Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm px-4.5 py-2.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all"
            >
              <Crown className="w-4 h-4 text-amber-200" />
              <span>⭐ Upgrade to Pro (₹299/mo)</span>
            </button>
          )}

          <button
            onClick={onExploreMarket}
            className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Explore 2026 Labor Market</span>
          </button>
        </div>

        {/* Industry Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/80 border border-slate-800/90 p-3.5 rounded-2xl">
            <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-semibold mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Unprepared Graduates</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">&gt; 60%</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Report lack of career direction</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 p-3.5 rounded-2xl">
            <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-semibold mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Employability Benchmark</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">42.6%</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Mercer | Mettl National Study</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 p-3.5 rounded-2xl">
            <div className="flex items-center space-x-1.5 text-indigo-400 text-xs font-semibold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Target Student Base</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">4.46 Cr</p>
            <p className="text-[11px] text-slate-400 mt-0.5">AISHE Higher Ed Census Data</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 p-3.5 rounded-2xl">
            <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Continuous Guidance</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">24/7 AI</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Adaptive feedback loop</p>
          </div>
        </div>
      </div>
    </div>
  );
}
