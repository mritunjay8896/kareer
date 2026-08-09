import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Headphones, 
  Handshake, 
  GraduationCap, 
  Landmark, 
  Globe, 
  Bookmark, 
  FileText, 
  LayoutDashboard, 
  User, 
  PlusCircle, 
  UserCheck,
  Building2,
  Sparkles,
  Search,
  ShieldCheck
} from 'lucide-react';

interface LeftSidebarRailProps {
  currentUser?: string | null;
  userRole?: 'candidate' | 'employer' | null;
  onOpenEmployer: () => void;
  onSwitchRole: (role: 'candidate' | 'employer') => void;
  onNavClick: (topic: string) => void;
}

export const LeftSidebarRail: React.FC<LeftSidebarRailProps> = ({
  currentUser,
  userRole = 'candidate',
  onOpenEmployer,
  onSwitchRole,
  onNavClick
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const activeRole = userRole || 'candidate';

  const isPathActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const mainNavItems = [
    { label: 'Home', icon: Home, path: '/', action: () => {} },
    { label: 'All Jobs', icon: Briefcase, path: '/jobs', action: () => onNavClick('Jobs') },
    { label: 'BPO Opportunities', icon: Headphones, path: '/jobs', action: () => onNavClick('BPO Jobs') },
    { label: 'C2H Contracts', icon: Handshake, path: '/jobs', action: () => onNavClick('C2H Jobs') },
    { label: 'Internships', icon: GraduationCap, path: '/jobs', action: () => onNavClick('Internships') },
    { label: 'Govt Jobs', icon: Landmark, path: '/jobs', action: () => onNavClick('Government Jobs') },
    { label: 'Gulf & Saudi', icon: Globe, path: '/jobs', action: () => onNavClick('Gulf & Saudi Jobs') },
  ];

  return (
    <aside className="fixed left-0 top-[64px] bottom-0 z-30 w-16 bg-white/95 backdrop-blur-md border-r border-slate-200/80 hidden md:flex flex-col items-center justify-between py-3 shadow-xs transition-all duration-300">
      {/* Top Section: Quick Nav Icons */}
      <div className="w-full flex flex-col items-center gap-1.5 px-2">
        {/* Main Nav Items */}
        {mainNavItems.map((item) => {
          const IconComponent = item.icon;
          const active = item.path === '/' ? currentPath === '/' : (currentPath === item.path && item.label === 'All Jobs');

          return (
            <div key={item.label} className="relative group w-full flex justify-center">
              <Link
                to={item.path}
                onClick={item.action}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/80'
                }`}
              >
                <IconComponent className="w-5 h-5 shrink-0" />
              </Link>
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Role Specific Quick Links & Persona Toggle */}
      <div className="w-full flex flex-col items-center gap-1.5 px-2 pt-2 border-t border-slate-100">
        
        {/* Role-Based Links */}
        {activeRole === 'candidate' ? (
          <>
            <div className="relative group w-full flex justify-center">
              <Link
                to="/saved-jobs"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isPathActive('/saved-jobs')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
                }`}
              >
                <Bookmark className="w-5 h-5 shrink-0" />
              </Link>
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
                Saved Jobs
              </div>
            </div>

            <div className="relative group w-full flex justify-center">
              <Link
                to="/applied-jobs"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isPathActive('/applied-jobs')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
                }`}
              >
                <FileText className="w-5 h-5 shrink-0" />
              </Link>
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
                Applied Jobs Tracker
              </div>
            </div>
          </>
        ) : (
          <div className="relative group w-full flex justify-center">
            <Link
              to="/applied-jobs"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isPathActive('/applied-jobs')
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/80'
              }`}
            >
              <FileText className="w-5 h-5 shrink-0" />
            </Link>
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-amber-300 text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
              Applicants Management
            </div>
          </div>
        )}

        {/* Dashboard Link */}
        <div className="relative group w-full flex justify-center">
          <Link
            to="/dashboard"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isPathActive('/dashboard')
                ? activeRole === 'employer' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
          </Link>
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
            {activeRole === 'employer' ? 'Employer Hiring Hub' : 'Candidate Dashboard'}
          </div>
        </div>

        {/* Profile Link */}
        <div className="relative group w-full flex justify-center">
          <Link
            to="/profile"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isPathActive('/profile')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
            }`}
          >
            <User className="w-5 h-5 shrink-0" />
          </Link>
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
            {activeRole === 'employer' ? 'Recruiter Profile' : 'My Candidate Profile'}
          </div>
        </div>

        <div className="w-8 h-px bg-slate-200/80 my-1" />

        {/* Admin Portal CMS Shortcut */}
        <div className="relative group w-full flex justify-center">
          <Link
            to="/admin/login"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-100"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
          <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800 flex items-center gap-1.5">
            <span className="text-emerald-400">Govt Jobs Admin CMS</span>
            <span className="text-[10px] text-slate-300 ml-1">(Super Admin Login)</span>
          </div>
        </div>

        {/* Role Switcher Icon Button */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => onSwitchRole(activeRole === 'candidate' ? 'employer' : 'candidate')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
              activeRole === 'employer'
                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {activeRole === 'employer' ? <Building2 className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
          </button>
          <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400">Persona:</span>
            <span className={activeRole === 'employer' ? 'text-amber-400' : 'text-blue-400'}>
              {activeRole === 'employer' ? 'Recruiter' : 'Candidate'}
            </span>
            <span className="text-[10px] underline text-slate-300 ml-1">(Click to switch)</span>
          </div>
        </div>

      </div>
    </aside>
  );
};
