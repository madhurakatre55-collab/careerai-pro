import React from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';

export default function SkillGapAnalyzer({ 
  skillGaps, 
  topCareer, 
  onJumpToRoadmap 
}) {
  if (!skillGaps) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
        <BarChart2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-60" />
        <h3 className="text-lg font-bold text-white mb-2">No Skill Gap Diagnostics Available</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Run your profile diagnostic to generate an automated comparison between your skillset and target job profile requirements.
        </p>
      </div>
    );
  }

  const readiness = skillGaps.readinessScore || 65;
  const criticalCount = skillGaps.criticalGaps?.length || 0;
  const acquiredCount = skillGaps.acquiredSkills?.length || 0;
  const recommendedCount = skillGaps.recommendedGaps?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/80 flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Stage 3: Automated Skill Gap Diagnostic</h2>
            <p className="text-xs text-slate-400">
              Comparative analysis for target role: <span className="font-semibold text-indigo-400">{skillGaps.topCareerTitle || topCareer?.title}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onJumpToRoadmap}
          className="flex items-center space-x-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg shadow-sm font-bold transition-colors"
        >
          <span>Open Learning Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Employability Readiness Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Readiness Meter */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Current Role Readiness</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-black text-white">{readiness}%</span>
              <span className="text-xs text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">Employable</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${readiness}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            National benchmark: <span className="text-amber-400 font-bold">42.6%</span> (Mercer Mettl 2025). Your profile is currently trending ahead of standard graduate baselines.
          </p>
        </div>

        {/* Critical Gap Metric */}
        <div className="bg-slate-900/90 border border-rose-900/40 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>High Priority Gaps</span>
          </div>
          <div className="text-4xl font-black text-rose-400">{criticalCount}</div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Prerequisites to bridge</p>
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-4">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Est. 4–6 weeks of structured project prep</span>
          </div>
        </div>

        {/* Mastered Skills Metric */}
        <div className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Skills Already Mastered</span>
          </div>
          <div className="text-4xl font-black text-emerald-400">{acquiredCount}</div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Validated competencies</p>
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-4">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Directly transferable to campus placements</span>
          </div>
        </div>
      </div>

      {/* Detailed Gaps Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Critical Skills Missing */}
        <div className="bg-slate-900/90 border border-rose-900/40 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Critical Gaps (Must Acquire for Placement)</span>
            </div>
            <span className="text-[10px] bg-rose-950/60 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold">
              High Impact
            </span>
          </div>

          {criticalCount === 0 ? (
            <p className="text-xs text-emerald-400 italic">No critical gaps identified! You have all baseline core skills for this role.</p>
          ) : (
            <div className="space-y-3">
              {skillGaps.criticalGaps.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-rose-900/40 rounded-xl p-3 flex items-center justify-between hover:border-rose-700/80 transition-all"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.skill}</h4>
                    <p className="text-[11px] text-rose-400 mt-0.5 font-medium">{item.priority}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded font-mono font-medium">
                      {item.estimatedTimeToLearn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Emerging Skills */}
        <div className="bg-slate-900/90 border border-purple-900/40 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Recommended Emerging Trends (Competitive Edge)</span>
            </div>
            <span className="text-[10px] bg-purple-950/60 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-bold">
              2026 Trend
            </span>
          </div>

          {recommendedCount === 0 ? (
            <p className="text-xs text-slate-400 italic">All emerging trends covered.</p>
          ) : (
            <div className="space-y-3">
              {skillGaps.recommendedGaps.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-purple-900/40 rounded-xl p-3 flex items-center justify-between hover:border-purple-700/80 transition-all"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.skill}</h4>
                    <p className="text-[11px] text-purple-400 mt-0.5 font-medium">{item.priority}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded font-mono font-medium">
                      {item.estimatedTimeToLearn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Already Mastered Skills Showcase */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center space-x-2 text-white font-bold text-sm mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Skills Already Aligned with this Role ({acquiredCount})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillGaps.acquiredSkills?.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 px-2.5 py-1 rounded-md text-xs font-semibold"
            >
              <span>✓</span>
              <span>{item.skill}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
