import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  ArrowUpRight, 
  Sparkles,
  ChevronRight,
  Hash,
  Search,
  TrendingUp,
  Tag,
  Filter
} from 'lucide-react';
import { SEO_CATEGORIES } from '../../data/mockData';

interface SEOHubProps {
  onSeoLinkClick: (url: string, label: string) => void;
}

interface TagItem {
  name: string;
  category: 'Tech & AI' | 'Gov & Exams' | 'Remote & Location' | 'Internships' | 'Roles';
  searches: string;
  isHot?: boolean;
}

const SEO_TAG_CLOUD: TagItem[] = [
  { name: 'Freshers Jobs 2026', category: 'Roles', searches: '24.5k', isHot: true },
  { name: 'Saudi Arabia NEOM Vision 2030', category: 'Remote & Location', searches: '34.2k', isHot: true },
  { name: 'Dubai Tax-Free Software Jobs', category: 'Remote & Location', searches: '28.9k', isHot: true },
  { name: 'Remote Frontend React Developer', category: 'Tech & AI', searches: '18.2k', isHot: true },
  { name: 'Full Stack MERN Developer', category: 'Tech & AI', searches: '15.9k', isHot: true },
  { name: 'TCS NQT Preparation 2026', category: 'Tech & AI', searches: '31.1k', isHot: true },
  { name: 'SSC CGL 2026 Official Syllabus', category: 'Gov & Exams', searches: '42.8k', isHot: true },
  { name: 'UPSC CSE Prelims Study Plan', category: 'Gov & Exams', searches: '38.4k' },
  { name: 'AI & Data Science Internships', category: 'Internships', searches: '21.0k', isHot: true },
  { name: 'Bangalore Tech Walk-ins Today', category: 'Remote & Location', searches: '19.7k' },
  { name: 'Pune Java Backend Openings', category: 'Remote & Location', searches: '12.4k' },
  { name: 'Hyderabad Cyber Security Analyst', category: 'Remote & Location', searches: '11.2k' },
  { name: 'Remote High-Stipend Summer Internships', category: 'Internships', searches: '16.8k' },
  { name: 'BPO to Software Engineer Transition', category: 'Roles', searches: '24.3k', isHot: true },
  { name: 'BPO ₹15,000 to ₹80,000 Career Roadmap', category: 'Roles', searches: '29.1k', isHot: true },
  { name: 'Product Management Associate 2026', category: 'Roles', searches: '13.5k' },
  { name: 'SBI PO Govt Bank Notification', category: 'Gov & Exams', searches: '29.6k' },
  { name: 'GenAI & Prompt Engineering Roles', category: 'Tech & AI', searches: '27.3k', isHot: true },
  { name: 'DevOps & Kubernetes Engineer', category: 'Tech & AI', searches: '17.9k' },
  { name: 'Gurgaon Fintech Product Designer', category: 'Remote & Location', searches: '10.8k' },
  { name: 'Railway RRB NTPC Admit Card', category: 'Gov & Exams', searches: '26.4k' },
  { name: 'Paid UI/UX Design Internships', category: 'Internships', searches: '14.1k' },
  { name: 'Non-Tech to Tech Career Switch', category: 'Roles', searches: '22.0k', isHot: true },
  { name: 'Qatar Oil & Gas Engineer Openings', category: 'Remote & Location', searches: '25.1k', isHot: true },
  { name: 'Work From Home Data Analyst', category: 'Tech & AI', searches: '33.8k', isHot: true },
  { name: 'Python Django Fullstack Entry-Level', category: 'Tech & AI', searches: '14.7k' },
  { name: 'IBPS Clerk 2026 Mock Paper', category: 'Gov & Exams', searches: '21.5k' },
  { name: 'Riyadh Construction Project Manager', category: 'Remote & Location', searches: '19.2k' },
  { name: 'AWS Cloud Solutions Architect', category: 'Tech & AI', searches: '20.6k', isHot: true },
  { name: 'Machine Learning Research Intern', category: 'Internships', searches: '13.9k' },
  { name: 'QA Automation Engineer Cypress/Selenium', category: 'Tech & AI', searches: '18.8k', isHot: true },
  { name: 'LIC AAO Insurance Exam Date', category: 'Gov & Exams', searches: '18.4k' },
  { name: 'Kolkata Digital Marketing Executive', category: 'Roles', searches: '9.6k' },
  { name: 'Mumbai Investment Banking Analyst', category: 'Roles', searches: '16.1k' },
  { name: 'Node.js Microservices Backend Lead', category: 'Tech & AI', searches: '15.2k' },
  { name: 'Winter Internship 2026 for Engineering', category: 'Internships', searches: '17.4k' },
  { name: 'Kuwait Healthcare & Nursing Staff', category: 'Remote & Location', searches: '14.8k' },
  { name: 'Noida HR Talent Acquisition Specialist', category: 'Roles', searches: '10.3k' },
  { name: 'GATE Computer Science Prep Material', category: 'Gov & Exams', searches: '30.2k', isHot: true },
  { name: 'Flutter & React Native Mobile Dev', category: 'Tech & AI', searches: '16.5k' },
  { name: 'Abu Dhabi Renewable Energy Engineer', category: 'Remote & Location', searches: '11.9k' },
  { name: 'Google & Microsoft Off-Campus Hiring', category: 'Tech & AI', searches: '36.5k', isHot: true },
  { name: 'Cognizant & Infosys Off-Campus Drive', category: 'Tech & AI', searches: '28.4k', isHot: true },
  { name: 'ISRO Scientist & Engineer Recruitment', category: 'Gov & Exams', searches: '25.7k', isHot: true },
  { name: 'Oman Civil & Structural Engineers', category: 'Remote & Location', searches: '13.2k' },
  { name: 'Cybersecurity Ethical Hacker Trainee', category: 'Tech & AI', searches: '19.4k' },
  { name: 'Business Analyst High Paying Remote', category: 'Roles', searches: '23.1k', isHot: true },
  { name: 'Data Engineer Snowflake & PySpark', category: 'Tech & AI', searches: '18.6k' },
  { name: 'IIT & IIM Research Assistantships', category: 'Internships', searches: '15.8k' },
  { name: 'Govt Teaching CTET Exam Guidelines', category: 'Gov & Exams', searches: '22.3k' },
  { name: 'Singapore Tech Visa Sponsorship', category: 'Remote & Location', searches: '27.8k', isHot: true },
  { name: 'Germany Opportunity Card Skilled Visa', category: 'Remote & Location', searches: '31.5k', isHot: true },
  { name: 'Part-Time Content Writer & SEO', category: 'Roles', searches: '17.2k' },
  { name: 'Cloud Security Compliance Specialist', category: 'Tech & AI', searches: '12.9k' },
  { name: 'VLSI & Embedded Systems Design Engineer', category: 'Tech & AI', searches: '14.1k' },
  { name: 'Remote AI Trainer & Data Annotator', category: 'Tech & AI', searches: '26.9k', isHot: true },
  { name: 'Fintech Backend Go Developer', category: 'Tech & AI', searches: '16.3k' },
  { name: 'Mechanical to Software Testing Switch', category: 'Roles', searches: '15.6k' },
  { name: 'Healthcare Data Analyst Remote', category: 'Roles', searches: '13.8k' },
  { name: 'Bahrain Supply Chain Manager', category: 'Remote & Location', searches: '10.5k' }
];

