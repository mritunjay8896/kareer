import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  FileCheck2, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { TRENDING_CAROUSEL } from '../../data/mockData';
import { TrendingItem } from '../../types';

interface TrendingCarouselProps {
  onCardClick: (item: TrendingItem) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ onCardClick }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-white" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-white" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-white" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6 text-white" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest font-display mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> What's Hot This Week
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Trending Now
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-2xs transition-all active:scale-95"
              aria-label="Previous trending item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-2xs transition-all active:scale-95"
              aria-label="Next trending item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRENDING_CAROUSEL.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className={`min-w-[320px] sm:min-w-[360px] max-w-[380px] bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 text-white shadow-md flex flex-col justify-between snap-start relative overflow-hidden group cursor-pointer border border-white/10`}
              onClick={() => onCardClick(item)}
            >
              {/* Glossy overlay effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Badge and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {item.badge}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
                    {getIcon(item.iconName)}
                  </div>
                </div>

                <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider block mb-1">
                  {item.category}
                </span>

                <h3 className="text-xl font-bold leading-snug mb-2 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {item.ctaText} <ArrowUpRight className="w-4 h-4" />
                </span>
                <span className="text-[10px] text-white/60 font-semibold uppercase">Verified</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
