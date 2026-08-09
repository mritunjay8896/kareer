import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CandidateRoute, EmployerRoute, AdminRoute } from './components/Auth/ProtectedRoute';

import { Navbar } from './components/Navbar/Navbar';
import { LeftSidebarRail } from './components/Navbar/LeftSidebarRail';
import { Footer } from './components/Footer/Footer';
import { AuthModal } from './components/Auth/AuthModal';
import { EmployerModal } from './components/EmployerCTA/EmployerModal';
import { ToastContainer, ToastMessage } from './components/UI/Toast';
import { ApplyModal } from './components/UI/ApplyModal';
import { JobItem, JobApplication, UserProfileData, CareerSwitchPath } from './types';
import { MOCK_JOBS, MOCK_APPLICATIONS, MOCK_USER_PROFILE } from './data/mockData';

// General Candidate Pages
import { LandingPage } from './pages/LandingPage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import { AppliedJobsPage } from './pages/AppliedJobsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CandidateLoginPage } from './pages/CandidateLoginPage';
import { CandidateRegisterPage } from './pages/CandidateRegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Government Jobs Pages
import { GovJobsPublicListPage } from './pages/GovJobsPublicListPage';
import { GovJobDetailPage } from './pages/GovJobDetailPage';

// Admin CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardLayout } from './pages/admin/AdminDashboardLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminJobsListPage } from './pages/admin/AdminJobsListPage';
import { AdminJobFormPage } from './pages/admin/AdminJobFormPage';

// Specialized Candidate Pages
import { CandidateDashboardPage } from './pages/candidate/CandidateDashboardPage';
import { CandidateProfilePage } from './pages/candidate/CandidateProfilePage';

