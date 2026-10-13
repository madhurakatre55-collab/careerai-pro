import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Briefcase, 
  Sparkles, 
  Users 
} from 'lucide-react';

export default function MarketTrends({ marketData }) {
  if (!marketData) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 shadow-xl">
        Loading real-time labor-market data...
      </div>
    );
  }

  const { reportInsights, topGrowthSectors2026, inDemandSkillsMatrix } = marketData;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">2026–2027 Labor Market Intelligence & Benchmark Hub</h2>
            <p className="text-xs text-slate-400">Real-time employer-demand metrics & national higher education research</p>
          </div>
        </div>
        <div className="text-xs bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live Industry Demand Sync</span>
        </div>
      </div>

      {/* Key National Study Insights from the Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold mb-1">
            <Users className="w-4 h-4" />
            <span>National Student Base</span>
          </div>
          <div className="text-2xl font-black text-white">{reportInsights?.higherEducationEnrollment?.split(' ')[0]} {reportInsights?.higherEducationEnrollment?.split(' ')[1]}</div>
          <p className="text-[11px] text-slate-400 mt-1">AISHE 2022–23: Higher ed enrolment in India</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Tool Adoption</span>
          </div>
          <div className="text-2xl font-black text-white">&gt; 80%</div>
          <p className="text-[11px] text-slate-400 mt-1">IC3 Global: Students using AI for career research</p>
        </div>

        <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Graduate Employability</span>
          </div>
          <div className="text-2xl font-black text-amber-400">42.6%</div>
          <p className="text-[11px] text-slate-400 mt-1">Mercer | Mettl 2025: Employable graduate ratio</p>
        </div>

        <div className="bg-slate-900/90 border border-rose-900/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Preparation Deficit</span>
          </div>
          <div className="text-2xl font-black text-rose-400">&gt; 60%</div>
          <p className="text-[11px] text-slate-400 mt-1">Graduates reporting feeling unprepared for jobs</p>
        </div>
      </div>

      {/* High-Growth Sectors for 2026-2027 */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>High-Growth Technology Domains & Starting Packages (2026–2027)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topGrowthSectors2026?.map((sector, sIdx) => (
            <div
              key={sIdx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold font-mono">
                    {sector.hiringGrowth} YoY
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Demand Index</span>
                </div>
                <h4 className="text-xs font-bold text-white">{sector.sector}</h4>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">CTC (Fresher-Mid):</span>
                <span className="text-emerald-400 font-bold font-mono">₹{sector.avgPackageLpa} LPA</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-Demand Technical Skills Matrix */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span>In-Demand Technical Competencies Barometer</span>
        </h3>

        <div className="space-y-3">
          {inDemandSkillsMatrix?.map((skill, kIdx) => (
            <div key={kIdx} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-200 font-semibold">{skill.name}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400 font-bold font-mono">{skill.yoyGrowth} YoY</span>
                  <span className="text-slate-400 font-mono text-[11px]">Score: {skill.demandScore}/100</span>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${skill.demandScore}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
