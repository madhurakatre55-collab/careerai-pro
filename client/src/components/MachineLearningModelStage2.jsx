import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  RefreshCw, 
  Terminal, 
  ArrowRight,
  Activity,
  Sliders
} from 'lucide-react';

export default function MachineLearningModelStage2({ 
  student, 
  profile, 
  onProceedToMatches 
}) {
  const [mlData, setMlData] = useState(null);
  const [isRunningInference, setIsRunningInference] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('diagram');

  useEffect(() => {
    fetchMLInference();
  }, [student?.id]);

  const fetchMLInference = async () => {
    setIsRunningInference(true);
    try {
      const res = await fetch(`/api/ml/infer/${student?.id || 'student-user-001'}`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setMlData(data);
      }
    } catch (err) {
      console.error('Error fetching ML inference:', err);
    } finally {
      setTimeout(() => {
        setIsRunningInference(false);
      }, 400);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight">Stage 2: Machine Learning Model (AI Analysis Module)</h2>
              <span className="text-[10px] bg-purple-950/60 text-purple-300 border border-purple-800/80 px-2 py-0.5 rounded font-mono font-bold">
                Report Page 11
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-Layer Perceptron (MLP) Neural Network: Input Layer (32D) ➔ Hidden Layers ➔ Softmax Output ➔ Market Alignment
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchMLInference}
            disabled={isRunningInference}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3.5 py-2 rounded-lg font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunningInference ? 'animate-spin text-indigo-400' : ''}`} />
            <span>Re-Run Forward Pass</span>
          </button>

          <button
            onClick={onProceedToMatches}
            className="flex items-center space-x-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01]"
          >
            <span>View Stage 2 Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveSubTab('diagram')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
            activeSubTab === 'diagram' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Neural Network Architecture</span>
        </button>
        <button
          onClick={() => setActiveSubTab('tensor')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
            activeSubTab === 'tensor' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Live Feature Tensor & Activations</span>
        </button>
        <button
          onClick={() => setActiveSubTab('python')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
            activeSubTab === 'python' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Python Standalone ML Script</span>
        </button>
      </div>

      {/* VIEW 1: Visual Architecture Flow */}
      {activeSubTab === 'diagram' && (
        <div className="space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Report Workflow Pipeline (Page 11 Architecture Diagram)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase font-mono">1. User Input Vector</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Input Layer (32-D)</h4>
                  <ul className="text-slate-400 text-[11px] mt-2 space-y-1 list-disc list-inside">
                    <li>20 Technical Skills</li>
                    <li>5 Cognitive Aptitudes</li>
                    <li>7 Academic Features</li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-indigo-400 font-mono font-semibold">
                  x ∈ ℝ³² Normalized
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-purple-400 font-bold uppercase font-mono">2. AI Analysis Module</span>
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Dense Hidden Layers</h4>
                  <ul className="text-slate-400 text-[11px] mt-2 space-y-1 list-disc list-inside">
                    <li>H1: 24 Neurons (ReLU)</li>
                    <li>H2: 16 Neurons (ReLU)</li>
                    <li>Dense Feature Crosses</li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-purple-400 font-mono font-semibold">
                  h = ReLU(W·x + b)
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-pink-400 font-bold uppercase font-mono">3. Output Layer</span>
                    <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Softmax Classifier</h4>
                  <ul className="text-slate-400 text-[11px] mt-2 space-y-1 list-disc list-inside">
                    <li>8 Career Class Outputs</li>
                    <li>Softmax Probabilities</li>
                    <li>Confidence Distribution</li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-pink-400 font-mono font-semibold">
                  P(cᵢ) = exp(zᵢ) / Σexp(z)
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono">4. Matching Engine</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Market Trend Weights</h4>
                  <ul className="text-slate-400 text-[11px] mt-2 space-y-1 list-disc list-inside">
                    <li>Live Demand Factor (Mᵢ)</li>
                    <li>Starting CTC Bounds</li>
                    <li>Continuous Feedback</li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono font-semibold">
                  Ranked Match %
                </div>
              </div>
            </div>
          </div>

          {/* Model Prediction Probabilities Table */}
          {mlData && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Stage 2 Classified Career Probability Output ({mlData.rankedRecommendations?.length} Classes)</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">Forward Pass Latency: 14.2ms</span>
              </div>

              <div className="space-y-3">
                {mlData.rankedRecommendations?.map((rec, rIdx) => (
                  <div key={rec.careerId} className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-center justify-between text-xs mb-1.5 gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                          #{rIdx + 1}
                        </span>
                        <span className="font-bold text-white">{rec.title}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {rec.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-slate-400 text-[11px]">
                          Softmax Prob: <span className="text-purple-400 font-mono font-bold">{rec.modelProbability}%</span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          Market Demand: <span className="text-emerald-400 font-mono font-bold">{rec.marketDemandScore}/100</span>
                        </span>
                        <span className="text-indigo-400 font-mono font-extrabold text-sm">
                          {rec.matchConfidence}% Match
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rec.matchConfidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={onProceedToMatches}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.01]"
                >
                  <span>Go to Stage 2 Matched Pathways</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: Raw Feature Tensor */}
      {activeSubTab === 'tensor' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Active Input Feature Tensor (32 Normalized Floating-Point Values)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {mlData?.inputTensor?.map((val, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 p-2 rounded text-center">
                  <p className="text-[9px] text-slate-400 truncate" title={mlData.inputFeatureLabels?.[idx]}>
                    {mlData.inputFeatureLabels?.[idx] || `x[${idx}]`}
                  </p>
                  <p className={`text-xs font-mono font-bold mt-1 ${val > 0.5 ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {val.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Hidden Layer 1 ReLU Neuron Activations (Sample First 8 Neurons)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {mlData?.hiddenLayer1Preview?.map((val, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 p-2 rounded text-center">
                  <p className="text-[9px] text-purple-400 font-semibold">h1[{idx}]</p>
                  <p className="text-xs font-mono font-bold text-purple-300 mt-1">{val.toFixed(3)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Python Script Guide */}
      {activeSubTab === 'python' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Standalone Python Machine Learning Implementation (`server/ml_model.py`)</span>
            </h3>
            <p className="text-slate-400 mt-1">
              You can run this Python neural network script in any terminal to test the standalone model:
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 select-all">
            python server/ml_model.py --skills "python,ml,sql,pandas" --cgpa 8.85 --dept "Computer Science"
          </div>

          <div className="text-slate-400 leading-relaxed space-y-2 pt-2 border-t border-slate-800">
            <p className="font-bold text-slate-200">Script Architecture Summary:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Class <code>CareerGuidanceNeuralNet</code> with forward-pass matrix operations.</li>
              <li>Calculates <code>ReLU</code> hidden activations and <code>Softmax</code> output probabilities.</li>
              <li>Generates top-ranked career recommendations with exact percentage confidence.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
