import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Brain, 
  Cpu,
  BarChart2, 
  Map, 
  MessageSquare, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  BookOpen, 
  Lock,
  User,
  Crown,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  student, 
  onOpenProjectModal,
  onOpenAuthModal,
  onOpenPricingModal
}) {
  const isPro = student?.subscription_tier === 'pro';

  const navItems = [
    { id: 'assessment', label: '1. Skill Diagnostic', icon: Brain },
    { id: 'stage2-ml', label: '2. Deep ML Model', icon: Cpu },
    { id: 'recommendations', label: '3. Career Matches', icon: Compass },
    { id: 'skill-gaps', label: '4. Skill Gap Matrix', icon: BarChart2 },
    { id: 'roadmap', label: '5. Action Roadmap', icon: Map },
    { id: 'counselor', label: '6. 24/7 AI Mentor', icon: MessageSquare },
    { id: 'market-trends', label: '7. Labor Market 2026', icon: Briefcase },
    { id: 'institutional', label: '8. Campus / B2B Portal', icon: Building2 },
    { id: 'pme-business', label: '9. SaaS Monetization', icon: Sparkles },
    { id: 'ethics', label: '10. Ethics & Privacy', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('assessment')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  CareerAI<span className="text-indigo-400">Pro</span>
                </span>
                <span className="text-[10px] bg-indigo-950/70 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  SaaS 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block font-medium">Autonomous Career Intelligence Platform</p>
            </div>
          </div>

          {/* Action CTAs & Student Quick Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Pro Status / Upgrade CTA */}
            {isPro ? (
              <button
                onClick={onOpenPricingModal}
                className="flex items-center space-x-1.5 text-xs font-bold bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/50 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                title="Active Pro Subscriber - View Plan Details"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline">PRO ACTIVE</span>
                <span className="sm:hidden">PRO</span>
              </button>
            ) : (
              <button
                onClick={onOpenPricingModal}
                className="flex items-center space-x-1.5 text-xs font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all animate-pulse"
              >
                <Crown className="w-3.5 h-3.5 text-amber-200" />
                <span>Upgrade Pro (₹299)</span>
              </button>
            )}

            {/* AI Architecture Whitepaper */}
            <button
              onClick={onOpenProjectModal}
              className="hidden md:flex items-center space-x-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Architecture</span>
            </button>

            {/* Student Profile Quick Badge */}
            {student ? (
              <div 
                onClick={onOpenAuthModal}
                className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 cursor-pointer border border-slate-700 hover:border-indigo-500 rounded-xl px-2.5 py-1 text-xs transition-all shadow-sm"
                title="Click to Switch Account or Logout"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {student.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="font-bold text-slate-200 leading-none">{student.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{student.college?.split(' ')[0]} • CGPA {student.cgpa}</p>
                </div>
                <span className="text-[10px] bg-slate-700 text-indigo-300 font-medium px-1.5 py-0.5 rounded border border-slate-600">
                  Profile
                </span>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl shadow-md transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Log In / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Nav Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800 pt-1.5 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
