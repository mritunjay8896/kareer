import React, { useState } from 'react';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Check, 
  Building2, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Clock, 
  X 
} from 'lucide-react';

export interface FilterState {
  workModes: string[];
  experiences: string[];
  salaryRanges: string[];
  departments: string[];
  companyTypes: string[];
  postedWithin: string;
}

interface JobFilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({
    workModes: false,
    experiences: false,
    salaryRanges: false,
    departments: false,
    companyTypes: false,
    postedWithin: false
  });

  const toggleSection = (key: string) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleArrayFilter = (category: keyof FilterState, value: string) => {
    const currentList = filters[category] as string[];
    let updated: string[];
    if (currentList.includes(value)) {
      updated = currentList.filter(item => item !== value);
    } else {
      updated = [...currentList, value];
    }
    onChange({ ...filters, [category]: updated });
  };

  const setSingleFilter = (category: keyof FilterState, value: string) => {
    onChange({ ...filters, [category]: value });
  };

  const content = (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filter Jobs</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Work Mode */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('workModes')}
          className="w-full flex items-center justify-between font-semibold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <span>Work Mode</span>
          {collapsed.workModes ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {!collapsed.workModes && (
          <div className="space-y-2">
            {['Remote', 'Hybrid', 'In-Office', 'Full Time', 'Walk-in', 'Women Only'].map((mode) => {
              const active = filters.workModes.includes(mode);
              return (
                <label key={mode} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleArrayFilter('workModes', mode)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{mode}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <button
          onClick={() => toggleSection('experiences')}
          className="w-full flex items-center justify-between font-semibold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <span>Experience Level</span>
          {collapsed.experiences ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {!collapsed.experiences && (
          <div className="space-y-2">
            {['Freshers (0 Yrs)', '0-2 Yrs', '1-3 Yrs', '2-5 Yrs', '3-6 Yrs', '4-7 Yrs', '7+ Yrs'].map((exp) => {
              const active = filters.experiences.includes(exp);
              return (
                <label key={exp} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleArrayFilter('experiences', exp)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{exp}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Salary Range */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <button
          onClick={() => toggleSection('salaryRanges')}
          className="w-full flex items-center justify-between font-semibold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <span>Salary (LPA)</span>
          {collapsed.salaryRanges ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {!collapsed.salaryRanges && (
          <div className="space-y-2">
            {['0-6 LPA', '6-12 LPA', '12-20 LPA', '20-35 LPA', '35+ LPA'].map((sal) => {
              const active = filters.salaryRanges.includes(sal);
              return (
                <label key={sal} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleArrayFilter('salaryRanges', sal)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{sal}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Category / Department */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <button
          onClick={() => toggleSection('departments')}
          className="w-full flex items-center justify-between font-semibold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <span>Department</span>
          {collapsed.departments ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {!collapsed.departments && (
          <div className="space-y-2">
            {['IT', 'Data Science', 'Marketing', 'Finance', 'Engineering', 'BPO', 'Women'].map((dept) => {
              const active = filters.departments.includes(dept);
              return (
                <label key={dept} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleArrayFilter('departments', dept)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{dept}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Posted Within */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <button
          onClick={() => toggleSection('postedWithin')}
          className="w-full flex items-center justify-between font-semibold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <span>Posted Date</span>
          {collapsed.postedWithin ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {!collapsed.postedWithin && (
          <div className="space-y-2">
            {[
              { label: 'Anytime', value: 'all' },
              { label: 'Past 24 Hours', value: '24h' },
              { label: 'Past 3 Days', value: '3d' },
              { label: 'Past 7 Days', value: '7d' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none">
                <input
                  type="radio"
                  name="postedWithin"
                  checked={filters.postedWithin === option.value}
                  onChange={() => setSingleFilter('postedWithin', option.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
        {content}
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Filter Jobs</h3>
                <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={onCloseMobile}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-xs hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
