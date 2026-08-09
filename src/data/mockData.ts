import { 
  JobItem, 
  InternshipItem, 
  TrendingItem, 
  SuccessStory, 
  CareerSwitchPath, 
  FAQItem, 
  SEOCategory,
  Company,
  JobApplication,
  UserProfileData
} from '../types';

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'job-1',
    slug: 'senior-full-stack-engineer-razorpay',
    title: 'Senior Full Stack Engineer (React + Node)',
    company: 'Razorpay',
    companySlug: 'razorpay',
    logo: '⚡',
    logoBg: 'bg-blue-600 text-white',
    rating: 4.6,
    reviewsCount: 1240,
    verified: true,
    location: 'Bangalore (Hybrid)',
    type: 'Hybrid',
    salary: '₹22 - ₹35 LPA',
    experience: '2-5 Yrs',
    category: 'IT',
    department: 'Engineering & Software',
    roleCategory: 'Software Development',
    companyType: 'Unicorn',
    education: 'B.Tech / M.Tech in CS or IT',
    industry: 'Financial Technology / FinTech',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    postedTime: '2 hours ago',
    postedDateIso: '2026-08-06',
    applicantsCount: 142,
    featured: true,
    description: 'We are looking for a Senior Full Stack Engineer to lead scalable payment systems serving 10M+ merchants across India.',
    responsibilities: [
      'Design and deploy resilient payment gateways with <50ms latency.',
      'Collaborate with product and UX teams to build responsive web interfaces.',
      'Mentor junior engineers and champion standard coding practices.',
      'Architect microservices on Kubernetes with automated CI/CD pipelines.'
    ],
    requirements: [
      'Strong expertise in React 18, TypeScript, and modern state management.',
      'Deep understanding of microservices, REST APIs, and database indexing.',
      'Prior experience in FinTech or high-concurrency systems is a plus.'
    ],
    preferredSkills: ['System Design', 'Kafka', 'Redis', 'GraphQL'],
    perks: ['Health Insurance', '₹50k Tech Allowance', 'Flexible Hours', 'Stock Options'],
    benefits: ['ESOPs Options', 'Flexible Work Policy', 'Free Lunch & Snacks', 'Comprehensive Health Cover'],
    aboutCompany: 'Razorpay is India’s leading Payments and Financial Technology company, empowering millions of businesses to accept and disburse payments online seamlessly.',
    workCulture: 'Collaborative, engineering-driven environment focused on high ownership, rapid iteration, and direct merchant impact.',
    hiringProcess: [
      'Initial Screening Call (30 mins)',
      'Machine Coding & System Architecture Round (90 mins)',
      'Technical Deep Dive & Code Review (60 mins)',
      'Engineering Leadership & Culture Fit (45 mins)'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
    officeLocations: ['Bangalore (HQ)', 'Mumbai', 'Delhi NCR'],
    recruiter: {
      name: 'Aakash Malhotra',
      role: 'Lead Tech Recruiter',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      company: 'Razorpay',
      responseRate: '98% Response Rate',
      activeJobsCount: 12,
      linkedInUrl: 'https://linkedin.com/in/aakash-malhotra',
      email: 'aakash.malhotra@razorpay.com'
    }
  },
  {
    id: 'job-2',
    slug: 'ai-data-analyst-jio-platforms',
    title: 'AI Data Analyst & ML Engineer',
    company: 'Jio Platforms',
    companySlug: 'jio-platforms',
    logo: '🌐',
    logoBg: 'bg-blue-700 text-white',
    rating: 4.3,
    reviewsCount: 3890,
    verified: true,
    location: 'Mumbai / Remote',
    type: 'Remote',
    salary: '₹14 - ₹24 LPA',
    experience: '1-3 Yrs',
    category: 'Data Science',
    department: 'Data Analytics & AI',
    roleCategory: 'Data Engineering',
    companyType: 'Corporate',
    education: 'B.E/B.Tech/M.Sc in Data Science or Statistics',
    industry: 'Telecom & Digital Services',
    skills: ['Python', 'PyTorch', 'SQL', 'Tableau', 'Scikit-learn'],
    postedTime: 'Just now',
    postedDateIso: '2026-08-06',
    applicantsCount: 89,
    featured: true,
    urgent: true,
    description: 'Drive data-driven intelligence for 400M+ telecom and digital cloud users at Jio.',
    responsibilities: [
      'Build predictive churn models and personalization engines.',
      'Optimize data pipelines using PySpark and BigQuery.',
      'Present actionable insights to senior executive stakeholders.'
    ],
    requirements: [
      'Proficiency in Python, SQL, and data analysis algorithms.',
      'Experience with Pandas, NumPy, and dashboarding tools.'
    ],
    preferredSkills: ['Deep Learning', 'LLM Fine-tuning', 'Apache Spark'],
    perks: ['Free 5G WiFi', 'Wellness Subsidy', 'Performance Bonus'],
    aboutCompany: 'Jio Platforms is a technology enterprise driving digital transformation across connectivity, cloud, AI, and consumer ecosystems in India.',
    workCulture: 'Fast-paced hyper-scale ecosystem backed by world-class infrastructure.',
    hiringProcess: [
      'Online Data Science Assessment',
      'Data Modeling Round',
      'Technical Interview with AI Director'
    ],
    techStack: ['Python', 'PyTorch', 'PySpark', 'BigQuery', 'Tableau', 'Databricks'],
    officeLocations: ['Mumbai Navi Mumbai', 'Bangalore', 'Hyderabad'],
    recruiter: {
      name: 'Ritu Sen',
      role: 'Talent Acquisition Partner',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      company: 'Jio Platforms',
      responseRate: '94% Response Rate',
      activeJobsCount: 8
    }
  },
  {
    id: 'job-3',
    slug: 'product-marketing-manager-swiggy',
    title: 'Product Marketing Manager',
    company: 'Swiggy',
    companySlug: 'swiggy',
    logo: '🍕',
    logoBg: 'bg-orange-500 text-white',
    rating: 4.4,
    reviewsCount: 2150,
    verified: true,
    location: 'Bangalore',
    type: 'Full Time',
    salary: '₹18 - ₹28 LPA',
    experience: '3-6 Yrs',
    category: 'Marketing',
    department: 'Marketing & Brand Strategy',
    roleCategory: 'Product Marketing',
    companyType: 'Unicorn',
    education: 'MBA in Marketing or equivalent',
    industry: 'E-commerce & Food Tech',
    skills: ['Growth Marketing', 'SEO', 'User Acquisition', 'Analytics', 'Funnel Optimization'],
    postedTime: '5 hours ago',
    applicantsCount: 210,
    description: 'Lead consumer growth strategies for Swiggy Instamart and core delivery products.',
    responsibilities: [
      'Devise lifecycle marketing campaigns and retention hooks.',
      'Analyze customer cohorts and maximize CAC to LTV metrics.'
    ],
    requirements: ['3+ years experience in B2C growth or brand management.'],
    perks: ['Free Food Coupons', 'Unlimited PTO', 'Parental Health Cover'],
    aboutCompany: 'Swiggy is India’s premier quick-commerce and food delivery platform connecting millions of consumers with restaurants and dark stores.',
    recruiter: {
      name: 'Vikram Joshi',
      role: 'Head of Business Hiring',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      company: 'Swiggy',
      responseRate: '92% Response Rate',
      activeJobsCount: 5
    }
  },
  {
    id: 'job-4',
    slug: 'associate-financial-analyst-deloitte',
    title: 'Associate Financial Analyst',
    company: 'Deloitte India',
    companySlug: 'deloitte',
    logo: '🟢',
    logoBg: 'bg-black text-green-400',
    rating: 4.5,
    reviewsCount: 5420,
    verified: true,
    location: 'Gurugram / Hyderabad',
    type: 'Full Time',
    salary: '₹9 - ₹15 LPA',
    experience: '0-2 Yrs',
    category: 'Finance',
    department: 'Financial Advisory',
    roleCategory: 'Financial Analysis',
    companyType: 'Foreign MNC',
    education: 'B.Com / M.Com / MBA / CA Inter',
    industry: 'Management Consulting & Audit',
    skills: ['Financial Modeling', 'Excel', 'Corporate Finance', 'SAP', 'Audit'],
    postedTime: '1 day ago',
    applicantsCount: 340,
    featured: true,
    description: 'Join Deloitte Advisory team to work with Fortune 500 financial audits and valuations.',
    responsibilities: ['Prepare financial reports, balance sheet audit notes, and forecasting models.'],
    requirements: ['B.Com / M.Com / MBA Finance or CA Inter cleared candidates preferred.'],
    perks: ['Study Leaves for CA/CFA', 'Cab Facility', 'Medical Insurance'],
    aboutCompany: 'Deloitte is one of the "Big Four" global accounting and professional services firms.',
    recruiter: {
      name: 'Sneha Roy',
      role: 'Campus Lead',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      company: 'Deloitte India',
      responseRate: '99% Response Rate',
      activeJobsCount: 15
    }
  },
  {
    id: 'job-5',
    slug: 'associate-software-engineer-tcs-digital',
    title: 'Associate Software Engineer (2025/2026 Batch)',
    company: 'TCS Digital',
    companySlug: 'tcs',
    logo: '💎',
    logoBg: 'bg-blue-900 text-white',
    rating: 4.1,
    reviewsCount: 12400,
    verified: true,
    location: 'Pune / Chennai / Noida',
    type: 'Walk-in',
    salary: '₹7.5 - ₹9 LPA',
    experience: 'Freshers (0 Yrs)',
    category: 'IT',
    department: 'IT Services',
    roleCategory: 'Software Engineering',
    companyType: 'Indian MNC',
    education: 'BE / B.Tech / MCA',
    industry: 'Information Technology Services',
    skills: ['Java', 'Python', 'C++', 'Data Structures', 'SQL'],
    postedTime: 'Today',
    applicantsCount: 1250,
    urgent: true,
    description: 'Mass walk-in hiring drive for TCS Digital campus & off-campus freshers.',
    responsibilities: ['Participate in agile software development life cycle for global client projects.'],
    requirements: ['BE/B.Tech/MCA/M.Sc in CS, IT, ECE or related branches with >= 60% throughout.'],
    perks: ['Onsite Opportunities', 'Learning Subsidies', 'Health Cover']
  },
  {
    id: 'job-6',
    slug: 'lead-frontend-developer-urban-company',
    title: 'Lead Frontend Developer (React Native / Web)',
    company: 'Urban Company',
    companySlug: 'urban-company',
    logo: '🏠',
    logoBg: 'bg-slate-900 text-white',
    rating: 4.5,
    reviewsCount: 1800,
    verified: true,
    location: 'Gurugram (Remote Available)',
    type: 'Women Only',
    salary: '₹25 - ₹40 LPA',
    experience: '4-7 Yrs',
    category: 'Women',
    department: 'Engineering',
    roleCategory: 'Frontend Lead',
    companyType: 'Unicorn',
    education: 'B.Tech/BE in CS',
    industry: 'Home Services & Tech',
    skills: ['React Native', 'React.js', 'Redux Toolkit', 'Performance Tuning'],
    postedTime: '3 days ago',
    applicantsCount: 76,
    featured: true,
    description: 'Exclusive diversity hiring initiative for women tech leaders returning to work or accelerating careers.',
    responsibilities: ['Architect mobile-first web applications for 5M+ service appointments monthly.'],
    requirements: ['Strong mastery over JavaScript/TypeScript internals and UI rendering performance.'],
    perks: ['Childcare Allowance', 'Flexible Return-to-Work', 'Equity Grants']
  },
  {
    id: 'job-7',
    slug: 'senior-mechanical-design-engineer-tata-motors',
    title: 'Senior Mechanical Design Engineer',
    company: 'Tata Motors EV',
    companySlug: 'tata-motors',
    logo: '🚘',
    logoBg: 'bg-blue-800 text-white',
    rating: 4.4,
    reviewsCount: 6100,
    verified: true,
    location: 'Pune',
    type: 'Full Time',
    salary: '₹12 - ₹20 LPA',
    experience: '3-6 Yrs',
    category: 'Engineering',
    department: 'EV Engineering',
    roleCategory: 'Mechanical Engineering',
    companyType: 'Corporate',
    education: 'B.E / B.Tech Mechanical',
    industry: 'Automotive & CleanTech',
    skills: ['SolidWorks', 'CATIA V5', 'EV Powertrain', 'CAD/CAM', 'FEA Analysis'],
    postedTime: '4 hours ago',
    applicantsCount: 95,
    description: 'Help shape next-generation electric vehicle architecture and battery enclosures.',
    responsibilities: ['Create 3D parametric models and simulate stress/thermal loads.'],
    requirements: ['Degree in Mechanical Engineering with CAD certification.'],
    perks: ['Employee Car Discount', 'PF + Gratuity', 'Medical Policy']
  },
  {
    id: 'job-8',
    slug: 'customer-experience-team-lead-concentrix',
    title: 'Customer Experience & Team Lead',
    company: 'Concentrix',
    companySlug: 'concentrix',
    logo: '🎧',
    logoBg: 'bg-purple-700 text-white',
    rating: 4.0,
    reviewsCount: 4200,
    verified: true,
    location: 'Noida / Kolkata',
    type: 'Walk-in',
    salary: '₹4.5 - ₹7.2 LPA',
    experience: '0-2 Yrs',
    category: 'BPO',
    department: 'Customer Service & BPO',
    roleCategory: 'Team Leader',
    companyType: 'Foreign MNC',
    education: 'Any Graduate',
    industry: 'BPO / Call Center',
    skills: ['Communication', 'Client Handling', 'CRMs', 'Escalation Management'],
    postedTime: '1 day ago',
    applicantsCount: 430,
    description: 'Walk-in interview drive on Saturday for US/UK process voice and non-voice operations.',
    responsibilities: ['Manage customer queries via chat, email, and inbound calls.'],
    requirements: ['Excellent spoken English skills. Open for rotational shifts.'],
    perks: ['2-Way Cab Transport', 'Night Shift Allowance', 'Incentives']
  }
];

