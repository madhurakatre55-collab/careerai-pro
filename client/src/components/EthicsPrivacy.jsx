import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';

export default function EthicsPrivacy({ student, profile, latestAssessment }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadData = () => {
    const exportObject = {
      exportTimestamp: new Date().toISOString(),
      student,
      profile,
      latestAssessment,
      privacyStatement: "Data gathered strictly for academic career guidance and skill vector matching under FERPA and Indian DPDP Act principles."
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `student_profile_${student?.id || 'export'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-950/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">AI Ethics, Data Privacy & Algorithmic Transparency</h2>
            <p className="text-xs text-slate-400 mt-0.5">Section 5 & 6 Report Compliance: Bias mitigation, student privacy & responsible AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
            DPDP Act & FERPA Compliant
          </span>
        </div>
      </div>

      {/* Ethical AI Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 flex items-center justify-center mb-3.5 shadow-inner">
            <Eye className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5">Algorithmic Bias Auditing</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Career recommendations are continuously audited to eliminate stereotyping across gender, regional background, or non-traditional academic streams.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mb-3.5 shadow-inner">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5">Zero Data Monetization</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Student academic marks, personal statements, and psychometric scores are strictly private. Data is never sold to third-party ad networks or brokers.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-800/80 text-purple-400 flex items-center justify-center mb-3.5 shadow-inner">
            <HeartHandshake className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5">Human Counselor In-The-Loop</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            AI recommendations serve to augment rather than replace human counselors. Complex personal or socio-economic situations are flagged for faculty mentorship.
          </p>
        </div>
      </div>

      {/* Report Limitations & Disadvantages Acknowledgement */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
          <AlertCircle className="w-4.5 h-4.5 text-amber-400" />
          <span>Report Limitations & Mitigation Framework (Report Page 12)</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-amber-950/30 border border-amber-800/60 rounded-xl flex items-start space-x-3.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0"></div>
            <div>
              <p className="text-amber-300 font-semibold">Risk: Training Data Diversity & Bias</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Mitigation: Real-time synchronization with active live job boards and transparent scoring breakdowns rather than black-box categorization.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-start space-x-3.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1 shrink-0"></div>
            <div>
              <p className="text-white font-semibold">Risk: Sensitive Academic Data Leakage</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Mitigation: Local SQLite encryption, isolated student tenant tables, and compliance with the Digital Personal Data Protection (DPDP) Act.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-start space-x-3.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0"></div>
            <div>
              <p className="text-white font-semibold">Risk: Lack of Human Empathy</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Mitigation: Institutional TPO dashboard enables university faculty, academic deans, and certified career counselors to review and endorse automated plans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Data Sovereignty Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Student Data Sovereignty & Portability</h3>
          <p className="text-xs text-slate-400 mt-0.5">Download your complete vectorized record, assessment history, and skills audit as open JSON.</p>
        </div>

        <button
          onClick={handleDownloadData}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4.5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all shrink-0 hover:shadow-indigo-600/30"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Export Complete Profile (JSON)</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center space-x-2.5 shadow-lg animate-pulse">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
          <span>Student profile and assessment telemetry downloaded successfully!</span>
        </div>
      )}
    </div>
  );
}
