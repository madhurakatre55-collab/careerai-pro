const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const DB_PATH = path.join(__dirname, 'career_guidance.sqlite');

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_PATH);
      dbInstance = new SQL.Database(fileBuffer);
    } catch (err) {
      console.warn('Warning: Could not read existing DB file, creating fresh database:', err.message);
      dbInstance = new SQL.Database();
    }
  } else {
    dbInstance = new SQL.Database();
  }

  initTables(dbInstance);
  saveDb();
  return dbInstance;
}

function saveDb() {
  if (!dbInstance) return;
  try {
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  } catch (err) {
    console.error('Error saving SQLite database to disk:', err);
  }
}

function sanitizeParams(params) {
  if (!Array.isArray(params)) return [];
  return params.map(p => (p === undefined ? null : p));
}

function query(sql, params = []) {
  if (!dbInstance) throw new Error('DB not initialized');
  const safeParams = sanitizeParams(params);
  const stmt = dbInstance.prepare(sql);
  if (safeParams && safeParams.length) {
    stmt.bind(safeParams);
  }
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function getOne(sql, params = []) {
  const rows = query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

function run(sql, params = []) {
  if (!dbInstance) throw new Error('DB not initialized');
  const safeParams = sanitizeParams(params);
  dbInstance.run(sql, safeParams);
  saveDb();
}

function initTables(db) {
  // 1. Students (Universal Users with Subscription Tier)
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT DEFAULT 'career123',
      college TEXT NOT NULL,
      degree TEXT NOT NULL,
      department TEXT NOT NULL,
      year_of_study TEXT NOT NULL,
      cgpa REAL DEFAULT 7.5,
      subscription_tier TEXT DEFAULT 'pro',
      created_at TEXT NOT NULL
    );
  `);

  try {
    db.run("ALTER TABLE students ADD COLUMN password TEXT DEFAULT 'career123';");
  } catch (err) {
    // Ignore if column exists
  }

  try {
    db.run("ALTER TABLE students ADD COLUMN subscription_tier TEXT DEFAULT 'pro';");
  } catch (err) {
    // Ignore if column exists
  }

  // 2. Student Profiles
  db.run(`
    CREATE TABLE IF NOT EXISTS student_profiles (
      student_id TEXT PRIMARY KEY,
      technical_skills TEXT DEFAULT '[]',
      soft_skills TEXT DEFAULT '[]',
      interests TEXT DEFAULT '[]',
      career_goals TEXT DEFAULT '',
      work_preference TEXT DEFAULT 'hybrid',
      aptitude_scores TEXT DEFAULT '{}',
      completed_milestones TEXT DEFAULT '[]',
      updated_at TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);

  // 3. Career Paths
  db.run(`
    CREATE TABLE IF NOT EXISTS career_paths (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      core_skills TEXT NOT NULL,
      emerging_skills TEXT NOT NULL,
      avg_salary_inr TEXT NOT NULL,
      avg_salary_usd TEXT NOT NULL,
      growth_rate TEXT NOT NULL,
      market_demand_score INTEGER NOT NULL,
      employability_index INTEGER NOT NULL,
      top_companies TEXT NOT NULL,
      education_alignment TEXT NOT NULL,
      icon_name TEXT DEFAULT 'Briefcase'
    );
  `);

  // 4. Learning Roadmaps
  db.run(`
    CREATE TABLE IF NOT EXISTS learning_roadmaps (
      id TEXT PRIMARY KEY,
      career_id TEXT NOT NULL,
      phase_number INTEGER NOT NULL,
      phase_title TEXT NOT NULL,
      duration_weeks INTEGER NOT NULL,
      description TEXT NOT NULL,
      skills_covered TEXT NOT NULL,
      resources TEXT NOT NULL,
      FOREIGN KEY (career_id) REFERENCES career_paths(id) ON DELETE CASCADE
    );
  `);

  // 5. Assessment History
  db.run(`
    CREATE TABLE IF NOT EXISTS assessment_history (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      recommendations TEXT NOT NULL,
      skill_gaps TEXT NOT NULL,
      aptitude_summary TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);

  // 6. Student Feedback & Continuous Refinement
  db.run(`
    CREATE TABLE IF NOT EXISTS student_feedback (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      career_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      feedback_notes TEXT DEFAULT '',
      created_at TEXT NOT NULL
    );
  `);

  // 7. Counselor Messages
  db.run(`
    CREATE TABLE IF NOT EXISTS counselor_messages (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      sender TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);

  // 8. Commercial Monetization: Transactions & Invoices
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      plan_tier TEXT NOT NULL,
      amount_inr REAL NOT NULL,
      payment_method TEXT NOT NULL,
      transaction_ref TEXT NOT NULL,
      status TEXT DEFAULT 'completed',
      created_at TEXT NOT NULL
    );
  `);

  // 9. Commercial Monetization: B2B University & Campus License Inquiries
  db.run(`
    CREATE TABLE IF NOT EXISTS b2b_inquiries (
      id TEXT PRIMARY KEY,
      institution_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      student_count INTEGER NOT NULL,
      plan_type TEXT NOT NULL,
      estimated_price_inr INTEGER NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT NOT NULL
    );
  `);

  // Seed default data if career_paths is empty
  const careerCount = getOne('SELECT COUNT(*) as count FROM career_paths');
  if (!careerCount || careerCount.count === 0) {
    seedDatabase(db);
  } else {
    // Ensure universal accounts are active
    seedUniversalAccounts(db);
  }
}

function seedDatabase(db) {
  console.log('Seeding initial career catalog and universal roadmap data...');

  const careers = [
    {
      id: 'ai-ml-engineer',
      title: 'AI & Machine Learning Engineer',
      category: 'Artificial Intelligence & Data',
      description: 'Designs, develops, and deploys predictive machine learning models, neural networks, and generative AI systems into production software.',
      core_skills: JSON.stringify(['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Data Preprocessing', 'Mathematics & Linear Algebra']),
      emerging_skills: JSON.stringify(['LLMs & Transformers', 'MLOps', 'Vector Databases', 'LangChain', 'Prompt Engineering', 'Kubeflow']),
      avg_salary_inr: '₹8.5 - 18.0 LPA',
      avg_salary_usd: '$110,000 - $165,000',
      growth_rate: '+36% YoY',
      market_demand_score: 96,
      employability_index: 92,
      top_companies: JSON.stringify(['Google', 'Microsoft', 'NVIDIA', 'Amazon AWS', 'OpenAI', 'Meta', 'Databricks']),
      education_alignment: JSON.stringify(['Artificial Intelligence & Data Science', 'Computer Science', 'Information Technology', 'Mathematics', 'Software Engineering']),
      icon_name: 'Cpu'
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst & BI Specialist',
      category: 'Data Analytics & Business Intelligence',
      description: 'Transforms raw organizational data into actionable business intelligence through statistical modeling, visualization dashboards, and executive reporting.',
      core_skills: JSON.stringify(['SQL', 'Python', 'Power BI', 'Tableau', 'Excel & Advanced Analytics', 'Exploratory Data Analysis', 'Descriptive Statistics']),
      emerging_skills: JSON.stringify(['BigQuery', 'dbt', 'Data Storytelling', 'Automated ETL', 'Predictive Forecasting']),
      avg_salary_inr: '₹5.5 - 12.0 LPA',
      avg_salary_usd: '$75,000 - $110,000',
      growth_rate: '+28% YoY',
      market_demand_score: 91,
      employability_index: 88,
      top_companies: JSON.stringify(['Accenture', 'Deloitte', 'EY', 'Flipkart', 'Zomato', 'JPMorgan Chase', 'McKinsey']),
      education_alignment: JSON.stringify(['AI & Data Science', 'Information Technology', 'Computer Engineering', 'Statistics', 'Economics', 'Business Analytics']),
      icon_name: 'BarChart3'
    },
    {
      id: 'full-stack-dev',
      title: 'Full Stack Web Developer',
      category: 'Software Engineering',
      description: 'Builds end-to-end web applications encompassing dynamic user interfaces, RESTful APIs, secure authentication, and cloud-native database architectures.',
      core_skills: JSON.stringify(['JavaScript', 'React.js', 'Node.js', 'Express.js', 'SQL / PostgreSQL', 'HTML5 & CSS3', 'Git & GitHub']),
      emerging_skills: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Docker', 'GraphQL', 'Microservices', 'CI/CD']),
      avg_salary_inr: '₹6.0 - 15.0 LPA',
      avg_salary_usd: '$85,000 - $135,000',
      growth_rate: '+24% YoY',
      market_demand_score: 93,
      employability_index: 90,
      top_companies: JSON.stringify(['Uber', 'Stripe', 'Atlassian', 'Razorpay', 'Swiggy', 'Postman', 'Vercel']),
      education_alignment: JSON.stringify(['Computer Science', 'Information Technology', 'Software Engineering', 'Electronics & Comm', 'Independent Bootcamp']),
      icon_name: 'Globe'
    },
    {
      id: 'cloud-devops-engineer',
      title: 'Cloud & DevOps Engineer',
      category: 'Infrastructure & Cloud Systems',
      description: 'Automates software delivery pipelines, manages scalable cloud infrastructure (AWS/Azure/GCP), and ensures high system resilience, security, and uptime.',
      core_skills: JSON.stringify(['Linux', 'AWS / Azure', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Python/Bash Scripting', 'Networking Fundamentals']),
      emerging_skills: JSON.stringify(['Terraform / IaC', 'GitOps / ArgoCD', 'Observability (Prometheus/Grafana)', 'Site Reliability Engineering (SRE)', 'Zero Trust Security']),
      avg_salary_inr: '₹7.5 - 16.5 LPA',
      avg_salary_usd: '$95,000 - $150,000',
      growth_rate: '+32% YoY',
      market_demand_score: 94,
      employability_index: 89,
      top_companies: JSON.stringify(['Amazon Web Services', 'Microsoft Azure', 'Red Hat', 'Cisco', 'IBM', 'Oracle', 'CrowdStrike']),
      education_alignment: JSON.stringify(['Computer Science', 'Cloud Computing', 'Information Technology', 'Systems Engineering']),
      icon_name: 'Cloud'
    },
    {
      id: 'cybersecurity-analyst',
      title: 'Cybersecurity & SOC Analyst',
      category: 'Information Security',
      description: 'Defends computer systems, networks, and enterprise data assets from cyber threats, unauthorized breaches, and security vulnerabilities.',
      core_skills: JSON.stringify(['Network Security', 'Linux Administration', 'Threat Detection & SIEM', 'Vulnerability Assessment', 'Cryptography', 'Python Scripting']),
      emerging_skills: JSON.stringify(['Cloud Security (AWS/GCP)', 'Zero Trust Architecture', 'Incident Response Automation', 'Identity & Access Management (IAM)', 'AI in Cyber Defense']),
      avg_salary_inr: '₹6.5 - 14.5 LPA',
      avg_salary_usd: '$88,000 - $130,000',
      growth_rate: '+35% YoY',
      market_demand_score: 92,
      employability_index: 87,
      top_companies: JSON.stringify(['Palo Alto Networks', 'Fortinet', 'TCS Cyber Defense', 'Wipro Security', 'CrowdStrike', 'Mandiant', 'Kroll']),
      education_alignment: JSON.stringify(['Cybersecurity', 'Computer Science', 'Information Security', 'Network Engineering']),
      icon_name: 'ShieldCheck'
    },
    {
      id: 'data-engineer',
      title: 'Big Data & Pipeline Engineer',
      category: 'Data Architecture',
      description: 'Constructs robust data pipelines, scalable storage lakes, and distributed processing architectures to feed analytics and machine learning systems.',
      core_skills: JSON.stringify(['SQL & Data Warehousing', 'Python', 'Apache Spark', 'ETL / ELT Architecture', 'Data Modeling', 'Git & Linux']),
      emerging_skills: JSON.stringify(['Kafka & Event Streaming', 'Snowflake', 'BigQuery', 'Apache Airflow', 'Databricks Delta Lake', 'dbt']),
      avg_salary_inr: '₹8.0 - 17.0 LPA',
      avg_salary_usd: '$105,000 - $155,000',
      growth_rate: '+30% YoY',
      market_demand_score: 90,
      employability_index: 86,
      top_companies: JSON.stringify(['Netflix', 'Target', 'Walmart Labs', 'Tiger Analytics', 'JPMorgan', 'Snowflake', 'Capital One']),
      education_alignment: JSON.stringify(['Data Engineering', 'Computer Science', 'Information Systems', 'Software Engineering']),
      icon_name: 'Database'
    },
    {
      id: 'product-manager-tech',
      title: 'Technical Product Manager (Associate PM)',
      category: 'Product Strategy & Management',
      description: 'Bridges engineering, business, and user experience to lead technological feature development, market alignment, and rapid product adoption.',
      core_skills: JSON.stringify(['Product Strategy', 'Agile / Scrum', 'Data-Driven Decision Making', 'Wireframing & User Stories', 'Stakeholder Management', 'Basic Tech Fundamentals']),
      emerging_skills: JSON.stringify(['AI Product Management', 'A/B Testing Frameworks', 'SQL for Product Metrics', 'Product-Led Growth (PLG)', 'User Retention Science']),
      avg_salary_inr: '₹9.0 - 20.0 LPA',
      avg_salary_usd: '$115,000 - $175,000',
      growth_rate: '+22% YoY',
      market_demand_score: 88,
      employability_index: 84,
      top_companies: JSON.stringify(['Google', 'Microsoft', 'CRED', 'Meesho', 'Atlassian', 'Adobe', 'Paytm']),
      education_alignment: JSON.stringify(['Computer Science + MBA', 'AI & Data Science', 'Engineering Management', 'Business Analytics']),
      icon_name: 'Layers'
    },
    {
      id: 'mobile-app-developer',
      title: 'Cross-Platform Mobile Engineer',
      category: 'Mobile Applications',
      description: 'Creates responsive, high-performance mobile applications for Android and iOS using cross-platform frameworks and modern mobile SDKs.',
      core_skills: JSON.stringify(['Flutter / React Native', 'Dart / JavaScript', 'Mobile UI/UX Design', 'REST API Integration', 'State Management', 'Git']),
      emerging_skills: JSON.stringify(['Offline-First Architecture', 'Native iOS/Android Bridging', 'Firebase & Serverless', 'App Store Optimization (ASO)', 'CI/CD for Mobile']),
      avg_salary_inr: '₹5.5 - 13.0 LPA',
      avg_salary_usd: '$80,000 - $125,000',
      growth_rate: '+20% YoY',
      market_demand_score: 86,
      employability_index: 85,
      top_companies: JSON.stringify(['Zomato', 'Paytm', 'Blinkit', 'Dream11', 'PhonePe', 'Uber', 'Spotify']),
      education_alignment: JSON.stringify(['Computer Science', 'Information Technology', 'Software Engineering', 'Self-Taught / Portfolio']),
      icon_name: 'Smartphone'
    }
  ];

  careers.forEach(c => {
    db.run(`
      INSERT INTO career_paths (
        id, title, category, description, core_skills, emerging_skills,
        avg_salary_inr, avg_salary_usd, growth_rate, market_demand_score,
        employability_index, top_companies, education_alignment, icon_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      c.id, c.title, c.category, c.description, c.core_skills, c.emerging_skills,
      c.avg_salary_inr, c.avg_salary_usd, c.growth_rate, c.market_demand_score,
      c.employability_index, c.top_companies, c.education_alignment, c.icon_name
    ]);
  });

  // Learning Roadmaps
  const roadmaps = [
    // 1. AI/ML Engineer
    {
      career_id: 'ai-ml-engineer', phase_number: 1, phase_title: 'Foundations & Mathematical Tooling', duration_weeks: 6,
      description: 'Master core programming in Python, vector math, linear algebra, calculus, and exploratory data analysis using NumPy and Pandas.',
      skills_covered: JSON.stringify(['Python Core & OOP', 'NumPy & Vectorized Math', 'Pandas DataFrame Analysis', 'Matplotlib & Seaborn', 'Linear Algebra']),
      resources: [
        { title: 'Python for Data Analysis by Wes McKinney', type: 'Book', url: 'https://wesmckinney.com/book/' },
        { title: '3Blue1Brown: Essence of Linear Algebra', type: 'Course', url: 'https://www.3blue1brown.com/topics/linear-algebra' },
        { title: 'Kaggle Python & Pandas Interactive Tracks', type: 'Practical Lab', url: 'https://www.kaggle.com/learn' }
      ]
    },
    {
      career_id: 'ai-ml-engineer', phase_number: 2, phase_title: 'Classical Machine Learning Algorithms', duration_weeks: 8,
      description: 'Implement supervised and unsupervised algorithms with Scikit-Learn: Linear/Logistic Regression, Decision Trees, Random Forests, Gradient Boosting (XGBoost), and Clustering.',
      skills_covered: JSON.stringify(['Scikit-Learn', 'Feature Engineering', 'Cross-Validation & Hyperparameter Tuning', 'Ensemble Methods', 'Model Evaluation Metrics']),
      resources: [
        { title: 'Hands-On Machine Learning (Aurélien Géron)', type: 'Book', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/' },
        { title: 'Coursera: Machine Learning Specialization (Andrew Ng)', type: 'Certification', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
        { title: 'Real-World Kaggle Housing & Tabular Competitions', type: 'Project', url: 'https://www.kaggle.com/competitions' }
      ]
    },
    {
      career_id: 'ai-ml-engineer', phase_number: 3, phase_title: 'Deep Learning & Neural Architectures', duration_weeks: 10,
      description: 'Master PyTorch or TensorFlow, Convolutional Neural Networks (CNNs), Recurrent Networks (RNN/LSTM), and modern Transformer attention mechanisms.',
      skills_covered: JSON.stringify(['PyTorch', 'Neural Network Backpropagation', 'CNNs for Computer Vision', 'Transformers & Attention', 'GPU Acceleration (CUDA)']),
      resources: [
        { title: 'Deep Learning with PyTorch Official Tutorials', type: 'Interactive Doc', url: 'https://pytorch.org/tutorials/' },
        { title: 'Fast.ai: Practical Deep Learning for Coders', type: 'Free Course', url: 'https://course.fast.ai/' },
        { title: 'Hugging Face NLP Course (Transformers & LLMs)', type: 'Certification', url: 'https://huggingface.co/learn/nlp-course' }
      ]
    },
    {
      career_id: 'ai-ml-engineer', phase_number: 4, phase_title: 'Generative AI, LLMOps & Production Deployment', duration_weeks: 8,
      description: 'Build enterprise-ready AI services: Fine-tuning, Retrieval-Augmented Generation (RAG), vector databases (Chroma/Pinecone), FastApi microservices, and Dockerized MLOps.',
      skills_covered: JSON.stringify(['RAG Systems', 'Vector Databases', 'FastAPI Serving', 'Docker & Containerization', 'MLflow & Experiment Tracking', 'Model Quantization']),
      resources: [
        { title: 'LangChain & LlamaIndex Official Documentation', type: 'Doc', url: 'https://python.langchain.com/' },
        { title: 'Full Stack Deep Learning Course', type: 'Course', url: 'https://fullstackdeeplearning.com/' },
        { title: 'Build and Deploy an End-to-End Enterprise RAG App', type: 'Capstone Project', url: 'https://github.com' }
      ]
    },
    // 2. Data Analyst
    {
      career_id: 'data-analyst', phase_number: 1, phase_title: 'Database Querying & Advanced SQL', duration_weeks: 5,
      description: 'Master complex SQL joins, window functions, CTEs, subqueries, query optimization, and relational database schema design.',
      skills_covered: JSON.stringify(['PostgreSQL / MySQL', 'Window Functions (RANK, LEAD/LAG)', 'CTEs & Subqueries', 'Aggregations & Grouping', 'Database Normalization']),
      resources: [
        { title: 'Mode Analytics: Advanced SQL Tutorial', type: 'Interactive Course', url: 'https://mode.com/sql-tutorial/' },
        { title: 'LeetCode 50 SQL Study Plan', type: 'Practice', url: 'https://leetcode.com/studyplan/top-sql-50/' }
      ]
    },
    {
      career_id: 'data-analyst', phase_number: 2, phase_title: 'Business Intelligence & Executive Dashboards', duration_weeks: 6,
      description: 'Design dynamic, executive-facing dashboards in Power BI and Tableau. Master DAX expressions, data modeling, star schema, and automated refreshing.',
      skills_covered: JSON.stringify(['Power BI / Tableau', 'DAX Measures & Calculations', 'Data Storytelling', 'Star Schema Modeling', 'KPI Dashboard Architecture']),
      resources: [
        { title: 'Microsoft PL-300: Power BI Data Analyst Certification', type: 'Certification', url: 'https://learn.microsoft.com' },
        { title: 'Storytelling with Data (Cole Nussbaumer Knaflic)', type: 'Book', url: 'https://www.storytellingwithdata.com/' }
      ]
    },
    {
      career_id: 'data-analyst', phase_number: 3, phase_title: 'Statistical Modeling & Python Analytics', duration_weeks: 6,
      description: 'Perform hypothesis testing, A/B experiment evaluation, cohort analysis, and predictive linear regression modeling using Python.',
      skills_covered: JSON.stringify(['Python (Pandas, SciPy)', 'Hypothesis Testing (p-values, t-test)', 'A/B Testing Frameworks', 'Customer Churn Analysis', 'Cohort Analysis']),
      resources: [
        { title: 'Practical Statistics for Data Scientists (O\'Reilly)', type: 'Book', url: 'https://www.oreilly.com' },
        { title: 'End-to-End E-Commerce Customer Analytics Project', type: 'Portfolio Project', url: 'https://github.com' }
      ]
    },
    // 3. Full Stack Web Developer
    {
      career_id: 'full-stack-dev', phase_number: 1, phase_title: 'Modern Frontend Architecture (React & Next.js)', duration_weeks: 6,
      description: 'Master React hooks, component lifecycle, Tailwind CSS, TypeScript integration, and Next.js server/client components.',
      skills_covered: JSON.stringify(['JavaScript ES6+', 'React.js (Hooks, State)', 'Tailwind CSS', 'TypeScript Basics', 'Responsive UI Engineering']),
      resources: [
        { title: 'React Official Documentation (react.dev)', type: 'Interactive Doc', url: 'https://react.dev' },
        { title: 'Next.js App Router Foundations', type: 'Course', url: 'https://nextjs.org/learn' }
      ]
    },
    {
      career_id: 'full-stack-dev', phase_number: 2, phase_title: 'Backend Systems, APIs & Authentication', duration_weeks: 6,
      description: 'Build robust REST APIs using Node.js, Express, JWT authentication, role-based access control, database connections (PostgreSQL/Prisma), and error handling.',
      skills_covered: JSON.stringify(['Node.js & Express', 'PostgreSQL & Prisma ORM', 'JWT & OAuth Authentication', 'REST API Architecture', 'Middleware Design']),
      resources: [
        { title: 'The Odin Project: NodeJS Course', type: 'Free Curriculum', url: 'https://www.theodinproject.com/' },
        { title: 'Prisma Getting Started with PostgreSQL', type: 'Interactive Guide', url: 'https://www.prisma.io/docs' }
      ]
    },
    {
      career_id: 'full-stack-dev', phase_number: 3, phase_title: 'Cloud Deployment, Testing & DevOps', duration_weeks: 6,
      description: 'Containerize with Docker, configure CI/CD GitHub Actions, deploy to cloud platforms (AWS/Render/Vercel), and implement automated testing.',
      skills_covered: JSON.stringify(['Docker', 'GitHub Actions CI/CD', 'Jest / Vitest Testing', 'Cloud Deployment', 'Performance Optimization (LCP/CWV)']),
      resources: [
        { title: 'Docker for Developers Hands-on', type: 'Practical Lab', url: 'https://docs.docker.com/get-started/' },
        { title: 'Full Stack SaaS MVP with Stripe & Auth', type: 'Capstone Project', url: 'https://github.com' }
      ]
    }
  ];

  roadmaps.forEach((r, idx) => {
    const resourcesStr = typeof r.resources === 'string' ? r.resources : JSON.stringify(r.resources);
    db.run(`
      INSERT INTO learning_roadmaps (
        id, career_id, phase_number, phase_title, duration_weeks, description, skills_covered, resources
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      `roadmap-${r.career_id}-${r.phase_number}`,
      r.career_id,
      r.phase_number,
      r.phase_title,
      r.duration_weeks,
      r.description,
      r.skills_covered,
      resourcesStr
    ]);
  });

  seedUniversalAccounts(db);
  console.log('Database successfully initialized and seeded with universal commercial catalog!');
}

function seedUniversalAccounts(db) {
  const universalUsers = [
    {
      id: 'student-user-001',
      name: 'Alex Chen',
      email: 'alex.chen@careerai.io',
      password: 'career123',
      college: 'Global Institute of Technology & Engineering',
      degree: 'B.Tech / B.S.',
      department: 'Computer Science & Artificial Intelligence',
      year_of_study: 'Third Year',
      cgpa: 8.85,
      subscription_tier: 'pro',
      technical_skills: ['Python', 'Machine Learning', 'Deep Learning', 'SQL', 'Pandas', 'NumPy', 'Git & GitHub'],
      soft_skills: ['Analytical Thinking', 'Problem Solving', 'Team Collaboration'],
      interests: ['Artificial Intelligence', 'Data Science', 'Generative AI', 'Cloud Computing'],
      career_goals: 'Targeting top AI/ML engineering roles at high-growth tech companies and building scalable autonomous systems.',
      aptitude: { analytical: 92, logical: 88, technical: 90, creative: 82, collaboration: 86 }
    },
    {
      id: 'student-user-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@careerai.io',
      password: 'career123',
      college: 'National University of Technology',
      degree: 'B.Tech / B.S.',
      department: 'Information Systems & Data Analytics',
      year_of_study: 'Final Year',
      cgpa: 8.70,
      subscription_tier: 'pro',
      technical_skills: ['SQL', 'Power BI', 'Python', 'Excel & Advanced Analytics', 'Tableau', 'Data Preprocessing'],
      soft_skills: ['Data Storytelling', 'Critical Thinking', 'Business Communication'],
      interests: ['Business Intelligence', 'Data Analytics', 'Fintech', 'Strategy'],
      career_goals: 'Targeting Senior Data Analyst & BI Specialist roles in top consulting, fintech, or global enterprises.',
      aptitude: { analytical: 90, logical: 86, technical: 80, creative: 84, collaboration: 88 }
    },
    {
      id: 'student-user-003',
      name: 'Marcus Vance',
      email: 'marcus.vance@careerai.io',
      password: 'career123',
      college: 'Metropolitan University / Independent Professional',
      degree: 'B.S. Software Engineering',
      department: 'Software Engineering & Cloud Architecture',
      year_of_study: 'Recent Graduate',
      cgpa: 8.65,
      subscription_tier: 'free',
      technical_skills: ['JavaScript', 'React.js', 'Node.js', 'SQL', 'HTML5 & CSS3', 'Docker', 'Git & GitHub'],
      soft_skills: ['System Design', 'Agile Collaboration', 'Time Management'],
      interests: ['Full Stack Web Development', 'Cloud Computing', 'Open Source', 'Microservices'],
      career_goals: 'Building scalable cloud-native web architectures and high-throughput SaaS applications.',
      aptitude: { analytical: 84, logical: 88, technical: 92, creative: 80, collaboration: 85 }
    }
  ];

  universalUsers.forEach(member => {
    try {
      const existing = db.exec(`SELECT id FROM students WHERE id = '${member.id}' OR email = '${member.email}'`);
      if (!existing || existing.length === 0 || existing[0].values.length === 0) {
        db.run(`
          INSERT INTO students (id, name, email, password, college, degree, department, year_of_study, cgpa, subscription_tier, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          member.id, member.name, member.email, member.password, member.college,
          member.degree, member.department, member.year_of_study, member.cgpa, member.subscription_tier, new Date().toISOString()
        ]);

        db.run(`
          INSERT INTO student_profiles (
            student_id, technical_skills, soft_skills, interests, career_goals, work_preference, aptitude_scores, completed_milestones, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          member.id,
          JSON.stringify(member.technical_skills),
          JSON.stringify(member.soft_skills),
          JSON.stringify(member.interests),
          member.career_goals,
          'hybrid',
          JSON.stringify(member.aptitude),
          JSON.stringify(['roadmap-ai-ml-engineer-1']),
          new Date().toISOString()
        ]);

        db.run(`
          INSERT INTO counselor_messages (id, student_id, sender, message, timestamp)
          VALUES (?, ?, ?, ?, ?)
        `, [
          `msg-welcome-${member.id}`,
          member.id,
          'assistant',
          `Hello ${member.name.split(' ')[0]}! Welcome to CareerAI Pro — your autonomous Career Intelligence & Placement Acceleration Platform. Your profile is active with ${member.subscription_tier.toUpperCase()} access. Let's analyze your career trajectory, skill gaps, and custom industry roadmaps!`,
          new Date().toISOString()
        ]);
      } else {
        // Update subscription_tier if missing
        db.run(`UPDATE students SET subscription_tier = ? WHERE id = ?`, [member.subscription_tier, member.id]);
      }
    } catch (e) {
      console.warn('Notice seeding universal account:', e.message);
    }
  });
}

module.exports = {
  getDb,
  query,
  getOne,
  run,
  saveDb
};
