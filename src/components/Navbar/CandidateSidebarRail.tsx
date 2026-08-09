import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  Landmark, 
  Globe, 
  Bookmark, 
  FileText, 
  LayoutDashboard, 
  User, 
  FileCode, 
  FolderGit2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CandidateSidebarRail: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser, userRole } = useAuth();

  // Show rail on candidate experience
  const isPathActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'All Vacancies', icon: Briefcase, path: '/jobs' },
    { label: 'Internships', icon: GraduationCap, path: '/internships' },
    { label: 'Govt Notices', icon: Landmark, path: '/government-jobs' },
    { label: 'Gulf & Saudi', icon: Globe, path: '/gulf-jobs' },
    { label: 'Mock Tests', icon: FileCode, path: '/mock-tests' },
    { label: 'Resume Builder', icon: FileText, path: '/resume-builder' },
    { label: 'Portfolio', icon: FolderGit2, path: '/portfolio' },
  ];

  return (
    <aside className="fixed left-0 top-[64px] bottom-0 z-30 w-16 bg-white/95 backdrop-blur-md border-r border-slate-200/80 hidden md:flex flex-col items-center justify-between py-3 shadow-2xs transition-all duration-300">
      {/* Navigation Icons */}
      <div className="w-full flex flex-col items-center gap-1.5 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isPathActive(item.path);

          return (
            <div key={item.label} className="relative group w-full flex justify-center">
              <Link
                to={item.path}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
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

      {/* Authenticated Candidate Quick Actions */}
      {currentUser && userRole === 'candidate' && (
        <div className="w-full flex flex-col items-center gap-1.5 px-2 pt-2 border-t border-slate-100">
          <div className="relative group w-full flex justify-center">
            <Link
              to="/candidate/saved-jobs"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isPathActive('/candidate/saved-jobs')
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
              }`}
            >
              <Bookmark className="w-5 h-5 shrink-0" />
            </Link>
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
              Saved Vacancies
            </div>
          </div>

          <div className="relative group w-full flex justify-center">
            <Link
              to="/candidate/applications"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isPathActive('/candidate/applications')
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
              }`}
            >
              <FileText className="w-5 h-5 shrink-0" />
            </Link>
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
              My Applications
            </div>
          </div>

          <div className="relative group w-full flex justify-center">
            <Link
              to="/candidate/dashboard"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isPathActive('/candidate/dashboard')
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
            </Link>
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
              Candidate Dashboard
            </div>
          </div>

          <div className="relative group w-full flex justify-center">
            <Link
              to="/candidate/profile"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isPathActive('/candidate/profile')
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
              }`}
            >
              <User className="w-5 h-5 shrink-0" />
            </Link>
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
              Candidate Profile
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
