/**
 * AI-Driven Career Matching Engine & Pipeline
 * Implements the 3-Stage Pipeline described in the NMIET PME Project Report:
 *  1. Student Profile Analysis (Vectorization)
 *  2. AI Matching Engine & Market Integration
 *  3. Personalized Roadmap & Continuous Refinement
 */

const { query, getOne, run } = require('./db');

// Career cognitive archetype weights
const CAREER_APTITUDE_PROFILES = {
  'ai-ml-engineer': { analytical: 0.35, logical: 0.30, technical: 0.25, creative: 0.05, collaboration: 0.05 },
  'data-analyst': { analytical: 0.40, logical: 0.25, technical: 0.15, creative: 0.10, collaboration: 0.10 },
  'full-stack-dev': { analytical: 0.20, logical: 0.25, technical: 0.35, creative: 0.10, collaboration: 0.10 },
  'cloud-devops-engineer': { analytical: 0.25, logical: 0.25, technical: 0.35, creative: 0.05, collaboration: 0.10 },
  'cybersecurity-analyst': { analytical: 0.30, logical: 0.35, technical: 0.25, creative: 0.05, collaboration: 0.05 },
  'data-engineer': { analytical: 0.30, logical: 0.25, technical: 0.35, creative: 0.05, collaboration: 0.05 },
  'product-manager': { analytical: 0.20, logical: 0.15, technical: 0.15, creative: 0.25, collaboration: 0.25 },
  'ui-ux-designer': { analytical: 0.10, logical: 0.10, technical: 0.15, creative: 0.40, collaboration: 0.25 }
};

/**
 * Normalizes string for fuzzy/case-insensitive matching
 */
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Stage 1: Vectorize Student Profile
 */
function extractStudentVectors(student, profile) {
  const techSkills = typeof profile.technical_skills === 'string'
    ? JSON.parse(profile.technical_skills || '[]')
    : (profile.technical_skills || []);

  const softSkills = typeof profile.soft_skills === 'string'
    ? JSON.parse(profile.soft_skills || '[]')
    : (profile.soft_skills || []);

  const interests = typeof profile.interests === 'string'
    ? JSON.parse(profile.interests || '[]')
    : (profile.interests || []);

  const aptitude = typeof profile.aptitude_scores === 'string'
    ? JSON.parse(profile.aptitude_scores || '{}')
    : (profile.aptitude_scores || {});

  const completedMilestones = typeof profile.completed_milestones === 'string'
    ? JSON.parse(profile.completed_milestones || '[]')
    : (profile.completed_milestones || []);

  const academicCgpa = parseFloat(student.cgpa) || 7.0;
  const department = student.department || '';

  return {
    studentId: student.id,
    name: student.name,
    techSkills,
    softSkills,
    interests,
    aptitude: {
      analytical: aptitude.analytical || 70,
      logical: aptitude.logical || 70,
      technical: aptitude.technical || 70,
      creative: aptitude.creative || 70,
      collaboration: aptitude.collaboration || 70
    },
    completedMilestones,
    academicCgpa,
    department
  };
}

/**
 * Stage 2: Calculate Multi-Factor Match Confidence
 */
