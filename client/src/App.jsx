import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProfileAssessment from './components/ProfileAssessment';
import CareerRecommendations from './components/CareerRecommendations';
import SkillGapAnalyzer from './components/SkillGapAnalyzer';
import PersonalizedRoadmap from './components/PersonalizedRoadmap';
import AICounselorChat from './components/AICounselorChat';
import MarketTrends from './components/MarketTrends';
import InstitutionalPortal from './components/InstitutionalPortal';
import BusinessModelPME from './components/BusinessModelPME';
import EthicsPrivacy from './components/EthicsPrivacy';
import ProjectInfoModal from './components/ProjectInfoModal';
import MachineLearningModelStage2 from './components/MachineLearningModelStage2';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('assessment');
  const [studentId, setStudentId] = useState(() => {
    return localStorage.getItem('career_ai_user_id') || 'student-user-001';
  });
  const [student, setStudent] = useState(null);
  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [topMatch, setTopMatch] = useState(null);
  const [skillGaps, setSkillGaps] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [messages, setMessages] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [institutionalData, setInstitutionalData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [statusNotification, setStatusNotification] = useState(null);

  // Load initial student and system data
  useEffect(() => {
    loadStudentData(studentId);
    loadMarketData();
    loadInstitutionalData();
    loadBusinessData();
    loadMessages(studentId);
  }, [studentId]);

  const showNotification = (msg) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  const loadStudentData = async (id) => {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (res.ok) {
        const data = await res.json();
        setStudent(data.student);
        setProfile(data.profile);

        // Run or load initial assessment pipeline
        runAssessmentPipeline(id);
      }
    } catch (err) {
      console.error('Error fetching student details:', err);
    }
  };

  const runAssessmentPipeline = async (id) => {
    setIsAssessing(true);
    try {
      const res = await fetch(`/api/students/${id}/assess`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
        setTopMatch(data.topMatch || null);
        setSkillGaps(data.skillGaps || null);
        setRoadmap(data.personalizedRoadmap || []);
      }
    } catch (err) {
      console.error('Error running assessment pipeline:', err);
    } finally {
      setIsAssessing(false);
    }
  };

  const loadMarketData = async () => {
    try {
      const res = await fetch('/api/market-trends');
      if (res.ok) {
        const data = await res.json();
        setMarketData(data);
      }
    } catch (err) {
      console.error('Error loading market trends:', err);
    }
  };

  const loadInstitutionalData = async () => {
    try {
      const res = await fetch('/api/institutional/analytics');
      if (res.ok) {
        const data = await res.json();
        setInstitutionalData(data);
      }
    } catch (err) {
      console.error('Error loading institutional analytics:', err);
    }
  };

  const loadBusinessData = async () => {
    try {
      const res = await fetch('/api/pme/business-model');
      if (res.ok) {
        const data = await res.json();
        setBusinessData(data);
      }
    } catch (err) {
      console.error('Error loading business model:', err);
    }
  };

  const loadMessages = async (id) => {
    try {
      const res = await fetch(`/api/students/${id}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error loading counselor messages:', err);
    }
  };

  const handleLoginSuccess = (newStudent, newProfile) => {
    setStudent(newStudent);
    setProfile(newProfile);
    setStudentId(newStudent.id);
    localStorage.setItem('career_ai_user_id', newStudent.id);
    showNotification(`Welcome, ${newStudent.name}! Switched to your profile.`);
    runAssessmentPipeline(newStudent.id);
    loadMessages(newStudent.id);
    setActiveTab('assessment');
  };

  const handleUpgradeSuccess = (updatedStudent, invoice) => {
    setStudent(prev => ({ ...prev, ...updatedStudent, subscription_tier: 'pro' }));
    showNotification(`🎉 CareerAI Pro Activated! Invoice #${invoice?.invoiceNumber} generated.`);
  };

  // Stage 1 Trigger: Save Profile & Run Matching Pipeline
  const handleSaveAndAssess = async (updatedData) => {
    setIsAssessing(true);
    try {
      const res = await fetch(`/api/students/${studentId}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.updatedGuidance) {
          setRecommendations(data.updatedGuidance.recommendations || []);
          setTopMatch(data.updatedGuidance.topMatch || null);
          setSkillGaps(data.updatedGuidance.skillGaps || null);
          setRoadmap(data.updatedGuidance.personalizedRoadmap || []);
        }
        showNotification('Profile updated! Career guidance pipeline recalibrated.');
        setActiveTab('stage2-ml');
      }
    } catch (err) {
      console.error('Error saving profile and assessing:', err);
    } finally {
      setIsAssessing(false);
    }
  };

  // Continuous Refinement: Action on Career Match
  const handleSendFeedback = async (careerId, actionType, notes) => {
    try {
      const res = await fetch(`/api/students/${studentId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career_id: careerId,
          action_type: actionType,
          rating: actionType === 'accepted' ? 5 : actionType === 'shortlisted' ? 4 : 2,
          feedback_notes: notes || `Student marked ${actionType}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.refinedGuidance) {
          setRecommendations(data.refinedGuidance.recommendations || []);
          setTopMatch(data.refinedGuidance.topMatch || null);
          setSkillGaps(data.refinedGuidance.skillGaps || null);
          setRoadmap(data.refinedGuidance.personalizedRoadmap || []);
        }
        showNotification(`Career ${actionType}! Feedback refined your matching weights.`);
      }
    } catch (err) {
      console.error('Error sending career feedback:', err);
    }
  };

  // Continuous Refinement: Toggle Roadmap Milestone
  const handleToggleMilestone = async (milestoneId) => {
    try {
      const res = await fetch(`/api/students/${studentId}/milestones/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestone_id: milestoneId })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.refinedGuidance) {
          setRoadmap(data.refinedGuidance.personalizedRoadmap || []);
          setRecommendations(data.refinedGuidance.recommendations || []);
          setSkillGaps(data.refinedGuidance.skillGaps || null);
        }
        showNotification('Milestone updated! Employability score recalibrated.');
      }
    } catch (err) {
      console.error('Error toggling milestone:', err);
    }
  };

  // Send message in 24/7 AI Counselor Chat
  const handleSendMessage = async (msgText) => {
    setIsChatLoading(true);
    const tempUserMsg = {
      id: `temp-${Date.now()}`,
      sender: 'user',
      message: msgText,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await fetch(`/api/students/${studentId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText })
      });

      if (res.ok) {
        const reply = await res.json();
        setMessages(prev => [...prev, reply]);
      }
    } catch (err) {
      console.error('Error sending counselor message:', err);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPricingModal={() => setIsPricingModalOpen(true)}
      />

      {/* Floating Status Notification */}
      {statusNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 flex items-center space-x-2 animate-bounce">
          <span>✓</span>
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section Banner */}
        <HeroSection
          onStartAssessment={() => setActiveTab('assessment')}
          onExploreMarket={() => setActiveTab('market-trends')}
          onOpenPricing={() => setIsPricingModalOpen(true)}
        />

        {/* Dynamic Active Tab Content */}
        {activeTab === 'assessment' && (
          <ProfileAssessment
            student={student}
            profile={profile}
            onSaveAndAssess={handleSaveAndAssess}
            isAssessing={isAssessing}
          />
        )}

        {activeTab === 'stage2-ml' && (
          <MachineLearningModelStage2
            student={student}
            profile={profile}
            onProceedToMatches={() => setActiveTab('recommendations')}
          />
        )}

        {activeTab === 'recommendations' && (
          <CareerRecommendations
            recommendations={recommendations}
            selectedCareerId={topMatch?.careerId}
            onSendFeedback={handleSendFeedback}
            onViewRoadmap={(careerId) => {
              setActiveTab('roadmap');
            }}
            onViewSkillGaps={(careerId) => {
              setActiveTab('skill-gaps');
            }}
          />
        )}

        {activeTab === 'skill-gaps' && (
          <SkillGapAnalyzer
            skillGaps={skillGaps}
            topCareer={topMatch}
            onJumpToRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'roadmap' && (
          <PersonalizedRoadmap
            roadmap={roadmap}
            topCareer={topMatch}
            onToggleMilestone={handleToggleMilestone}
          />
        )}

        {activeTab === 'counselor' && (
          <AICounselorChat
            student={student}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isChatLoading}
          />
        )}

        {activeTab === 'market-trends' && (
          <MarketTrends marketData={marketData} />
        )}

        {activeTab === 'institutional' && (
          <InstitutionalPortal institutionalData={institutionalData} />
        )}

        {activeTab === 'pme-business' && (
          <BusinessModelPME
            businessData={businessData}
            onOpenPricing={() => setIsPricingModalOpen(true)}
            onJumpToInstitutional={() => setActiveTab('institutional')}
          />
        )}

        {activeTab === 'ethics' && (
          <EthicsPrivacy
            student={student}
            profile={profile}
            latestAssessment={topMatch}
          />
        )}
      </main>

      {/* Platform Architecture & Research Whitepaper Modal */}
      <ProjectInfoModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {/* User Authentication & Persona Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentUser={student}
      />

      {/* Monetization & Subscription Upgrade Checkout Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        student={student}
        onUpgradeSuccess={handleUpgradeSuccess}
      />

      {/* Universal Commercial SaaS Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-8 mt-16 text-xs text-slate-400 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-extrabold text-white text-sm">CareerAI<span className="text-indigo-400">Pro</span></span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
                Enterprise Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Autonomous Career Intelligence & Placement Acceleration Platform • © 2026 CareerAI Technologies Inc.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
            <button onClick={() => setIsPricingModalOpen(true)} className="hover:text-indigo-400 transition-colors">Pricing & Plans</button>
            <span>•</span>
            <button onClick={() => setIsProjectModalOpen(true)} className="hover:text-indigo-400 transition-colors">AI Architecture Whitepaper</button>
            <span>•</span>
            <button onClick={() => setActiveTab('ethics')} className="hover:text-indigo-400 transition-colors">Privacy Policy (DPDP & FERPA)</button>
            <span>•</span>
            <span className="text-slate-500">Enterprise Support: support@careerai.io</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