export const MOCK_INTERNSHIPS: InternshipItem[] = [
  {
    id: 'int-1',
    title: 'Software Engineering Intern (Backend)',
    company: 'Flipkart',
    logo: '🛒',
    logoBg: 'bg-yellow-500 text-slate-900',
    stipend: '₹50,000 / month',
    duration: '6 Months',
    location: 'Bangalore',
    mode: 'In-office',
    startDate: 'Immediate',
    applyBy: '15 Aug 2026',
    skills: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
    perks: ['Pre-Placement Offer (PPO)', 'Free Meals', 'Certificate', 'Flexible Dress Code'],
    openings: 15
  },
  {
    id: 'int-2',
    title: 'UI/UX & Product Design Intern',
    company: 'CRED',
    logo: '💳',
    logoBg: 'bg-black text-white',
    stipend: '₹40,000 / month',
    duration: '3 Months',
    location: 'Bangalore / Remote',
    mode: 'Remote',
    startDate: '1 Sep 2026',
    applyBy: '20 Aug 2026',
    skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
    perks: ['MacBook Provided', 'Mentorship from Design Leads', 'PPO Opportunity'],
    openings: 8
  },
  {
    id: 'int-3',
    title: 'Digital Marketing & Growth Intern',
    company: 'Unacademy',
    logo: '🎓',
    logoBg: 'bg-teal-600 text-white',
    stipend: '₹25,000 / month',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    startDate: 'Immediate',
    applyBy: '18 Aug 2026',
    skills: ['SEO', 'Content Creation', 'Social Media Ads', 'Google Analytics'],
    perks: ['Certificate', 'Letter of Recommendation', 'Performance Bonus'],
    openings: 20
  },
  {
    id: 'int-4',
    title: 'Data Science & Business Intelligence Intern',
    company: 'PhonePe',
    logo: '💜',
    logoBg: 'bg-indigo-600 text-white',
    stipend: '₹45,000 / month',
    duration: '6 Months',
    location: 'Bangalore',
    mode: 'Hybrid',
    startDate: '25 Aug 2026',
    applyBy: '22 Aug 2026',
    skills: ['Python', 'SQL', 'Tableau', 'Probability'],
    perks: ['PPO Eligible', 'Subsidized Food', 'Certificate'],
    openings: 10
  }
];

