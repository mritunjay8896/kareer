import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { JobItem, JobApplication, UserProfileData, Company } from '../types';

// Seed Jobs Data to populate Firestore if empty
export const initialJobsList: Omit<JobItem, 'id'>[] = [
  {
    title: 'Senior Full Stack Engineer (React & Node.js)',
    company: 'Razorpay',
    logo: 'RZP',
    verified: true,
    location: 'Bengaluru, India',
    type: 'Full Time',
    salary: '₹22 - ₹32 LPA',
    experience: '3 - 6 Yrs',
    category: 'IT',
    companyType: 'Unicorn',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'System Design'],
    postedTime: '2 hours ago',
    applicantsCount: 42,
    featured: true,
    urgent: true,
    description: 'We are seeking a Senior Full Stack Engineer to lead payments core engine development. You will build highly scalable microservices, optimize performance for millions of transactions, and collaborate with product teams.',
    responsibilities: [
      'Architect and build resilient web applications with React and Node.js',
      'Optimize API response times and database query performance',
      'Mentor junior engineers and write unit & integration tests'
    ],
    requirements: [
      '3+ years of experience with React, Node.js, and TypeScript',
      'Solid understanding of relational databases and key-value stores',
      'Demonstrated experience building high-throughput REST or GraphQL APIs'
    ]
  },
  {
    title: 'Customer Experience Specialist (International Voice)',
    company: 'Teleperformance',
    logo: 'TP',
    verified: true,
    location: 'Gurugram / Noida',
    type: 'Full Time',
    salary: '₹4.5 - ₹6.5 LPA',
    experience: '0 - 2 Yrs',
    category: 'BPO',
    companyType: 'Foreign MNC',
    skills: ['Voice Process', 'English Communication', 'Customer Support', 'CRM'],
    postedTime: '1 day ago',
    applicantsCount: 128,
    featured: true,
    description: 'Provide top-tier customer support to international clients. Excellent spoken English skills and willingness to work in flexible shifts required. Fresher welcome with great communication.',
    responsibilities: [
      'Handle inbound calls and queries from US/UK customers',
      'Resolve customer inquiries professionally using internal ticketing systems',
      'Maintain high CSAT ratings and customer compliance metrics'
    ],
    requirements: [
      'Graduate or Undergraduate with excellent spoken English skills',
      'Basic computer literacy and typing speed of 30+ WPM',
      'Willingness to work 5 days a week in rotational night shifts'
    ]
  },
  {
    title: 'Frontend React Developer - Contract to Hire (C2H)',
    company: 'Infosys',
    logo: 'INF',
    verified: true,
    location: 'Hyderabad / Remote',
    type: 'Hybrid',
    salary: '₹12 - ₹18 LPA',
    experience: '2 - 4 Yrs',
    category: 'IT',
    companyType: 'Indian MNC',
    skills: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'REST API Integration'],
    postedTime: '3 hours ago',
    applicantsCount: 65,
    description: '6 Months Contract-to-Hire opportunity for an experienced React developer to join our tier-1 enterprise digital transformation project.',
    responsibilities: [
      'Develop pixel-perfect web application pages using React and Tailwind',
      'Integrate backend REST services and manage client side state',
      'Participate in daily Agile scrums and peer code reviews'
    ],
    requirements: [
      '2+ years hands-on frontend development experience',
      'Strong proficiency in JavaScript ES6+, HTML5, and CSS3',
      'Immediate joiners preferred'
    ]
  },
  {
    title: 'BPO Quality Analyst & Team Leader',
    company: 'Genpact',
    logo: 'GEN',
    verified: true,
    location: 'Jaipur / Hyderabad',
    type: 'Full Time',
    salary: '₹6.0 - ₹8.5 LPA',
    experience: '2 - 5 Yrs',
    category: 'BPO',
    companyType: 'Corporate',
    skills: ['Quality Audit', 'Feedback Coaching', 'Process Improvement', 'Excel'],
    postedTime: '5 hours ago',
    applicantsCount: 39,
    description: 'Responsible for monitoring customer support agent calls, auditing quality scores, and delivering actionable coaching sessions.',
    responsibilities: [
      'Audit call recordings against strict compliance checklists',
      'Provide 1-on-1 coaching to customer service agents',
      'Prepare weekly quality metrics reports for management'
    ],
    requirements: [
      'Minimum 1 year experience as a QA/SME in a BPO environment',
      'Strong analytical abilities and command over MS Excel',
      'Excellent verbal and written communication'
    ]
  },
  {
    title: 'Software Engineer Trainee - 2025 Freshers',
    company: 'TCS Digital',
    logo: 'TCS',
    verified: true,
    location: 'Pune / Chennai / Kolkata',
    type: 'Full Time',
    salary: '₹7.0 - ₹9.0 LPA',
    experience: '0 - 1 Yrs',
    category: 'IT',
    companyType: 'Indian MNC',
    skills: ['Java', 'Python', 'SQL', 'Data Structures', 'Problem Solving'],
    postedTime: 'Just now',
    applicantsCount: 310,
    featured: true,
    description: 'Entry-level opportunity for B.Tech / BE / MCA freshers passing out in 2024 or 2025. Comprehensive 3-month paid training included upon joining.',
    responsibilities: [
      'Undergo structured software engineering bootcamp training',
      'Assigned to enterprise development projects in Java, Cloud or Data',
      'Participate in agile sprint deliverables'
    ],
    requirements: [
      'B.E / B.Tech / M.Tech / MCA (2024 / 2025 batch)',
      'Minimum 60% marks throughout academics',
      'Solid foundational understanding of OOPs and SQL'
    ]
  },
  {
    title: 'Assistant Section Officer (Govt Notice)',
    company: 'Staff Selection Commission (SSC)',
    logo: 'SSC',
    verified: true,
    isGovernment: true,
    location: 'New Delhi',
    type: 'Full Time',
    salary: '₹44,900 - ₹1,42,400 (Level 7)',
    experience: 'Fresher',
    category: 'Govt',
    companyType: 'Govt',
    skills: ['General Awareness', 'Reasoning', 'Quantitative Aptitude', 'English'],
    postedTime: '1 day ago',
    applicantsCount: 1540,
    urgent: true,
    description: 'Official Notification for Assistant Section Officer posts in Central Secretariat Service. Selection via CGL Examination.',
    responsibilities: [
      'Policy drafting, file management, and secretarial assistance in Union Ministries',
      'Coordination with inter-ministerial departments',
      'Parliamentary question handling'
    ],
    requirements: [
      'Bachelor’s degree from a recognized University',
      'Age limit: 20 to 30 years (Relaxation as per Govt rules)',
      'Qualified in SSC CGL Tier-1 and Tier-2 exams'
    ]
  },
  {
    title: 'Civil Engineer - Gulf Operations (Saudi Arabia)',
    company: 'Al-Rashid Construction',
    logo: 'ARC',
    verified: true,
    location: 'Riyadh, Saudi Arabia',
    type: 'Full Time',
    salary: '₹18 - ₹28 LPA (Tax Free)',
    experience: '3 - 8 Yrs',
    category: 'Engineering',
    companyType: 'Foreign MNC',
    skills: ['Site Execution', 'AutoCAD', 'Structural Engineering', 'Project Management'],
    postedTime: '2 days ago',
    applicantsCount: 88,
    description: 'Urgent requirement for Site Civil Engineers for commercial high-rise construction projects in Riyadh. Free accommodation, transport and visa provided.',
    responsibilities: [
      'Supervise daily civil construction activities at site',
      'Ensure compliance with structural safety standards and Saudi building codes',
      'Coordinate with subcontractors and project managers'
    ],
    requirements: [
      'Degree / Diploma in Civil Engineering',
      'Minimum 3 years site experience in commercial buildings',
      'Valid passport with minimum 1 year validity'
    ]
  }
];

