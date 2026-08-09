import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GovernmentJob } from '../../types';
import { fetchAllGovernmentJobs, deleteGovernmentJob, duplicateGovernmentJob } from '../../lib/govJobs';
import { 
  PlusCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileEdit, 
  Trash2, 
  Copy, 
  Eye, 
  TrendingUp, 
  RefreshCw, 
  Layers, 
  Search,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<GovernmentJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadJobs = async () => {
    setLoading(true);
    const data = await fetchAllGovernmentJobs(true); // include drafts
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const totalVacancies = jobs.reduce((sum, j) => sum + (j.vacancyDetails?.totalVacancy || 0), 0);
  const activeCount = jobs.filter(j => j.status === 'active').length;
  const upcomingCount = jobs.filter(j => j.status === 'upcoming').length;
  const closedCount = jobs.filter(j => j.status === 'closed').length;
  const draftCount = jobs.filter(j => j.status === 'draft').length;

  const handleDelete = async (job: GovernmentJob) => {
    if (window.confirm(`Are you sure you want to delete government job "${job.title}" (${job.organization})? This will delete the JSON file from /data/government-jobs/`)) {
      setActionLoading(job.id);
      await deleteGovernmentJob(job.id);
      await loadJobs();
      setActionLoading(null);
    }
  };

  const handleDuplicate = async (job: GovernmentJob) => {
    setActionLoading(job.id);
    const res = await duplicateGovernmentJob(job.id);
    if (res.success && res.job) {
      navigate(`/admin/jobs/${res.job.id}/edit`);
    } else {
      alert('Failed to duplicate job: ' + res.error);
    }
    setActionLoading(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Glitread Government Jobs CMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Recruitment Feed Management
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              JSON files stored in <code className="text-emerald-400 bg-slate-800/80 px-1.5 py-0.5 rounded text-xs font-mono">/data/government-jobs/</code> serve as the single source of truth for public applicants.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadJobs}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              to="/admin/jobs/new"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Government Job</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Listed Vacancies</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalVacancies.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-slate-500 mt-1">{jobs.length} recruitment notices</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Active Feeds</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{activeCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Live on public portal</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Upcoming Exams</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{upcomingCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Announced notifications</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Draft JSONs</span>
            <FileEdit className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-700">{draftCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Hidden from public view</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Closed / Past</span>
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-slate-800">{closedCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Archived recruitments</p>
        </div>
      </div>

      {/* Job Management Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Government Recruitment Feeds</h2>
            <p className="text-xs text-slate-500">Manage, edit, duplicate, or inspect active JSON files in /data/government-jobs/</p>
          </div>

          <Link
            to="/admin/jobs"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View All Jobs ({jobs.length})</span>
            <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading government job JSON records...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No Government Job JSON files found</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">Get started by creating your first government job notice JSON file.</p>
            <Link
              to="/admin/jobs/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-500"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create First Job JSON</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Recruitment Title & Organization</th>
                  <th className="py-3 px-4">Category & State</th>
                  <th className="py-3 px-4">Total Vacancies</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{job.title}</div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{job.organization}</span>
                        <span className="text-slate-300">•</span>
                        <code className="text-slate-500 font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">{job.slug}.json</code>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold text-[10px] mr-1">
                        {job.category}
                      </span>
                      <span className="text-slate-500 text-[11px]">{job.state}</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {(job.vacancyDetails?.totalVacancy || 0).toLocaleString('en-IN')} Posts
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{job.updatedDate || job.postDate}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          job.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : job.status === 'upcoming'
                            ? 'bg-amber-100 text-amber-800'
                            : job.status === 'closed'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {job.status === 'active' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {job.status === 'upcoming' && <Clock className="w-3 h-3 text-amber-600" />}
                        {job.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/government-jobs/${job.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Preview Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          to={`/admin/jobs/${job.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Job JSON"
                        >
                          <FileEdit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(job)}
                          disabled={actionLoading === job.id}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Duplicate Job as Draft"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(job)}
                          disabled={actionLoading === job.id}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete JSON File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
