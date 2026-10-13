import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Building, 
  CheckCircle, 
  Bookmark, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowRight, 
  Briefcase, 
  Cpu, 
  BarChart3, 
  Code, 
  Cloud, 
  ShieldCheck, 
  Database, 
  Compass, 
  Palette 
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  BarChart3,
  Code,
  Cloud,
  ShieldCheck,
  Database,
  Compass,
  Palette,
  Briefcase
};

export default function CareerRecommendations({ 
  recommendations, 
  onSelectCareer, 
  selectedCareerId, 
  onSendFeedback, 
  onViewRoadmap, 
  onViewSkillGaps 
}) {
  const [feedbackSuccess, setFeedbackSuccess] = useState(null);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
        <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-60" />
        <h3 className="text-lg font-bold text-white mb-2">No Recommendations Generated Yet</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Please run the AI Matching Diagnostic from Stage 1 to evaluate your profile vectors against current labor-market trends.
        </p>
      </div>
    );
  }

  const handleFeedback = (careerId, actionType) => {
    onSendFeedback(careerId, actionType);
    setFeedbackSuccess({ careerId, actionType });
    setTimeout(() => {
      setFeedbackSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/80 flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Stage 2: AI Matching Engine Results</h2>
            <p className="text-xs text-slate-400">Ranked by multi-factor cosine vector similarity, aptitude archetypes, and live market demand</p>
          </div>
        </div>
        <div className="text-xs text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg">
          Showing <span className="font-bold text-indigo-400">{recommendations.length}</span> Evaluated Career Pathways
        </div>
      </div>

      {/* Career Cards List */}
      <div className="grid grid-cols-1 gap-5">
        {recommendations.map((career, index) => {
          const Icon = ICON_MAP[career.iconName] || Briefcase;
          const isSelected = selectedCareerId === career.careerId;
          const isTopMatch = index === 0;

          const badgeColor = career.matchConfidence >= 85
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
            : career.matchConfidence >= 70
            ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800'
            : 'bg-amber-950/60 text-amber-300 border-amber-800';

          return (
            <div
              key={career.careerId}
              className={`relative rounded-2xl border transition-all p-5 shadow-xl ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isTopMatch && (
                <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-lg flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Top AI Recommended Match</span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Career Title & Summary */}
                <div className="flex items-start space-x-3.5 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/80 flex items-center justify-center shrink-0 text-indigo-400 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white tracking-tight">{career.title}</h3>
                      <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700 font-medium">
                        {career.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {career.description}
                    </p>

                    {/* Market Metrics Strip */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-400">Starting CTC (India): </span>
                        <span className="text-emerald-400 font-bold">{career.avgSalaryInr}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Global Range: </span>
                        <span className="text-slate-200 font-medium">{career.avgSalaryUsd}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-indigo-400 font-bold">{career.growthRate} Growth</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Confidence Score Gauge */}
                <div className="flex lg:flex-col items-center justify-between lg:items-end border-t lg:border-t-0 border-slate-800/80 pt-3 lg:pt-0 shrink-0">
                  <div className={`px-4 py-2 rounded-xl border text-center font-mono ${badgeColor}`}>
                    <div className="text-2xl font-black">{career.matchConfidence}%</div>
                    <div className="text-[10px] uppercase font-bold tracking-wider">Match Score</div>
                  </div>

                  {career.scoresBreakdown && (
                    <div className="hidden sm:block text-[10px] text-slate-400 mt-2 space-y-0.5 w-36 text-right">
                      <div>Skills: <span className="text-indigo-400 font-semibold">{career.scoresBreakdown.skillScore}%</span></div>
                      <div>Aptitude: <span className="text-purple-400 font-semibold">{career.scoresBreakdown.aptitudeScore}%</span></div>
                      <div>Market Factor: <span className="text-emerald-400 font-semibold">{career.scoresBreakdown.marketFactor}/100</span></div>
                    </div>
                  )}
                </div>
              </div>

              {/* "Why This Fits You" Rationale Box */}
              {career.fitReasons && career.fitReasons.length > 0 && (
                <div className="mt-4 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs">
                  <div className="text-slate-200 font-bold mb-1 flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Fit Rationale:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    {career.fitReasons.map((reason, rIdx) => (
                      <li key={rIdx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Top Companies Hiring Badge */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px] flex items-center space-x-1 font-medium">
                  <Building className="w-3 h-3" />
                  <span>Key Hiring Partners:</span>
                </span>
                {career.topCompanies.slice(0, 6).map((comp, cIdx) => (
                  <span key={cIdx} className="bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded border border-slate-700 font-medium">
                    {comp}
                  </span>
                ))}
              </div>

              {/* Action Buttons & Continuous Refinement Feedback Loop */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Refine AI:</span>
                  <button
                    onClick={() => handleFeedback(career.careerId, 'accepted')}
                    className="flex items-center space-x-1 text-xs bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-md transition-colors font-medium"
                    title="Accept recommendation and adapt learning path"
                  >
                    <ThumbsUp className="w-3 h-3 text-emerald-400" />
                    <span>Target This</span>
                  </button>
                  <button
                    onClick={() => handleFeedback(career.careerId, 'shortlisted')}
                    className="flex items-center space-x-1 text-xs bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800 px-2.5 py-1 rounded-md transition-colors font-medium"
                    title="Shortlist for later comparison"
                  >
                    <Bookmark className="w-3 h-3 text-indigo-400" />
                    <span>Shortlist</span>
                  </button>
                  <button
                    onClick={() => handleFeedback(career.careerId, 'rejected')}
                    className="flex items-center space-x-1 text-xs bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800 px-2.5 py-1 rounded-md transition-colors font-medium"
                    title="Not interested (decreases weight)"
                  >
                    <ThumbsDown className="w-3 h-3 text-slate-400" />
                    <span>Not for me</span>
                  </button>
                  {feedbackSuccess?.careerId === career.careerId && (
                    <span className="text-[11px] text-emerald-400 font-bold animate-pulse">
                      ✓ AI Refined!
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onViewSkillGaps(career.careerId)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    Inspect Skill Gaps
                  </button>
                  <button
                    onClick={() => onViewRoadmap(career.careerId)}
                    className="flex items-center space-x-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