// Helper: Seed Firestore Jobs if collection is empty
export async function seedJobsIfEmpty() {
  try {
    const jobsRef = collection(db, 'jobs');
    const snapshot = await getDocs(query(jobsRef, limit(1)));
    if (snapshot.empty) {
      console.log('Seeding initial jobs into Firestore...');
      for (const job of initialJobsList) {
        await addDoc(jobsRef, {
          ...job,
          status: 'published',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      console.log('Seeding complete!');
    }
  } catch (err) {
    console.error('Error seeding jobs:', err);
  }
}

// Jobs Firestore API
export async function fetchPublishedJobs(filters?: {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  isGovt?: boolean;
}) {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    
    let jobs: JobItem[] = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as JobItem[];

    // Fallback if empty
    if (jobs.length === 0) {
      await seedJobsIfEmpty();
      const retrySnap = await getDocs(q);
      jobs = retrySnap.docs.map(d => ({ id: d.id, ...d.data() })) as JobItem[];
    }

    // Apply client filters if provided
    if (filters) {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        jobs = jobs.filter(j =>
          j.title.toLowerCase().includes(s) ||
          j.company.toLowerCase().includes(s) ||
          (j.skills && j.skills.some(sk => sk.toLowerCase().includes(s))) ||
          (j.location && j.location.toLowerCase().includes(s))
        );
      }
      if (filters.category && filters.category !== 'All') {
        jobs = jobs.filter(j => j.category === filters.category || j.type === filters.category);
      }
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        jobs = jobs.filter(j => j.location && j.location.toLowerCase().includes(loc));
      }
      if (filters.isGovt) {
        jobs = jobs.filter(j => j.isGovernment || j.category === 'Govt');
      }
    }

    return jobs;
  } catch (err) {
    console.error('Error fetching published jobs:', err);
    // Fallback local items if offline
    return initialJobsList.map((j, idx) => ({ id: `job-${idx + 1}`, ...j })) as JobItem[];
  }
}

