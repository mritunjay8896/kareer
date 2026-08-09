import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Sparkles,
  Link2,
  Linkedin,
  Github
} from 'lucide-react';
import { JobItem } from '../../types';

interface ApplyModalProps {
  job: JobItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (applicationData: any) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose, onSubmitSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [resumeType, setResumeType] = useState<'default' | 'upload'>('default');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('₹24 LPA');
  const [noticePeriod, setNoticePeriod] = useState('15 Days');
  const [preferredLocation, setPreferredLocation] = useState('Bangalore');
  const [portfolioUrl, setPortfolioUrl] = useState('https://aaravsharma.dev');
  const [linkedInUrl, setLinkedInUrl] = useState('https://linkedin.com/in/aaravsharma');

  if (!isOpen || !job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFile(e.target.files[0]);
      setResumeType('upload');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess({
          jobId: job.id,
          jobTitle: job.title,
          companyName: job.company,
          appliedDate: 'Just now',
          resumeName: customFile ? customFile.name : 'Aarav_Sharma_FullStack_Resume.pdf',
          expectedSalary,
          noticePeriod
        });
      }
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold ${job.logoBg || 'bg-slate-900 text-white'} shadow-sm`}>
                {job.logo}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">{job.title}</h3>
                <p className="text-xs font-medium text-slate-500">{job.company} • {job.location}</p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-slate-900">Application Submitted!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Your application for <span className="font-semibold text-slate-900">{job.title}</span> at <span className="font-semibold text-slate-900">{job.company}</span> was sent successfully.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 max-w-md mx-auto text-left text-xs space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Application ID:</span>
                    <span className="font-mono font-medium text-slate-800">APP-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-emerald-600">Under Review</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resume Attached:</span>
                    <span className="font-medium text-slate-800">{customFile ? customFile.name : 'Aarav_Sharma_FullStack_Resume.pdf'}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={resetAndClose}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Done & View Applications
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Stepper Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</span>
                    <span className={step >= 1 ? 'text-slate-900' : ''}>Resume & Links</span>
                  </div>
                  <div className="h-0.5 w-10 bg-slate-200"></div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</span>
                    <span className={step >= 2 ? 'text-slate-900' : ''}>Preferences & Cover</span>
                  </div>
                </div>

                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Resume</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                          onClick={() => setResumeType('default')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                            resumeType === 'default'
                              ? 'border-blue-600 bg-blue-50/40 text-blue-900'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">Aarav_Sharma_Resume.pdf</p>
                            <p className="text-[11px] text-slate-500">Saved in profile • ATS Score: 88%</p>
                          </div>
                        </div>

                        <label className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-start gap-3 ${
                          resumeType === 'upload'
                            ? 'border-blue-600 bg-blue-50/40 text-blue-900'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                        }`}>
                          <Upload className="w-5 h-5 text-slate-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {customFile ? customFile.name : 'Upload New Resume'}
                            </p>
                            <p className="text-[11px] text-slate-500">PDF, DOCX up to 5MB</p>
                          </div>
                          <input type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Portfolio / Website URL</label>
                        <div className="relative">
                          <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            value={portfolioUrl}
                            onChange={(e) => setPortfolioUrl(e.target.value)}
                            placeholder="https://yourportfolio.com"
                            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">LinkedIn Profile</label>
                        <div className="relative">
                          <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            value={linkedInUrl}
                            onChange={(e) => setLinkedInUrl(e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        Next: Salary & Notice <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Expected Salary (CTC)</label>
                        <input
                          type="text"
                          value={expectedSalary}
                          onChange={(e) => setExpectedSalary(e.target.value)}
                          placeholder="e.g. ₹24 LPA"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Notice Period</label>
                        <select
                          value={noticePeriod}
                          onChange={(e) => setNoticePeriod(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="Immediate / 15 Days">Immediate / 15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Location</label>
                        <input
                          type="text"
                          value={preferredLocation}
                          onChange={(e) => setPreferredLocation(e.target.value)}
                          placeholder="e.g. Bangalore"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-medium text-slate-700">Cover Letter (Optional)</label>
                        <span className="text-[11px] text-slate-400">Brief note to hiring manager</span>
                      </div>
                      <textarea
                        rows={3}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Why are you a great fit for this position at Razorpay?"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Your profile matches <span className="font-semibold">92% of skills</span> requested by the recruiter ({job.skills.slice(0, 3).join(', ')}).
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application <CheckCircle2 className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
