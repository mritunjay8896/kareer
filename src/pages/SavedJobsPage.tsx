import React, { useState } from 'react';
import { Bookmark, Search, Trash2, ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobItem } from '../types';
import { MOCK_JOBS } from '../data/mockData';
import { Breadcrumb } from '../components/UI/Breadcrumb';
import { JobCard } from '../components/Job/JobCard';

interface SavedJobsPageProps {
  jobsList?: JobItem[];
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const SavedJobsPage: React.FC<SavedJobsPageProps> = ({
  jobsList,
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const [search, setSearch] = useState('');

  const activeJobs = jobsList || MOCK_JOBS;
  const savedJobsList = activeJobs.filter(job => bookmarkedJobIds.includes(job.id));

  const filteredSavedJobs = savedJobsList.filter(job => {
    if (!search) return true;
    const q = search.toLowerCase();
    return job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Saved Jobs' }]} />

        {/* Page Title & Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-blue-600 fill-blue-600" /> Bookmarked Opportunities ({savedJobsList.length})
            </h1>
            <p className="text-xs text-slate-500">Jobs saved to your candidate profile for quick application later.</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in saved jobs..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>

        {/* List of Saved Jobs */}
        {filteredSavedJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredSavedJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onApply={onApplyJob}
                isSaved={true}
                onToggleSave={onBookmarkJob}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">No Saved Jobs Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the bookmark icon on any job card in the directory to keep track of interesting vacancies.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Vacancies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
