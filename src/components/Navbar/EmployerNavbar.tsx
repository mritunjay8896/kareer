import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlusCircle, 
  LogOut, 
  Menu, 
  X, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployerNavbar: React.FC = () => {
  const { currentUser, userRole, employerProfile, companyProfile, authInitialized, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    if (path === '/employer/dashboard' && currentPath === '/employer/dashboard') return true;
    if (path !== '/employer/dashboard' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Overview', path: '/employer/dashboard' },
    { label: 'Manage Jobs', path: '/employer/jobs' },
    { label: 'Applicants', path: '/employer/applications' },
    { label: 'Discover Candidates', path: '/employer/candidates' },
    { label: 'Company Profile', path: '/employer/company' },
    { label: 'Settings', path: '/employer/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/employers/login');
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
        
        {/* Brand & Recruiter Hub Title */}
        <div className="flex items-center gap-4 xl:gap-6 shrink-0 min-w-0">
          <Link to="/employer/dashboard" className="flex items-center gap-2 group shrink-0">
            <img
              src="/glitread-logo.svg"
              alt="glitread logo"
              className="w-8 h-8 group-hover:scale-105 transition-transform object-contain shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-base xl:text-lg tracking-tight text-slate-900 leading-none font-display flex items-center gap-1.5">
                glitread<span className="text-amber-500 font-black">.com</span>
                <span className="px-1.5 py-0.5 bg-amber-50 text-amber-900 text-[9px] font-extrabold uppercase tracking-wider rounded border border-amber-200/80">
                  Employers
                </span>
              </span>
              <span className="hidden xl:block text-[8px] text-slate-500 font-extrabold tracking-wider uppercase mt-0.5 whitespace-nowrap">
                {companyProfile?.name ? `${companyProfile.name} • Hiring Hub` : 'Enterprise Hiring & Recruiter Portal'}
              </span>
            </div>
          </Link>

          {/* Desktop Employer Links */}
          {currentUser && userRole === 'employer' && (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-amber-950 bg-amber-50/90 font-extrabold shadow-2xs border border-amber-200/80'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right Header Actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          
          {/* Candidate Portal Switcher CTA */}
          <Link
            to="/"
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border border-slate-200/80"
            title="Switch to Candidate Portal"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Candidate Portal</span>
          </Link>

          <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

          {/* Authenticated / Unauthenticated Controls */}
          {!authInitialized ? (
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-slate-200/70 animate-pulse rounded-xl" />
              <div className="w-24 h-8 bg-slate-200/70 animate-pulse rounded-xl" />
            </div>
          ) : currentUser && userRole === 'employer' ? (
            <>
              {/* Post Job Button */}
              <Link
                to="/employer/jobs/new"
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Post New Job</span>
              </Link>

              <div className="flex items-center gap-2 pl-1">
                <div className="text-right hidden xl:block">
                  <span className="block text-xs font-extrabold text-slate-900 leading-tight">
                    {employerProfile?.name || currentUser}
                  </span>
                  <span className="block text-[10px] text-amber-700 font-semibold truncate max-w-[110px]">
                    {companyProfile?.name || 'Recruiter Team'}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out Employer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/employers/login"
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-700 hover:bg-slate-100/80 rounded-xl transition-all"
              >
                Employer Login
              </Link>
              <Link
                to="/employers/register"
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 active:scale-95 whitespace-nowrap"
              >
                <span>Post Job Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser && userRole === 'employer' && (
            <Link
              to="/employer/jobs/new"
              className="px-2.5 py-1 bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg"
            >
              + Post Job
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Employer Menu"
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
            {currentUser && userRole === 'employer' ? (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{employerProfile?.name || currentUser}</p>
                    <p className="text-[10px] text-amber-700 font-semibold">{companyProfile?.name || 'Recruiter Account'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Log Out
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-xl text-sm font-bold ${
                        isActive(link.path) ? 'bg-amber-50 text-amber-950 border border-amber-200' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link
                    to="/employer/jobs/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl"
                  >
                    + Post New Job
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
                  >
                    Candidate Portal
                  </Link>
                </div>
              </>
            ) : (
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/employers/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
                  >
                    Employer Login
                  </Link>
                  <Link
                    to="/employers/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl"
                  >
                    Post Job Free
                  </Link>
                </div>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200"
                >
                  ← Return to Candidate Portal
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
