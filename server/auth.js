const crypto = require('crypto');
const { query, getOne, run } = require('./db');
const { runCareerGuidancePipeline } = require('./ai_engine');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password || 'career123').digest('hex');
}

function verifyPassword(inputPassword, storedPassword) {
  if (!storedPassword) return false;
  // Support both plain text fallback (for demo accounts) and SHA256 hashed
  if (inputPassword === storedPassword) return true;
  const hashedInput = hashPassword(inputPassword);
  return hashedInput === storedPassword;
}

function registerStudent(studentData) {
  const {
    name,
    email,
    password,
    college = 'Global University / Independent',
    degree = 'B.Tech / B.S.',
    department = 'Computer Science & Technology',
    year_of_study = 'Third Year',
    cgpa = 8.0,
    subscription_tier = 'pro',
    technical_skills = ['Python', 'SQL'],
    interests = ['Artificial Intelligence', 'Software Engineering']
  } = studentData;

  const normalizedEmail = email.trim().toLowerCase();

  // Check if email already registered
  const existing = getOne('SELECT id FROM students WHERE LOWER(email) = ?', [normalizedEmail]);
  if (existing) {
    throw new Error('An account with this email address already exists. Please log in.');
  }

  const studentId = `user-${Date.now()}`;
  const hashedPassword = hashPassword(password);
  const now = new Date().toISOString();

  // 1. Insert into students
  run(`
    INSERT INTO students (id, name, email, password, college, degree, department, year_of_study, cgpa, subscription_tier, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    studentId,
    name.trim(),
    normalizedEmail,
    hashedPassword,
    college.trim(),
    degree.trim(),
    department.trim(),
    year_of_study,
    parseFloat(cgpa) || 8.0,
    subscription_tier,
    now
  ]);

  // 2. Insert into student_profiles
  run(`
    INSERT INTO student_profiles (
      student_id, technical_skills, soft_skills, interests, career_goals, work_preference, aptitude_scores, completed_milestones, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    studentId,
    JSON.stringify(technical_skills),
    JSON.stringify(['Analytical Thinking', 'Problem Solving', 'Teamwork']),
    JSON.stringify(interests),
    `Aspiring ${department.split(' ')[0]} professional aiming for high-growth tech opportunities.`,
    'hybrid',
    JSON.stringify({
      analytical: 84,
      logical: 82,
      technical: 86,
      creative: 78,
      collaboration: 82
    }),
    JSON.stringify([]),
    now
  ]);

  // 3. Welcome message from CareerAI Assistant
  run(`
    INSERT INTO counselor_messages (id, student_id, sender, message, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `, [
    `msg-welcome-${studentId}`,
    studentId,
    'assistant',
    `Welcome to CareerAI Pro, ${name}! Your personal career intelligence profile is activated. I am your 24/7 autonomous career mentor. Ask me anything about job roles, market salaries, skill gaps, or interview roadmaps!`,
    now
  ]);

  // 4. Run initial guidance pipeline
  let guidance = null;
  try {
    guidance = runCareerGuidancePipeline(studentId);
  } catch (err) {
    console.warn('Initial guidance pipeline run on registration:', err.message);
  }

  const newStudent = getOne('SELECT id, name, email, college, degree, department, year_of_study, cgpa, subscription_tier FROM students WHERE id = ?', [studentId]);
  const newProfile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [studentId]);

  return {
    student: newStudent,
    profile: {
      ...newProfile,
      technical_skills: JSON.parse(newProfile.technical_skills || '[]'),
      soft_skills: JSON.parse(newProfile.soft_skills || '[]'),
      interests: JSON.parse(newProfile.interests || '[]'),
      aptitude_scores: JSON.parse(newProfile.aptitude_scores || '{}'),
      completed_milestones: JSON.parse(newProfile.completed_milestones || '[]')
    },
    guidance
  };
}

function loginStudent(email, password) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const student = getOne('SELECT * FROM students WHERE LOWER(email) = ?', [normalizedEmail]);

  if (!student) {
    throw new Error('No registered account found with this email. Please register first.');
  }

  const isPasswordValid = verifyPassword(password, student.password);
  if (!isPasswordValid) {
    throw new Error('Incorrect password. Please verify your credentials and try again.');
  }

  let profile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [student.id]);
  if (!profile) {
    run(`
      INSERT INTO student_profiles (student_id, technical_skills, soft_skills, interests, career_goals, work_preference, aptitude_scores, completed_milestones, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [student.id, '["Python", "SQL"]', '["Problem Solving"]', '["Artificial Intelligence"]', '', 'hybrid', '{"analytical":80,"logical":80,"technical":80,"creative":75,"collaboration":80}', '[]', new Date().toISOString()]);
    profile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [student.id]);
  }

  return {
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
  };
}

module.exports = {
  hashPassword,
  verifyPassword,
  registerStudent,
  loginStudent
};
