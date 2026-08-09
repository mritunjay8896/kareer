import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  UploadCloud, 
  Sparkles, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Award,
  ArrowRight
} from 'lucide-react';

interface ResumeCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeCheckerModal: React.FC<ResumeCheckerModalProps> = ({ isOpen, onClose }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    keywordsMatched: string[];
    missingKeywords: string[];
    suggestions: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleScan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setScoreResult({
        score: 92,
        keywordsMatched: ['React.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'REST APIs', 'Agile/Scrum', 'Git'],
        missingKeywords: ['Docker Containerization', 'CI/CD Pipelines', 'GraphQL'],
        suggestions: [
          'Add quantitative metrics to experience bullets (e.g., "Improved page load speed by 35%").',
          'Include 2 more cloud keywords to match Amazon SDE requirements.',
          'Format project headings with clear tech stack badges.'
        ]
      });
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" /> AI Resume Scanner 2026
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Instant ATS Resume Audit
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tested against Workday, Greenhouse, Taleo, and Lever ATS systems used by top employers.
          </p>

          {!scoreResult && !analyzing && (
            <div className="mt-6 border-2 border-dashed border-blue-200 rounded-2xl p-8 bg-blue-50/40 text-center space-y-4 hover:border-blue-400 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Upload Your Resume (PDF / DOCX)</h4>
                <p className="text-xs text-slate-500 mt-1">Drag and drop or click to test candidate sample resume</p>
              </div>
              <button
                onClick={handleScan}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-95"
              >
                Run AI Audit Sample
              </button>
            </div>
          )}

          {analyzing && (
            <div className="my-12 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
              <h4 className="font-bold text-base text-slate-800">Analyzing Resume Keywords & Layout...</h4>
              <p className="text-xs text-slate-500">Checking impact verbs, formatting density, and job description alignment</p>
            </div>
          )}

          {scoreResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
              {/* Score gauge header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                    {scoreResult.score}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700">Audit Status</span>
                    <h4 className="font-extrabold text-slate-900 text-base">Top 5% Candidate Resume!</h4>
                  </div>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                  ATS Ready
                </span>
              </div>

              {/* Keywords Matched */}
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Matched Key Technical Skills</h5>
                <div className="flex flex-wrap gap-1.5">
                  {scoreResult.keywordsMatched.map((kw) => (
                    <span key={kw} className="text-xs bg-emerald-100/80 text-emerald-900 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Actionable Improvements</h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  {scoreResult.suggestions.map((sug, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setScoreResult(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Scan Another Resume
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Apply Recommendations
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
