import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, ArrowRight } from 'lucide-react';

interface CardSidePatternProps {
  patternKey: string;
  primary: string;
  secondary: string;
}

const CardSidePattern: React.FC<CardSidePatternProps> = ({ patternKey, primary, secondary }) => {
  switch (patternKey) {
    case 'internship':
      return (
        <svg
          className="absolute right-0 top-0 bottom-0 w-36 sm:w-44 h-full pointer-events-none opacity-45 select-none overflow-hidden"
          viewBox="0 0 160 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Smooth Vertical Flowing Ribbon Waves */}
          <path d="M 160 0 C 70 50, 40 130, 160 190" stroke={primary} strokeWidth="3" opacity="0.6" fill="none" />
          <path d="M 160 15 C 80 60, 50 140, 160 202" stroke={primary} strokeWidth="2.5" opacity="0.5" fill="none" />
          <path d="M 160 30 C 90 70, 60 150, 160 214" stroke={secondary} strokeWidth="2" opacity="0.45" fill="none" />
          <path d="M 160 45 C 100 80, 70 160, 160 226" stroke={secondary} strokeWidth="1.5" opacity="0.35" fill="none" />
          <path d="M 160 60 C 110 90, 80 170, 160 238" stroke={primary} strokeWidth="1" opacity="0.25" fill="none" />
        </svg>
      );

    case 'jobs':
      return (
        <svg
          className="absolute right-0 top-0 bottom-0 w-36 sm:w-44 h-full pointer-events-none opacity-40 select-none overflow-hidden"
          viewBox="0 0 160 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Tech Rings & Arcs in Top-Right */}
          <circle cx="150" cy="50" r="110" stroke={primary} strokeWidth="2.5" opacity="0.4" />
          <circle cx="150" cy="50" r="85" stroke={primary} strokeWidth="2" opacity="0.5" />
          <circle cx="150" cy="50" r="60" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
          <circle cx="150" cy="50" r="35" stroke={secondary} strokeWidth="1" opacity="0.7" />
          <path d="M 40 190 L 150 80" stroke={primary} strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="40" cy="190" r="4" fill={primary} opacity="0.6" />
        </svg>
      );

    case 'masterclass':
      return (
        <svg
          className="absolute right-0 top-0 bottom-0 w-36 sm:w-44 h-full pointer-events-none opacity-45 select-none overflow-hidden"
          viewBox="0 0 160 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Constellation AI Sparkle Mesh */}
          <path d="M 50 35 L 100 85 L 150 45 L 120 130 L 155 195 L 75 175 Z" stroke={primary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="35" r="4" fill={secondary} opacity="0.8" />
          <circle cx="100" cy="85" r="5" fill={primary} opacity="0.9" />
          <circle cx="150" cy="45" r="3" fill={secondary} opacity="0.7" />
          <circle cx="120" cy="130" r="6" fill={primary} opacity="0.8" />
          <circle cx="155" cy="195" r="4" fill={secondary} opacity="0.8" />
          <circle cx="75" cy="175" r="3" fill={primary} opacity="0.7" />
          {/* Sparkle star */}
          <path d="M 100 85 Q 100 65, 120 65 Q 100 65, 100 45 Q 100 65, 80 65 Q 100 65, 100 85 Z" fill={secondary} opacity="0.6" />
        </svg>
      );

    case 'resume':
      return (
        <svg
          className="absolute right-0 top-0 bottom-0 w-36 sm:w-44 h-full pointer-events-none opacity-40 select-none overflow-hidden"
          viewBox="0 0 160 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stacked Geometric Slanting Bars */}
          <rect x="75" y="25" width="75" height="10" rx="5" fill={primary} opacity="0.3" />
          <rect x="55" y="55" width="95" height="10" rx="5" fill={primary} opacity="0.4" />
          <rect x="35" y="85" width="115" height="10" rx="5" fill={secondary} opacity="0.5" />
          <rect x="65" y="115" width="85" height="10" rx="5" fill={primary} opacity="0.4" />
          <rect x="45" y="145" width="105" height="10" rx="5" fill={secondary} opacity="0.3" />
          <path d="M 25 205 L 155 65" stroke={primary} strokeWidth="2.5" opacity="0.5" strokeDasharray="6 4" />
        </svg>
      );

    case 'govt':
      return (
        <svg
          className="absolute right-0 top-0 bottom-0 w-36 sm:w-44 h-full pointer-events-none opacity-40 select-none overflow-hidden"
          viewBox="0 0 160 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Official Layered Crest Shield Curves */}
          <path d="M 160 20 C 100 20, 55 70, 55 140 C 55 190, 105 220, 160 230" stroke={primary} strokeWidth="2.5" opacity="0.5" fill="none" />
          <path d="M 160 40 C 115 40, 75 85, 75 140 C 75 180, 115 205, 160 215" stroke={secondary} strokeWidth="2" opacity="0.4" fill="none" />
          <path d="M 160 60 C 130 60, 95 100, 95 140 C 95 170, 125 190, 160 200" stroke={primary} strokeWidth="1.5" opacity="0.3" fill="none" />
        </svg>
      );

    default:
      return null;
  }
};

export const CompanyMarquee: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const campaignBanners = [
    {
      patternKey: 'internship',
      type: 'Internships',
      badgeStyle: 'bg-purple-100 text-purple-800 border border-purple-200/90 font-bold',
      title: 'GET THE PPO ADVANTAGE',
      description: 'Apply for an internship and turn it into a full time job!',
      bullets: ['Up to ₹45,000 / mo Stipend', '10,000+ PPO Opportunities'],
      cta: 'Participate now',
      buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs font-semibold',
      cardBg: 'bg-gradient-to-br from-purple-50/90 via-indigo-50/70 to-purple-100/60',
      borderColor: 'border-purple-200/90 hover:border-purple-300',
      titleColor: 'text-purple-950',
      descColor: 'text-purple-900/80',
      bulletColor: 'text-purple-950 font-medium',
      bulletIconColor: 'text-purple-600',
      wavePrimary: '#A855F7',
      waveSecondary: '#6366F1'
    },
    {
      patternKey: 'jobs',
      type: 'Jobs',
      badgeStyle: 'bg-blue-100 text-blue-800 border border-blue-200/90 font-bold',
      title: 'BIG BRANDS FRESHER JOBS',
      description: 'Top MNCs & high-growth unicorns hiring fresh graduates',
      bullets: ['Earn up to ₹18 LPA', '10,000+ Openings'],
      cta: 'Apply now',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs font-semibold',
      cardBg: 'bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-cyan-100/60',
      borderColor: 'border-blue-200/90 hover:border-blue-300',
      titleColor: 'text-blue-950',
      descColor: 'text-blue-900/80',
      bulletColor: 'text-blue-950 font-medium',
      bulletIconColor: 'text-blue-600',
      wavePrimary: '#3B82F6',
      waveSecondary: '#06B6D4'
    },
    {
      patternKey: 'masterclass',
      type: 'Masterclass',
      badgeStyle: 'bg-amber-100 text-amber-900 border border-amber-200/90 font-bold',
      title: 'AI IN BUSINESS FUNCTIONS',
      description: 'How AI is quietly changing every business domain',
      bullets: ['Live on 7th Aug @ 5 PM', 'Free Attendance Certificate'],
      cta: 'Register now',
      buttonStyle: 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs font-bold',
      cardBg: 'bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-amber-100/60',
      borderColor: 'border-amber-200/90 hover:border-amber-300',
      titleColor: 'text-amber-950',
      descColor: 'text-amber-900/80',
      bulletColor: 'text-amber-950 font-medium',
      bulletIconColor: 'text-amber-600',
      wavePrimary: '#F59E0B',
      waveSecondary: '#F97316'
    },
    {
      patternKey: 'resume',
      type: 'AI Resume',
      badgeStyle: 'bg-emerald-100 text-emerald-800 border border-emerald-200/90 font-bold',
      title: 'BUILD ATS-READY RESUME',
      description: 'Get past automated filters with AI keywords & score analysis',
      bullets: ['90%+ ATS Pass Rate', 'Export PDF in 2 Mins'],
      cta: 'Create for free',
      buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs font-semibold',
      cardBg: 'bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-green-100/60',
      borderColor: 'border-emerald-200/90 hover:border-emerald-300',
      titleColor: 'text-emerald-950',
      descColor: 'text-emerald-900/80',
      bulletColor: 'text-emerald-950 font-medium',
      bulletIconColor: 'text-emerald-600',
      wavePrimary: '#10B981',
      waveSecondary: '#14B8A6'
    },
    {
      patternKey: 'govt',
      type: 'Govt Jobs',
      badgeStyle: 'bg-rose-100 text-rose-800 border border-rose-200/90 font-bold',
      title: 'LATEST GOVT NOTIFICATIONS',
      description: 'SSC, Banking, Railway & State PSC official hiring updates',
      bullets: ['100% Official Links', 'Daily Exam Alerts'],
      cta: 'Explore notices',
      buttonStyle: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs font-semibold',
      cardBg: 'bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-rose-100/60',
      borderColor: 'border-rose-200/90 hover:border-rose-300',
      titleColor: 'text-rose-950',
      descColor: 'text-rose-900/80',
      bulletColor: 'text-rose-950 font-medium',
      bulletIconColor: 'text-rose-600',
      wavePrimary: '#F43F5E',
      waveSecondary: '#EC4899'
    }
  ];

  const trendingTags = [
    'Remote Engineering',
    'Full Stack Developer',
    'Data Science & AI',
    'UI/UX Design',
    'Product Management',
    'Govt Banking Exams',
    'Marketing Internships'
  ];

  return (
    <div className="w-full bg-slate-50/70 border-y border-slate-200/80 py-8 relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto space-y-6">
        
        {/* Section Header: "Trending now" with Trend Icon */}
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Trending now
          </h2>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Scrollable Horizontal Banner Container */}
        <div className="relative group/carousel">
          {/* Overlay Left Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200/90 items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous campaigns"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pt-1 no-scrollbar scrollbar-none px-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {campaignBanners.map((banner, idx) => (
              <div
                key={idx}
                className={`snap-start shrink-0 w-[310px] sm:w-[350px] lg:w-[calc((100%-2.5rem)/3)] min-h-[220px] sm:min-h-[235px] ${banner.cardBg} ${banner.borderColor} border rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-md flex flex-col justify-between relative overflow-hidden group/card transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Distinct Side Pattern Graphic */}
                <CardSidePattern patternKey={banner.patternKey} primary={banner.wavePrimary} secondary={banner.waveSecondary} />

                {/* Card Content Layer */}
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    {/* Badge Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md ${banner.badgeStyle}`}>
                        {banner.type}
                      </span>
                    </div>

                    {/* Banner Headline */}
                    <h3 className={`text-lg sm:text-xl font-black tracking-tight ${banner.titleColor} mb-2 leading-snug font-display transition-colors`}>
                      {banner.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs ${banner.descColor} leading-relaxed font-normal mb-3`}>
                      {banner.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button className={`px-5 py-2.5 rounded-xl text-xs tracking-wide flex items-center gap-2 transition-all active:scale-95 ${banner.buttonStyle}`}>
                      <span>{banner.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overlay Right Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200/90 items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next campaigns"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trending Quick Pill Searches */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="font-bold text-slate-500 mr-1 text-xs tracking-wide uppercase font-display">
            Trending Searches:
          </span>
          {trendingTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium rounded-full border border-slate-200/90 shadow-2xs cursor-pointer transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};





