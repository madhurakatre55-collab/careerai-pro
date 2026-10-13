import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  School, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Users, 
  X,
  Crown
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  initialMode = 'login',
  currentUser 
}) {
  const [isRegisterMode, setIsRegisterMode] = useState(initialMode === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register fields
  const [name, setName] = useState('');
  const [college, setCollege] = useState('Global Institute of Technology & Science');
  const [degree, setDegree] = useState('B.Tech / B.S.');
  const [department, setDepartment] = useState('Computer Science & Artificial Intelligence');
  const [yearOfStudy, setYearOfStudy] = useState('Third Year');
  const [cgpa, setCgpa] = useState('8.50');

  const [demoUsers, setDemoUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDemoUsers();
  }, []);

  const fetchDemoUsers = async () => {
    try {
      const res = await fetch('/api/auth/demo-users');
      if (res.ok) {
        const data = await res.json();
        setDemoUsers(data);
      }
    } catch (e) {
      console.warn('Could not load demo accounts:', e);
    }
  };

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      onLoginSuccess(data.student, data.profile);
      if (onClose) onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          college: college.trim() || 'Global University / Independent',
          degree: degree.trim(),
          department: department.trim(),
          year_of_study: yearOfStudy,
          cgpa: parseFloat(cgpa) || 8.0,
          subscription_tier: 'pro',
          technical_skills: ['Python', 'SQL'],
          interests: ['Artificial Intelligence', department.split(' ')[0]]
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed.');
      }

      onLoginSuccess(data.student, data.profile);
      if (onClose) onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async (demoUser) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoUser.email, password: demoUser.defaultPass })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Demo login failed');
      }

      onLoginSuccess(data.student, data.profile);
      if (onClose) onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-indigo-300 flex items-center justify-center shadow-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {isRegisterMode ? 'Create CareerAI Account' : 'Sign In to Your CareerAI Profile'}
              </h2>
              <p className="text-xs text-indigo-300">
                Autonomous Career Guidance Platform • Universal Access
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center space-x-2.5 animate-shake">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Demo Career Personas */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>1-Click Test Personas:</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Password: career123</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {demoUsers.map((u) => {
                const isCurrent = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickDemoLogin(u)}
                    disabled={isSubmitting}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      isCurrent
                        ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white flex items-center justify-between">
                      <span className="truncate">{u.name}</span>
                      {u.subscription_tier === 'pro' && (
                        <Crown className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-indigo-400 font-medium mt-0.5 truncate">{u.department}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{u.targetFocus}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle Login vs Register */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => { setIsRegisterMode(false); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                !isRegisterMode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In to Existing Account
            </button>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(true); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                isRegisterMode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register New Profile
            </button>
          </div>

          {/* FORM: LOGIN */}
          {!isRegisterMode ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex.chen@careerai.io or yourname@gmail.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Account Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password (demo: career123)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Log In & Access Career Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* FORM: REGISTER */
            <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Daniel Morgan"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. daniel.morgan@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Create Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">College / University / Organization</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Stanford, IIT, London Univ, or Self-Taught"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Major / Specialization</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science, AI, Data Science"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Current Academic Level</label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="First Year">First Year (Freshman)</option>
                    <option value="Second Year">Second Year (Sophomore)</option>
                    <option value="Third Year">Third Year (Junior)</option>
                    <option value="Final Year">Final Year (Senior)</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">CGPA / Grade Benchmark</label>
                  <input
                    type="number"
                    step="0.01"
                    min="4.0"
                    max="10.0"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Register & Unlock Free Career Profiling</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
