import React, { useEffect, useState } from 'react';
import { Users, FileText, Eye, CheckCircle2, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchEmployerApplications, updateApplicationStatusInFirestore } from '../../lib/db';
import { JobApplication } from '../../types';

export const EmployerApplicationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadApps = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await fetchEmployerApplications(currentUser.uid);
      setApplications(data);
    } catch (e) {
      console.error('Error fetching applications:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, [currentUser]);

  const handleUpdateStatus = async (appId: string, status: string) => {
    try {
      await updateApplicationStatusInFirestore(appId, status);
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: status as any } : a));
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  const filtered = applications.filter(a => {
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      const cand = ((a as any).candidateName || '').toLowerCase();
      const title = (a.jobTitle || '').toLowerCase();
      return cand.includes(s) || title.includes(s);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-400" /> Applicant Management Pipeline
            </h1>
            <p className="text-xs text-slate-400">Manage incoming resumes and track applicant hiring stages</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search candidate or job title..."
                className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none w-60"
              />
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold pb-1">
          {['All', 'applied', 'Shortlisted', 'Interview Scheduled', 'Offer', 'Rejected'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading applicant pipeline...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 bg-slate-950 rounded-3xl border border-slate-800 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No candidate applications found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(app => (
              <div key={app.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">
                    {((app as any).candidateName || 'C').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">{(app as any).candidateName || 'Candidate'}</h3>
                    <p className="text-xs text-amber-300 font-semibold">{app.jobTitle}</p>
                    <p className="text-[11px] text-slate-400">Applied {app.appliedDate} • Email: {(app as any).candidateEmail || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> {app.resumeName || 'Resume.pdf'}
                  </span>

                  <select
                    value={app.status}
                    onChange={e => handleUpdateStatus(app.id, e.target.value)}
                    className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 bg-slate-900 text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="applied">Applied (New)</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Offer">Offer Extended</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