function evaluateCareerMatch(studentVector, career, feedbackModifier = 0) {
  const coreSkills = JSON.parse(career.core_skills || '[]');
  const emergingSkills = JSON.parse(career.emerging_skills || '[]');
  const educationAlignment = JSON.parse(career.education_alignment || '[]');

  const normStudentTech = studentVector.techSkills.map(normalize);
  const normInterests = studentVector.interests.map(normalize);

  // 1. Core Skills Match
  let matchedCoreCount = 0;
  const matchedSkills = [];
  const missingCoreSkills = [];

  coreSkills.forEach(skill => {
    const norm = normalize(skill);
    const hasSkill = normStudentTech.some(s => s.includes(norm) || norm.includes(s));
    if (hasSkill) {
      matchedCoreCount++;
      matchedSkills.push(skill);
    } else {
      missingCoreSkills.push(skill);
    }
  });

  const skillScore = coreSkills.length > 0 ? (matchedCoreCount / coreSkills.length) * 100 : 50;

  // 2. Emerging Skills Bonus
  let matchedEmergingCount = 0;
  const missingEmergingSkills = [];
  emergingSkills.forEach(skill => {
    const norm = normalize(skill);
    const hasSkill = normStudentTech.some(s => s.includes(norm) || norm.includes(s));
    if (hasSkill) {
      matchedEmergingCount++;
      matchedSkills.push(skill);
    } else {
      missingEmergingSkills.push(skill);
    }
  });

  const emergingBonus = emergingSkills.length > 0
    ? (matchedEmergingCount / emergingSkills.length) * 15
    : 0;

  // 3. Academic & Department Alignment
  const normDept = normalize(studentVector.department);
  const academicMatch = educationAlignment.some(edu => {
    const normEdu = normalize(edu);
    return normDept.includes(normEdu) || normEdu.includes(normDept);
  });
  const academicScore = academicMatch ? 95 : 75;

  // 4. Aptitude Vector Alignment
  const careerArchetype = CAREER_APTITUDE_PROFILES[career.id] || {
    analytical: 0.2, logical: 0.2, technical: 0.2, creative: 0.2, collaboration: 0.2
  };

  const weightedAptitude = (
    (studentVector.aptitude.analytical * careerArchetype.analytical) +
    (studentVector.aptitude.logical * careerArchetype.logical) +
    (studentVector.aptitude.technical * careerArchetype.technical) +
    (studentVector.aptitude.creative * careerArchetype.creative) +
    (studentVector.aptitude.collaboration * careerArchetype.collaboration)
  );

  // 5. Interest Vector Alignment
  const careerKeywords = [career.title, career.category, ...coreSkills].map(normalize);
  let interestMatchCount = 0;
  normInterests.forEach(interest => {
    if (careerKeywords.some(kw => kw.includes(interest) || interest.includes(kw))) {
      interestMatchCount++;
    }
  });
  const interestScore = normInterests.length > 0
    ? Math.min(100, 50 + (interestMatchCount * 25))
    : 70;

  // 6. Real-time Market Demand Factor (from report: labor-market data integration)
  const marketDemandFactor = (career.market_demand_score || 85);

  // 7. Continuous Refinement & Milestone Progress Bonus
  const milestoneBonus = studentVector.completedMilestones.filter(m => m.includes(career.id)).length * 5;

  // Weighted composite score (Total Confidence)
  // Weights: Skills (35%), Aptitude (25%), Academic & Interest (20%), Market (15%), Milestones & Feedback (5%)
  let rawScore = (
    (skillScore * 0.35) +
    (emergingBonus * 0.05) +
    (weightedAptitude * 0.25) +
    (((academicScore * 0.5) + (interestScore * 0.5)) * 0.20) +
    (marketDemandFactor * 0.15) +
    milestoneBonus +
    feedbackModifier
  );

  const matchConfidence = Math.min(99, Math.max(35, Math.round(rawScore)));

  // Generate "Why this career fits you" explanation
  const reasons = [];
  if (matchedCoreCount >= 2) {
    reasons.push(`Strong overlap with your skills in ${matchedSkills.slice(0, 3).join(', ')}.`);
  }
  if (academicMatch) {
    reasons.push(`Directly aligned with your academic curriculum in ${studentVector.department}.`);
  }
  if (weightedAptitude > 80) {
    reasons.push(`Your high aptitude profile correlates strongly with industry requirements for this role.`);
  }
  if (marketDemandFactor >= 90) {
    reasons.push(`High industry demand (${career.growth_rate}) with significant hiring activity.`);
  }

  return {
    careerId: career.id,
    title: career.title,
    category: career.category,
    description: career.description,
    matchConfidence,
    avgSalaryInr: career.avg_salary_inr,
    avgSalaryUsd: career.avg_salary_usd,
    growthRate: career.growth_rate,
    marketDemandScore: career.market_demand_score,
    employabilityIndex: career.employability_index,
    topCompanies: JSON.parse(career.top_companies || '[]'),
    iconName: career.icon_name,
    matchedSkills,
    missingCoreSkills,
    missingEmergingSkills,
    fitReasons: reasons,
    scoresBreakdown: {
      skillScore: Math.round(skillScore),
      aptitudeScore: Math.round(weightedAptitude),
      academicScore: Math.round(academicScore),
      marketFactor: marketDemandFactor
    }
  };
}

