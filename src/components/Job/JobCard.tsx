import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Star, 
  Zap,
  Users,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { JobItem } from '../../types';

interface JobCardProps {
  job: JobItem;
  onApply: (job: JobItem) => void;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onApply, 
  isSaved = false, 
  onToggleSave 
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked buttons or links, don't navigate main card
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    navigate(`/job/${job.slug || job.id}`);
  };

  const shareJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opening for ${job.title} at ${job.company}`,
        url: window.location.origin + `/job/${job.slug || job.id}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/job/${job.slug || job.id}`);
      alert('Job link copied to clipboard!');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-blue-500/40 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <Link 
              to={`/company/${job.companySlug || job.company.toLowerCase().replace(/\s+/g, '-')}`}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${job.logoBg || 'bg-slate-900 text-white'} shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform`}
            >
              {job.logo}
            </Link>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link 
                  to={`/company/${job.companySlug || job.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-1"
                >
                  {job.company}
                </Link>
                {job.verified && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" title="Verified Employer" />
                )}
                {job.rating && (
                  <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] font-semibold text-amber-700">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{job.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{job.department || 'Technology & Engineering'}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={shareJob}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Share Job"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleSave) onToggleSave(job.id);
              }}
              className={`p-2 rounded-xl transition-colors ${
                isSaved 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Saved' : 'Save Job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Job Title */}
        <Link 
          to={`/job/${job.slug || job.id}`}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2 block"
        >
          {job.title}
        </Link>

        {/* Key Information Badges */}
        <div className="flex items-center flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-slate-600 mb-4">
          <div className="flex items-center gap-1 text-slate-700">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.experience}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-900 font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[140px]">{job.location}</span>
          </div>

          <div className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-700">
            {job.type}
          </div>
        </div>

        {/* Job Description Snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Skill Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {job.skills.slice(0, 4).map((skill, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 bg-slate-50 text-slate-600 text-[11px] font-medium rounded-lg border border-slate-200/60"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] font-semibold text-slate-400 px-1">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / CTA Area */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {job.postedTime}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            {job.applicantsCount} Applicants
          </span>
        </div>

        <div className="flex items-center gap-2">
          {job.urgent && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3 fill-amber-500 text-amber-500" /> Urgent
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-xs hover:shadow-md flex items-center gap-1 text-xs"
          >
            Apply Now <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
