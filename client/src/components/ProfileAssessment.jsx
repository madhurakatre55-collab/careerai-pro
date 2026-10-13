import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  GraduationCap, 
  Sliders, 
  Lightbulb, 
  Plus, 
  X, 
  ArrowRight, 
  Check, 
  RefreshCw 
} from 'lucide-react';

const COMMON_TECH_SKILLS = [
  'Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow',
  'SQL', 'PostgreSQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'FastAPI',
  'React.js', 'Node.js', 'JavaScript', 'TypeScript', 'Next.js', 'HTML5 & CSS3',
  'Docker', 'Kubernetes', 'Linux', 'AWS', 'Azure', 'Git & GitHub',
  'Power BI', 'Tableau', 'Excel & Advanced Analytics', 'Data Warehousing',
  'Network Security', 'SIEM & Threat Detection', 'Cryptography',
  'Flutter', 'REST APIs', 'System Design'
];

const COMMON_INTERESTS = [
  'Artificial Intelligence', 'Data Science', 'Generative AI', 'Cloud Computing',
  'Full Stack Web Development', 'Cybersecurity', 'Fintech', 'Autonomous Systems',
  'Product Strategy', 'Open Source', 'Big Data Architecture', 'Mobile Apps'
];

export default function ProfileAssessment({ 
  student, 
  profile, 
  onSaveAndAssess, 
  isAssessing 
}) {
  const [techSkills, setTechSkills] = useState(profile?.technical_skills || ['Python', 'SQL', 'Machine Learning']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [interests, setInterests] = useState(profile?.interests || ['Artificial Intelligence', 'Data Science']);
  const [careerGoals, setCareerGoals] = useState(profile?.career_goals || 'Aspiring to lead AI/ML engineering initiatives and build impactful products.');
  const [cgpa, setCgpa] = useState(student?.cgpa || 8.5);
  const [yearOfStudy, setYearOfStudy] = useState(student?.year_of_study || 'Third Year');
  const [department, setDepartment] = useState(student?.department || 'Computer Science & Artificial Intelligence');

  // Aptitude vector scores (0-100)
  const [aptitude, setAptitude] = useState(profile?.aptitude_scores || {
    analytical: 88,
    logical: 85,
    technical: 86,
    creative: 78,
    collaboration: 82
  });

  const handleAddSkill = (skill) => {
    if (skill && !techSkills.includes(skill)) {
      setTechSkills([...techSkills, skill]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setTechSkills(techSkills.filter(s => s !== skill));
  };

  const handleToggleInterest = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleAptitudeChange = (key, value) => {
    setAptitude(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAndAssess({
      technical_skills: techSkills,
      interests,
      career_goals: careerGoals,
      aptitude_scores: aptitude,
      academic: {
        cgpa: parseFloat(cgpa),
        year_of_study: yearOfStudy,
        department
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Stage Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Stage 1: Profile Vectorization</h2>
            <p className="text-xs text-slate-400">Collects academic history, current skills, aptitude, and aspirations into feature vectors</p>
          </div>
        </div>
        <div className="inline-flex items-center text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 px-3 py-1.5 rounded-lg font-medium">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
          <span>Continuous ML Feedback Ready</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Academic Profile Details */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 mb-4 text-white font-bold text-sm">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Academic Background</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Department / Major</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Computer Science, AI & Data Science"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Year / Academic Level</label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Final Year">Final Year</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cumulative CGPA / Marks</label>
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
        </div>

        {/* Technical Skills Inventory */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>Current Technical Skills Inventory ({techSkills.length} selected)</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Click to add/remove</span>
          </div>

          {/* Active Skills Chips */}
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-950/70 border border-slate-800 rounded-lg min-h-[50px] items-center">
            {techSkills.length === 0 ? (
              <span className="text-xs text-slate-500 italic">No skills added yet. Click suggestions below or type your own.</span>
            ) : (
              techSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1.5 bg-indigo-950/70 text-indigo-300 border border-indigo-700/60 px-2.5 py-1 rounded-md text-xs font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Custom Skill Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(newSkillInput.trim());
                }
              }}
              placeholder="Add another skill (e.g. Scikit-learn, FastAPI, Next.js)..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleAddSkill(newSkillInput.trim())}
              className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Common Suggestions */}
          <div>
            <p className="text-[11px] text-slate-400 font-semibold mb-2">Recommended Suggestions:</p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TECH_SKILLS.filter(s => !techSkills.includes(s)).slice(0, 14).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  className="text-[11px] bg-slate-800 hover:bg-indigo-950/80 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500 px-2.5 py-1 rounded-md transition-colors font-medium"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Aptitude & Cognitive Vectors */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Cognitive & Aptitude Profile Vector</span>
            </div>
            <span className="text-[11px] text-indigo-300 font-mono font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
              Multi-dimensional ML Features
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Analytical & Mathematical Reasoning</span>
                <span className="text-indigo-400 font-bold">{aptitude.analytical}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={aptitude.analytical}
                onChange={(e) => handleAptitudeChange('analytical', e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Algorithmic & Logical Problem Solving</span>
                <span className="text-indigo-400 font-bold">{aptitude.logical}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={aptitude.logical}
                onChange={(e) => handleAptitudeChange('logical', e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Systems & Technical Engineering Intuition</span>
                <span className="text-indigo-400 font-bold">{aptitude.technical}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={aptitude.technical}
                onChange={(e) => handleAptitudeChange('technical', e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Creative Innovation & UI/Product Sense</span>
                <span className="text-purple-400 font-bold">{aptitude.creative}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={aptitude.creative}
                onChange={(e) => handleAptitudeChange('creative', e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Team Collaboration & Communication</span>
                <span className="text-emerald-400 font-bold">{aptitude.collaboration}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={aptitude.collaboration}
                onChange={(e) => handleAptitudeChange('collaboration', e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Interests & Career Aspirations */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 text-white font-bold text-sm mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Target Interests & Professional Aspiration</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {COMMON_INTERESTS.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleToggleInterest(interest)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selected
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700 font-medium'
                  }`}
                >
                  {selected && '✓ '}
                  {interest}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Long-Term Career Statement</label>
            <textarea
              rows="2"
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
              placeholder="Describe your target dream job or industries you want to impact..."
            />
          </div>
        </div>

        {/* Submit & Run Pipeline Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isAssessing}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {isAssessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Machine Learning Model...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Machine Learning Model & Proceed to Stage 2</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