export const TRENDING_CAROUSEL: TrendingItem[] = [
  {
    id: 'tr-1',
    title: 'Google STEP Internship 2026 Drive',
    description: 'Applications open for 1st & 2nd year CS students with ₹1,10,000/mo stipend!',
    category: 'Featured Internship',
    badge: '🔥 10k+ Applied',
    bgGradient: 'from-blue-600 via-indigo-600 to-blue-800',
    iconName: 'GraduationCap',
    ctaText: 'Apply Now'
  },
  {
    id: 'tr-2',
    title: 'TCS NQT & Digital Mass Hiring 2026',
    description: 'Off-campus recruitment drive for 2024, 2025 & 2026 freshers across India.',
    category: 'Hiring Drive',
    badge: '⚡ Urgent Hiring',
    bgGradient: 'from-slate-900 via-blue-900 to-slate-900',
    iconName: 'Briefcase',
    ctaText: 'Register Free'
  },
  {
    id: 'tr-3',
    title: 'UPSC Civil Services CSE 2026 Notice',
    description: 'Official Notification for 1,056 vacancies. Free syllabus breakdown & mock tests.',
    category: 'Government Recruitment',
    badge: '🏛️ Govt Exam',
    bgGradient: 'from-emerald-700 via-teal-800 to-emerald-900',
    iconName: 'Building2',
    ctaText: 'View Syllabus'
  },
  {
    id: 'tr-4',
    title: 'AI Resume Score Checker Challenge',
    description: 'Scan your resume against 50,000+ job descriptions and get an instant ATS score.',
    category: 'Free Career Tool',
    badge: '🤖 AI Powered',
    bgGradient: 'from-violet-600 via-purple-700 to-indigo-800',
    iconName: 'FileCheck2',
    ctaText: 'Check Resume Score'
  },
  {
    id: 'tr-5',
    title: 'Non-Tech to Tech Salary Booster',
    description: 'Detailed roadmap for BPO & Mech grads to transition into ₹12+ LPA Tech roles.',
    category: 'Career Switch',
    badge: '📈 High Impact',
    bgGradient: 'from-amber-600 via-orange-600 to-red-700',
    iconName: 'TrendingUp',
    ctaText: 'Explore Roadmap'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ss-1',
    studentName: 'Priya Sharma',
    studentPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    previousRole: 'BPO Executive (₹2.8 LPA)',
    currentRole: 'SDET Automation Engineer (₹14.5 LPA)',
    company: 'Microsoft India',
    companyLogo: '💻',
    salaryIncrease: '+418% Hike',
    quote: 'CareerPulse guided my roadmap from manual customer support to Java Selenium automation. The ATS resume checker got me my first callback within 3 days!',
    branch: 'B.Com Graduate'
  },
  {
    id: 'ss-2',
    studentName: 'Rahul Verma',
    studentPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    previousRole: 'Fresh Mechanical Engineer (₹0)',
    currentRole: 'Data Analyst (₹11 LPA)',
    company: 'Swiggy',
    companyLogo: '🍕',
    salaryIncrease: 'First Job',
    quote: 'I built my portfolio using CareerPulse Portfolio Builder and gave mock aptitude tests every day. Transitioned smoothly into Data Science!',
    branch: 'Mechanical Engg'
  },
  {
    id: 'ss-3',
    studentName: 'Ananya Deshmukh',
    studentPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    previousRole: 'Tier-3 College Student',
    currentRole: 'Full Stack Developer (₹18 LPA)',
    company: 'Razorpay',
    companyLogo: '⚡',
    salaryIncrease: 'Off-Campus PPO',
    quote: 'The placement courses and mock technical interviews gave me the confidence to crack Tier-1 product tech companies off-campus.',
    branch: 'CS Tier-3'
  }
];

