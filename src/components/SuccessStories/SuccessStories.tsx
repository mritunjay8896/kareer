import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Quote, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  X,
  GraduationCap
} from 'lucide-react';
import { SUCCESS_STORIES } from '../../data/mockData';
import { SuccessStory } from '../../types';

export const SuccessStories: React.FC = () => {
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80" id="success-stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-widest font-display mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" /> Inspiring Careers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Student Success Stories
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            See how candidates transformed their careers from Tier-3 colleges and non-tech roles into top tech companies.
          </p>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Background Accent Pill */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50/80 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

              <div>
                {/* Salary Hike Pill */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {story.salaryIncrease}
                  </span>
                  <span className="text-2xl">{story.companyLogo}</span>
                </div>

                {/* Photo & Name */}
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={story.studentPhoto}
                    alt={story.studentName}
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-slate-200"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{story.studentName}</h3>
                    <p className="text-xs text-slate-500 font-medium">{story.branch}</p>
                  </div>
                </div>

                {/* Transition Flow: Previous Role -> Current Role */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-5 space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Previous Role</span>
                    <p className="text-xs font-bold text-slate-600">{story.previousRole}</p>
                  </div>

                  <div className="flex items-center gap-1 text-blue-600 font-bold text-xs py-0.5">
                    <ArrowRight className="w-4 h-4" /> Placed at {story.company}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600">Current Placement</span>
                    <p className="text-sm font-extrabold text-slate-900">{story.currentRole}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveStory(story)}
                  className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1"
                >
                  Read Full Journey & Resume Strategy →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-200"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img src={activeStory.studentPhoto} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{activeStory.studentName}</h3>
                  <span className="text-xs text-blue-600 font-bold">{activeStory.currentRole} at {activeStory.company}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-900 mb-4">
                🚀 Salary Growth: {activeStory.salaryIncrease} ({activeStory.previousRole} → {activeStory.currentRole})
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                "{activeStory.quote}"
              </p>

              <button
                onClick={() => setActiveStory(null)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Story
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
