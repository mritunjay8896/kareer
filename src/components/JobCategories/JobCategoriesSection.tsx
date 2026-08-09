import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Briefcase, Headphones, TrendingUp, Globe, ArrowUpRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
  icon: React.ElementType;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    iconColor: string;
    badge: string;
  };
}

export const MAIN_CATEGORIES: CategoryItem[] = [
  {
    id: 'it',
    name: 'IT / Software Jobs',
    count: '4.8k+ Openings',
    icon: Code2,
    colorScheme: {
      bg: 'bg-indigo-100 hover:bg-indigo-200/90',
      border: 'border-indigo-300 hover:border-indigo-400',
      text: 'text-indigo-950',
      iconBg: 'bg-indigo-600',
      iconColor: 'text-white',
      badge: 'bg-indigo-200/80 text-indigo-900'
    }
  },
  {
    id: 'non-it',
    name: 'Non IT Jobs',
    count: '3.1k+ Openings',
    icon: Briefcase,
    colorScheme: {
      bg: 'bg-slate-200/90 hover:bg-slate-300/80',
      border: 'border-slate-300 hover:border-slate-400',
      text: 'text-slate-900',
      iconBg: 'bg-slate-700',
      iconColor: 'text-white',
      badge: 'bg-slate-300/80 text-slate-900'
    }
  },
  {
    id: 'bpo',
    name: 'BPO / Call Center',
    count: '2.4k+ Openings',
    icon: Headphones,
    colorScheme: {
      bg: 'bg-blue-100 hover:bg-blue-200/90',
      border: 'border-blue-300 hover:border-blue-400',
      text: 'text-blue-950',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      badge: 'bg-blue-200/80 text-blue-900'
    }
  },
  {
    id: 'c2h-high-paying',
    name: 'C2H High Paying Jobs',
    count: '2.1k+ Openings',
    icon: TrendingUp,
    colorScheme: {
      bg: 'bg-amber-100 hover:bg-amber-200/90',
      border: 'border-amber-300 hover:border-amber-400',
      text: 'text-amber-950',
      iconBg: 'bg-amber-600',
      iconColor: 'text-white',
      badge: 'bg-amber-200/80 text-amber-950'
    }
  },
  {
    id: 'gulf-workforce',
    name: 'Gulf / Saudi Jobs',
    count: '3.5k+ Overseas Jobs',
    icon: Globe,
    colorScheme: {
      bg: 'bg-emerald-100 hover:bg-emerald-200/90',
      border: 'border-emerald-300 hover:border-emerald-400',
      text: 'text-emerald-950',
      iconBg: 'bg-emerald-600',
      iconColor: 'text-white',
      badge: 'bg-emerald-200/80 text-emerald-950'
    }
  }
];

export const JobCategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/jobs?search=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-6 bg-white border-y border-slate-100" id="job-categories-section">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-display">
              Top Hiring Sectors
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-display mt-0.5">
            Popular Job Categories
          </h2>
        </div>

        {/* 5 Category Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {MAIN_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group flex items-center justify-between gap-3 px-4 py-6 sm:py-7 min-h-[84px] rounded-xl border transition-all duration-150 shadow-2xs hover:shadow-sm cursor-pointer text-left w-full ${cat.colorScheme.bg} ${cat.colorScheme.border}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center shadow-2xs ${cat.colorScheme.iconBg} ${cat.colorScheme.iconColor}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs sm:text-sm font-bold tracking-tight truncate ${cat.colorScheme.text}`}>
                      {cat.name}
                    </p>
                    <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-0.5 ${cat.colorScheme.badge}`}>
                      {cat.count}
                    </span>
                  </div>
                </div>

                <div className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 text-slate-600">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
