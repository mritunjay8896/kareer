import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building, CheckCircle2, Sparkles, Send, Briefcase, DollarSign, MapPin, Layers } from 'lucide-react';
import { JobItem } from '../../types';

interface EmployerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitJob: (jobData: Partial<JobItem>) => void;
}

export const EmployerModal: React.FC<EmployerModalProps> = ({ isOpen, onClose, onSubmitJob }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('Bangalore, India');
  const [salary, setSalary] = useState('₹8 - ₹16 LPA');
  const [experience, setExperience] = useState('0 - 2 Years (Freshers Welcome)');
  const [category, setCategory] = useState<'IT' | 'BPO' | 'Finance' | 'Marketing' | 'Data Science' | 'Engineering' | 'Recommended'>('IT');
  const [jobType, setJobType] = useState<'Full Time' | 'Part Time' | 'Remote' | 'Hybrid' | 'Walk-in'>('Full Time');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, Problem Solving');
  const [description, setDescription] = useState('Looking for enthusiastic software engineers & freshers to join our high-growth engineering team.');
  
  const [postedSuccess, setPostedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle && companyName) {
      setPostedSuccess(true);
      
      const newJob: Partial<JobItem> = {
        title: jobTitle,
        company: companyName,
        location,
        salary,
        experience,
        category,
        type: jobType,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        description,
        logo: companyName.charAt(0).toUpperCase(),
        logoBg: 'bg-blue-600 text-white',
        verified: true,
        postedTime: 'Just now',
        applicantsCount: 0,
        featured: true,
        requirements: ['Strong problem-solving skills', 'Basic proficiency in modern web stacks or domain tools', 'Good communication skills'],
        responsibilities: ['Collaborate with team leads & cross-functional squads', 'Write clean, maintainable, efficient code or execute campaigns', 'Participate in code reviews and sprint planning'],
      };

      onSubmitJob(newJob);

      setTimeout(() => {
        setPostedSuccess(false);
        onClose();
      }, 1600);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 relative my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 font-display">
            <Building className="w-4 h-4 text-amber-600" /> Employer Hiring Portal
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Publish New Job / Internship Post
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Reach 100,000+ top students, freshers & experienced professionals with instant AI candidate matching.
          </p>

          {postedSuccess ? (
            <div className="my-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Job Posted Live!</h3>
              <p className="text-xs text-slate-600">Your job posting is now live across the platform. Candidates can apply instantly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Swiggy, Razorpay"
                    className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Job Designation</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Frontend Engineer / BPO Executive"
                    className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Offered Salary / CTC</label>
                  <input
                    type="text"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. ₹8 - ₹16 LPA"
                    className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Domain / Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 text-xs px-2.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  >
                    <option value="IT">IT / Software</option>
                    <option value="BPO">BPO / Customer Success</option>
                    <option value="Data Science">Data Science & AI</option>
                    <option value="Finance">Finance & Banking</option>
                    <option value="Marketing">Growth & Marketing</option>
                    <option value="Engineering">Core Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e: any) => setJobType(e.target.value)}
                    className="w-full bg-slate-50 text-xs px-2.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Walk-in">Walk-in Drive</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 text-xs px-2.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Node.js, Python, Communication"
                  className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Brief Job Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" /> Publish Vacancy Live
                </button>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
