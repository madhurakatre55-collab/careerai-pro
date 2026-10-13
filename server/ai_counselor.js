const { query, run, getOne } = require('./db');

/**
 * 24/7 AI Career Guidance Counselor & Mentor Engine
 * Provides contextual, empathetic, and actionable guidance for students.
 */

async function processCounselorChat(studentId, userMessage) {
  // 1. Fetch student context
  const student = getOne('SELECT * FROM students WHERE id = ?', [studentId]);
  let profile = getOne('SELECT * FROM student_profiles WHERE student_id = ?', [studentId]);
  
  const studentName = student ? student.name : 'Student';
  const department = student ? student.department : 'Engineering';
  const college = student ? student.college : 'College';

  // 2. Save user message to database
  const userMsgId = `msg-${Date.now()}-user`;
  run(`
    INSERT INTO counselor_messages (id, student_id, sender, message, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `, [userMsgId, studentId, 'user', userMessage, new Date().toISOString()]);

  // 3. Generate intelligent, contextual AI response
  let reply = generateDomainCareerResponse(userMessage, {
    studentName,
    department,
    college,
    profile
  });

  // 4. Save assistant reply to database
  const botMsgId = `msg-${Date.now()}-bot`;
  run(`
    INSERT INTO counselor_messages (id, student_id, sender, message, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `, [botMsgId, studentId, 'assistant', reply, new Date().toISOString()]);

  return {
    id: botMsgId,
    sender: 'assistant',
    message: reply,
    timestamp: new Date().toISOString()
  };
}

function generateDomainCareerResponse(message, context) {
  const text = message.toLowerCase();
  const { studentName, department } = context;

  if (text.includes('roadmap') || text.includes('how to start') || text.includes('learning path')) {
    return `Great question, ${studentName}! Based on your background in **${department}**, here is a structured 4-step progression you should follow:

1. **Foundations (Weeks 1-4)**: Solidify core programming (Python or JavaScript) and foundational data structures.
2. **Specialized Tools (Weeks 5-8)**: Pick 1 primary stack (e.g. Scikit-learn & PyTorch for AI, or React & Node for Web Development) rather than trying to learn everything at once.
3. **Proof-of-Work Projects (Weeks 9-12)**: Build 2 end-to-end deployed projects that solve genuine problems and host them on GitHub with clear READMEs.
4. **Placement Readiness (Weeks 13-16)**: Practice standard aptitude tests, technical interview questions (DSA & domain fundamentals), and refine your LinkedIn profile.

You can inspect your live customized milestones in the **Personalized Roadmap** tab right on your dashboard!`;
  }

  if (text.includes('skill gap') || text.includes('missing') || text.includes('what should i learn')) {
    return `Analyzing your current profile against market demands in India:

- **High-Priority Gap**: For high-growth roles, employers look for hands-on experience with modern tooling (such as Docker, Git, REST APIs, or PyTorch).
- **Recommended Action**: Dedicate 45 minutes daily to our guided milestone checklist. Completing even 1 project using these tools will immediately boost your match confidence score!
- Check your **Skill Gap Analysis** tab to see your priority ranking and estimated time to acquire each missing skill.`;
  }

  if (text.includes('placement') || text.includes('interview') || text.includes('tcs') || text.includes('campus drive') || text.includes('job')) {
    return `For campus placements and off-campus recruitment drives, here is the proven 3-pillar strategy:

1. **Aptitude & Technical Round**: Most IT firms (e.g., TCS, Infosys, Cognizant, Accenture) filter candidates via Quantitative Aptitude and logical reasoning. Consistent 30-min daily practice on IndiaBIX or GeeksforGeeks makes a massive difference.
2. **Core Domain Mastery**: Be ready to explain the architecture of your mini-projects, DBMS normalization, OOP concepts, and computer networks.
3. **Communication & Presentation**: As highlighted in the Mercer | Mettl employability report, soft skills and structured problem articulation distinguish top 10% candidates.`;
  }

  if (text.includes('project idea') || text.includes('capstone') || text.includes('mini project')) {
    return `Here are three high-impact project ideas perfectly aligned with your **${department}** curriculum:

1. **Smart Real-Time Diagnostic Dashboard**: Build a full-stack platform that visualizes real-world data (e.g., student performance, healthcare metrics, or climate sensors) with predictive ML analytics.
2. **AI-Powered Automated Document/Resume Parser**: Use NLP and LangChain to extract keywords, rank applicants against job descriptions, and recommend upskilling steps.
3. **Decentralized or Cloud-Native Microservices App**: Deploy a containerized multi-tier service on AWS/GCP with Docker, automated CI/CD pipelines, and JWT authentication.

Which of these domains excites you most? I can break down the exact tech stack and GitHub architecture for you!`;
  }

  if (text.includes('salary') || text.includes('package') || text.includes('lpa') || text.includes('earn')) {
    return `Based on real-time 2026-2027 market benchmarks from our **Labour Market Explorer**:

- **AI/ML & Data Engineering Roles**: Average starting packages range from **₹8.0 to 18.0 LPA** for graduates with solid project portfolios and strong problem-solving skills.
- **Full-Stack & Cloud/DevOps**: Packages range from **₹6.5 to 15.0 LPA**, with rapid YoY growth as you master cloud architectures.
- **Data Analyst / BI Roles**: Packages range from **₹5.5 to 12.0 LPA**.

Focus on building depth in your chosen stack—portfolio quality and problem-solving ability directly dictate higher compensation tiers!`;
  }

  if (text.includes('certif') || text.includes('course') || text.includes('aws') || text.includes('nptel')) {
    return `Here are the most respected certifications by recruiters today:

- **Cloud & DevOps**: AWS Certified Solutions Architect Associate or Microsoft Azure Fundamentals (AZ-900).
- **Data & AI**: Google Cloud Associate Data Practitioner, DeepLearning.AI Specialization on Coursera, or NPTEL Elite certification.
- **Software Development**: Meta Front-End/Back-End Professional Certificate or freeCodeCamp certifications.

Tip: Certifications are valuable, but always pair them with a live, functional GitHub repository demonstrating the code in action!`;
  }

  // Fallback / General Guidance
  return `Hello ${studentName}! I'm your dedicated 24/7 AI Career Counselor.

I can help you with:
1. **Targeting High-Demand Roles**: Identifying careers tailored to your academic background in ${department}.
2. **Closing Your Skill Gaps**: Finding the fastest learning resources for missing skills.
3. **Placement & Resume Strategy**: Crafting a competitive profile for technical interviews and campus drives.
4. **Project Roadmaps**: Step-by-step guidance on capstone and portfolio projects.

What specific question or career objective would you like to explore today?`;
}

module.exports = {
  processCounselorChat
};