// Employer Experience Pages
import { EmployerLandingPage } from './pages/employer/EmployerLandingPage';
import { EmployerLoginPage } from './pages/employer/EmployerLoginPage';
import { EmployerRegisterPage } from './pages/employer/EmployerRegisterPage';
import { EmployerDashboardPage } from './pages/employer/EmployerDashboardPage';
import { EmployerJobsPage } from './pages/employer/EmployerJobsPage';
import { EmployerPostJobPage } from './pages/employer/EmployerPostJobPage';
import { EmployerApplicationsPage } from './pages/employer/EmployerApplicationsPage';
import { EmployerCandidatesPage } from './pages/employer/EmployerCandidatesPage';
import { EmployerCompanyPage } from './pages/employer/EmployerCompanyPage';
import { EmployerSettingsPage } from './pages/employer/EmployerSettingsPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainAppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function MainAppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userRole, candidateProfile, logout } = useAuth();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>(['job-1', 'job-4']);

  // Dynamic state fallback for offline/mock operations
  const [jobs, setJobs] = useState<JobItem[]>(MOCK_JOBS);
  const [applications, setApplications] = useState<JobApplication[]>(MOCK_APPLICATIONS);

  // Auth & Role state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authRole, setAuthRole] = useState<'candidate' | 'employer'>('candidate');

  // Employer Posting Modal state
  const [employerModalOpen, setEmployerModalOpen] = useState(false);

  // Apply Modal state
  const [selectedJobToApply, setSelectedJobToApply] = useState<JobItem | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const isEmployerRoute = location.pathname.startsWith('/employer') || location.pathname.startsWith('/employers');
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Helper to trigger toast messages
  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenAuth = (mode: 'login' | 'register', role: 'candidate' | 'employer' = 'candidate') => {
    if (role === 'employer') {
      if (mode === 'login') navigate('/employers/login');
      else navigate('/employers/register');
    } else {
      if (mode === 'login') navigate('/login');
      else navigate('/register');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      addToast('info', 'Logged Out', 'You have been signed out successfully.');
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyJob = (job: JobItem) => {
    setSelectedJobToApply(job);
    setApplyModalOpen(true);
  };

  const handleApplySuccess = (applicationData: any) => {
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: selectedJobToApply?.id || 'job-new',
      jobSlug: selectedJobToApply?.slug || 'job-new',
      jobTitle: applicationData.jobTitle || selectedJobToApply?.title || 'Software Position',
      companyName: applicationData.companyName || selectedJobToApply?.company || 'Leading Company',
      companyLogo: (selectedJobToApply?.logo || applicationData.companyName?.charAt(0) || 'C').toUpperCase(),
      location: selectedJobToApply?.location || 'Bangalore, India',
      salary: selectedJobToApply?.salary || '₹12 - ₹18 LPA',
      appliedDate: 'Just now',
      status: 'Applied',
      timeline: [
        { step: 'Applied', date: 'Just now', completed: true, notes: 'Application submitted successfully with 1-click candidate profile.' }
      ],
      resumeName: applicationData.resumeName || candidateProfile?.resumeName || 'Resume.pdf',
      expectedSalary: applicationData.expectedSalary || '₹12 - ₹18 LPA',
    };

    setApplications((prev) => [newApp, ...prev]);

    if (selectedJobToApply) {
      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.id === selectedJobToApply.id
            ? { ...j, applicantsCount: j.applicantsCount + 1 }
            : j
        )
      );
    }

    addToast(
      'success',
      `Applied to ${newApp.companyName}!`,
      `Your application for ${newApp.jobTitle} was submitted successfully.`
    );
  };

  const handlePostNewJob = (jobData: Partial<JobItem>) => {
    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      slug: `job-${Date.now()}`,
      title: jobData.title || 'Senior Engineer',
      company: jobData.company || 'Tech Corp',
      companySlug: 'tech-corp',
      location: jobData.location || 'Bangalore',
      salary: jobData.salary || '₹12 - ₹20 LPA',
      experience: jobData.experience || '1 - 3 Years',
      type: jobData.type || 'Full Time',
      category: jobData.category || 'IT',
      skills: jobData.skills || ['React', 'Node.js'],
      postedTime: 'Just now',
      applicantsCount: 0,
      description: jobData.description || 'Exciting software engineering role.',
      logo: jobData.logo || 'T',
      logoBg: jobData.logoBg || 'bg-blue-600 text-white',
      verified: true,
      featured: true,
      requirements: jobData.requirements || ['Strong problem solving'],
      responsibilities: jobData.responsibilities || ['Build scalable applications'],
    };

    setJobs((prev) => [newJob, ...prev]);

    addToast(
      'success',
      `Vacancy Live on Platform!`,
      `"${newJob.title}" by ${newJob.company} is now published for candidates.`
    );
  };

  const handleWithdrawApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    addToast('info', 'Application Withdrawn', 'Job application removed from your candidate profile.');
  };

  const handleBookmarkJob = (jobId: string) => {
    if (bookmarkedJobIds.includes(jobId)) {
      setBookmarkedJobIds(bookmarkedJobIds.filter((id) => id !== jobId));
      addToast('info', 'Job Removed', 'Removed from bookmarked opportunities.');
    } else {
      setBookmarkedJobIds([...bookmarkedJobIds, jobId]);
      addToast('success', 'Job Saved!', 'Added to your bookmarked opportunities.');
    }
  };

  const handleSelectTool = (toolName: string) => {
    addToast('info', `Opening ${toolName}`, 'Launching AI tool workspace...');
  };

  const handleExplorePath = (path: CareerSwitchPath) => {
    addToast('info', `${path.title} Roadmap`, `Opening learning curriculum for ${path.duration}.`);
  };

  const handleTriggerSearch = (query: string) => {
    addToast('info', `Searching for "${query}"`, 'Filtering vacancies...');
    navigate('/jobs');
  };

  const handleNavClick = (topic: string) => {
    navigate('/jobs');
  };

  const handleSeoLinkClick = (url: string, label: string) => {
    navigate('/jobs');
  };

  const handleSubscribeNewsletter = (email: string) => {
    addToast(
      'success',
      'Subscribed to Job Alerts!',
      `Weekly hiring digests will be sent to ${email}.`
    );
  };

  const userName = currentUser ? (currentUser.displayName || candidateProfile?.fullName || currentUser.email) : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Universal Navbar for Candidate & Employer experience */}
      {!isAdminRoute && <Navbar />}

      {/* Slim Vertical Left Menu Rail for Candidate Pages */}
      {!isEmployerRoute && !isAdminRoute && (
        <LeftSidebarRail
          currentUser={userName}
          userRole={userRole}
          onOpenEmployer={() => navigate('/employers/register')}
          onSwitchRole={(role) => navigate(role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard')}
          onNavClick={handleNavClick}
        />
      )}

      {/* Main Container */}
      <main className={`flex-1 ${!isAdminRoute ? 'pt-[64px]' : ''} ${!isEmployerRoute && !isAdminRoute ? 'md:pl-16' : ''}`}>
        <Routes>
          {/* GOVERNMENT JOBS PUBLIC ROUTES */}
          <Route path="/government-jobs" element={<GovJobsPublicListPage />} />
          <Route path="/government-jobs/:slug" element={<GovJobDetailPage />} />

          {/* ADMIN CMS ROUTES */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboardLayout /></AdminRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="jobs" element={<AdminJobsListPage />} />
            <Route path="jobs/new" element={<AdminJobFormPage />} />
            <Route path="jobs/edit/:id" element={<AdminJobFormPage />} />
          </Route>

          {/* CANDIDATE ROUTES */}
          <Route
            path="/"
            element={
              <LandingPage
                onOpenAuth={handleOpenAuth}
                onApplyJob={handleApplyJob}
                onBookmarkJob={handleBookmarkJob}
                bookmarkedJobIds={bookmarkedJobIds}
                onSelectTool={handleSelectTool}
                onEmployerJobPublished={(title, company) => handlePostNewJob({ title, company })}
                onExplorePath={handleExplorePath}
                onSeoLinkClick={handleSeoLinkClick}
              />
            }
          />
          <Route path="/jobs" element={<JobsPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} />} />
          <Route path="/internships" element={<JobsPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} />} />
          <Route path="/gulf-jobs" element={<JobsPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} />} />
          <Route path="/mock-tests" element={<JobsPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} />} />
          <Route path="/job/:slug" element={<JobDetailPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} />} />
          <Route path="/company/:slug" element={<CompanyProfilePage onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} />} />

          {/* Candidate Auth */}
          <Route path="/login" element={<CandidateLoginPage />} />
          <Route path="/register" element={<CandidateRegisterPage />} />

          {/* Protected Candidate Experience */}
          <Route path="/candidate/dashboard" element={<CandidateRoute><CandidateDashboardPage /></CandidateRoute>} />
          <Route path="/candidate/profile" element={<CandidateRoute><CandidateProfilePage /></CandidateRoute>} />
          <Route path="/candidate/applications" element={<CandidateRoute><AppliedJobsPage applicationsList={applications} onWithdrawApp={handleWithdrawApplication} /></CandidateRoute>} />
          <Route path="/candidate/saved-jobs" element={<CandidateRoute><SavedJobsPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} /></CandidateRoute>} />
          <Route path="/resume-builder" element={<CandidateRoute><CandidateProfilePage /></CandidateRoute>} />
          <Route path="/portfolio" element={<CandidateRoute><CandidateProfilePage /></CandidateRoute>} />

          {/* Legacy Candidate route redirects */}
          <Route path="/dashboard" element={
            userRole === 'employer' 
              ? <Navigate to="/employer/dashboard" replace /> 
              : <CandidateRoute><CandidateDashboardPage /></CandidateRoute>
          } />
          <Route path="/profile" element={<CandidateRoute><CandidateProfilePage /></CandidateRoute>} />
          <Route path="/saved-jobs" element={<CandidateRoute><SavedJobsPage jobsList={jobs} onApplyJob={handleApplyJob} onBookmarkJob={handleBookmarkJob} bookmarkedJobIds={bookmarkedJobIds} /></CandidateRoute>} />
          <Route path="/applied-jobs" element={<CandidateRoute><AppliedJobsPage applicationsList={applications} onWithdrawApp={handleWithdrawApplication} /></CandidateRoute>} />

          {/* EMPLOYER EXPERIENCE ROUTES */}
          <Route path="/employers" element={<EmployerLandingPage />} />
          <Route path="/employers/login" element={<EmployerLoginPage />} />
          <Route path="/employers/register" element={<EmployerRegisterPage />} />

          {/* Protected Employer Experience */}
          <Route path="/employer/dashboard" element={<EmployerRoute><EmployerDashboardPage /></EmployerRoute>} />
          <Route path="/employer/jobs" element={<EmployerRoute><EmployerJobsPage /></EmployerRoute>} />
          <Route path="/employer/jobs/new" element={<EmployerRoute><EmployerPostJobPage /></EmployerRoute>} />
          <Route path="/employer/applications" element={<EmployerRoute><EmployerApplicationsPage /></EmployerRoute>} />
          <Route path="/employer/candidates" element={<EmployerRoute><EmployerCandidatesPage /></EmployerRoute>} />
          <Route path="/employer/company" element={<EmployerRoute><EmployerCompanyPage /></EmployerRoute>} />
          <Route path="/employer/settings" element={<EmployerRoute><EmployerSettingsPage /></EmployerRoute>} />

          {/* Catch-all fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer (Rendered for candidate experience) */}
      {!isEmployerRoute && !isAdminRoute && (
        <Footer
          onSubscribeNewsletter={handleSubscribeNewsletter}
          onLinkClick={handleNavClick}
        />
      )}

      {/* Auth Modal Fallback */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        initialRole={authRole}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {}}
      />

      {/* Employer Vacancy Publishing Modal */}
      <EmployerModal
        isOpen={employerModalOpen}
        onClose={() => setEmployerModalOpen(false)}
        onSubmitJob={handlePostNewJob}
      />

      {/* Apply Job Modal */}
      <ApplyModal
        job={selectedJobToApply}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onSubmitSuccess={handleApplySuccess}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

