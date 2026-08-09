import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../../data/mockData';
import { InternshipItem } from '../../types';

interface InternshipSectionProps {
  onApplyInternship: (item: InternshipItem) => void;
}

export const InternshipSection: React.FC<InternshipSectionProps> = ({ onApplyInternship }) => {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (item: InternshipItem) => {
    if (!appliedIds.includes(item.id)) {
      setAppliedIds([...appliedIds, item.id]);
      onApplyInternship(item);
    }
  };

  return (
    <section className="py-20 bg-purple-50/40 border-y border-purple-100/80" id="internships-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-widest font-display mb-2">
              <GraduationCap className="w-4 h-4 text-purple-600" /> Start Your Career Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Featured Internships
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Gain real experience with high-paying stipends, mentorship, and guaranteed PPO opportunities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3.5 py-1.5 rounded-full border border-purple-200">
              ⚡ 5,000+ Active Openings
            </span>
          </div>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_INTERNSHIPS.map((item) => {
            const isApplied = appliedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-2xs hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Company Info & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${item.logoBg || 'bg-purple-600 text-white'}`}>
                        {item.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 group-hover:text-purple-700 transition-colors">
                          {item.company}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" /> {item.location} ({item.mode})
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-100">
                      {item.openings} Openings
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Stipend & Duration */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs">
                    <div>
                      <span className="text-[10px] text-purple-600 uppercase font-bold">Monthly Stipend</span>
                      <p className="font-extrabold text-slate-900 mt-0.5">{item.stipend}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-purple-600 uppercase font-bold">Duration</span>
                      <p className="font-extrabold text-slate-900 mt-0.5">{item.duration}</p>
                    </div>
                  </div>

                  {/* Perks Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.perks.map((perk) => (
                      <span key={perk} className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Apply by {item.applyBy}
                  </span>

                  <button
                    onClick={() => handleApply(item)}
                    disabled={isApplied}
                    className={`py-2 px-4 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-purple-700 hover:bg-purple-800 text-white active:scale-95'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}

          {/* ALWAYS THE LAST CARD: "Explore 5,000+ Internships →" */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between border border-purple-800 min-h-[300px] cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/30 text-purple-300 flex items-center justify-center font-bold text-xl mb-4 border border-purple-400/30">
                <GraduationCap className="w-6 h-6 text-purple-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300">5,000+ Summer & Virtual</span>
              <h3 className="text-2xl font-extrabold font-display leading-tight mt-2 text-white group-hover:text-purple-200 transition-colors">
                Explore All College Internships & PPO Programs
              </h3>
              <p className="text-xs text-purple-100 mt-2 leading-relaxed">
                Work with top startups, tech unicorns and MNCs with high stipend guarantees.
              </p>
            </div>

            <div className="pt-4 border-t border-purple-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore 5,000+ Internships <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-[10px] text-purple-300 font-semibold uppercase">Freshers Welcome</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
