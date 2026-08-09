import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GovernmentJob } from '../types';
import { fetchGovernmentJobBySlugOrId, fetchAllGovernmentJobs } from '../lib/govJobs';
import { SEOHead } from '../components/SEO/SEOHead';
import { 
  getOptimizedMetaTitle, 
  getOptimizedMetaDescription, 
  getOptimizedKeywords, 
  generateJobPostingSchema, 
  generateBreadcrumbSchema, 
  generateFaqSchema, 
  generateGovOrganizationSchema, 
  generateAutomatedJobFaqs,
  generateSpeakableSchema,
  generateGEOArticleSchema,
  SITE_DOMAIN
} from '../utils/seoHelpers';
import { 
  Building2, 
  Calendar, 
  CreditCard, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ExternalLink, 
  Download, 
  Share2, 
  BookOpen, 
  FileSpreadsheet, 
  BarChart3, 
  Play, 
  ArrowRight, 
  MapPin, 
  Bookmark,
  ChevronDown,
  ChevronUp,
  Award,
  ListOrdered,
  HelpCircle,
  FileText,
  Check,
  TrendingUp,
  Sparkles,
  Zap,
  Info,
  ShieldCheck,
  Briefcase,
  Layers,
  ArrowUpRight,
  Calculator
} from 'lucide-react';
import govBannerImg from '../image1/governmentjobbannerimg.png';

