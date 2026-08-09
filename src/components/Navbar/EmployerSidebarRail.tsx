import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  Users, 
  Search, 
  Building2, 
  Settings 
} from 'lucide-react';

export const EmployerSidebarRail: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isPathActive = (path: string) => {
    if (path === '/employer/dashboard' && currentPath === '/employer/dashboard') return true;
    if (path !== '/employer/dashboard' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Post Vacancy', icon: PlusCircle, path: '/employer/jobs/new', primary: true },
    { label: 'Hiring Hub', icon: LayoutDashboard, path: '/employer/dashboard' },
    { label: 'Manage Jobs', icon: Briefcase, path: '/employer/jobs' },
    { label: 'Applicants', icon: Users, path: '/employer/applications' },
    { label: 'Discover Talent', icon: Search, path: '/employer/candidates' },
    { label: 'Company Profile', icon: Building2, path: '/employer/company' },
    { label: 'Settings', icon: Settings, path: '/employer/settings' },
  ];

  return (
    <aside className="fixed left-0 top-[64px] bottom-0 z-30 w-16 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col items-center justify-between py-3 shadow-md transition-all duration-300">
      <div className="w-full flex flex-col items-center gap-2 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isPathActive(item.path);

          if (item.primary) {
            return (
              <div key={item.label} className="relative group w-full flex justify-center mb-1">
                <Link
                  to={item.path}
                  className="w-11 h-11 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
                >
                  <IconComponent className="w-5 h-5 stroke-[2.5]" />
                </Link>
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-amber-300 text-xs font-black rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0 border border-slate-800">
                  Post New Job Vacancy
                </div>
              </div>
            );
          }

          return (
            <div key={item.label} className="relative group w-full flex justify-center">
              <Link
                to={item.path}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
    </aside>
  );
};
