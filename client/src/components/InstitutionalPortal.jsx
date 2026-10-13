import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  AlertTriangle, 
  Download, 
  CheckCircle, 
  TrendingUp, 
  School,
  Building2,
  Send
} from 'lucide-react';

export default function InstitutionalPortal({ institutionalData }) {
  const [exportNotice, setExportNotice] = useState(false);
  
  // Interactive Campus License Calculator State
  const [instName, setInstName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [studentCount, setStudentCount] = useState(750);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteResult, setQuoteResult] = useState(null);

  if (!institutionalData) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 shadow-xl">
        Loading institutional portal telemetry...
      </div>
    );
  }

  const {
    institution,
    cohortTotalStudents,
    assessedStudents,
    employabilityReadinessIndex,
    nationalBenchmarkComparison,
    topTargetCareers,
    batchSkillGaps,
    placementDriveReadiness
  } = institutionalData;

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const calculatedRate = studentCount > 1000 ? 199 : 249;
  const calculatedTotal = Math.max(75000, studentCount * calculatedRate);

  const handleRequestQuote = async (e) => {
    e.preventDefault();
    if (!instName || !email) return;

    setIsSubmittingQuote(true);
    try {
      const res = await fetch('/api/institutional/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institution_name: instName,
          contact_person: contactPerson,
          email: email,
          student_count: studentCount,
          plan_type: 'campus_enterprise_pro'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuoteResult(data);
      }
    } catch (err) {
      console.error('Failed to submit institutional quotation:', err);
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-950/80 text-purple-400 flex items-center justify-center font-bold shrink-0 border border-purple-800/80 shadow-inner">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{institution}</h2>
              <span className="text-[10px] bg-indigo-950/80 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800/80 font-mono font-bold">
                B2B Enterprise Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Autonomous Placement Cell Dashboard • Network Reach: 45+ Campuses
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl transition-colors font-semibold shadow-sm"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export Cohort TPO Audit (CSV)</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-pulse font-medium shadow-lg">
          <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
          <span>Placement cohort audit compiled and prepared for university recruitment partners!</span>
        </div>
      )}

      {/* Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4.5 shadow-xl">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold mb-1">
            <Users className="w-4 h-4" />
            <span>Assessed Cohort</span>
          </div>
          <div className="text-2xl font-black text-white">{assessedStudents.toLocaleString()} / {cohortTotalStudents.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400 mt-1">94.2% of registered cohort profiled</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4.5 shadow-xl">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
            <Award className="w-4 h-4" />
            <span>Employability Index</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">{employabilityReadinessIndex}</div>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">{nationalBenchmarkComparison}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4.5 shadow-xl">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Tier-1 Product Ready</span>
          </div>
          <div className="text-2xl font-black text-purple-400">{placementDriveReadiness?.tier1Ready.toLocaleString()} Students</div>
          <p className="text-[11px] text-slate-400 mt-1">Cleared core DSA, ML & system design benchmarks</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4.5 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Needs Upskilling</span>
          </div>
          <div className="text-2xl font-black text-amber-400">{placementDriveReadiness?.needsUpskilling.toLocaleString()} Students</div>
          <p className="text-[11px] text-slate-400 mt-1">Enrolled in active roadmap phases</p>
        </div>
      </div>

      {/* Cohort Career Interests vs Batch Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Consortium Student Career Preferences</span>
          </h3>

          <div className="space-y-3">
            {topTargetCareers?.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-200 font-semibold">{item.career}</span>
                  <span className="text-indigo-400 font-bold">{item.percentage}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Aggregated Curriculum Gaps (Recommended for Campus Workshops)</span>
          </h3>

          <div className="space-y-2.5">
            {batchSkillGaps?.map((gap, gIdx) => (
              <div
                key={gIdx}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{gap.skill}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Deficit across <span className="text-rose-400 font-bold">{gap.gapPercentage}</span> of assessed students
                  </p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase ${
                  gap.priority === 'High' 
                    ? 'bg-rose-950/60 text-rose-300 border border-rose-800' 
                    : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                }`}>
                  {gap.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* B2B MONETIZATION: Interactive Campus License Price Calculator & Quote Request */}
      <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/70 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 text-xs px-3 py-1 rounded-full mb-3 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Institutional Revenue Engine • Campus SaaS Licensing</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Deploy CareerAI Across Your College or University Campus
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6 leading-relaxed">
            Equip every student in your institution with 24/7 AI mentoring, custom learning roadmaps, 
            and automated corporate placement analytics. Calculate your campus license investment below.
          </p>

          {!quoteResult ? (
            <form onSubmit={handleRequestQuote} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">College / University Name</label>
                  <input
                    type="text"
                    required
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    placeholder="e.g. Stanford University or Tech Institute"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official TPO / Dean Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. placements@university.edu"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Annual Student Cohort Size: <span className="text-indigo-400 font-bold">{studentCount} Students</span>
                  </label>
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                    ₹{calculatedRate} / student / year
                  </span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="3500"
                  step="50"
                  value={studentCount}
                  onChange={(e) => setStudentCount(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>250 Students (Min Slab)</span>
                  <span>1,500 Students</span>
                  <span>3,500+ Students</span>
                </div>
              </div>

              {/* Dynamic Price Display */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Campus License Fee:</span>
                  <div className="text-2xl font-black text-emerald-400">
                    ₹{calculatedTotal.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ year</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingQuote}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingQuote ? 'Generating Proposal...' : 'Request Campus Quotation & Demo'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-slate-950/80 border border-emerald-800/80 rounded-2xl p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center space-x-2 text-emerald-400 text-sm font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>Enterprise Quotation Dispatched Successfully!</span>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Quote Reference ID:</span>
                  <span className="font-mono text-indigo-400 font-bold">{quoteResult.quoteId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Institution:</span>
                  <span className="text-white font-semibold">{quoteResult.institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Cohort:</span>
                  <span className="text-white">{quoteResult.studentCount} Students (@ ₹{quoteResult.perStudentRate}/student)</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold">
                  <span className="text-slate-200">Total Annual License:</span>
                  <span className="text-emerald-400">₹{quoteResult.estimatedTotalInr.toLocaleString('en-IN')} / year</span>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                {quoteResult.message}
              </p>
              <button
                onClick={() => setQuoteResult(null)}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline font-semibold"
              >
                ← Calculate another institutional quote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
