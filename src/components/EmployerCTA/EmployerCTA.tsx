import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Filter,
  PlusCircle,
  Video
} from 'lucide-react';
import { EmployerModal } from './EmployerModal';

interface EmployerCTAProps {
  onJobPublished: (title: string, company: string) => void;
}

export const EmployerCTA: React.FC<EmployerCTAProps> = ({ onJobPublished }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    { title: 'AI Candidate Matching', desc: 'Rank top candidates automatically based on skill assessments.' },
    { title: 'Resume Filtering', desc: 'Filter out unformatted CVs with enterprise ATS criteria.' },
    { title: 'Skill Verification', desc: 'Pre-screen applicants with automated coding and aptitude tests.' },
    { title: 'Campus Hiring Drives', desc: 'Access tier-1, tier-2 & tier-3 engineering and degree colleges.' },
    { title: 'One Click Job Posting', desc: 'Distribute vacancies to 100,000+ candidates instantly.' }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="employer-section">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Employer Dashboard Illustration (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
              {/* Dashboard top header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold text-lg">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Razorpay Talent Portal</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold">● Active Hiring Campaign</span>
                  </div>
                </div>

                <span className="text-xs bg-slate-800 text-slate-300 font-bold px-3 py-1 rounded-full border border-slate-700">
                  482 Matches
                </span>
              </div>

              {/* Candidate Matching List Mockup */}
              <div className="space-y-3">
                {[
                  { name: 'Ananya Deshmukh', role: 'Full Stack Dev', score: '98% Match', skills: ['React', 'Node', 'TypeScript'], bg: 'border-emerald-500/40 bg-emerald-950/20' },
                  { name: 'Karan Mehta', role: 'Frontend Engineer', score: '94% Match', skills: ['React', 'Redux', 'Tailwind'], bg: 'border-blue-500/30 bg-blue-950/20' },
                  { name: 'Siddharth Rao', role: 'Backend Lead', score: '91% Match', skills: ['Java', 'Spring', 'MySQL'], bg: 'border-slate-800 bg-slate-900/60' }
                ].map((candidate, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border ${candidate.bg} flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-white">{candidate.name}</h5>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                            {candidate.score}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">{candidate.role}</p>
                      </div>
                    </div>

                    <button className="text-[11px] font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                      Invite →
                    </button>
                  </div>
                ))}
              </div>

              {/* Dashboard metric bottom bar */}
              <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Average Time-to-Hire</span>
                  <p className="text-base font-extrabold text-amber-400 mt-0.5">4.5 Days</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Quality Candidate Callbacks</span>
                  <p className="text-base font-extrabold text-emerald-400 mt-0.5">92% Verified</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Content & Features List (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <Building2 className="w-3.5 h-3.5" /> For Hiring Managers & Recruiters
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
              Hire Freshers Faster with Precision AI
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Stop digging through thousands of unformatted resumes. CareerPulse pre-screens candidate aptitude, coding scores, and ATS formatting so you only interview top talent.
            </p>

            {/* Features list */}
            <div className="space-y-3.5">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{feat.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm py-3.5 px-7 rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" /> Post Job Free Now
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl border border-slate-700 transition-all flex items-center gap-2"
              >
                <Video className="w-4 h-4 text-blue-400" /> Book Product Demo
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      <EmployerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitJob={(title, company) => onJobPublished(title, company)}
      />
    </section>
  );
};
