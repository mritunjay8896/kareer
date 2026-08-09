import React from 'react';
import { RecruiterInfo } from '../../types';
import { MessageSquare, Linkedin, CheckCircle, Sparkles, Building2 } from 'lucide-react';

interface RecruiterCardProps {
  recruiter: RecruiterInfo;
}

export const RecruiterCard: React.FC<RecruiterCardProps> = ({ recruiter }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Hiring Manager
      </div>

      <div className="flex items-start gap-3.5">
        <img
          src={recruiter.avatar}
          alt={recruiter.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-xs flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-slate-900 text-sm truncate">{recruiter.name}</h4>
            <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" title="Verified Recruiter" />
          </div>
          <p className="text-xs text-slate-500 font-medium truncate">{recruiter.role}</p>
          <p className="text-xs text-slate-700 font-semibold truncate flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-slate-400" /> {recruiter.company}
          </p>
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 grid grid-cols-2 gap-2 text-center text-xs">
        <div>
          <span className="block font-bold text-emerald-600">{recruiter.responseRate}</span>
          <span className="text-[10px] text-slate-500">Response Rate</span>
        </div>
        <div>
          <span className="block font-bold text-slate-900">{recruiter.activeJobsCount} Active</span>
          <span className="text-[10px] text-slate-500">Open Positions</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => alert(`Direct message feature opened for ${recruiter.name}`)}
          className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3 h-3" /> Message
        </button>
        {recruiter.linkedInUrl && (
          <a
            href={recruiter.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
