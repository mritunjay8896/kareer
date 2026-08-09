import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import govBannerImg from '../image1/governmentjobbannerimg.png';
import { GovernmentJob } from '../types';
import { fetchAllGovernmentJobs } from '../lib/govJobs';
import { ALL_INDIA_OPTION, INDIAN_STATES, UNION_TERRITORIES } from '../data/indianStates';
import { SEOHead } from '../components/SEO/SEOHead';
import { generateBreadcrumbSchema, SITE_DOMAIN } from '../utils/seoHelpers';
import { 
  Building2, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Users,
  Shield,
  Train,
  Landmark,
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  HeartPulse,
  Scale,
  Cog,
  FileText,
  Bookmark,
  Zap,
  ChevronRight,
  ExternalLink,
  Flame,
  FileCheck,
  CreditCard,
  BellRing,
  HelpCircle,
  Globe
} from 'lucide-react';

export const GovJobsPublicListPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<GovernmentJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchAllGovernmentJobs(false).then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.postNames && job.postNames.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCat = activeCategoryFilter === 'All' || 
        activeCategoryFilter === 'Latest Jobs' ||
        job.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()) ||
        (activeCategoryFilter === '10th Pass' && job.eligibility?.educationalQualification?.includes('10th')) ||
        (activeCategoryFilter === '12th Pass' && job.eligibility?.educationalQualification?.includes('12th')) ||
        (activeCategoryFilter === 'Graduate' && job.eligibility?.educationalQualification?.toLowerCase().includes('graduat'));

      const matchesState = selectedState === 'All' || job.state === selectedState;

      const matchesLang = selectedLanguage === 'All' || 
        (job as any).language === selectedLanguage || 
        (selectedLanguage === 'Hindi' && job.title.toLowerCase().includes('hindi')) ||
        (selectedLanguage === 'English' && !job.title.toLowerCase().includes('hindi'));

      return matchesSearch && matchesCat && matchesState && matchesLang;
    });
  }, [jobs, searchTerm, activeCategoryFilter, selectedState, selectedLanguage]);

  // Categories list for grid
  const categoryGrid = [
    { name: 'SSC Jobs', count: '452 Jobs', icon: Users, color: 'text-blue-600 bg-blue-50', catKey: 'SSC' },
    { name: 'Railway Jobs', count: '384 Jobs', icon: Train, color: 'text-emerald-600 bg-emerald-50', catKey: 'Railway' },
    { name: 'Banking Jobs', count: '512 Jobs', icon: Landmark, color: 'text-amber-600 bg-amber-50', catKey: 'Banking' },
    { name: 'Police Jobs', count: '281 Jobs', icon: Shield, color: 'text-red-600 bg-red-50', catKey: 'Police' },
    { name: 'Defence Jobs', count: '194 Jobs', icon: Shield, color: 'text-emerald-600 bg-emerald-50', catKey: 'Defence' },
    { name: 'Teaching Jobs', count: '297 Jobs', icon: BookOpen, color: 'text-pink-600 bg-pink-50', catKey: 'Teaching' },
    { name: 'UPSC Jobs', count: '138 Jobs', icon: Building2, color: 'text-purple-600 bg-purple-50', catKey: 'UPSC' },
    { name: 'State PSC Jobs', count: '213 Jobs', icon: Award, color: 'text-orange-600 bg-orange-50', catKey: 'State PSC' },
    { name: 'PSU Jobs', count: '164 Jobs', icon: Briefcase, color: 'text-cyan-600 bg-cyan-50', catKey: 'PSU' },
    { name: 'Court Jobs', count: '96 Jobs', icon: Scale, color: 'text-indigo-600 bg-indigo-50', catKey: 'Court' },
    { name: 'Healthcare Jobs', count: '153 Jobs', icon: HeartPulse, color: 'text-teal-600 bg-teal-50', catKey: 'Healthcare' },
    { name: 'Engineering Jobs', count: '182 Jobs', icon: Cog, color: 'text-amber-600 bg-amber-50', catKey: 'Engineering' },
    { name: '10th Pass Jobs', count: '357 Jobs', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50', catKey: '10th Pass' },
    { name: '12th Pass Jobs', count: '318 Jobs', icon: GraduationCap, color: 'text-rose-600 bg-rose-50', catKey: '12th Pass' },
    { name: 'Graduate Jobs', count: '642 Jobs', icon: GraduationCap, color: 'text-purple-600 bg-purple-50', catKey: 'Graduate' },
  ];

  // States list for grid
  const stateList = [
    { name: 'Uttar Pradesh', count: '432 Jobs' },
    { name: 'Karnataka', count: '312 Jobs' },
    { name: 'Maharashtra', count: '486 Jobs' },
    { name: 'Tamil Nadu', count: '315 Jobs' },
    { name: 'Bihar', count: '341 Jobs' },
    { name: 'Delhi', count: '184 Jobs' },
    { name: 'Gujarat', count: '267 Jobs' },
    { name: 'Rajasthan', count: '312 Jobs' },
    { name: 'Madhya Pradesh', count: '278 Jobs' },
    { name: 'West Bengal', count: '241 Jobs' },
    { name: 'Andhra Pradesh', count: '198 Jobs' },
    { name: 'Punjab', count: '162 Jobs' },
    { name: 'Haryana', count: '142 Jobs' },
    { name: 'Odisha', count: '134 Jobs' },
    { name: 'Chhattisgarh', count: '112 Jobs' },
  ];

  // Quick filter pills below hero search
  const filterPills = [
    { label: 'Latest Jobs', icon: Zap, color: 'bg-blue-600 text-white' },
    { label: 'Closing Soon', icon: Clock, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: '10th Pass', badge: '10', color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: '12th Pass', badge: '12', color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'Graduate', icon: GraduationCap, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'Police', icon: Shield, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'Railway', icon: Train, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'Banking', icon: Landmark, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'Defence', icon: Shield, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'Teaching', icon: BookOpen, color: 'bg-white text-slate-700 hover:bg-slate-100' },
    { label: 'All Categories', icon: Zap, color: 'bg-white text-slate-700 hover:bg-slate-100' },
  ];

  // Latest jobs for quick column (matching design image)
  const latestJobsQuickList = [
    { title: 'UP Anganwadi Helper Bharti Online Form 2026', isNew: true, path: '/government-jobs/up-police-constable-recruitment-2026' },
    { title: 'Himachal Pradesh High Court Various Post Online Form', isNew: false, path: '/government-jobs' },
    { title: 'IOCL Marketing Division NR Apprentices Online Form', isNew: false, path: '/government-jobs' },
    { title: 'AAI Junior Executive, Manager Online Form 2026', isNew: false, path: '/government-jobs' },
    { title: 'DRDO CEPTAM 10 Technical Various Post Online Form', isNew: false, path: '/government-jobs' },
    { title: 'SSC CGL Combined Graduate Level Online Form 2026', isNew: true, path: '/government-jobs/ssc-cgl-recruitment-2026' },
    { title: 'IBPS PO Probationary Officer Recruitment 2026', isNew: false, path: '/government-jobs/ibps-po-recruitment-2026' },
  ];

  // Quick Apply 8-Block Banner (matching Sarkari Result reference image)
  const quickApplyGridItems = [
    {
      title: 'UPPSC GIC Lecturer Mains Apply Online',
      bgColor: 'bg-[#7d8200] hover:bg-[#686d00]',
      path: '/government-jobs/ssc-cgl-recruitment-2026',
    },
    {
      title: 'SBI Clerk Backlog Apply Online',
      bgColor: 'bg-[#1b3bb8] hover:bg-[#142e94]',
      path: '/government-jobs/ibps-po-recruitment-2026',
    },
    {
      title: 'UP Anganwadi Worker Apply Online',
      bgColor: 'bg-[#f25c00] hover:bg-[#ce4e00]',
      path: '/government-jobs/up-police-constable-recruitment-2026',
    },
    {
      title: 'UPSSSC PET 2026 Apply Online',
      bgColor: 'bg-[#800000] hover:bg-[#610000]',
      path: '/government-jobs/up-police-constable-recruitment-2026',
    },
    {
      title: 'Railway Section Controller Apply Online',
      bgColor: 'bg-[#f02d00] hover:bg-[#c92500]',
      path: '/government-jobs/ssc-cgl-recruitment-2026',
    },
    {
      title: 'UP Scholarship 2026 Apply Online',
      bgColor: 'bg-[#006d00] hover:bg-[#005200]',
      path: '/government-jobs',
    },
    {
      title: 'IBPS Clerk 16th Apply Online',
      bgColor: 'bg-[#e638b8] hover:bg-[#c2289a]',
      path: '/government-jobs/ibps-po-recruitment-2026',
    },
    {
      title: 'MPESB Group II Sub Group IV Apply Online 2026',
      bgColor: 'bg-[#1e85e5] hover:bg-[#156cb3]',
      path: '/government-jobs',
    },
  ];

  // Sarkari result style notice board categories
  const noticeBoards = [
    {
      title: 'Results',
      icon: FileCheck,
      color: 'text-blue-600',
      items: [
        { text: 'UPPSC Assistant Professor GDC Result 2026', isNew: true },
        { text: 'UP PGT 2022 Final Result with Institute Details', isNew: false },
        { text: 'CBSE KVS, NVS, EMRS Tier II Result Notice 2026', isNew: false },
        { text: 'UPSC CPF AC 2025 Final Result', isNew: false },
        { text: 'UPSC CDS II 2024 Final Result', isNew: false },
      ]
    },
    {
      title: 'Admit Card',
      icon: CreditCard,
      color: 'text-purple-600',
      items: [
        { text: 'SSB Constable Tradesman PET PST Admit Card 2026', isNew: true },
        { text: 'Sashastra Seema Bal ASI SI PET PST Admit Card 2026', isNew: false },
        { text: 'Railway RRB Group D 09/2025 Exam City / Admit Card', isNew: false },
        { text: 'UPESSC Assistant Professor BEd Exam Postponed 2026', isNew: false },
        { text: 'UP Police Constable Exam Date & Admit Card 2026', isNew: false },
      ]
    },
    {
      title: 'Latest Jobs',
      icon: Briefcase,
      color: 'text-emerald-600',
      items: [
        { text: 'UP Anganwadi Helper Bharti Online Form 2026', isNew: true },
        { text: 'Himachal Pradesh High Court Various Post Online Form', isNew: false },
        { text: 'IOCL Marketing Division NR Apprentices Online Form', isNew: false },
        { text: 'AAI Junior Executive, Manager Online Form 2026', isNew: false },
        { text: 'DRDO CEPTAM 10 Technical Various Post Online Form', isNew: false },
      ]
    },
    {
      title: 'Certificate',
      icon: Award,
      color: 'text-amber-600',
      items: [
        { text: 'Haryana TET HTET 2024 Certificate Download', isNew: true },
        { text: 'CTET February 2026 Certificate Download', isNew: false },
        { text: 'NTA CSIR NET December 2025 E Certificate', isNew: false },
        { text: 'NTA UGC NET December 2025 E Certificate Download', isNew: false },
        { text: 'NTA UGC NET December 2024 E Certificate Download', isNew: false },
      ]
    },
    {
      title: 'Outsourcing / Offline Jobs',
      icon: Building2,
      color: 'text-amber-700',
      items: [
        { text: 'UP Ground Water Department MTS Offline Form 2026', isNew: true },
        { text: 'UPSRTC Bus Conductor Prayagraj, Pratapgarh, Kaushambi', isNew: false },
        { text: 'UP Chitrakoot ECCE Educator Offline Form 2026', isNew: false },
        { text: 'UP Van Nigam Offline Form 2026', isNew: false },
        { text: 'UPEIDA Computer Operator, Driver Offline Form 2026', isNew: false },
      ]
    },
    {
      title: 'Important',
      icon: BellRing,
      color: 'text-rose-600',
      items: [
        { text: 'NIELIT CCC Exam Online Form 2026', isNew: true },
        { text: 'Delhi DSSSB E Dossier Form 2026', isNew: false },
        { text: 'UP Self Enumeration Online Registration 2026', isNew: false },
        { text: 'MP CPCT Online Form 2026', isNew: false },
        { text: 'SSC OTR Online Form 2024', isNew: false },
      ]
    }
  ];

  // Generate ItemList JSON-LD Schema for Google Search
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Latest Government Jobs 2026 Notifications',
    'description': 'Active government recruitment notifications across Central and State departments in India.',
    'numberOfItems': jobs.length,
    'itemListElement': jobs.slice(0, 15).map((job, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': job.title,
      'url': `${SITE_DOMAIN}/government-jobs/${job.slug || job.id}`
    }))
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_DOMAIN },
    { name: 'Government Jobs (Sarkari Naukri)', url: `${SITE_DOMAIN}/government-jobs` }
  ]);

  return (
    <div className="min-h-screen bg-slate-50/70 font-sans text-slate-800 pb-16">
      <SEOHead
        title="Latest Government Jobs 2026 (Sarkari Naukri): SSC, UPSC, Railway RRB, Banking & State Jobs"
        description="Search 100,000+ active Central & State Government Jobs 2026 (Sarkari Naukri) in India. Get direct apply links, syllabus, eligibility, age limit & notification PDFs for SSC, UPSC, Railway RRB, Police & Bank exams."
        keywords={[
          'Sarkari Naukri 2026',
          'Latest Government Jobs 2026',
          'Government Jobs Notification',
          'SSC CGL Recruitment 2026',
          'UPSC Notification 2026',
          'Railway RRB Vacancy',
          'Sarkari Result',
          'Bank PO Clerk Jobs',
          'State PSC Vacancies',
          'Police Bharti 2026',
          'All India Govt Jobs'
        ]}
        canonicalUrl={`${SITE_DOMAIN}/government-jobs`}
        ogType="website"
        jsonLdSchemas={[itemListSchema, breadcrumbSchema]}
      />
      
      {/* 1. Hero Section Banner */}
      <div className="relative bg-gradient-to-r from-slate-50 via-slate-50/90 to-blue-50/30 border-b border-slate-200/80 overflow-hidden py-5 sm:py-6">
        {/* Background Image on Right Side with Horizontal Blend */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden pointer-events-none z-0">
          <img
            src={govBannerImg}
            alt="Government Secretariat Building"
            className="w-full h-full object-cover object-right"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80";
            }}
          />
          {/* Smooth Fade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="max-w-xl lg:max-w-2xl space-y-2.5">
              
              {/* Main Headline */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                  Government Jobs 2026
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase border border-emerald-200">
                  Official CMS Live
                </span>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed font-medium max-w-lg">
                Find the latest government jobs, recruitment notifications, exam details, eligibility, syllabus, vacancies and free mock tests.
              </p>

              {/* Filter Chips Bar */}
              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                {filterPills.map((pill, idx) => {
                  const Icon = pill.icon;
                  const isActive = activeCategoryFilter === pill.label || (activeCategoryFilter === 'All' && pill.label === 'Latest Jobs');
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCategoryFilter(pill.label === 'Latest Jobs' || pill.label === 'All Categories' ? 'All' : pill.label)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-white/90 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {pill.badge ? (
                        <span className={`text-[9px] font-black px-1 py-0.1 rounded ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {pill.badge}
                        </span>
                      ) : Icon ? (
                        <Icon className={`w-3 h-3 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                      ) : null}
                      <span>{pill.label}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Quick Admin CMS Portal Link */}
            <div className="shrink-0 pt-1">
              <Link
                to="/admin/login"
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 border border-slate-700 group shrink-0"
              >
                <Shield className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-left leading-tight">
                  <div className="text-[11px] text-white font-extrabold">Govt Jobs Admin Login</div>
                  <div className="text-[9px] text-emerald-400 font-medium">Manage Feeds & Notices</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Featured Quick Apply Banner Bar (8 Colored Blocks Below Tags) */}
          <div className="mt-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {quickApplyGridItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`${item.bgColor} p-2 sm:py-2.5 sm:px-2 text-white text-center flex items-center justify-center transition-all shadow-2xs hover:shadow-md cursor-pointer border border-white/10`}
                >
                  <span className="font-bold text-[11px] sm:text-xs leading-tight text-white drop-shadow-2xs">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-10">
        
        {/* 2. Browse By Category, Browse By State & Latest Jobs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Browse by Category Card Box */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Browse by Category</h2>
                <button 
                  onClick={() => setActiveCategoryFilter('All')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {categoryGrid.slice(0, 10).map((cat, idx) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCategoryFilter(cat.catKey)}
                      className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 hover:shadow-xs ${
                        activeCategoryFilter === cat.catKey
                          ? 'bg-blue-50/80 border-blue-400'
                          : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/80 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 truncate">{cat.name}</div>
                        <div className="text-[9px] text-slate-500 font-medium">{cat.count}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Browse by State Card Box */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900">Browse by State</h2>
                <button 
                  onClick={() => setSelectedState('All')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Reset Filter</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>



              <div className="grid grid-cols-2 gap-2">
                {stateList.slice(0, 8).map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedState(selectedState === st.name ? 'All' : st.name)}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedState === st.name
                        ? 'bg-blue-50 border-blue-400'
                        : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/80 hover:border-slate-200'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <div className="text-[11px] font-bold text-slate-800 truncate">{st.name}</div>
                      <div className="text-[9px] text-slate-500">{st.count}</div>
                    </div>
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Jobs Card Box (Third Column matching image) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h2 className="text-base font-bold text-slate-900">Latest Jobs</h2>
                </div>
                <button 
                  onClick={() => setActiveCategoryFilter('All')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <ul className="space-y-3">
                {latestJobsQuickList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0 group-hover:bg-blue-600 transition-colors" />
                    <Link
                      to={item.path}
                      className="text-xs font-medium text-slate-800 hover:text-blue-600 leading-snug transition-colors flex-1"
                    >
                      {item.title}
                      {item.isNew && (
                        <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-black bg-rose-500 text-white rounded-md inline-block leading-tight align-middle shadow-2xs">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* 3. Latest Government Jobs Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Latest Government Jobs</h2>
              <p className="text-xs text-slate-500 mt-0.5">Recently published government recruitment notifications</p>
            </div>
            <button 
              onClick={() => { setActiveCategoryFilter('All'); setSelectedState('All'); setSearchTerm(''); }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All Jobs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-500">Loading government jobs feed...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-700">No recruitment notices match your filter criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategoryFilter('All'); setSelectedState('All'); }}
                className="mt-2 text-xs font-bold text-blue-600 hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredJobs.map((job, idx) => {
                const isBookmarked = bookmarkedIds.includes(job.id);
                const isHot = idx % 3 === 2;
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between p-5 relative group"
                  >
                    <div>
                      {/* Top Badge & Organization Logo Row */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center p-1.5 shrink-0">
                            {job.logoUrl ? (
                              <img src={job.logoUrl} alt={job.organization} className="w-full h-full object-contain rounded-md" />
                            ) : (
                              <Building2 className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                          
                          {isHot ? (
                            <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-0.5">
                              <Flame className="w-3 h-3 text-amber-600 fill-amber-500" /> HOT
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                              NEW
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => toggleBookmark(job.id, e)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
                        </button>
                      </div>

                      {/* Job Title */}
                      <Link
                        to={`/government-jobs/${job.slug}`}
                        className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 block mb-1"
                      >
                        {job.title}
                      </Link>

                      <div className="text-[11px] font-semibold text-slate-500 mb-4">
                        {job.organization}
                      </div>

                      {/* Quick Specs Bar */}
                      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 grid grid-cols-3 gap-1 text-[10px] mb-4">
                        <div className="text-center border-r border-slate-200/60 pr-1">
                          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
                            <Users className="w-3 h-3 text-blue-600" />
                          </div>
                          <div className="font-extrabold text-slate-900 truncate">
                            {(job.vacancyDetails?.totalVacancy || 0).toLocaleString('en-IN')}
                          </div>
                          <div className="text-[9px] text-slate-400">Vacancies</div>
                        </div>

                        <div className="text-center border-r border-slate-200/60 px-1">
                          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
                            <GraduationCap className="w-3 h-3 text-purple-600" />
                          </div>
                          <div className="font-bold text-slate-800 truncate">
                            {job.eligibility?.educationalQualification?.split(' ')[0] || 'Graduate'}
                          </div>
                          <div className="text-[9px] text-slate-400">Qualification</div>
                        </div>

                        <div className="text-center pl-1">
                          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                          </div>
                          <div className="font-bold text-slate-800 truncate">
                            {job.state || 'All India'}
                          </div>
                          <div className="text-[9px] text-slate-400">Location</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Date & CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[10px]">
                        <span className="text-slate-400 block font-medium">Last Date:</span>
                        <span className="font-bold text-slate-700">
                          {job.importantDates?.applicationLastDate || 'See Schedule'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isHot ? (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-extrabold px-2 py-1 rounded-lg">
                            Closing Soon
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-1 rounded-lg">
                            Application Open
                          </span>
                        )}

                        <Link
                          to={`/government-jobs/${job.slug}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Sarkari Result Grid (6 Notice Boards) */}
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {noticeBoards.map((board, idx) => {
              const IconComp = board.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
                  <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-4 h-4 ${board.color}`} />
                      <h3 className="text-sm font-extrabold text-slate-900">{board.title}</h3>
                    </div>
                    <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <ul className="space-y-2.5">
                    {board.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-slate-700 hover:text-blue-600 flex items-start gap-2 cursor-pointer group">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 shrink-0 mt-1.5" />
                        <span className="leading-snug line-clamp-2 font-medium">
                          {item.text}
                          {item.isNew && (
                            <span className="ml-1.5 bg-rose-500 text-white font-black text-[9px] px-1.5 py-0.2 rounded-md uppercase tracking-wider inline-block">
                              New
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Official Government Recruitment Admin CMS Portal CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Glitread Government Recruitment CMS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Are you an authorized Government Recruitment Admin?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Log in to the Admin Portal to publish new recruitment notices, edit vacancy criteria, upload exam syllabi, manage admit card links, and maintain JSON feeds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/admin/login"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center gap-2"
            >
              <span>Login to Gov Jobs Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