export const GovJobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<GovernmentJob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedJobsList, setRelatedJobsList] = useState<GovernmentJob[]>([]);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Active Tab / Active Section state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'vacancy' | 'eligibility' | 'application' | 'syllabus' | 'pattern' | 'pyq' | 'cutoff' | 'mock'
  >('overview');

  // Cutoff Category Switcher state for Sidebar & Cutoff tab
  const [selectedCutoffCat, setSelectedCutoffCat] = useState<'UR' | 'OBC' | 'SC' | 'ST' | 'EWS'>('UR');

  // Accordion toggle states for Syllabus
  const [openSyllabusSubjects, setOpenSyllabusSubjects] = useState<Record<number, boolean>>({ 0: true, 1: true });

  // Age Calculator state
  const [dobDay, setDobDay] = useState<number>(9);
  const [dobMonth, setDobMonth] = useState<number>(8); // Aug
  const [dobYear, setDobYear] = useState<number>(2000);

  const [targetDay, setTargetDay] = useState<number>(1);
  const [targetMonth, setTargetMonth] = useState<number>(8); // Aug
  const [targetYear, setTargetYear] = useState<number>(2026);

  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    isEligible: boolean;
    statusText: string;
  } | null>(null);

  const calculateAge = () => {
    const dob = new Date(dobYear, dobMonth - 1, dobDay);
    const target = new Date(targetYear, targetMonth - 1, targetDay);

    if (isNaN(dob.getTime()) || isNaN(target.getTime()) || dob > target) {
      setAgeResult({
        years: 0,
        months: 0,
        days: 0,
        isEligible: false,
        statusText: 'Invalid Date of Birth (DOB cannot be after the Cutoff Date).'
      });
      return;
    }

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const minAge = job?.ageLimit?.minimumAge || 18;
    const maxAge = job?.ageLimit?.maximumAge || 32;

    const totalAgeYearsFloat = years + (months / 12) + (days / 365.25);
    const isEligible = totalAgeYearsFloat >= minAge && totalAgeYearsFloat <= maxAge;

    let statusText = '';
    if (totalAgeYearsFloat < minAge) {
      statusText = `Underaged for this post (Minimum required age is ${minAge} years).`;
    } else if (totalAgeYearsFloat > maxAge) {
      statusText = `Overaged for General/UR category (Maximum age is ${maxAge} years. Please check upper age relaxation below for reserved categories).`;
    } else {
      statusText = `You meet the age criteria for Unreserved (UR) category (${minAge} to ${maxAge} years).`;
    }

    setAgeResult({
      years,
      months,
      days,
      isEligible,
      statusText
    });
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id as any);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -115; // account for sticky header + sub-navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['overview', 'vacancy', 'eligibility', 'application', 'syllabus', 'pattern', 'pyq', 'cutoff', 'mock'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sectionIds[i]);
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveTab(sectionIds[i] as any);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchGovernmentJobBySlugOrId(slug).then((data) => {
        setJob(data);
        setLoading(false);
      });

      fetchAllGovernmentJobs().then((all) => {
        setRelatedJobsList(all.filter(j => j.slug !== slug).slice(0, 3));
      });
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title || 'Government Job Notice',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const toggleSyllabusSubject = (index: number) => {
    setOpenSyllabusSubjects(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-700">Loading Recruitment Notification Details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-xs">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-1">Recruitment Notification Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">The requested government job notification could not be found or has been updated.</p>
          <Link
            to="/government-jobs"
            className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700"
          >
            Browse All Active Government Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Calculate cutoff values for interactive cutoff trend
  const cutoffTrendData: Record<string, { year: string; score: number }[]> = {
    UR: [
      { year: '2022', score: 118 },
      { year: '2023', score: 124 },
      { year: '2024', score: 131 },
      { year: '2025', score: 137.5 },
    ],
    OBC: [
      { year: '2022', score: 110 },
      { year: '2023', score: 117 },
      { year: '2024', score: 125 },
      { year: '2025', score: 132 },
    ],
    EWS: [
      { year: '2022', score: 106 },
      { year: '2023', score: 112 },
      { year: '2024', score: 121 },
      { year: '2025', score: 128.5 },
    ],
    SC: [
      { year: '2022', score: 94 },
      { year: '2023', score: 99 },
      { year: '2024', score: 107 },
      { year: '2025', score: 113.2 },
    ],
    ST: [
      { year: '2022', score: 88 },
      { year: '2023', score: 93 },
      { year: '2024', score: 98 },
      { year: '2025', score: 105.8 },
    ],
  };

  // Previous year vacancy trend chart data
  const yearVacancyData = [
    { year: '2022', vacancies: 12500 },
    { year: '2023', vacancies: 8440 },
    { year: '2024', vacancies: 8415 },
    { year: '2025', vacancies: 17727 },
    { year: '2026', vacancies: job.vacancyDetails?.totalVacancy || 17727 },
  ];
  const maxVacancy = Math.max(...yearVacancyData.map(d => d.vacancies));

  // Determine application status
  const isClosingSoon = job.importantDates?.applicationLastDate?.includes('Aug') || job.importantDates?.applicationLastDate?.includes('Sep');

  // Generate On-Page SEO & Google Discover Metadata
  const seoTitle = getOptimizedMetaTitle(job);
  const seoDesc = getOptimizedMetaDescription(job);
  const seoKeywords = getOptimizedKeywords(job);
  const canonicalUrl = `${SITE_DOMAIN}/government-jobs/${job.slug || job.id}`;

  const jobPostingSchema = generateJobPostingSchema(job);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_DOMAIN },
    { name: 'Government Jobs', url: `${SITE_DOMAIN}/government-jobs` },
    { name: job.category || 'Central Govt', url: `${SITE_DOMAIN}/government-jobs?category=${encodeURIComponent(job.category || '')}` },
    { name: job.title, url: canonicalUrl }
  ]);
  const automatedFaqs = generateAutomatedJobFaqs(job);
  const faqSchema = generateFaqSchema(automatedFaqs);
  const orgSchema = generateGovOrganizationSchema(job);
  const speakableSchema = generateSpeakableSchema(['#ai-summary-box', '#faqs', 'h1']);
  const geoArticleSchema = generateGEOArticleSchema(job);

  const jsonLdSchemas: object[] = [jobPostingSchema, breadcrumbSchema, orgSchema, speakableSchema, geoArticleSchema];
  if (faqSchema) jsonLdSchemas.push(faqSchema);

  return (
    <article className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
        ogImage={job.ogImageUrl || 'https://glitread.com/glitread-og-banner.png'}
        ogType="article"
        publishedTime={job.postDate}
        modifiedTime={job.updatedDate || job.updatedAt}
        jsonLdSchemas={jsonLdSchemas}
      />
      
      {/* 1. TOP BREADCRUMB BAR */}
      <div className="bg-white border-b border-slate-200/80 py-2 text-slate-600 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-slate-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link to="/government-jobs" className="hover:text-blue-600 transition-colors">Government Jobs</Link>
            <span className="text-slate-300">/</span>
            <span className="text-blue-700 font-bold truncate max-w-xs">{job.category}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold border transition-all ${
                isSaved 
                  ? 'bg-blue-50 text-blue-700 border-blue-300' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400'}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold border border-slate-200 transition-colors"
            >
              <Share2 className="w-3 h-3 text-blue-600" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY NAVBAR — TAB NAVIGATION (Above Job Header, Below Breadcrumb) */}
      <div className="sticky top-[64px] z-30 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-1 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'vacancy', label: 'Vacancy' },
              { id: 'eligibility', label: 'Eligibility' },
              { id: 'application', label: 'Application' },
              { id: 'syllabus', label: 'Syllabus' },
              { id: 'pattern', label: 'Exam Pattern' },
              { id: 'pyq', label: 'Previous Year' },
              { id: 'cutoff', label: 'Cutoff & Analysis' },
              { id: 'mock', label: 'Mock Test' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. TOP — JOB HEADER (Styled with Banner Background Image & Filter Pills matching screenshot) */}
      <div className="relative bg-gradient-to-r from-slate-50 via-slate-50/95 to-blue-50/30 border-b border-slate-200/80 overflow-hidden py-5 sm:py-6 shadow-2xs">
        {/* Right Side Background Image with Smooth Horizon Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[55%] md:w-[50%] lg:w-[48%] overflow-hidden pointer-events-none z-0">
          <img
            src={govBannerImg}
            alt="Government Secretariat Building"
            className="w-full h-full object-cover object-right opacity-90"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80";
            }}
          />
          {/* Smooth Fade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/85 via-40% to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            
            {/* Main Title */}
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {job.title}
            </h1>
            
            {/* Short Info / Description */}
            <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed font-medium max-w-xl">
              {job.shortInformation || 'Find the latest government jobs, recruitment notifications, exam details, eligibility, syllabus, vacancies and free mock tests.'}
            </p>

          </div>
        </div>
      </div>

      {/* 4. BELOW HEADER — 2 COLUMN AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1 — MAIN CONTENT (~70% width: lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-5">

            {/* AI OVERVIEW & QUICK FACTS BOX (Generative Engine Optimization / GEO / AI Overviews) */}
            <section
              id="ai-summary-box"
              data-ai-summary="true"
              className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-blue-800/60 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-blue-800/60 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-blue-200">
                    AI Key Facts Overview
                  </h2>
                </div>
                <span className="text-[10px] font-bold bg-blue-800/80 text-blue-200 px-2.5 py-0.5 rounded-full border border-blue-700">
                  Glitread Verified
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/40">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Organization</span>
                  <span className="font-extrabold text-white text-xs truncate block mt-0.5">{job.organization || 'Govt Body'}</span>
                </div>
                <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/40">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Vacancies</span>
                  <span className="font-extrabold text-emerald-400 text-xs block mt-0.5">
                    {job.vacancyDetails?.totalVacancy ? `${job.vacancyDetails.totalVacancy.toLocaleString()} Posts` : 'Multiple'}
                  </span>
                </div>
                <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/40">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Last Date to Apply</span>
                  <span className="font-extrabold text-amber-300 text-xs block mt-0.5">
                    {job.importantDates?.applicationLastDate || 'See Notice'}
                  </span>
                </div>
                <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/40">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Qualification</span>
                  <span className="font-bold text-blue-100 text-[11px] truncate block mt-0.5" title={job.eligibility?.educationalQualification}>
                    {job.eligibility?.educationalQualification || 'Check Notice'}
                  </span>
                </div>
              </div>
            </section>

            {/* IMPORTANT DATES & APPLICATION FEE (MOVED FROM 2ND COLUMN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* IMPORTANT DATES */}
              <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-200/80 shadow-2xs">
                <div className="flex items-center justify-between border-b border-sky-200/60 pb-2 mb-2.5">
                  <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Important Dates</span>
                  </h3>

                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${isClosingSoon ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>
                    {isClosingSoon ? '🔴 Closing Soon' : '🟢 Application Open'}
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between items-center p-1.5 bg-white/90 rounded-lg border border-sky-100/60">
                    <span className="text-slate-500 font-medium">Application Starts</span>
                    <span className="font-bold text-slate-800">{job.importantDates?.applicationStart || '01 Aug 2026'}</span>
                  </div>

                  <div className="flex justify-between items-center p-1.5 bg-red-50 border border-red-100 rounded-lg">
                    <span className="text-red-700 font-bold">Last Date to Apply</span>
                    <span className="font-extrabold text-red-700">{job.importantDates?.applicationLastDate || '31 Aug 2026'}</span>
                  </div>

                  <div className="flex justify-between items-center p-1.5 bg-white/90 rounded-lg border border-sky-100/60">
                    <span className="text-slate-500 font-medium">Exam Date</span>
                    <span className="font-bold text-slate-800">{job.importantDates?.examDate || 'Sep / Oct 2026'}</span>
                  </div>

                  <div className="flex justify-between items-center p-1.5 bg-white/90 rounded-lg border border-sky-100/60">
                    <span className="text-slate-500 font-medium">Admit Card</span>
                    <span className="font-bold text-slate-800">{job.importantDates?.admitCardDate || '7 Days Before Exam'}</span>
                  </div>
                </div>
              </div>

              {/* APPLICATION FEE */}
              <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/90 shadow-2xs">
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-slate-200/80 pb-2">
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Application Fee</span>
                </h3>

                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                    <span className="text-slate-500 font-medium">General</span>
                    <span className="font-bold text-slate-800">₹{job.applicationFee?.general || 100}</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                    <span className="text-slate-500 font-medium">OBC</span>
                    <span className="font-bold text-slate-800">₹{job.applicationFee?.obc || 100}</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                    <span className="text-slate-500 font-medium">EWS</span>
                    <span className="font-bold text-slate-800">₹{job.applicationFee?.ews || 100}</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                    <span className="text-slate-500 font-medium">SC / ST</span>
                    <span className="font-bold text-emerald-700">₹{job.applicationFee?.sc || 0}</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80 flex justify-between col-span-2">
                    <span className="text-slate-500 font-medium">Female / PwD</span>
                    <span className="font-bold text-emerald-700">Exempted (₹0)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AGE LIMIT & RELAXATION NORMS */}
            <section className="bg-sky-50/30 p-4 sm:p-5 rounded-xl border border-sky-100 shadow-2xs">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 border-b border-sky-200/60 pb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Age Limit & Relaxation Norms</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] mb-4">
                <div className="p-2.5 bg-white rounded-lg border border-sky-100">
                  <span className="text-slate-500 font-medium">Minimum Age:</span>
                  <div className="text-sm font-black text-slate-800 mt-0.5">{job.ageLimit?.minimumAge || 18} Years</div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-sky-100">
                  <span className="text-slate-500 font-medium">Maximum Age:</span>
                  <div className="text-sm font-black text-slate-800 mt-0.5">{job.ageLimit?.maximumAge || 32} Years</div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-sky-100">
                  <span className="text-slate-500 font-medium">Age Cutoff Date:</span>
                  <div className="text-[11px] font-bold text-blue-700 mt-0.5">{job.ageLimit?.ageCalculationDate || job.postDate}</div>
                </div>
              </div>

              {/* Age Calculator Widget */}
              <div className="mb-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-700" />
                    <span>Online Age Calculator</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Criteria: {job.ageLimit?.minimumAge || 18} – {job.ageLimit?.maximumAge || 32} Years
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {/* Date of Birth row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <label className="w-32 text-[11px] font-medium text-slate-800 shrink-0">
                      Date of Birth
                    </label>
                    <div className="flex items-center gap-1.5">
                      <select
                        value={dobMonth}
                        onChange={(e) => setDobMonth(Number(e.target.value))}
                        className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-800 focus:ring-1 focus:ring-blue-500"
                      >
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                          <option key={i} value={i + 1}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={dobDay}
                        onChange={(e) => setDobDay(Number(e.target.value))}
                        className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-800 focus:ring-1 focus:ring-blue-500"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={dobYear}
                        onChange={(e) => setDobYear(Number(e.target.value))}
                        placeholder="2000"
                        className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-800 focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline-block" />
                    </div>
                  </div>

                  {/* Age at the Date of row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <label className="w-32 text-[11px] font-medium text-slate-800 shrink-0">
                      Age at the Date of
                    </label>
                    <div className="flex items-center gap-1.5">
                      <select
                        value={targetMonth}
                        onChange={(e) => setTargetMonth(Number(e.target.value))}
                        className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-800 focus:ring-1 focus:ring-blue-500"
                      >
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                          <option key={i} value={i + 1}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={targetDay}
                        onChange={(e) => setTargetDay(Number(e.target.value))}
                        className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-800 focus:ring-1 focus:ring-blue-500"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={targetYear}
                        onChange={(e) => setTargetYear(Number(e.target.value))}
                        placeholder="2026"
                        className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-800 focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline-block" />
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="pt-1 flex items-center gap-3">
                    <button
                      onClick={calculateAge}
                      className="px-4 py-1.5 bg-[#4d7328] hover:bg-[#3d5c20] text-white font-bold text-xs rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>Calculate</span>
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Result Output */}
                  {ageResult && (
                    <div className={`mt-2.5 p-2.5 rounded-lg border text-[11px] transition-all ${
                      ageResult.isEligible 
                        ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' 
                        : 'bg-amber-50/90 border-amber-300 text-amber-950'
                    }`}>
                      <div className="font-black text-xs mb-0.5 flex items-center justify-between">
                        <span>Your Age: {ageResult.years} Years, {ageResult.months} Months, {ageResult.days} Days</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ageResult.isEligible ? 'bg-emerald-700 text-white' : 'bg-amber-700 text-white'
                        }`}>
                          {ageResult.isEligible ? 'Eligible' : 'Check Category'}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium leading-normal">{ageResult.statusText}</p>
                    </div>
                  )}
                </div>
              </div>

              {job.ageRelaxation && job.ageRelaxation.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-slate-800 mb-1.5">Upper Age Relaxation:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-sky-100/60 font-bold text-slate-600 uppercase text-[9px]">
                        <tr>
                          <th className="py-1.5 px-2.5">Category</th>
                          <th className="py-1.5 px-2.5">Relaxation Granted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sky-100 bg-white">
                        {job.ageRelaxation.map((rel, idx) => (
                          <tr key={idx} className="hover:bg-sky-50/50">
                            <td className="py-1.5 px-2.5 font-semibold text-slate-800">{rel.category}</td>
                            <td className="py-1.5 px-2.5 font-bold text-blue-700">{rel.relaxationYears}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 1 — OVERVIEW */}
            <div id="overview" className="scroll-mt-28 space-y-5">
              
              {/* Selection Process Flow */}
              <section className="bg-blue-50/30 p-4 sm:p-5 rounded-xl border border-blue-100 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 border-b border-blue-200/60 pb-2">
                  <ListOrdered className="w-4 h-4 text-blue-600" />
                  <span>Selection Process Stages</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  {[
                    { step: '1', title: 'Tier I / Prelims Exam', desc: 'Online Computer Based Test' },
                    { step: '2', title: 'Tier II / Mains Exam', desc: 'Descriptive / Objective' },
                    { step: '3', title: 'Skill Test / DEST', desc: 'Typing / Computer Test' },
                    { step: '4', title: 'Document Verification', desc: 'Medical & Final Merit List' },
                  ].map((st, i) => (
                    <div key={i} className="p-2.5 bg-white rounded-lg border border-blue-100/80 flex flex-col items-center">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center mb-1">
                        {st.step}
                      </span>
                      <span className="font-bold text-slate-900 text-[11px] mb-0.5">{st.title}</span>
                      <span className="text-[9px] text-slate-500">{st.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Job Profile & Responsibilities */}
              <section className="bg-sky-50/30 p-4 sm:p-5 rounded-xl border border-sky-100 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 border-b border-sky-200/60 pb-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Job Profile & Nature of Work</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="space-y-1.5 p-2.5 bg-white/80 rounded-lg border border-sky-100/60">
                    <h3 className="font-bold text-slate-800">Responsibilities:</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>Administrative assistance in ministry & central departments</li>
                      <li>Policy draft verification, file processing & auditing</li>
                      <li>Tax collection assessment & field enforcement duties</li>
                    </ul>
                  </div>
                  <div className="space-y-1.5 p-2.5 bg-white/80 rounded-lg border border-sky-100/60">
                    <h3 className="font-bold text-slate-800">Career Growth & Posting:</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>All-India posting options with central government benefits</li>
                      <li>Timely promotional avenues up to Gazetted Group A officer levels</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Salary & Pay Scale */}
              <section className="bg-emerald-50/25 p-4 sm:p-5 rounded-xl border border-emerald-100/80 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 border-b border-emerald-200/60 pb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Salary & Pay Scale Details (7th CPC)</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-100/80 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Pay Level</span>
                    <div className="text-xs font-black text-blue-700 mt-0.5">Level 4 to Level 8</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-100/80 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Basic Pay Range</span>
                    <div className="text-xs font-extrabold text-slate-800 mt-0.5">₹25,500 – ₹1,51,100</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-100/80 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Est. In-Hand Salary</span>
                    <div className="text-xs font-extrabold text-emerald-700 mt-0.5">₹38,000 – ₹78,000/mo</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-100/80 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Allowances</span>
                    <div className="text-[10px] font-bold text-slate-700 mt-0.5">DA, HRA, TA, Medical</div>
                  </div>
                </div>
              </section>

            </div>

            {/* SECTION 2 — VACANCY */}
            <div id="vacancy" className="scroll-mt-28 space-y-5">
              
              {/* Total Vacancy Highlight */}
              <div className="bg-blue-50/80 border border-blue-200 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xs">
                <div>
                  <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider">Overall Vacancy Summary</span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {(job.vacancyDetails?.totalVacancy || 0).toLocaleString('en-IN')} Total Vacancies
                  </h3>
                  <p className="text-[9.5px] text-slate-600 mt-0.5">{job.vacancyDetails?.note || 'Subject to central departmental revision'}</p>
                </div>
                <div className="bg-blue-600 text-white font-extrabold px-2.5 py-1 rounded text-[10px] shrink-0 shadow-2xs">
                  Central & State Posts
                </div>
              </div>

              {/* Category-wise Vacancy Breakdown Table */}
              {job.categoryWiseVacancy && job.categoryWiseVacancy.length > 0 && (
                <section className="bg-sky-50/30 p-4 sm:p-5 rounded-xl border border-sky-100 shadow-2xs">
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 border-b border-sky-200/60 pb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Post-wise & Category Distribution</span>
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-sky-100/60 font-bold text-slate-700 uppercase text-[9px]">
                        <tr>
                          <th className="py-2 px-2.5">Post Name</th>
                          <th className="py-2 px-2">UR</th>
                          <th className="py-2 px-2">OBC</th>
                          <th className="py-2 px-2">SC</th>
                          <th className="py-2 px-2">ST</th>
                          <th className="py-2 px-2">EWS</th>
                          <th className="py-2 px-2.5 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sky-100/60 bg-white/70">
                        {job.categoryWiseVacancy.map((cat, idx) => (
                          <tr key={idx} className="hover:bg-sky-50/60 transition-colors">
                            <td className="py-2 px-2.5 font-bold text-slate-800">{cat.postName}</td>
                            <td className="py-2 px-2 text-slate-600 font-medium">{cat.ur}</td>
                            <td className="py-2 px-2 text-slate-600 font-medium">{cat.obc}</td>
                            <td className="py-2 px-2 text-slate-600 font-medium">{cat.sc}</td>
                            <td className="py-2 px-2 text-slate-600 font-medium">{cat.st}</td>
                            <td className="py-2 px-2 text-slate-600 font-medium">{cat.ews}</td>
                            <td className="py-2 px-2.5 text-right font-black text-blue-700">{cat.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Reservation Info */}
              <section className="bg-indigo-50/30 p-4 sm:p-5 rounded-xl border border-indigo-100 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 border-b border-indigo-200/60 pb-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Horizontal & Special Category Reservations</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-2.5 bg-white/80 rounded-lg border border-indigo-100/80">
                    <span className="font-bold text-slate-800 block mb-0.5">Women Candidates</span>
                    <span className="text-slate-600">Horizontal reservation applicable as per Govt norms.</span>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-lg border border-indigo-100/80">
                    <span className="font-bold text-slate-800 block mb-0.5">PwD Candidates</span>
                    <span className="text-slate-600">4% reservation allocated across benchmark disabilities.</span>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-lg border border-indigo-100/80">
                    <span className="font-bold text-slate-800 block mb-0.5">Ex-Servicemen (ESM)</span>
                    <span className="text-slate-600">10% reservation in Group C posts.</span>
                  </div>
                </div>
              </section>

            </div>

            {/* SECTION 3 — ELIGIBILITY */}
            <div id="eligibility" className="scroll-mt-28 space-y-5">
              
              {/* Dashboard Jobs Notice Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-orange-500/10 border border-amber-300 px-2.5 py-1 sm:px-3 rounded-md flex items-center justify-between gap-2 text-[10px] sm:text-[10.5px] text-amber-950 shadow-2xs">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0"></span>
                  <p className="font-medium truncate sm:whitespace-normal">
                    <span className="font-black text-amber-800 uppercase tracking-tight">Log in</span> to view all eligible jobs on your dashboard (<strong className="font-extrabold text-amber-900">50,000+ active central, state & private jobs</strong> daily).
                  </p>
                </div>
                <Link to="/login" className="font-black text-amber-900 hover:text-amber-700 bg-amber-200/80 hover:bg-amber-300/80 px-2 py-0.5 rounded text-[10px] shrink-0 transition-colors">
                  Log In →
                </Link>
              </div>

              {/* Educational Qualification */}
              <section className="bg-blue-50/30 p-4 sm:p-5 rounded-xl border border-blue-100 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 border-b border-blue-200/60 pb-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Educational Qualification Requirements</span>
                </h2>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-lg border border-blue-100">
                  {job.eligibility?.educationalQualification}
                </p>
              </section>

              {/* Other Conditions */}
              <section className="bg-indigo-50/25 p-4 sm:p-5 rounded-xl border border-indigo-100 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 border-b border-indigo-200/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Nationality & Other Standards</span>
                </h2>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="p-2 bg-white/90 rounded-lg border border-indigo-100/60">
                    <strong className="text-slate-900">Nationality:</strong> Candidate must be a citizen of India / subject of Nepal / Bhutan.
                  </div>
                  {job.eligibility?.physicalRequirements && (
                    <div className="p-2 bg-white/90 rounded-lg border border-indigo-100/60">
                      <strong className="text-slate-900">Physical Standards:</strong> {job.eligibility.physicalRequirements}
                    </div>
                  )}
                </div>
              </section>

            </div>

            {/* SECTION 4 — APPLICATION */}
            <div id="application" className="scroll-mt-28 space-y-5">
              
              {/* Step-by-step How to Apply */}
              <section className="bg-emerald-50/25 p-4 sm:p-5 rounded-xl border border-emerald-100 shadow-2xs">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 border-b border-emerald-200/60 pb-2">
                  <ListOrdered className="w-4 h-4 text-blue-600" />
                  <span>Step-by-Step Online Application Procedure</span>
                </h2>

                <ol className="space-y-2 text-[11px]">
                  {job.howToApply?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-emerald-100/80">
                      <span className="w-5 h-5 bg-blue-600 text-white font-black text-[10px] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-800 leading-relaxed font-medium mt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Documents Checklist */}
              <section className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-blue-200/60 pb-2.5">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Documents Required for Application</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Recent Passport Size Photo (White Background, JPG format)',
                    'Scanned Signature (Black/Blue ink on white paper)',
                    'Valid Identity Proof (Aadhaar Card / Voter ID / Passport)',
                    '10th / 12th & Graduation Certificates',
                    'Category / Caste Certificate (SC/ST/OBC/EWS) if applicable',
                    'Active Mobile Number & Personal Email ID for OTP Verification'
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-blue-100/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-slate-700 font-medium">{doc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Form Filling Video Walkthrough */}
              {job.youtubeVideoId && (
                <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <Play className="w-5 h-5 text-red-600 fill-red-600" />
                    <span>Form Filling Video Guide</span>
                  </h2>
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-xs">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${job.youtubeVideoId}`}
                      title="Form filling guide"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </section>
              )}

            </div>

            {/* SECTION 5 — SYLLABUS */}
            <div id="syllabus" className="scroll-mt-28 space-y-5">
              
              {/* Tabular Syllabus Table */}
              <section className="bg-sky-50/30 p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-200/60 pb-3 mb-4">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>Subject-wise Detailed Syllabus</span>
                  </h2>

                  {job.officialNotificationUrl && (
                    <a
                      href={job.officialNotificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-sky-200 shadow-2xs self-start sm:self-auto"
                    >
                      <span>Official Syllabus PDF</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="overflow-x-auto border border-sky-200/80 rounded-xl shadow-2xs bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-sky-100/70 font-bold text-slate-700 uppercase text-[10px] border-b border-sky-200/80">
                      <tr>
                        <th className="py-2.5 px-3 w-1/4 sm:w-1/5 min-w-[130px]">Subject</th>
                        <th className="py-2.5 px-3">Detailed Topics & Sub-topics</th>
                        <th className="py-2.5 px-3 text-center w-20 shrink-0">Topics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100/80">
                      {job.syllabus?.map((syl, idx) => (
                        <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                          <td className="py-3 px-3 align-top font-bold text-slate-900 bg-sky-50/20">
                            <span>{syl.subject}</span>
                          </td>
                          <td className="py-3 px-3 align-top">
                            <div className="flex flex-wrap gap-1.5">
                              {syl.topics.map((topic, i) => (
                                <span key={i} className="inline-block px-2 py-0.5 bg-slate-100/80 hover:bg-sky-100/60 text-slate-800 rounded text-[11px] font-medium border border-slate-200/70">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 align-top text-center">
                            <span className="inline-flex items-center justify-center px-2 py-0.5 bg-blue-100 text-blue-800 font-extrabold rounded-full text-[10px]">
                              {syl.topics.length}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>

            {/* SECTION 6 — EXAM PATTERN */}
            <div id="pattern" className="scroll-mt-28 space-y-5">
              
              {/* Examination Pattern Table */}
              <section className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-blue-200/60 pb-2.5">
                  <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                  <span>Examination Pattern & Subject Structure</span>
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-blue-100/60 font-bold text-slate-700 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Subject / Section</th>
                        <th className="py-2.5 px-2">Questions</th>
                        <th className="py-2.5 px-2">Marks</th>
                        <th className="py-2.5 px-2">Duration</th>
                        <th className="py-2.5 px-3">Negative Marking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100/60 bg-white">
                      {job.examPattern?.map((pat, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50">
                          <td className="py-2.5 px-3 font-bold text-slate-800">{pat.subject}</td>
                          <td className="py-2.5 px-2 text-slate-700 font-bold">{pat.questions}</td>
                          <td className="py-2.5 px-2 text-blue-700 font-black">{pat.marks}</td>
                          <td className="py-2.5 px-2 text-slate-600">{pat.duration}</td>
                          <td className="py-2.5 px-3 text-red-600 font-semibold">{pat.negativeMarking}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Marking Scheme Specs */}
              <section className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-200/80 pb-2.5">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span>Marking Scheme Highlights</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 font-medium">Exam Mode:</span>
                    <div className="font-bold text-slate-800 mt-1">Online CBT</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 font-medium">Question Type:</span>
                    <div className="font-bold text-slate-800 mt-1">Objective MCQs</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 font-medium">Negative Marking:</span>
                    <div className="font-bold text-red-600 mt-1">0.50 Marks / Question</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 font-medium">Language:</span>
                    <div className="font-bold text-slate-800 mt-1">English & Hindi</div>
                  </div>
                </div>
              </section>

            </div>

            {/* SECTION 7 — PREVIOUS YEAR */}
            <div id="pyq" className="scroll-mt-28 space-y-5">
              
              {/* PYQ Stats */}
              <section className="bg-indigo-50/25 p-6 rounded-2xl border border-indigo-100 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-indigo-200/60 pb-2.5">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>Previous Recruitment Competition Data</span>
                </h2>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-indigo-100/60 font-bold text-slate-700 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Year</th>
                        <th className="py-2.5 px-2">Vacancies</th>
                        <th className="py-2.5 px-2">Applicants</th>
                        <th className="py-2.5 px-2">Appeared</th>
                        <th className="py-2.5 px-3 text-right">Selected</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-100/60 bg-white">
                      {job.previousYearData?.map((py, idx) => (
                        <tr key={idx} className="hover:bg-indigo-50/50">
                          <td className="py-2.5 px-3 font-bold text-slate-800">{py.year}</td>
                          <td className="py-2.5 px-2 text-slate-700 font-semibold">{py.vacancies.toLocaleString()}</td>
                          <td className="py-2.5 px-2 text-slate-600">{py.applicants.toLocaleString()}</td>
                          <td className="py-2.5 px-2 text-slate-600">{py.appeared.toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-black text-blue-700">{py.selected.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/90 rounded-xl border border-indigo-100/80">
                    <span className="text-blue-900 font-bold">Applicant to Vacancy Ratio:</span>
                    <p className="text-slate-600 mt-1">Approx. <strong className="text-slate-900">160 candidates</strong> per post in recent cycles.</p>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl border border-indigo-100/80">
                    <span className="text-emerald-900 font-bold">Attendance Rate:</span>
                    <p className="text-slate-600 mt-1">Approx. <strong className="text-slate-900">50% candidates</strong> appear for Tier-1 exam.</p>
                  </div>
                </div>
              </section>

              {/* Download PYQ Papers */}
              <section className="bg-sky-50/30 p-6 rounded-2xl border border-sky-100 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Download Previous Year Question Papers & Answer Keys:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[2025, 2024, 2023].map((yr) => (
                    <div key={yr} className="p-3.5 bg-white rounded-xl border border-sky-100 flex flex-col justify-between">
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{yr} Question Paper</div>
                        <p className="text-[10px] text-slate-500 mt-0.5">Includes Official Answer Key</p>
                      </div>
                      <a
                        href={job.officialNotificationUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 py-1.5 px-3 bg-sky-50 hover:bg-sky-100 text-blue-600 border border-sky-200 font-bold rounded-lg text-center flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* SECTION 8 — CUTOFF & ANALYSIS */}
            <div id="cutoff" className="scroll-mt-28 space-y-5">
              
              {/* Category Switcher & Cutoff Chart */}
              <section className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3 mb-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Previous Year Cutoff Analysis</span>
                  </h2>

                  {/* Category Tabs */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-blue-100">
                    {(['UR', 'OBC', 'SC', 'ST', 'EWS'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCutoffCat(cat)}
                        className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all ${
                          selectedCutoffCat === cat
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cutoff Visual Trend */}
                <div className="p-4 bg-white rounded-xl border border-blue-100 mb-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                    <span>Historical Cutoff Score Trend ({selectedCutoffCat} Category)</span>
                    <span className="text-[10px] text-slate-500 font-medium">Exam Max: 200 Marks</span>
                  </div>

                  {(() => {
                    const currentTrend = cutoffTrendData[selectedCutoffCat] || [];
                    const scores = currentTrend.map(t => t.score);
                    const minScore = Math.min(...scores);
                    const maxScore = Math.max(...scores);
                    const baseline = Math.max(0, Math.floor(minScore * 0.6));
                    const maxScaled = Math.max(maxScore * 1.15, baseline + 20);

                    return (
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {currentTrend.map((item, i) => {
                          const heightPct = Math.min(100, Math.max(18, Math.round(((item.score - baseline) / (maxScaled - baseline)) * 100)));
                          return (
                            <div key={i} className="flex flex-col items-center">
                              <span className="text-[11px] font-black text-blue-700 mb-1">{item.score}</span>
                              <div className="w-full h-28 bg-slate-50/80 rounded-t-lg p-1 flex items-end justify-center border-b border-blue-200">
                                <div
                                  className="w-full max-w-[32px] sm:max-w-[40px] bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-md transition-all duration-300 shadow-2xs hover:from-blue-700 hover:to-blue-600"
                                  style={{ height: `${heightPct}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-slate-600 mt-1.5">{item.year}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Expected Cutoff Box with Disclaimer */}
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <span>Glitread Expected Cutoff 2026 (Tier-1)</span>
                    <span className="bg-amber-200 text-amber-900 text-[9px] px-1.5 py-0.2 rounded font-black uppercase ml-1">Estimate</span>
                  </div>
                  <p className="text-amber-800 font-extrabold text-sm pt-0.5">
                    Estimated Safe Score: 135 – 142 Marks (UR Category)
                  </p>
                  <p className="text-[10px] text-amber-700 italic">
                    *Note: This is Glitread's internal expert prediction based on difficulty trends and is NOT an official release.
                  </p>
                </div>
              </section>

              {/* Topic Wise Weightage */}
              {job.topicWiseWeightage && job.topicWiseWeightage.length > 0 && (
                <section className="bg-sky-50/30 p-6 rounded-2xl border border-sky-100 shadow-2xs">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Topic-Wise Question Weightage:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-sky-100/60 font-bold text-slate-600 uppercase text-[10px]">
                        <tr>
                          <th className="py-2 px-3">Subject</th>
                          <th className="py-2 px-3">Topic</th>
                          <th className="py-2 px-3 text-right">Avg Questions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sky-100 bg-white">
                        {job.topicWiseWeightage.map((tw, idx) => (
                          <tr key={idx} className="hover:bg-sky-50/50">
                            <td className="py-2 px-3 font-semibold text-slate-800">{tw.subject}</td>
                            <td className="py-2 px-3 text-slate-600">{tw.topic}</td>
                            <td className="py-2 px-3 text-right font-black text-blue-700">{tw.avgQuestions} Qs</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

            </div>

            {/* SECTION 9 — MOCK TEST */}
            <div id="mock" className="scroll-mt-28 space-y-5">
              
              <section className="bg-blue-50/30 p-5 sm:p-6 rounded-2xl border border-blue-100 shadow-2xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Free Preparation Portal</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                        Testbook Partnered
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 mt-0.5">
                      {job.category} Full Length Mock Test Series
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Simulate real exam environment with instant rank, Testbook series & performance report.</p>
                  </div>

                  <a
                    href={(job as any).testbookUrl || `https://testbook.com/search?q=${encodeURIComponent(job.title || job.category || 'Govt Exam')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span>Testbook Test Series</span>
                  </a>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-100/80 flex items-center justify-end">
                  <a
                    href={(job as any).testbookUrl || `https://testbook.com/search?q=${encodeURIComponent(job.title || job.category || 'Govt Exam')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:text-emerald-900 underline text-[11px] inline-flex items-center gap-1"
                  >
                    <span>Open {job.category} on Testbook.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </section>

            </div>

            {/* SECTION 10 — FREQUENTLY ASKED QUESTIONS (SEO FAQ SCHEMA & GOOGLE DISCOVER) */}
            <div id="faqs" className="scroll-mt-28 space-y-4 pt-2">
              <section className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-extrabold text-slate-900">
                    Frequently Asked Questions ({job.title})
                  </h2>
                </div>

                <div className="space-y-3">
                  {automatedFaqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 transition-all open:bg-blue-50/40 open:border-blue-200"
                      open={idx === 0}
                    >
                      <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 cursor-pointer list-none select-none">
                        <span className="pr-2">{faq.question}</span>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                      </summary>
                      <p className="mt-2.5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2 font-normal">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

          </div>

          {/* COLUMN 2 — STICKY SIDEBAR (~30% width: lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
            
            {/* SIDEBAR CARD 3 — YEAR-WISE VACANCY TREND (Clean Bar Graph) */}
            <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-blue-200/60 pb-2.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Year-Wise Vacancy Trend</span>
              </h3>

              <div className="space-y-2 pt-1 text-xs">
                {yearVacancyData.map((d, idx) => {
                  const barWidthPct = Math.round((d.vacancies / maxVacancy) * 100);
                  const isCurrent = d.year === '2026';
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className={isCurrent ? 'font-bold text-blue-700' : 'text-slate-600'}>{d.year} Recruitment</span>
                        <span className="font-bold text-slate-900">{d.vacancies.toLocaleString()} Posts</span>
                      </div>
                      <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-blue-100/60">
                        <div
                          className={`h-full rounded-full ${isCurrent ? 'bg-blue-600' : 'bg-blue-400/80'}`}
                          style={{ width: `${barWidthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIDEBAR CARD 4 — CUTOFF TREND */}
            <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 shadow-2xs">
              <div className="flex items-center justify-between border-b border-indigo-200/60 pb-2 mb-2.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>Cutoff Trend</span>
                </h3>

                <div className="flex gap-1 bg-white p-0.5 rounded-md text-[10px] border border-indigo-100">
                  {(['UR', 'OBC', 'SC'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCutoffCat(c)}
                      className={`px-1.5 py-0.5 rounded font-extrabold cursor-pointer transition-colors ${selectedCutoffCat === c ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const currentTrend = cutoffTrendData[selectedCutoffCat] || [];
                const scores = currentTrend.map(t => t.score);
                const minScore = Math.min(...scores);
                const maxScore = Math.max(...scores);
                const baseline = Math.max(0, Math.floor(minScore * 0.7));
                const maxScaled = Math.max(maxScore * 1.1, baseline + 20);

                return (
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {currentTrend.map((item, i) => {
                      const heightPct = Math.min(100, Math.max(20, Math.round(((item.score - baseline) / (maxScaled - baseline)) * 100)));
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-blue-700 mb-0.5">{item.score}</span>
                          <div className="w-full h-16 bg-white/80 rounded-t-md p-0.5 flex items-end justify-center border-b border-indigo-200/80">
                            <div
                              className="w-full max-w-[28px] bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-xs transition-all duration-300 shadow-2xs hover:from-blue-700 hover:to-blue-600"
                              style={{ height: `${heightPct}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-bold text-slate-500 mt-1">{item.year}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* SIDEBAR CARD 5 — QUICK LINKS */}
            <div className="bg-sky-50/60 p-5 rounded-2xl border border-sky-200 shadow-2xs space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Quick Access Links</span>
              </h3>

              {job.applyOnlineUrl && (
                <a
                  href={job.applyOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-between transition-all shadow-2xs"
                >
                  <span>Apply Online Direct</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {job.officialNotificationUrl && (
                <a
                  href={job.officialNotificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white hover:bg-sky-100 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-between transition-all border border-sky-200"
                >
                  <span>Download Notification</span>
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                </a>
              )}

              {job.officialWebsiteUrl && (
                <a
                  href={job.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white hover:bg-sky-100 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-between transition-all border border-sky-200"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>

            {/* SIDEBAR CARD 6 — MOCK TEST CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-1.5 text-blue-100 text-xs font-extrabold uppercase mb-1">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Prepare with Glitread</span>
              </div>
              <h4 className="font-extrabold text-sm">Free {job.category} Mock Test</h4>
              <p className="text-[11px] text-blue-100 mt-1">100 Exam Standard Questions • 60 Mins Time Limit</p>
              
              <Link
                to={job.mockTestUrl || "/mock-tests"}
                className="mt-3.5 w-full py-2.5 bg-white hover:bg-blue-50 text-blue-800 font-black rounded-xl text-xs text-center flex items-center justify-center gap-1 transition-all shadow-2xs"
              >
                <span>Start Mock Test →</span>
              </Link>
            </div>

          </div>

        </div>
      </div>

    </article>
  );
};

const ChevronRightIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
