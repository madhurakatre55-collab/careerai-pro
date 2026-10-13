import React from 'react';
import { 
  X, 
  Cpu, 
  Award, 
  Users, 
  BookOpen, 
  School, 
  Layers, 
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function ProjectInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-indigo-300 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">CareerAI Platform Architecture & Technical Whitepaper</h2>
              <p className="text-xs text-indigo-300">Autonomous Career Intelligence & 32-D Deep Neural Matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Executive Summary */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4.5 text-center">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">Autonomous Career Guidance Architecture</p>
            <h3 className="text-sm sm:text-base font-extrabold text-white mt-1">
              CAREERAI PRO — DEEP NEURAL MATCHING & SKILL GAP INTELLIGENCE
            </h3>
            <p className="text-[11px] text-indigo-400 font-semibold mt-0.5">
              Enterprise Multi-Tenant SaaS Platform • Serving Students & Universities Worldwide
            </p>
            <div className="mt-2.5 inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold">
              32-D INPUT TENSOR • DENSE RELU HIDDEN LAYERS • 8-CLASS SOFTMAX OUTPUT
            </div>
          </div>

          {/* Deep Neural Matching Mathematical Formulation */}
          <div className="border border-indigo-900/60 bg-indigo-950/20 rounded-2xl p-4.5">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Algorithmic Formulation:</span>
            <h4 className="text-base font-bold text-white mt-1">“Stage 2 Multi-Layer Perceptron (MLP) Classifier”</h4>
            <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
              Maps high-dimensional student academic marks, psychometric scores, technical competencies, and project vectors through a 32-dimensional normalized input tensor:
            </p>
            <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block">Input Tensor</span>
                <span className="text-slate-300">32 Features</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block">Hidden 1</span>
                <span className="text-slate-300">24 Neurons (ReLU)</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block">Hidden 2</span>
                <span className="text-slate-300">16 Neurons (ReLU)</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block">Output Layer</span>
                <span className="text-slate-300">8-D Softmax Prob</span>
              </div>
            </div>
          </div>

          {/* Engineering Leadership Domains */}
          <div>
            <h4 className="font-bold text-white mb-2.5 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Core System Subsystems:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <p className="font-bold text-slate-100">Neural Matching Engine</p>
                <p className="text-[10px] text-indigo-400 font-medium mt-0.5">Stage 2 MLP Inference</p>
                <p className="text-[10px] text-slate-400 mt-1">Computes dot-product cosine similarity and softmax probability distribution over high-demand tech careers.</p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <p className="font-bold text-slate-100">Labor Market Indexer</p>
                <p className="text-[10px] text-purple-400 font-medium mt-0.5">Real-Time Demand Weights</p>
                <p className="text-[10px] text-slate-400 mt-1">Continuously syncs live tech job boards and salary brackets to recalibrate employability confidence.</p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <p className="font-bold text-slate-100">Adaptive Feedback Loop</p>
                <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Continuous Refinement</p>
                <p className="text-[10px] text-slate-400 mt-1">Recalibrates student readiness whenever learning milestones or project proofs are completed.</p>
              </div>
            </div>
          </div>

          {/* Key Literature & Research Citations */}
          <div className="pt-3 border-t border-slate-800">
            <h4 className="font-bold text-white mb-2 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Grounded Research Citations & Market Data:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-[11px]">
              <li>AISHE (All India Survey on Higher Education) — 4.46 crore higher education student base seeking career direction.</li>
              <li>Mercer | Mettl Graduate Employability National Benchmark — 42.6% employability rate across non-vocational graduates.</li>
              <li>IC3 Institute Global Student Survey — &gt;80% adoption of autonomous AI tools for career shortlisting.</li>
              <li>World Economic Forum Future of Jobs Report — Top growth trajectories in Generative AI, Cloud SRE, and Cybersecurity.</li>
            </ol>
          </div>

          {/* Privacy & Compliance */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-[11px] flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>FERPA & Digital Personal Data Protection (DPDP) Act Compliant. Student telemetry is private and never monetized.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
          >
            Close Whitepaper
          </button>
        </div>
      </div>
    </div>
  );
}
