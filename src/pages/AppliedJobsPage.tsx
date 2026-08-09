import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  ChevronRight, 
  XCircle, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobApplication } from '../types';
import { MOCK_APPLICATIONS } from '../data/mockData';
import { Breadcrumb } from '../components/UI/Breadcrumb';

interface AppliedJobsPageProps {
  applicationsList?: JobApplication[];
  onWithdrawApp?: (appId: string) => void;
}

export const AppliedJobsPage: React.FC<AppliedJobsPageProps> = ({
  applicationsList,
  onWithdrawApp
}) => {
  const [localApps, setLocalApps] = useState<JobApplication[]>([]);
  
  // Sync prop or mock
  const activeApplications = applicationsList || (localApps.length > 0 ? localApps : MOCK_APPLICATIONS);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const withdrawApp = (id: string) => {
    if (confirm('Are you sure you want to withdraw this job application?')) {
      if (onWithdrawApp) {
        onWithdrawApp(id);
      } else {
        setLocalApps(prev => prev.filter(a => a.id !== id));
      }
    }
  };

  const filteredApps = activeApplications.filter(app => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Interview Scheduled': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Viewed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Offer': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Applied Jobs' }]} />

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" /> Job Application Status ({activeApplications.length})
            </h1>
            <p className="text-xs text-slate-500">Track real-time hiring timeline updates and interview invitations from employers.</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
            {['All', 'Shortlisted', 'Interview Scheduled', 'Viewed'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl border transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Application Cards */}
        {filteredApps.length > 0 ? (
          <div className="space-y-6">
            {filteredApps.map(app => (
              <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold text-2xl flex items-center justify-center flex-shrink-0">
                      {app.companyLogo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/job/${app.jobSlug}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-base">
                          {app.jobTitle}
                        </Link>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{app.companyName} • {app.location} • Applied {app.appliedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <button
                      onClick={() => withdrawApp(app.id)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>

                {/* Timeline Visualizer */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Hiring Timeline Progress</span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {app.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                          step.completed
                            ? 'bg-blue-50/60 border-blue-200 text-blue-900'
                            : 'bg-slate-50 border-slate-200/60 text-slate-400'
                        } ${step.current ? 'ring-2 ring-blue-500 font-bold' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Step {idx + 1}</span>
                          {step.completed && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                        <p className="font-bold text-xs truncate">{step.step}</p>
                        <p className="text-[10px] text-slate-500">{step.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes from Recruiter */}
                {app.timeline.find(t => t.notes) && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Recruiter Update: </span>
                      <span>{app.timeline.find(t => t.notes)?.notes}</span>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">No Applications Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't submitted any job applications under this status filter yet.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Browse Jobs & Apply
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
