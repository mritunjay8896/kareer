import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, 
  Bookmark, 
  FileText, 
  User, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchCandidateApplications, fetchPublishedJobs } from '../../lib/db';
import { JobApplication, JobItem } from '../../types';

export const CandidateDashboardPage: React.FC = () => {
  const { currentUser, candidateProfile, updateCandidateProfile } = useAuth();
  
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [apps, jobs] = await Promise.all([
        fetchCandidateApplications(currentUser.uid),
        fetchPublishedJobs()
      ]);
      setApplications(apps);
      setRecommendedJobs(jobs.slice(0, 3));
    } catch (e) {
      console.error('Error loading candidate dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const profile = candidateProfile || {
    fullName: 'Candidate',
    headline: 'Software Engineer',
    location: 'India',
    atsScore: 88,
    profileCompletion: 85,
    resumeName: 'Resume.pdf'
  };

  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted' || a.status === 'shortlisted').length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'interview').length;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Candidate Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-white/20 shadow-md shrink-0">
                {profile.fullName ? profile.fullName.substring(0, 2).toUpperCase() : 'ME'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold">{profile.fullName}</h1>
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
                to="/candidate/profile"
                className="px-5 py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
              >
                Edit Candidate Profile
              </Link>
            </div>
          </div>

          {/* Metrics */}
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
              <span className="text-slate-400 block mb-0.5">ATS Readiness</span>
              <span className="text-xl font-extrabold text-blue-400">{profile.atsScore || 88}%</span>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ATS Score Box */}
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
                    <span className="text-3xl font-extrabold text-blue-600">{profile.atsScore || 88}</span>
                    <span className="text-xs text-slate-500 font-semibold">/ 100 Points</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-snug">
                    Your resume matches high keyword density requirements for modern Tech and BPO job posts.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Profile Completion</span>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${profile.profileCompletion || 85}%` }}></div>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {profile.profileCompletion || 85}% complete. Add your certifications to reach 100%.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Tracker */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Your Active Job Applications ({applications.length})</h2>
                <Link to="/candidate/applications" className="text-xs font-semibold text-blue-600 hover:underline">
                  View Full History →
                </Link>
              </div>

              {loading ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading your applications...</div>
              ) : applications.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <p className="text-xs text-slate-500">You haven't applied to any job vacancies yet.</p>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Browse Opportunities & Apply
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map(app => (
                    <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-lg shrink-0">
                          {app.companyLogo || 'C'}
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
              )}
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Recommended Jobs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Recommended For You
              </h3>

              <div className="space-y-3">
                {recommendedJobs.map(job => (
                  <Link
                    key={job.id}
                    to={`/job/${job.id}`}
                    className="block p-3 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {job.logo || 'J'}
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

            {/* Active Resume */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Candidate Resume</h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 truncate">{profile.resumeName || 'Resume.pdf'}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Active</span>
              </div>
              <button 
                onClick={() => alert('Resume updated.')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Upload New Version
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
