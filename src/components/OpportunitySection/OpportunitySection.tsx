import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  ArrowRight,
  Search,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_JOBS } from '../../data/mockData';
import { JobItem } from '../../types';
import { JobCard } from '../Job/JobCard';
import { JobDetailModal } from './JobDetailModal';

interface OpportunitySectionProps {
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const OpportunitySection: React.FC<OpportunitySectionProps> = ({
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const [activeTab, setActiveTab] = useState<string>('Recommended');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    'Recommended',
    'Jobs',
    'Internships',
    'Government Jobs',
    'Remote Jobs',
    'IT',
    'Finance',
    'Marketing',
    'Data Science',
    'Engineering'
  ];

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 260;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Filter jobs based on active tab and search query
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(filterQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(filterQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'Recommended') return true;
    if (activeTab === 'Jobs') return !job.isGovernment && (job.type as string) !== 'Internship';
    if (activeTab === 'Internships') return (job.type as string) === 'Internship' || job.title.toLowerCase().includes('intern');
    if (activeTab === 'Government Jobs') return job.isGovernment || job.category === 'IT';
    if (activeTab === 'Remote Jobs') return job.type === 'Remote' || job.location.includes('Remote');
    
    return job.category === activeTab || job.type === activeTab;
  });

  return (
    <section className="pt-10 pb-16 bg-slate-50/50" id="jobs-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>15,000+ Active Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Explore Opportunities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Apply directly to top hiring companies, tech startups, and government notices.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by title, skill, or company..."
              className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Tabs Bar with Navigation Arrow Buttons on Each Side */}
        <div className="relative flex items-center gap-2">
          {/* Left Nav Button */}
          <button
            onClick={() => scrollTabs('left')}
            aria-label="Scroll left"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-center active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>

          {/* Scrollable Tabs */}
          <div
            ref={tabsRef}
            className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth scrollbar-none no-scrollbar flex-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Nav Button */}
          <button
            onClick={() => scrollTabs('right')}
            aria-label="Scroll right"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-center active:scale-95"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.slice(0, 6).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={(j) => setSelectedJob(j)}
                isSaved={bookmarkedJobIds.includes(job.id)}
                onToggleSave={(id) => onBookmarkJob(id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">No opportunities match your filter.</p>
            <button
              onClick={() => {
                setActiveTab('Recommended');
                setFilterQuery('');
              }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl border border-slate-200 shadow-2xs transition-all hover:border-blue-300 hover:text-blue-600"
          >
            <span>Browse All {MOCK_JOBS.length}+ Opportunities</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

      </div>

      {/* Modal View for selected job */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={(job) => {
          onApplyJob(job);
        }}
        onBookmark={(jobId) => onBookmarkJob(jobId)}
        isBookmarked={selectedJob ? bookmarkedJobIds.includes(selectedJob.id) : false}
      />
    </section>
  );
};
