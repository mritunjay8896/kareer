import React, { useState } from 'react';
import { 
  User, 
  FileCheck, 
  Briefcase, 
  Bookmark, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Upload,
  ExternalLink,
  Building2,
  Users,
  PlusCircle,
  Eye,
  FileText,
  Phone,
  Mail,
  GraduationCap,
  X,
  Filter,
  Check,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobApplication, JobItem, UserProfileData } from '../types';
import { Breadcrumb } from '../components/UI/Breadcrumb';

interface DashboardPageProps {
  userRole?: 'candidate' | 'employer' | null;
  currentUser?: string | null;
  applications: JobApplication[];
  jobs: JobItem[];
  profile: UserProfileData;
  onUpdateApplicationStatus: (appId: string, newStatus: JobApplication['status']) => void;
  onOpenEmployerModal: () => void;
  onSwitchRole: (role: 'candidate' | 'employer') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userRole = 'candidate',
  currentUser,
  applications,
  jobs,
  profile,
  onUpdateApplicationStatus,
  onOpenEmployerModal,
  onSwitchRole
}) => {
  const [selectedCandidateApp, setSelectedCandidateApp] = useState<JobApplication | null>(null);
  const [appFilterStatus, setAppFilterStatus] = useState<string>('All');

  const activeRole = userRole || 'candidate';
  const displayName = currentUser || (activeRole === 'employer' ? 'Swiggy Hiring Team' : profile.fullName);

  const recommendedJobs = jobs.slice(0, 3);

  // Filter applications for employer view
  const filteredApplications = applications.filter(app => {
    if (appFilterStatus === 'All') return true;
    return app.status === appFilterStatus;
  });

  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled').length;
  const offerCount = applications.filter(a => a.status === 'Offer').length;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb & Dynamic Role Switch Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumb items={[{ label: activeRole === 'candidate' ? 'Candidate Dashboard' : 'Employer Hiring Hub' }]} />

          <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1 self-start sm:self-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Active Persona:</span>
            <button
              onClick={() => onSwitchRole('candidate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeRole === 'candidate'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Candidate
            </button>
            <button
              onClick={() => onSwitchRole('employer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeRole === 'employer'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Recruiter / Employer
            </button>
          </div>
        </div>

        {/* ================= CANDIDATE VIEW ================= */}
        {activeRole === 'candidate' ? (
          <div className="space-y-6">
            {/* User Greeting & Stats Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.avatar}
                    alt={displayName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-extrabold">{displayName}</h1>
                      <span className="px-2.5 py-0.5 bg-blue-500/30 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30">
                        Pro Candidate
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1">{profile.headline}</p>
                    <p className="text-xs text-slate-400">{profile.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="px-5 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    Edit Candidate Profile
                  </Link>
                </div>
              </div>

              {/* Quick Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-slate-400 block mb-0.5">Applied Jobs</span>
                  <span className="text-xl font-extrabold text-white">{applications.length}</span>
                </div>

                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-slate-400 block mb-0.5">Shortlisted</span>
                  <span className="text-xl font-extrabold text-emerald-400">{shortlistedCount}</span>
                </div>

                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-slate-400 block mb-0.5">Interview Calls</span>
                  <span className="text-xl font-extrabold text-amber-400">{interviewCount}</span>
                </div>

                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-slate-400 block mb-0.5">Profile Views</span>
                  <span className="text-xl font-extrabold text-blue-400">142</span>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Main Column (2 Cols) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* ATS Resume & Profile Health Widget */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-600" /> ATS Resume Score & Readiness
                    </h2>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                      High Readiness
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                      <span className="text-xs font-bold text-blue-900 block">Overall ATS Score</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-blue-600">{profile.atsScore}</span>
                        <span className="text-xs text-slate-500 font-semibold">/ 100 Points</span>
                      </div>
                      <p className="text-[11px] text-blue-800 leading-snug">
                        Your resume matches 88% of keyword requirements for modern Tech & BPO roles.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                      <span className="text-xs font-bold text-slate-900 block">Profile Completion</span>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${profile.profileCompletion}%` }}></div>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {profile.profileCompletion}% complete. Add your certifications to hit 100%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Application Tracker */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-slate-900">Your Active Job Applications ({applications.length})</h2>
                    <Link to="/applied-jobs" className="text-xs font-semibold text-blue-600 hover:underline">
                      View Application History →
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {applications.map(app => (
                      <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xl flex-shrink-0">
                            {app.companyLogo}
                          </div>
                          <div>
                            <h3 className="font-bold text-xs text-slate-900">{app.jobTitle}</h3>
                            <p className="text-[11px] text-slate-500">{app.companyName} • Applied {app.appliedDate}</p>
                          </div>
                        </div>

                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                          app.status === 'Shortlisted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          app.status === 'Interview Scheduled' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          app.status === 'Offer' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Sidebar (1 Col) */}
              <div className="space-y-6">
                
                {/* Recommended Vacancies */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Recommended For You
                  </h3>

                  <div className="space-y-3">
                    {recommendedJobs.map(job => (
                      <Link
                        key={job.id}
                        to={`/job/${job.slug || job.id}`}
                        className="block p-3 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200/60 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                            {job.logo}
                          </span>
                          <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {job.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 pl-9.5">{job.company} • {job.salary}</p>
                      </Link>
                    ))}
                  </div>

                  <Link to="/jobs" className="block text-center text-xs font-bold text-blue-600 hover:underline pt-2">
                    Browse All Opportunities →
                  </Link>
                </div>

                {/* Resume Upload Box */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Active Candidate Resume</h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 truncate">{profile.resumeName}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                  </div>
                  <button 
                    onClick={() => alert('Resume updated to latest version.')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload New Version
                  </button>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* ================= EMPLOYER / RECRUITER VIEW ================= */
          <div className="space-y-6">
            
            {/* Recruiter Header Banner */}
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
                    <Building className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-extrabold">{displayName}</h1>
                      <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
                        Verified Employer Portal
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-200/80 font-medium">Recruiter Control Center • Active Talent Pipeline</p>
                    <p className="text-xs text-slate-400">100,000+ Pre-screened candidates & instant AI matching</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenEmployerModal}
                    className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" /> Post New Job Vacancy
                  </button>
                </div>
              </div>

              {/* Recruiter Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-amber-200/80 block mb-0.5">Active Job Posts</span>
                  <span className="text-xl font-extrabold text-white">{jobs.length}</span>
                </div>

                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-amber-200/80 block mb-0.5">Total Applications</span>
                  <span className="text-xl font-extrabold text-amber-400">{applications.length}</span>
                </div>

                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-amber-200/80 block mb-0.5">Shortlisted Candidates</span>
                  <span className="text-xl font-extrabold text-purple-400">{shortlistedCount}</span>
                </div>

                <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
                  <span className="text-amber-200/80 block mb-0.5">Interviews Scheduled</span>
                  <span className="text-xl font-extrabold text-emerald-400">{interviewCount}</span>
                </div>
              </div>
            </div>

            {/* Recruiter Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Candidates Stream (2 Cols) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Incoming Candidate Applications */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-600" /> Incoming Candidate Applications ({filteredApplications.length})
                      </h2>
                      <p className="text-xs text-slate-500">Review candidate resumes and update candidate hiring status live.</p>
                    </div>

                    {/* Filter Status Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
                      {['All', 'Applied', 'Shortlisted', 'Interview Scheduled', 'Offer'].map(st => (
                        <button
                          key={st}
                          onClick={() => setAppFilterStatus(st)}
                          className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                            appFilterStatus === st
                              ? 'bg-amber-400 text-slate-950 shadow-2xs font-black'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Application Cards List */}
                  <div className="space-y-4">
                    {filteredApplications.map(app => (
                      <div key={app.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-all space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                              {app.companyLogo}
                            </div>
                            <div>
                              <h3 className="font-extrabold text-sm text-slate-900">{app.jobTitle}</h3>
                              <p className="text-xs text-slate-600 font-medium">
                                Applicant: <span className="font-bold text-slate-900">Aarav Sharma</span> (88% ATS Score)
                              </p>
                              <p className="text-[11px] text-slate-400">Applied {app.appliedDate} • {app.location}</p>
                            </div>
                          </div>

                          {/* Interactive Status Changer */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Status:</span>
                            <select
                              value={app.status}
                              onChange={(e: any) => onUpdateApplicationStatus(app.id, e.target.value)}
                              className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-300 bg-white shadow-2xs focus:border-amber-500 outline-none cursor-pointer"
                            >
                              <option value="Applied">Applied (New)</option>
                              <option value="Viewed">Viewed</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Assessment">Assessment Sent</option>
                              <option value="Offer">Offer Extended</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>

                        {/* Resume & Details Footer Strip */}
                        <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-3 text-slate-600">
                            <span className="flex items-center gap-1 font-semibold text-slate-800">
                              <FileText className="w-3.5 h-3.5 text-blue-600" /> {app.resumeName}
                            </span>
                            {app.expectedSalary && <span>Expectation: <strong className="text-slate-900">{app.expectedSalary}</strong></span>}
                          </div>

                          <button
                            onClick={() => setSelectedCandidateApp(app)}
                            className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Inspect Candidate Resume
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Active Employer Posted Jobs */}
              <div className="space-y-6">
                
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-600" /> Active Employer Vacancies ({jobs.length})
                    </h3>
                    <button
                      onClick={onOpenEmployerModal}
                      className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      + Add New
                    </button>
                  </div>

                  <div className="space-y-3">
                    {jobs.slice(0, 5).map(j => (
                      <div key={j.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{j.title}</h4>
                          <p className="text-[11px] text-slate-500">{j.company} • {j.salary}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded-lg border border-amber-200">
                          {j.applicantsCount} Applicants
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/jobs" className="block text-center text-xs font-bold text-blue-600 hover:underline pt-1">
                    View All Active Job Listings →
                  </Link>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= CANDIDATE RESUME INSPECT MODAL ================= */}
        {selectedCandidateApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-200 my-auto space-y-5">
              <button
                onClick={() => setSelectedCandidateApp(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                  AS
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Aarav Sharma</h3>
                  <p className="text-xs text-slate-600 font-medium">Candidate for: <span className="font-bold text-slate-900">{selectedCandidateApp.jobTitle}</span></p>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full mt-1">
                    88% High ATS Match Score
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Contact Email:</span>
                  <span className="font-medium text-slate-900">aarav.sharma@example.com</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Mobile Phone:</span>
                  <span className="font-medium text-slate-900">+91 98765 43210</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Notice Period:</span>
                  <span className="font-medium text-slate-900">15 Days (Immediate Joiner)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Expected Salary:</span>
                  <span className="font-medium text-slate-900">{selectedCandidateApp.expectedSalary || '₹24 LPA'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Attached Resume File:</span>
                  <span className="font-bold text-blue-600 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {selectedCandidateApp.resumeName}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Change Candidate Hiring Status</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['Shortlisted', 'Interview Scheduled', 'Offer', 'Rejected'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        onUpdateApplicationStatus(selectedCandidateApp.id, st);
                        setSelectedCandidateApp(null);
                      }}
                      className={`py-2 px-3 rounded-xl font-bold transition-all border cursor-pointer ${
                        selectedCandidateApp.status === st
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidateApp(null)}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Close Candidate Dossier
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
