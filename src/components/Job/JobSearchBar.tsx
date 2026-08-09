import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Globe, X, Sparkles } from 'lucide-react';

interface JobSearchBarProps {
  query: string;
  location: string;
  experience: string;
  language?: string;
  onSearchChange: (query: string, location: string, experience: string, language?: string) => void;
  onSearchSubmit: () => void;
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({
  query,
  location,
  experience,
  language = '',
  onSearchChange,
  onSearchSubmit
}) => {
  const [selectedLang, setSelectedLang] = useState(language);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    'React Developer',
    'Full Stack Engineer',
    'Data Analyst',
    'Remote Jobs',
    'Fresher Hiring',
    'FinTech'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xl shadow-slate-200/40 max-w-5xl mx-auto relative">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2">
        {/* Keyword Search */}
        <div className="relative flex-1 w-full flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/60 md:border-none focus-within:ring-2 md:focus-within:ring-0 focus-within:ring-blue-500">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => onSearchChange(e.target.value, location, experience)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search Job Title, Skills, or Company (e.g., React, Razorpay)"
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onSearchChange('', location, experience)}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="hidden md:block h-7 w-[1px] bg-slate-200"></div>

        {/* Location Input */}
        <div className="relative w-full md:w-56 flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/60 md:border-none">
          <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => onSearchChange(query, e.target.value, experience)}
            placeholder="Location / Remote"
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="hidden md:block h-7 w-[1px] bg-slate-200"></div>

        {/* Experience Select */}
        <div className="relative w-full md:w-40 flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/60 md:border-none">
          <Briefcase className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <select
            value={experience}
            onChange={(e) => onSearchChange(query, location, e.target.value, selectedLang)}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="">Any Experience</option>
            <option value="Freshers (0 Yrs)">Freshers (0 Yrs)</option>
            <option value="1-3 Yrs">1-3 Years</option>
            <option value="3-5 Yrs">3-5 Years</option>
            <option value="5+ Yrs">5+ Years</option>
          </select>
        </div>

        <div className="hidden md:block h-7 w-[1px] bg-slate-200"></div>

        {/* Language Select */}
        <div className="relative w-full md:w-36 flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/60 md:border-none">
          <Globe className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <select
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              onSearchChange(query, location, experience, e.target.value);
            }}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="">Any Language</option>
            <option value="English">English</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Gujarati">ગુજરાતી (Gujarati)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
            <option value="Malayalam">മലയാളം (Malayalam)</option>
            <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
        </div>

        {/* Search CTA */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search Jobs</span>
        </button>
      </form>

      {/* Auto Suggestions Popover */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-40 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Searches
            </span>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-slate-400 hover:text-slate-600 text-[11px]"
            >
              Close
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {popularSearches.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSearchChange(pill, location, experience);
                  onSearchSubmit();
                  setShowSuggestions(false);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-medium rounded-lg transition-colors border border-slate-200/60"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
