import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ArrowLeft,
  ShieldCheck,
  Check,
  Layers,
  Globe,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { JobItem } from '../types';
import { MOCK_JOBS, MOCK_COMPANIES } from '../data/mockData';
import { Breadcrumb } from '../components/UI/Breadcrumb';
import { RecruiterCard } from '../components/Job/RecruiterCard';
import { JobCard } from '../components/Job/JobCard';

interface JobDetailPageProps {
  jobsList?: JobItem[];
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  jobsList,
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const activeJobs = jobsList || MOCK_JOBS;
  // Find job by slug or id
  const job = activeJobs.find(j => j.slug === slug || j.id === slug) || activeJobs[0];
  const companyInfo = MOCK_COMPANIES.find(c => c.slug === job.companySlug) || MOCK_COMPANIES[0];

  const isSaved = bookmarkedJobIds.includes(job.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out ${job.title} at ${job.company}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied!');
    }
  };

  const similarJobs = MOCK_JOBS.filter(j => j.id !== job.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Breadcrumb 
            items={[
              { label: 'Jobs', path: '/jobs' },
              { label: job.company, path: `/company/${job.companySlug || 'razorpay'}` },
              { label: job.title }
            ]} 
          />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </button>
        </div>

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold ${job.logoBg || 'bg-slate-900 text-white'} shadow-md flex-shrink-0`}>
                {job.logo}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to={`/company/${job.companySlug || 'razorpay'}`}
                    className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-base sm:text-lg"
                  >
                    {job.company}
                  </Link>
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Verified Employer
                    </span>
                  )}
                  {job.rating && (
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-semibold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{job.rating} ({job.reviewsCount || 120} reviews)</span>
                    </div>
                  )}
                </div>

                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {job.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {job.department || 'Software Development'} • {job.industry || 'Technology'}
                </p>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-3 self-start">
              <button
                onClick={handleShare}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                title="Share Job"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => onBookmarkJob(job.id)}
                className={`p-3 rounded-xl transition-colors border ${
                  isSaved
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title={isSaved ? 'Saved' : 'Save Job'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600' : ''}`} />
              </button>

              <button
                onClick={() => onApplyJob(job)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Apply Now</span>
                <Zap className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>

          {/* Key Facts Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 block mb-0.5">Experience Required</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-blue-600" /> {job.experience}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 block mb-0.5">Offered Salary (CTC)</span>
              <span className="font-bold text-emerald-600 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-emerald-600" /> {job.salary}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 block mb-0.5">Job Location</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-600" /> {job.location}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 block mb-0.5">Posted & Applicants</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-600" /> {job.postedTime} ({job.applicantsCount})
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (2 Cols): Detailed Specifications */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Job Description Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Job Overview
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Key Responsibilities</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Requirements & Qualifications</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack & Required Skills */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">Required Key Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.preferredSkills?.map((skill, idx) => (
                    <span 
                      key={`pref-${idx}`}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200"
                    >
                      {skill} (Preferred)
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits & Perks */}
              {job.perks && job.perks.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">Perks & Benefits</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {job.perks.map((perk, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-800 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hiring Process */}
              {job.hiringProcess && job.hiringProcess.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">Hiring Process Timeline</h4>
                  <div className="space-y-2">
                    {job.hiringProcess.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-800">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* About Company Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">About {job.company}</h3>
                <Link 
                  to={`/company/${job.companySlug || 'razorpay'}`} 
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  View Full Profile <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {job.aboutCompany || companyInfo.about}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-2">
                <div>
                  <span className="text-slate-400 block">Industry</span>
                  <span className="font-bold text-slate-900">{companyInfo.industry}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Company Size</span>
                  <span className="font-bold text-slate-900">{companyInfo.companySize}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Headquarters</span>
                  <span className="font-bold text-slate-900">{companyInfo.headquarters}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1 Col): Recruiter & Sticky Quick CTAs */}
          <div className="space-y-6">
            
            {/* Quick Apply Card */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="font-bold text-base">Direct Recruiter Application</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your profile will be directly prioritized by the hiring lead with instant SMS/Email updates.
              </p>
              <button
                onClick={() => onApplyJob(job)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Apply Now ({job.applicantsCount} Applicants)
              </button>
            </div>

            {/* Recruiter Information Card */}
            {job.recruiter && (
              <RecruiterCard recruiter={job.recruiter} />
            )}

            {/* Company Info Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Company At a Glance</h4>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Founded</span>
                  <span className="font-semibold text-slate-900">{companyInfo.foundedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Website</span>
                  <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                    {companyInfo.website.replace('https://', '')}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Open Vacancies</span>
                  <span className="font-semibold text-emerald-600">{companyInfo.openJobsCount} Openings</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Similar Jobs Section */}
        <div className="pt-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Similar Job Vacancies You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarJobs.map(simJob => (
              <JobCard
                key={simJob.id}
                job={simJob}
                onApply={onApplyJob}
                isSaved={bookmarkedJobIds.includes(simJob.id)}
                onToggleSave={onBookmarkJob}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
