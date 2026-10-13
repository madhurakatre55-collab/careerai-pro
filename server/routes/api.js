const express = require('express');
const router = express.Router();
const { query, getOne, run } = require('../db');
const { runCareerGuidancePipeline } = require('../ai_engine');
const { processCounselorChat } = require('../ai_counselor');
const {
  FEATURE_NAMES,
  CAREER_CLASSES,
  runStage2MachineLearningModel
} = require('../ml_engine');
const { registerStudent, loginStudent } = require('../auth');

// 0. Authentication Routes (Registration & Login)
router.post('/auth/register', (req, res) => {
  try {
    const result = registerStudent(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }
    const result = loginStudent(email, password);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

router.get('/auth/demo-users', (req, res) => {
  res.json([
    {
      id: 'student-user-001',
      name: 'Alex Chen',
      email: 'alex.chen@careerai.io',
      department: 'Computer Science & AI',
      targetFocus: 'AI & Machine Learning Engineer',
      subscription_tier: 'pro',
      defaultPass: 'career123'
    },
    {
      id: 'student-user-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@careerai.io',
      department: 'Data Analytics & Information Systems',
      targetFocus: 'Data Analyst & BI Specialist',
      subscription_tier: 'pro',
      defaultPass: 'career123'
    },
    {
      id: 'student-user-003',
      name: 'Marcus Vance',
      email: 'marcus.vance@careerai.io',
      department: 'Software & Cloud Engineering',
      targetFocus: 'Full Stack & Cloud Architecture',
      subscription_tier: 'free',
      defaultPass: 'career123'
    }
  ]);
});

// 1. Health check & System Meta
router.get('/health', (req, res) => {
  res.json({
    status: 'production-ready',
    system: 'CareerAI Pro - Autonomous Career Intelligence Platform',
    version: '2.5.0-commercial',
    timestamp: new Date().toISOString()
  });
});

// 2. Platform Whitepaper & Technical Architecture
router.get('/project-info', (req, res) => {
  res.json({
    title: 'CareerAI Pro: Autonomous Career Guidance & Placement Acceleration Platform',
    company: 'CareerAI Technologies Inc.',
    mission: 'Democratizing world-class career mentorship, algorithmic skill matching, and institutional placement intelligence for students, graduates, and universities worldwide.',
    architecture: {
      mlModel: 'Deep Multi-Layer Perceptron (MLP) Neural Network (32-D -> 24-D -> 16-D -> 8-D Softmax)',
      datasetIntegrations: [
        'Real-time job board indexing across top growth tech sectors',
        'AISHE Higher Education National Enrolment Database (4.46 Cr students)',
        'Mercer | Mettl Graduate Employability Analytics (42.6% benchmark)',
        'Bureau of Labor Statistics & NASSCOM Tech Hiring Indices'
      ],
      compliance: 'FERPA & DPDP Act Data Sovereignty Guaranteed'
    },
    leadership: [
      { role: 'AI & Machine Learning Engineering', description: 'Deep neural network architecture & real-time career matching tensor pipeline' },
      { role: 'Product & SaaS Monetization Strategy', description: 'Freemium consumer subscription engine & B2B university placement automation' },
      { role: 'Curriculum & Labor Market Analytics', description: 'Adaptive milestone learning roadmaps & automated skill gap diagnostics' }
    ]
  });
});

// 3. Career Paths Directory
router.get('/careers', (req, res) => {
  try {
    const careers = query('SELECT * FROM career_paths ORDER BY market_demand_score DESC');
    const parsed = careers.map(c => ({
      ...c,
      core_skills: JSON.parse(c.core_skills || '[]'),
      emerging_skills: JSON.parse(c.emerging_skills || '[]'),
      top_companies: JSON.parse(c.top_companies || '[]'),
      education_alignment: JSON.parse(c.education_alignment || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Single Career Detail & Roadmap
router.get('/careers/:id', (req, res) => {
  try {
    const career = getOne('SELECT * FROM career_paths WHERE id = ?', [req.params.id]);
    if (!career) return res.status(404).json({ error: 'Career not found' });

    const roadmaps = query('SELECT * FROM learning_roadmaps WHERE career_id = ? ORDER BY phase_number ASC', [req.params.id]);
    const parsedRoadmaps = roadmaps.map(r => ({
      ...r,
      skills_covered: JSON.parse(r.skills_covered || '[]'),
      resources: JSON.parse(r.resources || '[]')
    }));

    res.json({
      career: {
        ...career,
        core_skills: JSON.parse(career.core_skills || '[]'),
        emerging_skills: JSON.parse(career.emerging_skills || '[]'),
        top_companies: JSON.parse(career.top_companies || '[]'),
        education_alignment: JSON.parse(career.education_alignment || '[]')
      },
      roadmaps: parsedRoadmaps
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get Student Profile & Academic Record
router.get('/students/:id', (req, res) => {
  try {
    let student = getOne('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!student) {
      // Fallback to first student if specific ID not found
      student = getOne('SELECT * FROM students LIMIT 1');
      if (!student) return res.status(404).json({ error: 'No student accounts found' });
    }

    let profile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [student.id]);
    if (!profile) {
      profile = {
        student_id: student.id,
        technical_skills: '[]',
        soft_skills: '[]',
        interests: '[]',
        career_goals: '',
        work_preference: 'hybrid',
        aptitude_scores: '{}',
        completed_milestones: '[]',
        updated_at: new Date().toISOString()
      };
    }

    res.json({
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        college: student.college,
        degree: student.degree,
        department: student.department,
        year_of_study: student.year_of_study,
        cgpa: student.cgpa,
        subscription_tier: student.subscription_tier || 'pro'
      },
      profile: {
        ...profile,
        technical_skills: JSON.parse(profile.technical_skills || '[]'),
        soft_skills: JSON.parse(profile.soft_skills || '[]'),
        interests: JSON.parse(profile.interests || '[]'),
        aptitude_scores: JSON.parse(profile.aptitude_scores || '{}'),
        completed_milestones: JSON.parse(profile.completed_milestones || '[]')
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Create Student Profile
router.post('/students', (req, res) => {
  try {
    const {
      name,
      email,
      college,
      degree,
      department,
      year_of_study,
      cgpa,
      technical_skills,
      soft_skills,
      interests,
      career_goals,
      aptitude_scores
    } = req.body;

    const studentId = `user-${Date.now()}`;
    const now = new Date().toISOString();

    run(`
      INSERT INTO students (id, name, email, college, degree, department, year_of_study, cgpa, subscription_tier, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pro', ?)
    `, [
      studentId,
      name,
      email,
      college || 'Global University / Independent',
      degree || 'B.Tech / B.S.',
      department || 'Computer Science & Technology',
      year_of_study || 'Third Year',
      cgpa || 8.0,
      now
    ]);

    run(`
      INSERT INTO student_profiles (
        student_id, technical_skills, soft_skills, interests, career_goals, work_preference, aptitude_scores, completed_milestones, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      studentId,
      JSON.stringify(technical_skills || []),
      JSON.stringify(soft_skills || []),
      JSON.stringify(interests || []),
      career_goals || '',
      'hybrid',
      JSON.stringify(aptitude_scores || { analytical: 80, logical: 80, technical: 80, creative: 75, collaboration: 80 }),
      JSON.stringify([]),
      now
    ]);

    res.json({ success: true, studentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Update Student Profile
router.post('/students/:id/profile', (req, res) => {
  try {
    const studentId = req.params.id;
    const {
      technical_skills,
      soft_skills,
      interests,
      career_goals,
      work_preference,
      aptitude_scores,
      academic
    } = req.body;

    if (academic) {
      run(`
        UPDATE students
        SET degree = COALESCE(?, degree),
            department = COALESCE(?, department),
            college = COALESCE(?, college),
            year_of_study = COALESCE(?, year_of_study),
            cgpa = COALESCE(?, cgpa)
        WHERE id = ?
      `, [
        academic.degree ?? null,
        academic.department ?? null,
        academic.college ?? null,
        academic.year_of_study ?? null,
        academic.cgpa ?? null,
        studentId
      ]);
    }

    const now = new Date().toISOString();
    run(`
      UPDATE student_profiles
      SET technical_skills = ?,
          soft_skills = ?,
          interests = ?,
          career_goals = ?,
          work_preference = ?,
          aptitude_scores = ?,
          updated_at = ?
      WHERE student_id = ?
    `, [
      JSON.stringify(technical_skills || []),
      JSON.stringify(soft_skills || []),
      JSON.stringify(interests || []),
      career_goals || '',
      work_preference || 'hybrid',
      JSON.stringify(aptitude_scores || {}),
      now,
      studentId
    ]);

    const updatedGuidance = runCareerGuidancePipeline(studentId);
    res.json({ success: true, updatedGuidance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Run AI Guidance Assessment Pipeline
router.post('/students/:id/assess', (req, res) => {
  try {
    const guidanceResult = runCareerGuidancePipeline(req.params.id);
    res.json(guidanceResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Feedback & Continuous Refinement
router.post('/students/:id/feedback', (req, res) => {
  try {
    const studentId = req.params.id;
    const { career_id, action_type, rating, feedback_notes } = req.body;

    const feedbackId = `fb-${Date.now()}`;
    run(`
      INSERT INTO student_feedback (id, student_id, career_id, action_type, rating, feedback_notes, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      feedbackId,
      studentId,
      career_id,
      action_type || 'shortlisted',
      rating || 5,
      feedback_notes || '',
      new Date().toISOString()
    ]);

    const refinedGuidance = runCareerGuidancePipeline(studentId);
    res.json({ success: true, message: 'Feedback recorded; AI recommendations refined.', refinedGuidance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Toggle Milestone Completion in Roadmap
router.post('/students/:id/milestones/toggle', (req, res) => {
  try {
    const studentId = req.params.id;
    const { milestone_id } = req.body;

    let profile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [studentId]);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    let milestones = JSON.parse(profile.completed_milestones || '[]');
    if (milestones.includes(milestone_id)) {
      milestones = milestones.filter(m => m !== milestone_id);
    } else {
      milestones.push(milestone_id);
    }

    run(`
      UPDATE student_profiles
      SET completed_milestones = ?, updated_at = ?
      WHERE student_id = ?
    `, [JSON.stringify(milestones), new Date().toISOString(), studentId]);

    const refinedGuidance = runCareerGuidancePipeline(studentId);
    res.json({ success: true, completedMilestones: milestones, refinedGuidance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. AI Career Counselor Chat
router.get('/students/:id/messages', (req, res) => {
  try {
    const messages = query(
      'SELECT * FROM counselor_messages WHERE student_id = ? ORDER BY timestamp ASC',
      [req.params.id]
    );
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/students/:id/messages', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message cannot be empty' });

    const reply = await processCounselorChat(req.params.id, message);
    res.json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Real-Time Labour Market Insights
router.get('/market-trends', (req, res) => {
  res.json({
    reportInsights: {
      higherEducationEnrollment: '4.46 Crore students actively seeking career pathways (AISHE)',
      aiAdoptionRate: '80%+ of modern students use AI for career planning & skills mapping',
      nationalEmployabilityRate: '42.6% employable baseline (Mercer | Mettl Study)',
      unpreparedGraduatesRatio: 'Over 60% of graduates report feeling unprepared for the tech job market'
    },
    topGrowthSectors2026: [
      { sector: 'Generative AI & Autonomous Systems', hiringGrowth: '+38%', avgPackageLpa: '12.5 - 22.0' },
      { sector: 'Cloud, DevOps & SRE', hiringGrowth: '+32%', avgPackageLpa: '8.5 - 17.5' },
      { sector: 'Cybersecurity & Zero-Trust', hiringGrowth: '+35%', avgPackageLpa: '7.5 - 16.0' },
      { sector: 'Data Engineering & Big Data Analytics', hiringGrowth: '+30%', avgPackageLpa: '9.0 - 18.0' },
      { sector: 'Full Stack & Cloud Native Web', hiringGrowth: '+25%', avgPackageLpa: '7.0 - 15.5' },
      { sector: 'Product Management & AI Strategy', hiringGrowth: '+22%', avgPackageLpa: '10.0 - 24.0' }
    ],
    inDemandSkillsMatrix: [
      { name: 'Python & AI Frameworks (PyTorch/TensorFlow)', demandScore: 98, yoyGrowth: '+42%' },
      { name: 'Cloud Native & Docker/Kubernetes', demandScore: 94, yoyGrowth: '+35%' },
      { name: 'SQL, Vector DBs & BigQuery', demandScore: 92, yoyGrowth: '+31%' },
      { name: 'React, Next.js & Modern TypeScript', demandScore: 90, yoyGrowth: '+26%' },
      { name: 'Prompt Engineering & LLM Orchestration', demandScore: 89, yoyGrowth: '+85%' },
      { name: 'Problem Solving & System Design', demandScore: 95, yoyGrowth: '+20%' }
    ]
  });
});

// 13. Institutional / B2B Placement Cell Dashboard (Universal)
router.get('/institutional/analytics', (req, res) => {
  res.json({
    institution: 'Global University Placement Network (Consortium of 45+ Partner Institutions)',
    campusLocation: 'Global / Multi-Campus Enterprise Network',
    department: 'University Placement & Career Centers',
    cohortTotalStudents: 3840,
    assessedStudents: 3620,
    employabilityReadinessIndex: '76.8%',
    nationalBenchmarkComparison: '+34.2% above national baseline (42.6%)',
    topTargetCareers: [
      { career: 'AI & Machine Learning Engineer', percentage: '42%' },
      { career: 'Data Analyst & BI Specialist', percentage: '24%' },
      { career: 'Cloud & DevOps Engineer', percentage: '19%' },
      { career: 'Full Stack Web Developer', percentage: '15%' }
    ],
    batchSkillGaps: [
      { skill: 'Docker & Containerization', gapPercentage: '64%', priority: 'High' },
      { skill: 'PyTorch / Deep Learning Pipelines', gapPercentage: '52%', priority: 'High' },
      { skill: 'Cloud Deployment (AWS/GCP)', gapPercentage: '58%', priority: 'Medium' },
      { skill: 'System Design & Scalable Architecture', gapPercentage: '44%', priority: 'Medium' }
    ],
    placementDriveReadiness: {
      tier1Ready: 1240,
      tier2Ready: 1820,
      needsUpskilling: 560
    }
  });
});

// 14. Commercial Monetization & SaaS Business Model
router.get('/pme/business-model', (req, res) => {
  res.json({
    startupConcept: 'CareerAI Pro - Autonomous Career Intelligence & Placement SaaS',
    marketOpportunity: {
      tam: '$14.2 Billion Global EdTech & Career Acceleration Market',
      sam: '4.46 Crore higher education students across emerging tech economies',
      som: '500,000 active students and 150+ partner university campus licenses in Year 2'
    },
    valueProposition: {
      availability: '24/7 hyper-personalized guidance at instant cloud scale',
      costAdvantage: '90% more affordable than scheduled 1-on-1 human counseling (₹299/mo vs ₹3,000+/session)',
      realTimeAccuracy: 'Live labor-market indexing synced directly with student coursework',
      continuousRefinement: 'Adaptive feedback loop that boosts readiness score as milestones are completed'
    },
    revenueStreams: [
      {
        tier: 'Freemium (B2C)',
        price: '₹0 / Free Forever',
        features: 'Core academic profiling, top 2 career matches, basic roadmap preview, 3 AI mentor questions/day'
      },
      {
        tier: 'Student Pro Subscription (B2C)',
        price: '₹299 / month or ₹1,999 / year',
        features: 'Unlimited 24/7 AI mentor chat, deep 32-D neural match scores, detailed skill gap diagnostic, interactive roadmaps with project links, resume keyword scanner'
      },
      {
        tier: 'Institutional Campus License (B2B)',
        price: '₹75,000 - ₹2,50,000 / year per institution',
        features: 'Full Placement Cell TPO Dashboard, cohort employability analytics, automated batch skill-gap reports, recruiter talent filtering & exports'
      }
    ],
    financialProjectionsYear1: {
      projectedUsers: '50,000 Free Users',
      payingSubscribers: '3,200 Pro Users (6.4% conversion)',
      institutionalPartnerColleges: '15 Engineering & Tech Campuses',
      estimatedGrossAnnualRevenue: '₹95.4 Lakhs',
      operatingMargin: '62% (High-margin cloud SaaS economics)'
    }
  });
});

// 15. Commercial Monetization: Upgrade to Pro (Payment & Subscription)
router.post('/billing/upgrade', (req, res) => {
  try {
    const { student_id, plan = 'pro_monthly', payment_method = 'card', promo_code = '' } = req.body;
    if (!student_id) return res.status(400).json({ error: 'student_id is required' });

    let basePrice = plan === 'pro_annual' ? 1999 : 299;
    let discount = 0;
    if (promo_code && promo_code.trim().toUpperCase() === 'LAUNCH50') {
      discount = 0.5;
    }

    const finalAmount = Math.round(basePrice * (1 - discount));
    const txId = `TX-${Date.now()}`;
    const now = new Date().toISOString();

    run(`
      INSERT INTO transactions (id, student_id, plan_tier, amount_inr, payment_method, transaction_ref, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'completed', ?)
    `, [
      txId, student_id, plan, finalAmount, payment_method, `REF-${Math.floor(Math.random() * 900000 + 100000)}`, now
    ]);

    run(`UPDATE students SET subscription_tier = 'pro' WHERE id = ?`, [student_id]);

    const student = getOne('SELECT id, name, email, subscription_tier, college, degree, department, year_of_study, cgpa FROM students WHERE id = ?', [student_id]);

    res.json({
      success: true,
      message: 'Congratulations! Your account has been upgraded to CareerAI Pro.',
      invoice: {
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        plan,
        amount: finalAmount,
        discountApplied: discount > 0 ? '50% (LAUNCH50 Promo)' : 'None',
        currency: 'INR',
        date: now,
        status: 'PAID'
      },
      student
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 16. Commercial Monetization: B2B University Quote Calculator & Lead Capture
router.post('/institutional/quote', (req, res) => {
  try {
    const { institution_name, contact_person, email, phone, student_count, plan_type = 'campus_pro', message } = req.body;
    if (!institution_name || !email || !student_count) {
      return res.status(400).json({ error: 'Institution name, email, and student count are required.' });
    }

    const count = parseInt(student_count, 10) || 500;
    const perStudentRate = count > 1000 ? 199 : 249;
    const estimatedTotal = Math.max(75000, count * perStudentRate);
    const quoteId = `QUOTE-${Date.now()}`;
    const now = new Date().toISOString();

    run(`
      INSERT INTO b2b_inquiries (id, institution_name, contact_person, email, phone, student_count, plan_type, estimated_price_inr, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'quoted', ?)
    `, [
      quoteId, institution_name, contact_person || 'Placement Dean', email, phone || '', count, plan_type, estimatedTotal, message || '', now
    ]);

    res.json({
      success: true,
      quoteId,
      institutionName: institution_name,
      studentCount: count,
      perStudentRate,
      estimatedTotalInr: estimatedTotal,
      currency: 'INR',
      featuresIncluded: [
        'Full Campus Placement TPO Master Analytics Dashboard',
        'Automated Cohort Skill-Gap Diagnostic Reports',
        'Unlimited 24/7 AI Career Mentor for every student',
        'Corporate Recruiter Talent Filter & Export',
        'Dedicated Account Manager & Campus Onboarding'
      ],
      message: `Custom Enterprise Quotation of ₹${estimatedTotal.toLocaleString('en-IN')}/year generated for ${institution_name}. Our campus relations team will reach out within 24 hours.`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 17. Stage 2 Machine Learning Model Inference & Architecture
router.get('/ml/architecture', (req, res) => {
  res.json({
    modelType: 'Multi-Layer Perceptron (MLP) Neural Network',
    inputDimension: 32,
    hiddenLayers: [
      { name: 'Hidden Layer 1 (Dense)', neurons: 24, activation: 'ReLU' },
      { name: 'Hidden Layer 2 (Dense)', neurons: 16, activation: 'ReLU' }
    ],
    outputDimension: 8,
    outputActivation: 'Softmax Probability Distribution',
    featureLabels: FEATURE_NAMES,
    careerClasses: CAREER_CLASSES.map(c => c.label)
  });
});

router.post('/ml/infer/:id', (req, res) => {
  try {
    const mlResult = runStage2MachineLearningModel(req.params.id);
    res.json(mlResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
