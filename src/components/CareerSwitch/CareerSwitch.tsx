import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  IndianRupee,
  BookOpen
} from 'lucide-react';
import { CAREER_SWITCH_PATHS } from '../../data/mockData';
import { CareerSwitchPath } from '../../types';

interface CareerSwitchProps {
  onExplorePath: (path: CareerSwitchPath) => void;
}

export const CareerSwitch: React.FC<CareerSwitchProps> = ({ onExplorePath }) => {
  const [selectedPathId, setSelectedPathId] = useState<string>(CAREER_SWITCH_PATHS[0].id);

  const activePath = CAREER_SWITCH_PATHS.find(p => p.id === selectedPathId) || CAREER_SWITCH_PATHS[0];

  return (
    <section className="py-20 bg-white" id="career-switch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest font-display mb-3 border border-orange-200">
            <TrendingUp className="w-3.5 h-3.5" /> High-Impact Transition
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Interactive Career Switch Roadmaps
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Transition from non-tech, customer support, or core engineering backgrounds into high-paying software and data roles.
          </p>
        </div>

        {/* Path Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CAREER_SWITCH_PATHS.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                selectedPathId === path.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {path.title}
            </button>
          ))}
        </div>

        {/* Active Roadmap Display Card */}
        <motion.div
          key={activePath.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          {/* Top Metrics Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-800 mb-8">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Career Path</span>
              <h3 className="text-2xl font-extrabold text-white font-display mt-0.5">{activePath.title}</h3>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Post-Switch CTC</span>
                <p className="text-base font-extrabold text-amber-400">{activePath.avgSalary}</p>
              </div>

              <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Expected Duration</span>
                <p className="text-base font-extrabold text-emerald-400">{activePath.duration}</p>
              </div>

              <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Market Demand Growth</span>
                <p className="text-base font-extrabold text-blue-400">{activePath.demandGrowth}</p>
              </div>
            </div>
          </div>

          {/* Timeline Step Breakdown */}
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
              Step-by-Step Progression Roadmap
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {activePath.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between relative group hover:border-blue-500 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded">
                        {step.timeline}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">Step 0{idx + 1}</span>
                    </div>

                    <h5 className="font-extrabold text-sm text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {step.role}
                    </h5>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Key Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {step.skills.map((skill) => (
                          <span key={skill} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Includes free course recommendations & interview question bank</span>
            </div>

            <button
              onClick={() => onExplorePath(activePath)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              Explore Full {activePath.fromRole} Roadmap <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
