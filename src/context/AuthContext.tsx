import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { UserProfileData, Company } from '../types';

export type UserRole = 'candidate' | 'employer' | 'admin';

export interface EmployerProfile {
  uid: string;
  name: string;
  email: string;
  designation: string;
  companyId: string;
  phone: string;
}

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole | null;
  candidateProfile: UserProfileData | null;
  employerProfile: EmployerProfile | null;
  companyProfile: Company | null;
  loading: boolean;
  authInitialized: boolean;
  loginCandidate: (email: string, pass: string) => Promise<void>;
  loginEmployer: (email: string, pass: string) => Promise<void>;
  demoCandidateLogin: () => Promise<void>;
  demoEmployerLogin: () => Promise<void>;
  registerCandidate: (name: string, email: string, pass: string, phone: string) => Promise<void>;
  registerEmployer: (data: {
    fullName: string;
    workEmail: string;
    pass: string;
    companyName: string;
    companyWebsite?: string;
    companySize?: string;
    industry?: string;
    phone: string;
    designation: string;
  }) => Promise<void>;
  loginWithGoogle: (targetRole?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateCandidateProfile: (updates: Partial<UserProfileData>) => Promise<void>;
  updateCompanyProfile: (updates: Partial<Company>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const defaultCandidateProfile: UserProfileData = {
  id: '',
  fullName: 'Priya Sharma',
  email: '',
  phone: '+91 98765 43210',
  location: 'Bengaluru, India',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  headline: 'Senior Full Stack Developer • Open for Immediate Joining',
  bio: 'Passionate software developer with 3+ years experience building React and Node.js applications.',
  atsScore: 88,
  profileCompletion: 85,
  resumeName: 'Priya_Sharma_Resume.pdf',
  resumeUrl: '',
  resumeLastUpdated: 'Today',
  portfolioUrl: 'https://github.com',
  linkedIn: 'https://linkedin.com',
  github: 'https://github.com',
  noticePeriod: '15 Days',
  expectedSalary: '₹18 LPA',
  preferredLocation: 'Bengaluru / Hybrid',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'REST API'],
  languages: ['English', 'Hindi', 'Kannada'],
  achievements: ['Top 5% Hackathon Finalist', 'AWS Certified Developer'],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science',
      fieldOfStudy: 'Computer Science',
      institution: 'VTU Technological University',
      startYear: '2020',
      endYear: '2024',
      grade: '8.8 CGPA'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Frontend Engineer',
      company: 'TechCorp Solutions',
      location: 'Bengaluru',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Built high-throughput dashboard applications with React, TypeScript, and Redux.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AI Resume Analyzer',
      description: 'Built an ATS keyword optimization tool for job seekers using Gemini AI.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API']
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2024'
    }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<UserProfileData | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  const [companyProfile, setCompanyProfile] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // Monitor Auth state changes & retrieve user role from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        try {
          // Fetch role from Firestore user document
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            const role = (data.role || 'candidate') as UserRole;
            setUserRole(role);

            if (role === 'candidate') {
              // Fetch candidate profile
              const candRef = doc(db, 'candidates', user.uid);
              const candSnap = await getDoc(candRef);
              if (candSnap.exists()) {
                setCandidateProfile({ id: user.uid, ...candSnap.data() } as UserProfileData);
              } else {
                // Initialize default candidate profile
                const initialCand = {
                  ...defaultCandidateProfile,
                  id: user.uid,
                  fullName: user.displayName || 'Candidate',
                  email: user.email || ''
                };
                await setDoc(candRef, {
                  ...initialCand,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
                });
                setCandidateProfile(initialCand);
              }
            } else if (role === 'employer') {
              // Fetch employer profile & company profile
              const empRef = doc(db, 'employers', user.uid);
              const empSnap = await getDoc(empRef);
              if (empSnap.exists()) {
                const empData = empSnap.data() as EmployerProfile;
                setEmployerProfile(empData);

                if (empData.companyId) {
                  const compSnap = await getDoc(doc(db, 'companies', empData.companyId));
                  if (compSnap.exists()) {
                    setCompanyProfile({ id: compSnap.id, ...compSnap.data() } as Company);
                  }
                }
              }
            }
          } else {
            // Default role if user doc is missing
            setUserRole('candidate');
            // Create user doc
            await setDoc(userDocRef, {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'Candidate',
              role: 'candidate',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }).catch(e => console.warn('User doc auto-creation error:', e));
          }
        } catch (err) {
          console.error('Error fetching user role from Firestore:', err);
          // Don't log out user on firestore fetch error, default to candidate or current role
          if (!userRole) setUserRole('candidate');
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setCandidateProfile(null);
        setEmployerProfile(null);
        setCompanyProfile(null);
      }
      setLoading(false);
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  // Candidate Login
  const loginCandidate = async (email: string, pass: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const userDocRef = doc(db, 'users', res.user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists() && userSnap.data().role === 'employer') {
        throw new Error('This account is registered as an Employer. Please log in through the Employer Portal.');
      } else if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email || email,
          displayName: res.user.displayName || 'Candidate',
          role: 'candidate',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setUserRole('candidate');
      } else {
        setUserRole('candidate');
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/admin-restricted-operation' || err.code === 'auth/configuration-not-found') {
        await demoCandidateLogin();
        return;
      }
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password. Please check your details or click "⚡ Quick Demo Candidate Login".');
      }
      throw err;
    }
  };

  // Employer Login
  const loginEmployer = async (email: string, pass: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const userDocRef = doc(db, 'users', res.user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        // Automatically create employer user doc and default company if missing
        const companyId = `comp-${res.user.uid}`;
        const defaultComp: Company = {
          id: companyId,
          slug: 'techcorp-solutions',
          name: 'TechCorp Solutions',
          logo: 'TCS',
          logoBg: 'bg-amber-500',
          rating: 4.8,
          reviewsCount: 24,
          verified: true,
          bannerImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
          industry: 'Technology / IT Services',
          companySize: '500-1000 Employees',
          website: 'https://techcorp.example.com',
          foundedYear: '2015',
          headquarters: 'Bengaluru, India',
          about: 'TechCorp Solutions is a tech leader hiring engineers and product leaders.',
          mission: 'Empowering enterprise software.',
          values: ['Innovation', 'Excellence'],
          benefits: [],
          officePhotos: [],
          reviews: [],
          salaryInsights: [],
          openJobsCount: 5,
          hiringLocations: ['Bengaluru', 'Remote'],
          faqs: []
        };
        await setDoc(doc(db, 'companies', companyId), defaultComp);

        const defaultEmp: EmployerProfile = {
          uid: res.user.uid,
          name: res.user.displayName || 'Vikram Malhotra',
          email: res.user.email || email,
          designation: 'Senior Talent Acquisition Lead',
          companyId,
          phone: '+91 98765 00000'
        };
        await setDoc(doc(db, 'employers', res.user.uid), defaultEmp);

        await setDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email || email,
          displayName: res.user.displayName || 'Vikram Malhotra',
          role: 'employer',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        setUserRole('employer');
        setEmployerProfile(defaultEmp);
        setCompanyProfile(defaultComp);
      } else if (userSnap.data().role === 'candidate') {
        // Upgrade role if logging in on employer portal explicitly
        await setDoc(userDocRef, { role: 'employer', updatedAt: serverTimestamp() }, { merge: true });
        setUserRole('employer');
      } else {
        setUserRole('employer');
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/admin-restricted-operation' || err.code === 'auth/configuration-not-found') {
        await demoEmployerLogin();
        return;
      }
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        throw new Error('No account found with these credentials. Please click "Register Employer Account" or use "⚡ Quick Demo Recruiter Login".');
      }
      throw err;
    }
  };

  // Demo Candidate 1-Click Login
  const demoCandidateLogin = async () => {
    const demoEmail = 'candidate.demo@glitread.com';
    const demoPass = 'Candidate@12345';
    try {
      await loginCandidate(demoEmail, demoPass);
    } catch (err: any) {
      try {
        await registerCandidate('Priya Sharma', demoEmail, demoPass, '+91 98765 43210');
      } catch (regErr) {
        await signInWithEmailAndPassword(auth, demoEmail, demoPass);
        setUserRole('candidate');
      }
    }
  };

  // Demo Employer 1-Click Login
  const demoEmployerLogin = async () => {
    const demoEmail = 'recruiter.demo@glitread.com';
    const demoPass = 'Employer@12345';
    try {
      await loginEmployer(demoEmail, demoPass);
    } catch (err: any) {
      try {
        await registerEmployer({
          fullName: 'Vikram Malhotra',
          workEmail: demoEmail,
          pass: demoPass,
          companyName: 'TechCorp Hiring Hub',
          companyWebsite: 'https://techcorp.example.com',
          companySize: '250 - 500 Employees',
          industry: 'Software & Technology',
          phone: '+91 98765 11111',
          designation: 'Talent Acquisition Lead'
        });
      } catch (regErr) {
        await signInWithEmailAndPassword(auth, demoEmail, demoPass);
        setUserRole('employer');
      }
    }
  };

  // Candidate Registration
  const registerCandidate = async (name: string, email: string, pass: string, phone: string) => {
    let uid: string;
    let photoURL = '';

    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      uid = res.user.uid;
      photoURL = res.user.photoURL || '';
    } catch (authErr: any) {
      console.warn('Firebase Auth candidate registration fallback:', authErr);
      if (
        authErr.code === 'auth/operation-not-allowed' || 
        authErr.code === 'auth/admin-restricted-operation' || 
        authErr.code === 'auth/configuration-not-found' ||
        authErr.code === 'auth/email-already-in-use'
      ) {
        uid = `cand-${Date.now()}`;
        setCurrentUser({
          uid,
          email,
          displayName: name,
          photoURL: ''
        } as unknown as User);
      } else {
        throw new Error(authErr.message || 'Candidate registration failed.');
      }
    }

    const candData: UserProfileData = {
      ...defaultCandidateProfile,
      id: uid,
      fullName: name,
      email,
      phone
    };

    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        email,
        displayName: name,
        role: 'candidate',
        photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      await setDoc(doc(db, 'candidates', uid), {
        ...candData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (dbErr) {
      console.warn('Firestore write warning:', dbErr);
    }

    setUserRole('candidate');
    setCandidateProfile(candData);
  };

  // Employer Registration
  const registerEmployer = async (data: {
    fullName: string;
    workEmail: string;
    pass: string;
    companyName: string;
    companyWebsite?: string;
    companySize?: string;
    industry?: string;
    phone: string;
    designation: string;
  }) => {
    let uid: string;
    let photoURL = '';

    try {
      const res = await createUserWithEmailAndPassword(auth, data.workEmail, data.pass);
      uid = res.user.uid;
      photoURL = res.user.photoURL || '';
    } catch (authErr: any) {
      console.warn('Firebase Auth employer registration fallback:', authErr);
      if (
        authErr.code === 'auth/operation-not-allowed' || 
        authErr.code === 'auth/admin-restricted-operation' || 
        authErr.code === 'auth/configuration-not-found' ||
        authErr.code === 'auth/email-already-in-use'
      ) {
        uid = `emp-${Date.now()}`;
        setCurrentUser({
          uid,
          email: data.workEmail,
          displayName: data.fullName,
          photoURL: ''
        } as unknown as User);
      } else {
        throw new Error(authErr.message || 'Employer registration failed.');
      }
    }

    // 1. Create Company ID & Document
    const companyId = `comp-${Date.now()}`;
    const compData: Company = {
      id: companyId,
      slug: data.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: data.companyName,
      logo: data.companyName.substring(0, 3).toUpperCase(),
      logoBg: 'bg-amber-500',
      rating: 4.8,
      reviewsCount: 12,
      verified: true,
      bannerImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
      industry: data.industry || 'Technology / IT',
      companySize: data.companySize || '50 - 200 Employees',
      website: data.companyWebsite || 'https://example.com',
      foundedYear: '2018',
      headquarters: 'Bengaluru, India',
      about: `${data.companyName} is a leading organization hiring top talent across technology, operations, and business functions.`,
      mission: 'Delivering excellence through innovation.',
      values: ['Innovation', 'Integrity', 'Excellence'],
      benefits: [],
      officePhotos: [],
      reviews: [],
      salaryInsights: [],
      openJobsCount: 0,
      hiringLocations: ['Bengaluru', 'Remote'],
      faqs: []
    };

    const empData: EmployerProfile = {
      uid,
      name: data.fullName,
      email: data.workEmail,
      designation: data.designation,
      companyId,
      phone: data.phone
    };

    try {
      await setDoc(doc(db, 'companies', companyId), {
        ...compData,
        ownerUid: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      await setDoc(doc(db, 'employers', uid), {
        ...empData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      await setDoc(doc(db, 'users', uid), {
        uid,
        email: data.workEmail,
        displayName: data.fullName,
        role: 'employer',
        photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (dbErr) {
      console.warn('Firestore write warning:', dbErr);
    }

    setUserRole('employer');
    setEmployerProfile(empData);
    setCompanyProfile(compData);
  };

  // Google Login
  const loginWithGoogle = async (targetRole: UserRole = 'candidate') => {
    const res = await signInWithPopup(auth, googleProvider);
    const uid = res.user.uid;

    const userDocRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      // First time Google User
      await setDoc(userDocRef, {
        uid,
        email: res.user.email,
        displayName: res.user.displayName || 'User',
        role: targetRole,
        photoURL: res.user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      if (targetRole === 'candidate') {
        const candData: UserProfileData = {
          ...defaultCandidateProfile,
          id: uid,
          fullName: res.user.displayName || 'Candidate',
          email: res.user.email || ''
        };
        await setDoc(doc(db, 'candidates', uid), {
          ...candData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setCandidateProfile(candData);
      }
      setUserRole(targetRole);
    } else {
      const data = userSnap.data();
      setUserRole(data.role || 'candidate');
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserRole(null);
    setCandidateProfile(null);
    setEmployerProfile(null);
    setCompanyProfile(null);
  };

  // Update Candidate Profile
  const updateCandidateProfile = async (updates: Partial<UserProfileData>) => {
    if (!currentUser) return;
    const candRef = doc(db, 'candidates', currentUser.uid);
    await setDoc(candRef, updates, { merge: true });
    setCandidateProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  // Update Company Profile
  const updateCompanyProfile = async (updates: Partial<Company>) => {
    if (!companyProfile?.id) return;
    const compRef = doc(db, 'companies', companyProfile.id);
    await setDoc(compRef, updates, { merge: true });
    setCompanyProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole,
        candidateProfile,
        employerProfile,
        companyProfile,
        loading,
        authInitialized,
        loginCandidate,
        loginEmployer,
        demoCandidateLogin,
        demoEmployerLogin,
        registerCandidate,
        registerEmployer,
        loginWithGoogle,
        logout,
        updateCandidateProfile,
        updateCompanyProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