export const CAREER_SWITCH_PATHS: CareerSwitchPath[] = [
  {
    id: 'cs-1',
    title: 'BPO / Customer Support → SDET Lead',
    fromRole: 'BPO / Voice Process',
    avgSalary: '₹12 - ₹22 LPA',
    demandGrowth: '+38% YoY',
    duration: '4 - 6 Months',
    steps: [
      { role: 'BPO Executive', timeline: 'Start', skills: ['Communication', 'Process Knowledge'] },
      { role: 'Software QA Tester', timeline: 'Month 1-2', skills: ['Manual Testing', 'JIRA', 'SQL Basics'] },
      { role: 'Automation Tester', timeline: 'Month 3-4', skills: ['Java', 'Selenium', 'TestNG', 'Git'] },
      { role: 'SDET Engineer', timeline: 'Month 5-6', skills: ['API Automation', 'CI/CD Pipelines', 'Docker'] },
      { role: 'QA Lead', timeline: 'Year 2+', skills: ['Team Leadership', 'Test Architecture'] }
    ]
  },
  {
    id: 'cs-2',
    title: 'Mechanical / Civil → BI & Data Manager',
    fromRole: 'Mechanical Engineer',
    avgSalary: '₹10 - ₹18 LPA',
    demandGrowth: '+45% YoY',
    duration: '3 - 5 Months',
    steps: [
      { role: 'Site Engineer', timeline: 'Start', skills: ['AutoCAD', 'Excel'] },
      { role: 'Data Analyst Trainee', timeline: 'Month 1-2', skills: ['Advanced Excel', 'Power BI', 'SQL'] },
      { role: 'Business Intelligence Analyst', timeline: 'Month 3-4', skills: ['Python', 'Pandas', 'Tableau', 'DAX'] },
      { role: 'Analytics Manager', timeline: 'Year 2+', skills: ['Data Governance', 'Stakeholder Management'] }
    ]
  },
  {
    id: 'cs-3',
    title: 'Non-Tech Support → React Senior Engineer',
    fromRole: 'Customer Service Representative',
    avgSalary: '₹14 - ₹26 LPA',
    demandGrowth: '+52% YoY',
    duration: '5 - 7 Months',
    steps: [
      { role: 'Support Agent', timeline: 'Start', skills: ['Patience', 'Problem Solving'] },
      { role: 'Frontend Developer (Junior)', timeline: 'Month 1-3', skills: ['HTML5', 'CSS3', 'JavaScript ES6', 'Git'] },
      { role: 'React Developer', timeline: 'Month 4-5', skills: ['React 18', 'Tailwind', 'Redux', 'REST APIs'] },
      { role: 'Senior Frontend Engineer', timeline: 'Year 2+', skills: ['Performance', 'Next.js', 'System Design'] }
    ]
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Students',
    question: 'Is CareerPulse completely free for students and job seekers?',
    answer: 'Yes! CareerPulse is 100% free for students, freshers, and job seekers. You can search, apply to thousands of verified jobs/internships, build ATS-friendly resumes, and access free mock tests without any hidden charges.'
  },
  {
    id: 'faq-2',
    category: 'Students',
    question: 'How does the AI Resume Checker and ATS Score work?',
    answer: 'Our AI Resume Checker scans your uploaded resume against industry-standard ATS (Applicant Tracking Systems) used by top companies like Google, TCS, and Amazon. It gives you a score out of 100 with actionable feedback on keywords, formatting, and impact metrics.'
  },
  {
    id: 'faq-3',
    category: 'Students',
    question: 'Are government jobs and results updated daily?',
    answer: 'Yes, our dedicated research team tracks official government portals (UPSC, SSC, Railway Recruitment Boards, IBPS, State PSCs) and updates vacancies, admit cards, and results within minutes of publication.'
  },
  {
    id: 'faq-4',
    category: 'Employers',
    question: 'How can employers post jobs and hire freshers on CareerPulse?',
    answer: 'Employers can click on "For Employers" -> "Post Job" to create an account. We offer AI candidate matching, automated skill verification tests, and bulk invitation tools to hire freshers 5x faster.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'What makes CareerPulse different from other job portals?',
    answer: 'CareerPulse combines job search, internships, government exams, AI resume checking, live portfolio generators, and career switch roadmaps into a single premium SaaS interface designed for Indian students and professionals.'
  }
];

