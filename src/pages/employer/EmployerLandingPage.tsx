import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  Search, 
  FileCheck2, 
  Zap, 
  Globe, 
  Award,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const EmployerLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* B2B Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-900 text-xs font-extrabold border border-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Enterprise & Startup Hiring Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
                Find the Right Talent. <br />
                <span className="text-blue-600">Build Your Team.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
                Post jobs, discover qualified candidates and manage your entire hiring pipeline with Glitread. Reach over 100,000+ verified professionals across Tech, BPO, Finance, and Operations.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/employers/register"
                  className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                  <span>Post a Job</span>
                </Link>

                <Link
                  to="/employers/login"
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign In to Hiring Hub</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 text-xs">
                <div>
                  <span className="block text-xl font-extrabold text-slate-900">100K+</span>
                  <span className="text-slate-500 font-semibold">Active Candidates</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-blue-600">88%</span>
                  <span className="text-slate-500 font-semibold">Pre-screened ATS Quality</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-emerald-600">&lt; 48 Hrs</span>
                  <span className="text-slate-500 font-semibold">Avg. First Candidate Match</span>
                </div>
              </div>
            </div>

            {/* Right Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">Employer Hiring Control Hub</h3>
                      <p className="text-xs text-amber-300">Live Candidate Pipeline</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                    Live Demo
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { role: 'Senior Full Stack Developer', candidate: 'Aarav Sharma', score: '92% Match', status: 'Shortlisted' },
                    { role: 'Customer Experience Leader', candidate: 'Ananya Verma', score: '88% Match', status: 'Interviewing' },
                    { role: 'C2H React Engineer', candidate: 'Rohan Mehta', score: '95% Match', status: 'New Applicant' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-white">{item.role}</h4>
                        <p className="text-[11px] text-slate-400">{item.candidate} • <strong className="text-emerald-400">{item.score}</strong></p>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-bold rounded-lg border border-amber-400/30">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/employers/register"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Start Hiring Candidates Today</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Grid Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Everything You Need to Hire Top Talent
            </h2>
            <p className="text-sm text-slate-600">
              Streamline your entire recruitment lifecycle with enterprise-grade hiring tools designed for modern recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Instant Job Posting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create and publish job vacancies in under 2 minutes. Add skill requirements, salary ranges, and custom candidate screening questions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Reach Qualified Candidates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access pre-screened candidate databases across IT, BPO, Internships, C2H contracts, and specialized Gulf & International roles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Manage Hiring Pipeline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track candidate statuses real-time from applied, shortlisted, to interview scheduled and offer extended with automatic candidate updates.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Employer FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions for Employers</h2>
            <p className="text-xs text-slate-500">Have questions about posting jobs or hiring on Glitread?</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" /> How fast will my job post be published?
              </h4>
              <p className="text-xs text-slate-600 pl-6">
                Your job post is published instantly to our candidate directory upon submission. You will start receiving candidate applications right inside your Employer Dashboard.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" /> Can I manage multiple job listings and applicants?
              </h4>
              <p className="text-xs text-slate-600 pl-6">
                Yes! Your Employer Dashboard provides complete control to create draft vacancies, publish, pause, or close listings, as well as shortlist candidate resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-16 bg-slate-950 text-white border-t border-slate-900 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold font-display">Ready to Hire Your Next Star Employee?</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Join thousands of recruiters and employers filling open positions faster with Glitread.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/employers/register"
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all"
            >
              Post a Job Vacancy Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
