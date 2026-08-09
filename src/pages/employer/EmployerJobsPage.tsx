import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, PlusCircle, Trash2, Edit3, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchEmployerJobs, deleteJobFromFirestore, updateJobInFirestore } from '../../lib/db';
import { JobItem } from '../../types';

export const EmployerJobsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await fetchEmployerJobs(currentUser.uid);
      setJobs(data);
    } catch (e) {
      console.error('Error loading employer jobs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [currentUser]);

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job vacancy listing?')) {
      try {
        await deleteJobFromFirestore(jobId);
        setJobs(prev => prev.filter(j => j.id !== jobId));
      } catch (e) {
        alert('Failed to delete job.');
      }
    }
  };

  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'paused' : 'published';
    try {
      await updateJobInFirestore(jobId, { status: nextStatus });
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: nextStatus } : j));
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-amber-400" /> Manage Employer Job Vacancies
            </h1>
            <p className="text-xs text-slate-400">View, edit, pause, or publish your company job posts</p>
          </div>

          <Link
            to="/employer/jobs/new"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" /> Post New Vacancy
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading company vacancies...</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 bg-slate-950 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Vacancies Posted Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create your first job post to start accepting applications from over 100,000+ candidates on Glitread.
            </p>
            <Link
              to="/employer/jobs/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" /> Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => (
              <div key={job.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full border ${
                      job.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {job.status || 'published'}
                    </span>
                    <span className="text-[11px] text-slate-400">{job.applicantsCount || 0} Applicants</span>
                  </div>

                  <h3 className="font-extrabold text-base text-white">{job.title}</h3>
                  <p className="text-xs text-slate-400">{job.location} • {job.salary}</p>
                  <p className="text-xs text-amber-300 font-semibold">{job.category} • {job.type}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => handleToggleStatus(job.id, job.status || 'published')}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold rounded-xl cursor-pointer"
                  >
                    {job.status === 'published' ? 'Pause Posting' : 'Publish Job'}
                  </button>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/job/${job.id}`}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
                      title="View Candidate Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/50 cursor-pointer"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