export async function fetchJobById(jobId: string): Promise<JobItem | null> {
  try {
    const docRef = doc(db, 'jobs', jobId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as JobItem;
    }
    return null;
  } catch (err) {
    console.error('Error fetching job by ID:', err);
    return null;
  }
}

export async function fetchEmployerJobs(employerUid: string): Promise<JobItem[]> {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('employerUid', '==', employerUid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as JobItem[];
  } catch (err) {
    console.error('Error fetching employer jobs:', err);
    return [];
  }
}

export async function createJobInFirestore(jobData: any) {
  const jobsRef = collection(db, 'jobs');
  const docRef = await addDoc(jobsRef, {
    ...jobData,
    applicationCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateJobInFirestore(jobId: string, updates: any) {
  const docRef = doc(db, 'jobs', jobId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export async function deleteJobFromFirestore(jobId: string) {
  const docRef = doc(db, 'jobs', jobId);
  await deleteDoc(docRef);
}

// Applications Firestore API
export async function applyToJobInFirestore(applicationData: {
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  candidateUid: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  employerUid: string;
  resumeName: string;
  resumeUrl?: string;
  coverLetter?: string;
  expectedSalary?: string;
  noticePeriod?: string;
}) {
  // 1. Check for duplicate application
  const appsRef = collection(db, 'applications');
  const dupQuery = query(
    appsRef,
    where('jobId', '==', applicationData.jobId),
    where('candidateUid', '==', applicationData.candidateUid)
  );
  const dupSnap = await getDocs(dupQuery);
  if (!dupSnap.empty) {
    throw new Error('You have already applied for this job vacancy.');
  }

  // 2. Create application document
  const appDoc = await addDoc(appsRef, {
    ...applicationData,
    status: 'applied',
    appliedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    timeline: [
      { step: 'Applied', date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }), completed: true }
    ]
  });

  // 3. Increment job application count
  try {
    const jobRef = doc(db, 'jobs', applicationData.jobId);
    await updateDoc(jobRef, {
      applicantsCount: increment(1),
      applicationCount: increment(1)
    });
  } catch (e) {
    console.warn('Could not increment application count on job:', e);
  }

  // 4. Create employer notification
  try {
    if (applicationData.employerUid) {
      await addDoc(collection(db, 'notifications'), {
        userId: applicationData.employerUid,
        title: 'New Candidate Application',
        message: `${applicationData.candidateName} applied for ${applicationData.jobTitle}`,
        type: 'application_new',
        read: false,
        createdAt: serverTimestamp()
      });
    }
  } catch (e) {
    console.warn('Notification creation failed:', e);
  }

  return appDoc.id;
}

export async function fetchCandidateApplications(candidateUid: string): Promise<JobApplication[]> {
  try {
    const appsRef = collection(db, 'applications');
    const q = query(appsRef, where('candidateUid', '==', candidateUid));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        jobId: data.jobId || '',
        jobSlug: data.jobId || '',
        jobTitle: data.jobTitle || 'Job Role',
        companyName: data.companyName || 'Company',
        companyLogo: data.companyLogo || 'C',
        location: data.location || 'India',
        salary: data.salary || 'Best in Industry',
        appliedDate: data.appliedAt?.toDate ? data.appliedAt.toDate().toLocaleDateString() : 'Recently',
        status: data.status || 'applied',
        resumeName: data.resumeName || 'Resume.pdf',
        coverLetter: data.coverLetter,
        expectedSalary: data.expectedSalary,
        timeline: data.timeline || []
      } as JobApplication;
    });
  } catch (err) {
    console.error('Error fetching candidate applications:', err);
    return [];
  }
}

