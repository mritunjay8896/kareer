import React from 'react';
import { COMPANY_LOGOS } from '../../data/mockData';

export const CompaniesMarquee: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
          Top Hiring Companies Active This Week
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Recruiters from 15,000+ companies post jobs & hire candidates directly through CareerPulse.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS].map((company, idx) => (
            <div
              key={`${company.name}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all hover:border-blue-300"
            >
              <span className="text-2xl">{company.symbol}</span>
              <span className={`font-extrabold text-sm ${company.color}`}>
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
