import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileQuestion, 
  Home, 
  Search, 
  ArrowLeft, 
  Briefcase, 
  Building2, 
  Sparkles,
  Compass,
  FileText
} from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularLinks = [
    { label: 'Explore All Jobs', path: '/jobs' },
    { label: 'BPO & Customer Care', path: '/jobs?category=BPO' },
    { label: 'Internships', path: '/internships' },
    { label: 'Government Notices', path: '/government-jobs' },
    { label: 'Gulf & Saudi Jobs', path: '/gulf-jobs' },
    { label: 'AI Resume Builder', path: '/resume-builder' },
  ];

  return (
    <div className="min-h-[80vh] bg-slate-50/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* 404 Graphic Badge */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-lg shadow-blue-500/10">
            <FileQuestion className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.75]" />
          </div>
          <span className="absolute -top-2 -right-2 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-md uppercase tracking-wider">
            404
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Oops! Page Not Found
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The career opportunity, candidate page, or route you are looking for might have been moved, removed, or is temporarily unavailable.
          </p>
        </div>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, skills, companies..."
              className="w-full pl-11 pr-24 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 shadow-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/jobs"
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Browse Jobs</span>
          </Link>

          <Link
            to="/employers"
            className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/80 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Employer Hub</span>
          </Link>
        </div>

        {/* Popular Category Shortcuts */}
        <div className="pt-6 border-t border-slate-200/80">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Or explore popular destinations</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {popularLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="px-3 py-1.5 bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 rounded-xl text-xs font-semibold transition-all shadow-2xs"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
