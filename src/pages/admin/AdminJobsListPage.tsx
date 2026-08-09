import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GovernmentJob } from '../../types';
import { fetchAllGovernmentJobs, deleteGovernmentJob, duplicateGovernmentJob, saveGovernmentJob } from '../../lib/govJobs';
import { BulkJsonUploadModal } from '../../components/Admin/BulkJsonUploadModal';
import { ALL_INDIA_OPTION, INDIAN_STATES, UNION_TERRITORIES } from '../../data/indianStates';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  FileEdit, 
  Trash2, 
  Copy, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle,
  Building2,
  Calendar,
  CheckSquare,
  Square,
  ArrowUpDown,
  Upload
} from 'lucide-react';

export const AdminJobsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<GovernmentJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Delete Confirmation Modal State
  const [deleteModalJob, setDeleteModalJob] = useState<GovernmentJob | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    const data = await fetchAllGovernmentJobs(true);
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(jobs.map(j => j.category).filter(Boolean));
    return Array.from(set);
  }, [jobs]);

  const states = useMemo(() => {
    const set = new Set(jobs.map(j => j.state).filter(Boolean));
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.postNames && job.postNames.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCat = categoryFilter === 'all' || job.category === categoryFilter;
      const matchesState = stateFilter === 'all' || job.state === stateFilter;
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

      return matchesSearch && matchesCat && matchesState && matchesStatus;
    });
  }, [jobs, searchTerm, categoryFilter, stateFilter, statusFilter]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredJobs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredJobs.map(j => j.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = async (newStatus: 'active' | 'closed' | 'draft') => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    for (const id of selectedIds) {
      const target = jobs.find(j => j.id === id);
      if (target) {
        await saveGovernmentJob({ ...target, status: newStatus });
      }
    }
    setSelectedIds([]);
    await loadJobs();
  };

  const confirmDelete = async () => {
    if (!deleteModalJob) return;
    setIsDeleting(true);
    await deleteGovernmentJob(deleteModalJob.id);
    setIsDeleting(false);
    setDeleteModalJob(null);
    await loadJobs();
  };

  const handleDuplicate = async (job: GovernmentJob) => {
    const res = await duplicateGovernmentJob(job.id);
    if (res.success && res.job) {
      navigate(`/admin/jobs/${res.job.id}/edit`);
    } else {
      alert('Error duplicating job: ' + res.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Government Recruitment Jobs
          </h1>
          <p className="text-xs text-slate-500">
            View, filter, manage status, edit, or delete recruitment JSON records in <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">/data/government-jobs/</code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 border border-slate-800"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Bulk Upload JSON</span>
          </button>

          <Link
            to="/admin/jobs/new"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Government Job</span>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search title, org, post name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:border-emerald-500"
            >
              <option value="all">All States & Regions</option>
              <option value={ALL_INDIA_OPTION}>{ALL_INDIA_OPTION}</option>
              <optgroup label="28 Indian States">
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </optgroup>
              <optgroup label="8 Union Territories">
                {UNION_TERRITORIES.map(ut => <option key={ut} value={ut}>{ut}</option>)}
              </optgroup>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Bar if Selected */}
        {selectedIds.length > 0 && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-200">
            <div className="text-xs font-bold text-emerald-800">
              {selectedIds.length} job(s) selected
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Bulk Actions:</span>
              <button
                onClick={() => handleBulkStatusChange('active')}
                className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
              >
                Mark Active
              </button>
              <button
                onClick={() => handleBulkStatusChange('closed')}
                className="px-2.5 py-1 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800"
              >
                Mark Closed
              </button>
              <button
                onClick={() => handleBulkStatusChange('draft')}
                className="px-2.5 py-1 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
              >
                Mark Draft
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading jobs database...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No recruitment jobs match your filters</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStateFilter('all'); setStatusFilter('all'); }}
              className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <button onClick={handleSelectAll} className="text-slate-400 hover:text-slate-600">
                      {selectedIds.length === filteredJobs.length && filteredJobs.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">Recruitment Title & Organization</th>
                  <th className="py-3 px-4">Category / State</th>
                  <th className="py-3 px-4">Total Vacancies</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredJobs.map((job) => {
                  const isSelected = selectedIds.includes(job.id);
                  return (
                    <tr key={job.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-emerald-50/30' : ''}`}>
                      <td className="py-3.5 px-4">
                        <button onClick={() => handleToggleSelect(job.id)} className="text-slate-400 hover:text-slate-600">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4" />}
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{job.title}</div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>{job.organization}</span>
                          <span className="text-slate-300">•</span>
                          <code className="text-slate-500 font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">{job.slug}.json</code>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold mr-1">
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
                            title="Preview Public View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/jobs/${job.id}/edit`}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Job Form"
                          >
                            <FileEdit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDuplicate(job)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Duplicate as Draft"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteModalJob(job)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to delete the government recruitment JSON file for:
            </p>

            <div className="my-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">{deleteModalJob.title}</div>
              <div className="text-slate-500 mt-1">{deleteModalJob.organization}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">/data/government-jobs/{deleteModalJob.slug}.json</div>
            </div>

            <p className="text-[11px] text-red-600 font-semibold mb-6">
              ⚠️ This action permanently removes the JSON file from repository storage.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteModalJob(null)}
                disabled={isDeleting}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Permanently Delete JSON</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bulk JSON Upload Modal */}
      <BulkJsonUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSuccess={() => {
          setIsBulkModalOpen(false);
          loadJobs();
        }}
      />
    </div>
  );
};
