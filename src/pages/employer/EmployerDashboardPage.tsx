import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Briefcase, 
  PlusCircle, 
  Eye, 
  CheckCircle2, 
  Clock, 
  FileText, 
  X, 
  Filter, 
  Search, 
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchEmployerJobs, 
  fetchEmployerApplications, 
  updateApplicationStatusInFirestore 
} from '../../lib/db';
import { JobItem, JobApplication } from '../../types';

export const EmployerDashboardPage: React.FC = () => {
  const { currentUser, employerProfile, companyProfile } = useAuth();
  
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [appFilter, setAppFilter] = useState('All');
  const [selectedCandidateApp, setSelectedCandidateApp] = useState<JobApplication | null>(null);

  const loadEmployerData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [fetchedJobs, fetchedApps] = await Promise.all([
        fetchEmployerJobs(currentUser.uid),
        fetchEmployerApplications(currentUser.uid)
      ]);
      setJobs(fetchedJobs);
      setApplications(fetchedApps);
    } catch (e) {
      console.error('Error loading employer dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployerData();
  }, [currentUser]);

  const handleUpdateStatus = async (appId: string, newStatus: string) => {
    try {
      await updateApplicationStatusInFirestore(appId, newStatus);
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus as any } : a));
    } catch (e) {
      alert('Failed to update application status.');
    }
  };

  const filteredApps = applications.filter(a => {
    if (appFilter === 'All') return true;
    return a.status === appFilter;
  });

  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted' || a.status === 'shortlisted').length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'interview').length;
  const offerCount = applications.filter(a => a.status === 'Offer' || a.status === 'offer').length;

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Recruiter Header Banner */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
                <Building className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold">{companyProfile?.name || employerProfile?.name || 'Recruiter Portal'}</h1>
                  <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
                    Verified Employer Portal
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
                  {employerProfile?.name ? `${employerProfile.name} • ${employerProfile.designation}` : 'Active Recruiter Workspace'}
                </p>
                <p className="text-xs text-slate-400">Manage job vacancies, review resumes & track candidate interviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/employer/jobs/new"
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" /> Post New Job Vacancy
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Active Job Listings</span>
              <span className="text-xl font-extrabold text-white">{jobs.length}</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Total Applications</span>
              <span className="text-xl font-extrabold text-amber-400">{applications.length}</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Shortlisted Candidates</span>
              <span className="text-xl font-extrabold text-purple-400">{shortlistedCount}</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Interviews Scheduled</span>
              <span className="text-xl font-extrabold text-emerald-400">{interviewCount}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Applications Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" /> Incoming Candidate Applications ({filteredApps.length})
                  </h2>
                  <p className="text-xs text-slate-400">Review candidate resumes and update candidate hiring status live.</p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
                  {['All', 'applied', 'Shortlisted', 'Interview Scheduled', 'Offer'].map(st => (
                    <button
                      key={st}
                      onClick={() => setAppFilter(st)}
                      className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                        appFilter === st
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-xs text-slate-400">Loading candidate applications...</div>
              ) : filteredApps.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-xs text-slate-400">No applications match this filter yet.</p>
                  <Link
                    to="/employer/jobs/new"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl"
                  >
                    <PlusCircle className="w-4 h-4" /> Post a Job to Receive Candidates
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApps.map(app => (
                    <div key={app.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-all space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-300 font-bold text-lg flex items-center justify-center shrink-0 border border-slate-700">
                            {app.companyLogo || 'C'}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-sm text-white">{app.jobTitle}</h3>
                            <p className="text-xs text-slate-300 font-medium">
                              Applicant: <span className="font-bold text-amber-300">{(app as any).candidateName || 'Candidate'}</span>
                            </p>
                            <p className="text-[11px] text-slate-400">Applied {app.appliedDate} • {app.location}</p>
                          </div>
                        </div>

                        {/* Status Select Box */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Status:</span>
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                            className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none cursor-pointer focus:border-amber-400"
                          >
                            <option value="applied">Applied (New)</option>
                            <option value="Viewed">Viewed</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Offer">Offer Extended</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-3 text-slate-400">
                          <span className="flex items-center gap-1 font-semibold text-slate-200">
                            <FileText className="w-3.5 h-3.5 text-amber-400" /> {app.resumeName || 'Resume.pdf'}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedCandidateApp(app)}
                          className="px-3 py-1.5 bg-slate-800 text-white hover:bg-slate-700 font-bold rounded-xl flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect Candidate Resume
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar: Active Employer Postings */}
          <div className="space-y-6">
            
            <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" /> Active Job Vacancies ({jobs.length})
                </h3>
                <Link
                  to="/employer/jobs/new"
                  className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  + Add New
                </Link>
              </div>

              {jobs.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No job postings created yet.</p>
              ) : (
                <div className="space-y-3">
                  {jobs.slice(0, 5).map(j => (
                    <div key={j.id} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-white line-clamp-1">{j.title}</h4>
                        <p className="text-[11px] text-slate-400">{j.salary}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 font-extrabold text-[10px] rounded-lg border border-amber-400/30">
                        {j.applicantsCount || 0} Applicants
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/employer/jobs" className="block text-center text-xs font-bold text-amber-400 hover:underline pt-1">
                View All Posted Job Listings →
              </Link>
            </div>

          </div>

        </div>

        {/* Candidate Dossier Modal */}
        {selectedCandidateApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-800 my-auto space-y-5">
              <button
                onClick={() => setSelectedCandidateApp(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
                  AS
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{(selectedCandidateApp as any).candidateName || 'Candidate'}</h3>
                  <p className="text-xs text-slate-300 font-medium">Candidate for: <span className="font-bold text-amber-300">{selectedCandidateApp.jobTitle}</span></p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-500">Candidate Email:</span>
                  <span className="font-medium text-white">{(selectedCandidateApp as any).candidateEmail || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-500">Phone Contact:</span>
                  <span className="font-medium text-white">{(selectedCandidateApp as any).candidatePhone || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Resume Document:</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {selectedCandidateApp.resumeName || 'Resume.pdf'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidateApp(null)}
                className="w-full py-2.5 bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
