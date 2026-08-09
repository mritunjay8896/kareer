import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Bookmark, 
  FileText, 
  LayoutDashboard, 
  LogOut, 
  Sparkles, 
  Building2,
  ChevronDown,
  ArrowRight,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MegaMenu } from './MegaMenu';

export const CandidateNavbar: React.FC = () => {
  const { currentUser, userRole, candidateProfile, authInitialized, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'jobs' | 'bpo' | 'c2h' | 'internships' | 'government' | 'gulf' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languagesList = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'kn', label: 'கன்னட (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems: { label: string; key: 'jobs' | 'bpo' | 'c2h' | 'internships' | 'government' | 'gulf'; path: string }[] = [
    { label: 'All Jobs', key: 'jobs', path: '/jobs' },
    { label: 'BPO Jobs', key: 'bpo', path: '/jobs?category=BPO' },
    { label: 'C2H Jobs', key: 'c2h', path: '/jobs?type=Contract' },
    { label: 'Internships', key: 'internships', path: '/internships' },
    { label: 'Govt Jobs', key: 'government', path: '/government-jobs' },
    { label: 'Gulf & Saudi', key: 'gulf', path: '/gulf-jobs' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMegaMenuClick = (label: string) => {
    setActiveMenu(null);
    navigate(`/jobs?filter=${encodeURIComponent(label)}`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 h-[64px] transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-2xs'
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* Left: Brand Logo & Desktop Mega Menu Navigation */}
        <div className="flex items-center gap-4 xl:gap-6 shrink-0 min-w-0">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/glitread-logo.svg"
              alt="glitread logo"
              className="w-8 h-8 group-hover:scale-105 transition-transform object-contain shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-base xl:text-lg tracking-tight text-slate-900 leading-none font-display">
                glitread<span className="text-blue-600 font-black">.com</span>
              </span>
              <span className="hidden xl:block text-[8px] text-slate-500 font-extrabold tracking-wider uppercase mt-0.5 whitespace-nowrap">
                Candidate Career Portal
              </span>
            </div>
          </Link>

          {/* Desktop Candidate Navigation Links with Mega Menu */}
          <nav 
            className="hidden lg:flex items-center gap-1 xl:gap-1.5" 
            onMouseLeave={() => setActiveMenu(null)}
          >
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative py-4"
                onMouseEnter={() => setActiveMenu(item.key)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive(item.path) || activeMenu === item.key
                      ? 'text-blue-700 bg-blue-50/90 font-extrabold shadow-2xs'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                      activeMenu === item.key ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMenu === item.key && (
                    <MegaMenu
                      type={item.key}
                      onItemClick={handleMegaMenuClick}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Additional Candidate Tools */}
            <Link
              to="/resume-builder"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive('/resume-builder')
                  ? 'text-blue-700 bg-blue-50/90 font-extrabold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              Resume Builder
            </Link>
          </nav>
        </div>



        {/* Right Header Actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="Select Portal Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="max-w-[70px] truncate">{selectedLang}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 mb-1">
                  Select Language / भाषा
                </div>
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.label.split(' ')[0]);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-blue-50 transition-colors flex items-center justify-between ${
                      selectedLang === lang.label.split(' ')[0] ? 'text-blue-700 bg-blue-50/60 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLang === lang.label.split(' ')[0] && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* "For Employers" CTA - Links to Employers portal */}
          <Link
            to="/employers"
            className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 transition-all flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer"
            title="Switch to Employer & Hiring Portal"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>For Employers</span>
          </Link>

          <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

          {/* Authenticated / Unauthenticated Controls */}
          {!authInitialized ? (
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-slate-200/70 animate-pulse rounded-xl" />
              <div className="w-24 h-8 bg-slate-200/70 animate-pulse rounded-xl" />
            </div>
          ) : currentUser && userRole === 'candidate' ? (
            <div className="flex items-center gap-1.5">
              <Link
                to="/candidate/saved-jobs"
                className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  isActive('/candidate/saved-jobs')
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                title="Saved Opportunities"
              >
                <Bookmark className="w-4 h-4" />
              </Link>

              <Link
                to="/candidate/applications"
                className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  isActive('/candidate/applications')
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                title="My Job Applications"
              >
                <FileText className="w-4 h-4" />
              </Link>

              <Link
                to="/candidate/dashboard"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/candidate/dashboard')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200/80'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Dashboard</span>
              </Link>

              <Link
                to="/candidate/profile"
                className="w-8 h-8 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs hover:bg-slate-800 transition-colors shadow-2xs"
                title="Profile Settings"
              >
                {candidateProfile?.fullName 
                  ? candidateProfile.fullName.substring(0, 2).toUpperCase() 
                  : (currentUser.substring(0, 2).toUpperCase())}
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Sign Out Candidate"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 rounded-xl transition-all cursor-pointer"
              >
                Candidate Log In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/employers"
            className="px-2.5 py-1 text-[11px] font-extrabold text-amber-950 bg-amber-100 rounded-lg border border-amber-200"
          >
            Employers
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden px-4 pt-3 pb-6 space-y-3"
          >
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, skills, companies..."
                className="w-full bg-slate-50 text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </form>

            <nav className="flex flex-col gap-1 pt-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive(item.path) ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
              <Link
                to="/resume-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Resume Builder
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {currentUser && userRole === 'candidate' ? (
                <>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{currentUser}</p>
                      <p className="text-[10px] text-slate-500">Candidate Account</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Log Out
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/candidate/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl text-center"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/candidate/applications"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl text-center"
                    >
                      My Applications
                    </Link>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-slate-100 font-bold text-xs text-slate-800 rounded-xl"
                  >
                    Candidate Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-blue-600 text-white font-bold text-xs rounded-xl"
                  >
                    Register Free
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