export const SEOHubSection: React.FC<SEOHubProps> = ({ onSeoLinkClick }) => {
  const [selectedTagCategory, setSelectedTagCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (title: string) => {
    if (title.includes('Location')) return <MapPin className="w-4 h-4 text-blue-600" />;
    if (title.includes('Category')) return <Briefcase className="w-4 h-4 text-indigo-600" />;
    if (title.includes('Government')) return <Building2 className="w-4 h-4 text-emerald-600" />;
    return <GraduationCap className="w-4 h-4 text-amber-600" />;
  };

  const categories = ['All', 'Hot Searches', 'Tech & AI', 'Gov & Exams', 'Remote & Location', 'Internships', 'Roles'];

  const filteredTags = SEO_TAG_CLOUD.filter((tag) => {
    const matchesCategory = 
      selectedTagCategory === 'All' ? true :
      selectedTagCategory === 'Hot Searches' ? tag.isHot :
      tag.category === selectedTagCategory;
      
    const matchesSearch = 
      searchQuery.trim() === '' || 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-white border-b border-slate-200/80" id="seo-hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest font-display mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Quick Directory
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Popular Career Directories & Locations
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Browse top hiring locations, specialized roles, government notifications, and skill-based tags across India.
            </p>
          </div>
        </div>

        {/* Beautiful SEO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEO_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 border-b border-slate-200 pb-3 mb-4 font-display">
                  {getCategoryIcon(cat.title)}
                  <span>{cat.title}</span>
                </div>

                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => onSeoLinkClick(item.url, item.label)}
                        className="w-full text-left text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-white px-2.5 py-1.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-1">{item.label}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Interactive SEO Tag Cloud Container */}
        <div className="mt-12 bg-slate-50/90 rounded-3xl p-5 sm:p-6 text-slate-900 border border-slate-200/90 shadow-sm relative overflow-hidden">
          {/* Subtle soft ambient lights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Tag Cloud Items - Fixed 50px height total, light background, scrollable tags */}
            <div className="h-[50px] overflow-y-auto p-2 bg-white/90 rounded-2xl border border-slate-200/90 flex flex-wrap content-start items-center gap-1.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredTags.map((tag) => (
                  <motion.button
                    key={tag.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => onSeoLinkClick(`/search?q=${encodeURIComponent(tag.name)}`, tag.name)}
                    className={`group relative px-2 py-0.5 rounded-md border text-[10px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                      tag.isHot
                        ? 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Hash className={`w-2.5 h-2.5 ${tag.isHot ? 'text-amber-500' : 'text-slate-400'}`} />
                      <span>{tag.name}</span>
                    </span>

                    <span className="text-[8.5px] px-1 py-0.2 rounded font-mono bg-slate-200/80 text-slate-700 border border-slate-300/60 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                      {tag.searches}
                    </span>

                    {tag.isHot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping absolute -top-0.5 -right-0.5" />
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>

              {filteredTags.length === 0 && (
                <div className="w-full text-center py-2 text-slate-400 text-xs">
                  No keywords found matching "{searchQuery}". Try a different keyword.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