export const SEO_CATEGORIES: SEOCategory[] = [
  {
    title: 'Jobs by Location',
    icon: 'MapPin',
    items: [
      { label: 'Jobs in Bangalore', url: '/jobs/bangalore', badge: '5,400+' },
      { label: 'Jobs in Mumbai', url: '/jobs/mumbai', badge: '4,100+' },
      { label: 'Jobs in Delhi NCR', url: '/jobs/delhi-ncr', badge: '6,200+' },
      { label: 'Jobs in Hyderabad', url: '/jobs/hyderabad', badge: '3,800+' },
      { label: 'Jobs in Pune', url: '/jobs/pune', badge: '3,200+' },
      { label: 'Jobs in Chennai', url: '/jobs/chennai', badge: '2,900+' },
      { label: 'Jobs in Kolkata', url: '/jobs/kolkata', badge: '1,800+' },
      { label: 'Remote Jobs India', url: '/jobs/remote-india', badge: '8,500+' }
    ]
  },
  {
    title: 'Jobs by Category',
    icon: 'Briefcase',
    items: [
      { label: 'Software Engineer Jobs', url: '/jobs/software-engineer' },
      { label: 'Data Science Jobs', url: '/jobs/data-science' },
      { label: 'Full Stack Developer', url: '/jobs/full-stack' },
      { label: 'Digital Marketing Jobs', url: '/jobs/marketing' },
      { label: 'Financial Analyst Jobs', url: '/jobs/finance' },
      { label: 'UI/UX Designer Jobs', url: '/jobs/ui-ux' },
      { label: 'BPO & Voice Process', url: '/jobs/bpo' },
      { label: 'HR & Recruitment', url: '/jobs/hr' }
    ]
  },
  {
    title: 'Government Jobs',
    icon: 'Building2',
    items: [
      { label: 'SSC CGL & CHSL 2026', url: '/government-jobs/ssc', badge: 'New' },
      { label: 'UPSC Civil Services', url: '/government-jobs/upsc' },
      { label: 'Railway RRB NTPC', url: '/government-jobs/railway' },
      { label: 'Bank PO & Clerk (IBPS)', url: '/government-jobs/bank' },
      { label: 'Defence & Army Jobs', url: '/government-jobs/defence' },
      { label: 'Teaching & TET Exam', url: '/government-jobs/teaching' },
      { label: 'State PSC Jobs', url: '/government-jobs/state-psc' },
      { label: 'Latest Govt Results', url: '/government-jobs/results' }
    ]
  },
  {
    title: 'Career Resources',
    icon: 'GraduationCap',
    items: [
      { label: 'Free ATS Resume Builder', url: '/tools/ats-resume-builder' },
      { label: 'AI Resume Checker', url: '/tools/ai-resume-checker' },
      { label: 'Portfolio Generator', url: '/tools/portfolio-builder' },
      { label: 'Career Switch Roadmaps', url: '/roadmaps' },
      { label: 'Aptitude & Coding Tests', url: '/mock-tests' },
      { label: 'Software Engineer Salary Guide', url: '/salary-guide' }
    ]
  }
];

