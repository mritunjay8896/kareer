import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobItem, Company } from '../types';
import { MOCK_JOBS, MOCK_COMPANIES } from '../data/mockData';
import { JobSearchBar } from '../components/Job/JobSearchBar';
import { JobFilterSidebar, FilterState } from '../components/Job/JobFilterSidebar';
import { JobCard } from '../components/Job/JobCard';
import { Breadcrumb } from '../components/UI/Breadcrumb';

interface JobsPageProps {
  jobsList?: JobItem[];
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobsList,
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const activeJobs = jobsList || MOCK_JOBS;
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'relevance' | 'salary' | 'applicants'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    workModes: [],
    experiences: [],
    salaryRanges: [],
    departments: [],
    companyTypes: [],
    postedWithin: 'all',
    languages: []
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setSearchExperience('');
    setFilters({
      workModes: [],
      experiences: [],
      salaryRanges: [],
      departments: [],
      companyTypes: [],
      postedWithin: 'all',
      languages: []
    });
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return activeJobs.filter(job => {
      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
      }

      // Location
      if (searchLocation) {
        if (!job.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
      }

      // Experience
      if (searchExperience) {
        if (!job.experience.toLowerCase().includes(searchExperience.toLowerCase())) return false;
      }

      // Work Modes Filter
      if (filters.workModes.length > 0) {
        const matchesMode = filters.workModes.some(m => job.type.toLowerCase().includes(m.toLowerCase()) || job.location.toLowerCase().includes(m.toLowerCase()));
        if (!matchesMode) return false;
      }

      // Departments Filter
      if (filters.departments.length > 0) {
        if (!filters.departments.includes(job.category)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary') {
        return b.applicantsCount - a.applicantsCount;
      }
      if (sortBy === 'applicants') {
        return b.applicantsCount - a.applicantsCount;
      }
      return 0; // Default order
    });
  }, [searchQuery, searchLocation, searchExperience, filters, sortBy]);

  // Pagination
  const pageSize = 6;
  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Browse Jobs' }]} />

        {/* Light Glassmorphic Hero Filter Bar */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <JobSearchBar
            query={searchQuery}
            location={searchLocation}
            experience={searchExperience}
            onSearchChange={(q, loc, exp) => {
              setSearchQuery(q);
              setSearchLocation(loc);
              setSearchExperience(exp);
            }}
            onSearchSubmit={() => setCurrentPage(1)}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Filter Sidebar */}
          <JobFilterSidebar
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              setCurrentPage(1);
            }}
            onReset={resetFilters}
            isMobileOpen={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
          />

          {/* Job List Column */}
          <div className="flex-1 space-y-4 w-full">
            
            {/* Top Bar: Count & Sorting */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    Showing {filteredJobs.length} Job Vacancies
                  </h2>
                  <p className="text-xs text-slate-500">Updated every 15 minutes with direct recruiter links</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-900 font-semibold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="relevance">Most Relevant</option>
                  <option value="salary">Highest Salary</option>
                  <option value="applicants">Most Applied</option>
                </select>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {(searchQuery || searchLocation || filters.workModes.length > 0 || filters.departments.length > 0) && (
              <div className="flex items-center gap-2 flex-wrap bg-blue-50/60 p-3 rounded-2xl border border-blue-100 text-xs">
                <span className="font-semibold text-blue-900">Active Filters:</span>
                {searchQuery && (
                  <span className="bg-white text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
                    Keyword: "{searchQuery}"
                  </span>
                )}
                {searchLocation && (
                  <span className="bg-white text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
                    Location: "{searchLocation}"
                  </span>
                )}
                {filters.workModes.map(m => (
                  <span key={m} className="bg-white text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
                    {m}
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-blue-600 underline font-semibold ml-auto text-xs"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Job Cards */}
            {paginatedJobs.length > 0 ? (
              <div className="space-y-4">
                {paginatedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={onApplyJob}
                    isSaved={bookmarkedJobIds.includes(job.id)}
                    onToggleSave={onBookmarkJob}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Building2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No Jobs Match Your Filter Criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try removing some filters or searching for broader terms like "React", "Data", or "Bangalore".
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200/80 text-xs font-semibold text-slate-700">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <span>
                  Page <strong className="text-slate-900">{currentPage}</strong> of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Recommendation Sidebar */}
          <div className="w-full lg:w-80 space-y-5 flex-shrink-0">
            
            {/* Featured Employers */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" /> Featured Employers
                </h3>
              </div>

              <div className="space-y-3">
                {MOCK_COMPANIES.map((company) => (
                  <Link
                    key={company.id}
                    to={`/company/${company.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg ${company.logoBg}`}>
                        {company.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                          {company.name}
                        </h4>
                        <p className="text-[10px] text-slate-500">{company.openJobsCount} Open Positions</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resume Score Card Widget */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-200" />
                <h4 className="font-bold text-sm">Free ATS Resume Checker</h4>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Scan your resume against 500+ job descriptions to boost your interview callbacks by 3x.
              </p>
              <Link
                to="/dashboard"
                className="block text-center py-2 bg-white text-blue-700 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors"
              >
                Upload Resume & Check Score
              </Link>
            </div>

            {/* Trending Skills Widget */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> High In-Demand Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['React 18', 'TypeScript', 'System Design', 'PyTorch', 'Kafka', 'PostgreSQL', 'Docker', 'Next.js'].map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