export async function fetchEmployerApplications(employerUid: string): Promise<JobApplication[]> {
  try {
    const appsRef = collection(db, 'applications');
    const q = query(appsRef, where('employerUid', '==', employerUid));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        jobId: data.jobId || '',
        jobSlug: data.jobId || '',
        jobTitle: data.jobTitle || 'Job Role',
        companyName: data.companyName || 'Company',
        companyLogo: data.companyLogo || 'C',
        location: data.location || 'India',
        salary: data.salary || 'Best in Industry',
        appliedDate: data.appliedAt?.toDate ? data.appliedAt.toDate().toLocaleDateString() : 'Recently',
        status: data.status || 'applied',
        resumeName: data.resumeName || 'Resume.pdf',
        coverLetter: data.coverLetter,
        expectedSalary: data.expectedSalary,
        candidateName: data.candidateName || 'Candidate',
        candidateEmail: data.candidateEmail || '',
        candidatePhone: data.candidatePhone || '',
        timeline: data.timeline || []
      } as unknown as JobApplication;
    });
  } catch (err) {
    console.error('Error fetching employer applications:', err);
    return [];
  }
}

export async function updateApplicationStatusInFirestore(appId: string, status: string, candidateUid?: string, jobTitle?: string) {
  const docRef = doc(db, 'applications', appId);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp()
  });

  if (candidateUid) {
    try {
      await addDoc(collection(db, 'notifications'), {
        userId: candidateUid,
        title: 'Application Status Updated',
        message: `Your application for ${jobTitle || 'the position'} has been updated to: ${status}`,
        type: 'application_update',
        read: false,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Failed to send status update notification:', e);
    }
  }
}

// Saved Jobs Firestore API
export async function toggleSavedJobInFirestore(candidateUid: string, jobId: string) {
  const savedRef = collection(db, 'savedJobs');
  const q = query(savedRef, where('candidateUid', '==', candidateUid), where('jobId', '==', jobId));
  const snap = await getDocs(q);

  if (!snap.empty) {
    // Delete doc
    await deleteDoc(doc(db, 'savedJobs', snap.docs[0].id));
    return false; // unsaved
  } else {
    // Save doc
    await addDoc(savedRef, {
      candidateUid,
      jobId,
      savedAt: serverTimestamp()
    });
    return true; // saved
  }
}

export async function fetchSavedJobIds(candidateUid: string): Promise<string[]> {
  try {
    const savedRef = collection(db, 'savedJobs');
    const q = query(savedRef, where('candidateUid', '==', candidateUid));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data().jobId);
  } catch (e) {
    return [];
  }
}