export const COMPANY_LOGOS = [
  { name: 'Google', symbol: '🌐', color: 'text-blue-500' },
  { name: 'Amazon', symbol: '📦', color: 'text-amber-500' },
  { name: 'Infosys', symbol: '💼', color: 'text-blue-700' },
  { name: 'TCS', symbol: '⚙️', color: 'text-slate-800' },
  { name: 'Microsoft', symbol: '🪟', color: 'text-blue-600' },
  { name: 'Flipkart', symbol: '🛒', color: 'text-yellow-500' },
  { name: 'Accenture', symbol: '🚀', color: 'text-purple-600' },
  { name: 'IBM', symbol: '💻', color: 'text-blue-800' },
  { name: 'Oracle', symbol: '🔴', color: 'text-red-600' },
  { name: 'Deloitte', symbol: '🟢', color: 'text-green-600' },
  { name: 'Zoho', symbol: '⚡', color: 'text-red-500' },
  { name: 'Adobe', symbol: '🎨', color: 'text-red-600' }
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    slug: 'razorpay',
    name: 'Razorpay',
    logo: '⚡',
    logoBg: 'bg-blue-600 text-white',
    rating: 4.6,
    reviewsCount: 1240,
    verified: true,
    bannerImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    industry: 'FinTech / Payments Infrastructure',
    companySize: '1,000 - 5,000 Employees',
    website: 'https://razorpay.com',
    linkedIn: 'https://linkedin.com/company/razorpay',
    foundedYear: '2014',
    headquarters: 'Bangalore, Karnataka, India',
    about: 'Razorpay is India’s premier full-stack financial services platform. We empower over 10,000,000 businesses to accept payments, process payouts, issue corporate cards, and access instant business credit lines with zero friction.',
    mission: 'To build the financial backbone for digital India and simplify money movement for every business, founder, and developer.',
    values: [
      'Customer Obsession over everything else',
      'High ownership with zero bureaucracy',
      'Continuous engineering excellence and fast execution',
      'Transparency and empathetic team culture'
    ],
    benefits: [
      { icon: 'ShieldCheck', title: 'Comprehensive Medical', desc: '₹10 Lakh health cover for employee, spouse, children, and parents.' },
      { icon: 'Laptop', title: '₹50,000 Tech Allowance', desc: 'Custom workstation budget for monitors, standing desks, and accessories.' },
      { icon: 'Clock', title: 'Flexible Work & Unlimited Leave', desc: 'Trust-based PTO policy and hybrid working options.' },
      { icon: 'TrendingUp', title: 'Stock Grants & ESOPs', desc: 'Generous equity pool with 1-year cliff and quarterly buybacks.' }
    ],
    officePhotos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80'
    ],
    reviews: [
      {
        id: 'rev-1',
        authorRole: 'Senior Full Stack Engineer',
        rating: 5,
        date: 'June 2026',
        title: 'Outstanding technical culture and high engineering freedom',
        pros: 'Massive technical scale, direct merchant impact, supportive managers, and great ESOP buyback history.',
        cons: 'Fast-paced environment during product launches can lead to occasional long hours.',
        likesCount: 34
      },
      {
        id: 'rev-2',
        authorRole: 'Product Manager',
        rating: 4.5,
        date: 'May 2026',
        title: 'Best place in India to build FinTech products',
        pros: 'Zero red tape, high autonomy, competitive compensation, and great team events.',
        cons: 'Cross-functional alignment across large teams takes careful planning.',
        likesCount: 19
      }
    ],
    salaryInsights: [
      { role: 'Software Engineer', expRange: '1-3 Yrs', avgSalary: '₹18.5 LPA', minMax: '₹14L - ₹24L' },
      { role: 'Senior Software Engineer', expRange: '3-6 Yrs', avgSalary: '₹28.0 LPA', minMax: '₹22L - ₹38L' },
      { role: 'Product Manager', expRange: '2-5 Yrs', avgSalary: '₹24.0 LPA', minMax: '₹18L - ₹32L' }
    ],
    openJobsCount: 14,
    hiringLocations: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Remote'],
    faqs: [
      { question: 'What is the interview process like for engineers?', answer: 'It includes an initial HR screening, a machine coding/system architecture round, a deep technical interview, and an engineering culture fit discussion.' },
      { question: 'Does Razorpay support remote work?', answer: 'Yes, most engineering and product roles offer hybrid work arrangements (2-3 days in office) or full remote options.' }
    ]
  },
  {
    id: 'comp-2',
    slug: 'swiggy',
    name: 'Swiggy',
    logo: '🍕',
    logoBg: 'bg-orange-500 text-white',
    rating: 4.4,
    reviewsCount: 2150,
    verified: true,
    bannerImg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    industry: 'FoodTech / Quick Commerce',
    companySize: '5,000 - 10,000 Employees',
    website: 'https://swiggy.com',
    foundedYear: '2014',
    headquarters: 'Bangalore, India',
    about: 'Swiggy is India’s leading on-demand delivery platform, connecting consumers with over 200,000 restaurants and dark stores across 500+ cities.',
    mission: 'To elevate the quality of life for urban consumers by offering unparalleled convenience.',
    values: ['Always be curious', 'Customer First', 'Display Ownership', 'Strive for Excellence'],
    benefits: [
      { icon: 'ShieldCheck', title: 'Comprehensive Health Insurance', desc: 'Full coverage for family and dependents.' },
      { icon: 'Clock', title: 'Flexible Work Hours', desc: 'Work-life balance with remote options.' }
    ],
    officePhotos: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'
    ],
    reviews: [],
    salaryInsights: [],
    openJobsCount: 8,
    hiringLocations: ['Bangalore', 'Gurugram', 'Hyderabad'],
    faqs: []
  },
  {
    id: 'comp-3',
    slug: 'jio-platforms',
    name: 'Jio Platforms',
    logo: '🌐',
    logoBg: 'bg-blue-700 text-white',
    rating: 4.3,
    reviewsCount: 3890,
    verified: true,
    bannerImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
    industry: 'Telecom / Digital Cloud / AI',
    companySize: '10,000+ Employees',
    website: 'https://jio.com',
    foundedYear: '2019',
    headquarters: 'Navi Mumbai, Maharashtra, India',
    about: 'Jio Platforms is a technology giant powering digital connectivity, 5G, cloud services, and AI solutions for 450M+ users across India.',
    mission: 'Connecting every Indian through world-class digital infrastructure and hyper-affordable smart technology.',
    values: ['Digital Inclusion', 'Innovate for India', 'Uncompromised Scale'],
    benefits: [
      { icon: 'ShieldCheck', title: 'Top-tier Health Insurance', desc: 'Medical cover for employee and family.' },
      { icon: 'Wifi', title: 'Free 5G Services', desc: 'Uncapped high-speed broadband and 5G connections.' }
    ],
    officePhotos: [],
    reviews: [],
    salaryInsights: [],
    openJobsCount: 18,
    hiringLocations: ['Mumbai', 'Bangalore', 'Hyderabad', 'Delhi NCR'],
    faqs: []
  }
];

