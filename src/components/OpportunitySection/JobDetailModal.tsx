import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Building,
  Sparkles,
  Award,
  Send
} from 'lucide-react';
import { JobItem } from '../../types';

interface JobDetailModalProps {
  job: JobItem | null;
  onClose: () => void;
  onApply: (job: JobItem) => void;
  onBookmark: (jobId: string) => void;
  isBookmarked: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  onBookmark,
  isBookmarked
}) => {
  const [applied, setApplied] = useState(false);

  if (!job) return null;

  const handleApplyClick = () => {
    setApplied(true);
    onApply(job);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 pr-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 shadow-xs ${job.logoBg || 'bg-blue-600 text-white'}`}>
              {job.logo}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {job.type}
                </span>
                {job.featured && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    ⭐ Featured Opportunity
                  </span>
                )}
                {job.urgent && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 animate-pulse">
                    ⚡ Urgent Hiring
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display leading-tight">
                {job.title}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center gap-2">
                <span>{job.company}</span> • <span className="text-slate-400">{job.location}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Salary CTC</span>
              <p className="text-sm font-extrabold text-emerald-600 mt-0.5">{job.salary}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Experience</span>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">{job.experience}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Applicants</span>
              <p className="text-sm font-extrabold text-blue-600 mt-0.5">{job.applicantsCount}+ Applied</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 font-display">
                About the Role
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 font-display">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 font-display">
                Required Skills & Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Perks */}
            {job.perks && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 font-display">
                  Perks & Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.perks.map((perk) => (
                    <span key={perk} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                      🎁 {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              onClick={() => onBookmark(job.id)}
              className={`p-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 ${
                isBookmarked
                  ? 'bg-blue-50 border-blue-300 text-blue-600'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              disabled={applied}
              onClick={handleApplyClick}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                applied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95'
              }`}
            >
              {applied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Application Submitted!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> 1-Click Direct Apply
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
