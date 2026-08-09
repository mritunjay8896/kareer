import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Linkedin, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  DollarSign, 
  Briefcase, 
  ThumbsUp, 
  ExternalLink,
  Sparkles,
  Camera,
  HelpCircle,
  Award
} from 'lucide-react';
import { Company, JobItem } from '../types';
import { MOCK_COMPANIES, MOCK_JOBS } from '../data/mockData';
import { Breadcrumb } from '../components/UI/Breadcrumb';
import { JobCard } from '../components/Job/JobCard';

interface CompanyProfilePageProps {
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'reviews' | 'salaries' | 'photos'>('overview');

  const company = MOCK_COMPANIES.find(c => c.slug === slug) || MOCK_COMPANIES[0];
  const companyJobs = MOCK_JOBS.filter(j => j.companySlug === company.slug || j.company.toLowerCase().includes(company.name.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Companies', path: '/jobs' }, { label: company.name }]} />

        {/* Company Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Banner Image */}
          <div className="h-48 sm:h-64 w-full relative bg-slate-900">
            <img 
              src={company.bannerImg} 
              alt={company.name} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>

          {/* Profile Header Content */}
          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-4">
              <div className="flex items-end gap-5">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-bold ${company.logoBg || 'bg-slate-900 text-white'} ring-4 ring-white shadow-xl flex-shrink-0`}>
                  {company.logo}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{company.name}</h1>
                    {company.verified && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" title="Verified Company" />
                    )}
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg text-xs font-semibold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{company.rating} ({company.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{company.industry}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4 text-slate-500" /> Website <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  View Openings ({companyJobs.length})
                </button>
              </div>
            </div>

            {/* Quick Metadata Info */}
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-slate-400" /> {company.companySize}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" /> {company.headquarters}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="w-4 h-4 text-slate-400" /> Founded in {company.foundedYear}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'About & Culture' },
              { id: 'jobs', label: `Open Jobs (${companyJobs.length})` },
              { id: 'reviews', label: `Employee Reviews (${company.reviews.length})` },
              { id: 'salaries', label: 'Salary Insights' },
              { id: 'photos', label: 'Office Photos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">About {company.name}</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{company.about}</p>
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Company Mission</span>
                  <p className="text-xs text-blue-800 italic">"{company.mission}"</p>
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Core Values & Culture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {company.values.map((val, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-800 flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks & Benefits */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Employee Benefits & Work Culture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {company.benefits.map((ben, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>{ben.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">{ben.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Hiring Locations</h4>
                <div className="flex flex-wrap gap-1.5">
                  {company.hiringLocations.map(loc => (
                    <span key={loc} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {company.faqs.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" /> Frequently Asked Questions
                  </h4>
                  {company.faqs.map((faq, idx) => (
                    <div key={idx} className="space-y-1 text-xs pt-2 border-t border-slate-100">
                      <p className="font-bold text-slate-900">{faq.question}</p>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Open Jobs */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Live Vacancies at {company.name}</h3>
            {companyJobs.length > 0 ? (
              <div className="space-y-4">
                {companyJobs.map(job => (
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
              <p className="text-xs text-slate-500 py-8 text-center bg-white rounded-2xl border border-slate-200">
                No active openings listed right now. Check back soon!
              </p>
            )}
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Verified Employee Reviews ({company.reviews.length})
            </h3>

            {company.reviews.length > 0 ? (
              <div className="space-y-6">
                {company.reviews.map(rev => (
                  <div key={rev.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {rev.rating}
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{rev.title}</h4>
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium">Role: {rev.authorRole}</p>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-emerald-700">Pros: </span>
                        <span className="text-slate-700">{rev.pros}</span>
                      </div>
                      <div>
                        <span className="font-bold text-rose-700">Cons: </span>
                        <span className="text-slate-700">{rev.cons}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.likesCount})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-8 text-center">No employee reviews available yet.</p>
            )}
          </div>
        )}

        {/* Tab 4: Salaries */}
        {activeTab === 'salaries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Reported Salary Benchmarks</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Average Salary</th>
                    <th className="p-3">Min - Max Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {company.salaryInsights.map((sal, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-900">{sal.role}</td>
                      <td className="p-3 text-slate-500">{sal.expRange}</td>
                      <td className="p-3 font-bold text-emerald-600">{sal.avgSalary}</td>
                      <td className="p-3 text-slate-600">{sal.minMax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Office Photos */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" /> Life at {company.name} Workspace Photos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {company.officePhotos.map((photo, idx) => (
                <div key={idx} className="h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                  <img src={photo} alt="Office" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