export const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-101',
    jobId: 'job-1',
    jobSlug: 'senior-full-stack-engineer-razorpay',
    jobTitle: 'Senior Full Stack Engineer (React + Node)',
    companyName: 'Razorpay',
    companyLogo: '⚡',
    location: 'Bangalore (Hybrid)',
    salary: '₹22 - ₹35 LPA',
    appliedDate: '3 days ago',
    status: 'Shortlisted',
    resumeName: 'Aarav_Sharma_FullStack_Resume.pdf',
    coverLetter: 'I am excited about building high-throughput payment systems at Razorpay. I have 4 years of experience with React, TypeScript, Node.js, and microservices.',
    portfolioUrl: 'https://aaravsharma.dev',
    linkedInUrl: 'https://linkedin.com/in/aaravsharma',
    githubUrl: 'https://github.com/aaravsharma',
    expectedSalary: '₹26 LPA',
    noticePeriod: '15 Days',
    preferredLocation: 'Bangalore',
    timeline: [
      { step: 'Applied', date: '03 Aug 2026', completed: true, notes: 'Application submitted via 1-click apply' },
      { step: 'Viewed', date: '04 Aug 2026', completed: true, notes: 'Profile viewed by Aakash Malhotra (Lead Recruiter)' },
      { step: 'Shortlisted', date: '05 Aug 2026', completed: true, current: true, notes: 'Resume shortlisted for Machine Coding Round' },
      { step: 'Interview Scheduled', date: 'Pending', completed: false },
      { step: 'Assessment', date: 'Pending', completed: false },
      { step: 'Offer', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'app-102',
    jobId: 'job-2',
    jobSlug: 'ai-data-analyst-jio-platforms',
    jobTitle: 'AI Data Analyst & ML Engineer',
    companyName: 'Jio Platforms',
    companyLogo: '🌐',
    location: 'Mumbai / Remote',
    salary: '₹14 - ₹24 LPA',
    appliedDate: '1 week ago',
    status: 'Viewed',
    resumeName: 'Aarav_Sharma_FullStack_Resume.pdf',
    timeline: [
      { step: 'Applied', date: '29 Jul 2026', completed: true },
      { step: 'Viewed', date: '01 Aug 2026', completed: true, current: true, notes: 'Hiring team reviewed candidate credentials' },
      { step: 'Shortlisted', date: 'Pending', completed: false },
      { step: 'Interview Scheduled', date: 'Pending', completed: false },
      { step: 'Assessment', date: 'Pending', completed: false },
      { step: 'Offer', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'app-103',
    jobId: 'job-4',
    jobSlug: 'associate-financial-analyst-deloitte',
    jobTitle: 'Associate Financial Analyst',
    companyName: 'Deloitte India',
    companyLogo: '🟢',
    location: 'Gurugram / Hyderabad',
    salary: '₹9 - ₹15 LPA',
    appliedDate: '2 weeks ago',
    status: 'Interview Scheduled',
    resumeName: 'Aarav_Sharma_FullStack_Resume.pdf',
    timeline: [
      { step: 'Applied', date: '22 Jul 2026', completed: true },
      { step: 'Viewed', date: '24 Jul 2026', completed: true },
      { step: 'Shortlisted', date: '27 Jul 2026', completed: true },
      { step: 'Interview Scheduled', date: '10 Aug 2026', completed: true, current: true, notes: 'Technical interview scheduled with Partner' },
      { step: 'Assessment', date: 'Pending', completed: false },
      { step: 'Offer', date: 'Pending', completed: false }
    ]
  }
];

export const MOCK_USER_PROFILE: UserProfileData = {
  id: 'user-001',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  location: 'Bangalore, Karnataka, India',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  headline: 'Senior Full Stack Engineer | React 18, TypeScript, Node.js & Microservices',
  bio: 'Passionate software engineer with 3+ years of experience building high-concurrency web applications, FinTech integrations, and modern cloud architectures.',
  atsScore: 88,
  profileCompletion: 92,
  resumeName: 'Aarav_Sharma_FullStack_Resume.pdf',
  resumeUrl: '#',
  resumeLastUpdated: '2 days ago',
  portfolioUrl: 'https://aaravsharma.dev',
  linkedIn: 'https://linkedin.com/in/aaravsharma',
  github: 'https://github.com/aaravsharma',
  noticePeriod: '15 Days / Immediate',
  expectedSalary: '₹24 - ₹28 LPA',
  preferredLocation: 'Bangalore / Remote',
  skills: [
    'React 18', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 
    'Tailwind CSS', 'Redux Toolkit', 'Docker', 'AWS S3', 'GraphQL', 'REST APIs'
  ],
  languages: ['English (Fluent)', 'Hindi (Native)', 'Kannada (Basic)'],
  achievements: [
    'Won 1st prize at Bangalore FinTech Hackathon 2025 out of 250+ teams',
    'Published open-source React state management library with 1,200+ GitHub stars',
    'Reduced API latency by 45% in current role at CloudTech Solutions'
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      institution: 'R.V. College of Engineering, Bangalore',
      startYear: '2020',
      endYear: '2024',
      grade: '8.9 / 10 CGPA'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Software Engineer',
      company: 'CloudTech Solutions',
      location: 'Bangalore, India',
      startDate: 'Jul 2024',
      endDate: 'Present',
      current: true,
      description: 'Architected customer-facing analytics dashboards serving 500k monthly active users using React 18, Node.js microservices, and Postgres DB.'
    },
    {
      id: 'exp-2',
      role: 'Frontend Developer Intern',
      company: 'InnovateX Labs',
      location: 'Remote',
      startDate: 'Jan 2024',
      endDate: 'Jun 2024',
      current: false,
      description: 'Developed responsive UI components in React and Tailwind CSS, improving lighthouse accessibility score to 98.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Developer Career Analytics Engine',
      description: 'A SaaS platform analyzing GitHub commits and resume keywords to generate instant ATS scores and skill gap reports.',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL'],
      link: 'https://devpulse.demo'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 2025',
      credentialUrl: 'https://aws.amazon.com/verify'
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      issueDate: 'Nov 2024'
    }
  ]
};

