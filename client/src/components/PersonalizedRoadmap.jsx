import React from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  BookOpen, 
  ExternalLink, 
  Sparkles 
} from 'lucide-react';

export default function PersonalizedRoadmap({ 
  roadmap, 
  topCareer, 
  onToggleMilestone 
}) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
        <Map className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-60" />
        <h3 className="text-lg font-bold text-white mb-2">No Personalized Roadmap Generated Yet</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Run your diagnostic from the AI Diagnostic tab to produce a phased step-by-step learning progression.
        </p>
      </div>
    );
  }

  const completedCount = roadmap.filter(r => r.isCompleted).length;
  const progressPercent = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/80 flex items-center justify-center font-bold">
            4
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Personalized Learning Roadmap & Milestones</h2>
            <p className="text-xs text-slate-400">
              Curated progression for <span className="font-semibold text-indigo-400">{topCareer?.title || 'Target Pathway'}</span>
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-2 font-medium">
          <span>Roadmap Completion:</span>
          <span className="font-bold text-emerald-400">{progressPercent}%</span>
        </div>
      </div>

      {/* Progress Bar & Refinement Notice */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-200 font-bold">Milestone Progress ({completedCount} of {roadmap.length} Phases Done)</span>
          <span className="text-indigo-400 font-semibold flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Checking milestones triggers adaptive AI refinement</span>
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="space-y-4">
        {roadmap.map((phase) => {
          const isDone = phase.isCompleted;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border transition-all p-5 shadow-xl ${
                isDone 
                  ? 'border-emerald-800/70 bg-emerald-950/20' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => onToggleMilestone(phase.id)}
                    className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors focus:outline-none shrink-0"
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-base font-bold ${isDone ? 'text-emerald-400 line-through' : 'text-white'}`}>
                        {phase.phase_title}
                      </h3>
                      <span className="flex items-center space-x-1 text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-medium">
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        <span>{phase.duration_weeks} Weeks</span>
                      </span>
                      {isDone && (
                        <span className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onToggleMilestone(phase.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                    isDone 
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/80' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  }`}
                >
                  {isDone ? 'Mark Incomplete' : 'Complete Phase'}
                </button>
              </div>

              {/* Skills Covered in Phase */}
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 font-bold mb-2">Core Skills & Topics:</div>
                <div className="flex flex-wrap gap-1.5">
                  {phase.skills_covered?.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-md border border-slate-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Curated Resources */}
              {phase.resources && phase.resources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400 font-bold mb-2 flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Curated Resources & Tutorials:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {phase.resources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 bg-slate-950/70 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-700 rounded-lg text-xs transition-colors group"
                      >
                        <div className="truncate mr-2">
                          <p className="text-slate-200 group-hover:text-indigo-300 font-semibold truncate">{res.name}</p>
                          <span className="text-[10px] text-slate-400">{res.type} {res.free && '• Free'}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