/**
 * Stage 3: Generate Comprehensive Recommendations, Skill Gaps & Action Roadmap
 */
function runCareerGuidancePipeline(studentId) {
  const student = getOne('SELECT * FROM students WHERE id = ?', [studentId]);
  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  let profile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [studentId]);
  if (!profile) {
    profile = {
      technical_skills: '[]',
      soft_skills: '[]',
      interests: '[]',
      career_goals: '',
      work_preference: 'hybrid',
      aptitude_scores: '{}',
      completed_milestones: '[]'
    };
  }

  // Check previous feedback for continuous refinement
  const feedbackList = query('SELECT * FROM student_feedback WHERE student_id = ?', [studentId]);
  const feedbackModifiers = {};
  feedbackList.forEach(fb => {
    if (fb.action_type === 'accepted' || fb.action_type === 'shortlisted') {
      feedbackModifiers[fb.career_id] = (feedbackModifiers[fb.career_id] || 0) + 8;
    } else if (fb.action_type === 'rejected') {
      feedbackModifiers[fb.career_id] = (feedbackModifiers[fb.career_id] || 0) - 15;
    }
  });

  const studentVector = extractStudentVectors(student, profile);
  const allCareers = query('SELECT * FROM career_paths');

  const matches = allCareers.map(career => {
    const modifier = feedbackModifiers[career.id] || 0;
    return evaluateCareerMatch(studentVector, career, modifier);
  });

  // Sort by match confidence descending
  matches.sort((a, b) => b.matchConfidence - a.matchConfidence);

  const topMatch = matches[0];

  // Synthesize Comprehensive Skill Gap Analysis for the top career paths
  const skillGaps = {
    topCareerId: topMatch.careerId,
    topCareerTitle: topMatch.title,
    criticalGaps: topMatch.missingCoreSkills.map(skill => ({
      skill,
      priority: 'High - Immediate Prerequisite',
      estimatedTimeToLearn: '2-4 Weeks',
      status: 'Missing'
    })),
    recommendedGaps: topMatch.missingEmergingSkills.map(skill => ({
      skill,
      priority: 'Medium - Competitive Edge',
      estimatedTimeToLearn: '1-3 Weeks',
      status: 'Emerging Trend'
    })),
    acquiredSkills: topMatch.matchedSkills.map(skill => ({
      skill,
      status: 'Mastered / In Progress'
    })),
    readinessScore: Math.round(
      (topMatch.matchedSkills.length /
        (topMatch.matchedSkills.length + topMatch.missingCoreSkills.length || 1)) * 100
    )
  };

  // Fetch roadmap milestones for top match
  const roadmaps = query(
    'SELECT * FROM learning_roadmaps WHERE career_id = ? ORDER BY phase_number ASC',
    [topMatch.careerId]
  );

  const completedSet = new Set(studentVector.completedMilestones);
  const personalizedRoadmap = roadmaps.map(r => ({
    ...r,
    skills_covered: JSON.parse(r.skills_covered || '[]'),
    resources: JSON.parse(r.resources || '[]'),
    isCompleted: completedSet.has(r.id)
  }));

  // Save assessment snapshot
  const assessmentId = `assess-${Date.now()}`;
  run(`
    INSERT INTO assessment_history (id, student_id, recommendations, skill_gaps, aptitude_summary, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [
    assessmentId,
    studentId,
    JSON.stringify(matches.slice(0, 5)),
    JSON.stringify(skillGaps),
    JSON.stringify(studentVector.aptitude),
    new Date().toISOString()
  ]);

  return {
    student: {
      id: student.id,
      name: student.name,
      college: student.college,
      degree: student.degree,
      department: student.department,
      year: student.year_of_study,
      cgpa: student.cgpa
    },
    recommendations: matches,
    topMatch,
    skillGaps,
    personalizedRoadmap,
    continuousRefinementActive: true,
    assessmentDate: new Date().toISOString()
  };
}

module.exports = {
  extractStudentVectors,
  evaluateCareerMatch,
  runCareerGuidancePipeline
};
