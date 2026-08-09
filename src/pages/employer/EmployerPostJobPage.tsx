import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowRight, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createJobInFirestore } from '../../lib/db';

export const EmployerPostJobPage: React.FC = () => {
  const { currentUser, employerProfile, companyProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'IT',
    type: 'Full Time',
    location: 'Bengaluru, India',
    salary: '₹12 - ₹18 LPA',
    experience: '2 - 5 Yrs',
    companyType: 'Corporate',
    skills: 'React, Node.js, TypeScript',
    description: '',
    responsibilities: '',
    requirements: '',
    featured: false,
    urgent: false,
    isGovernment: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, status: 'published' | 'draft' = 'published') => {
    e.preventDefault();
    if (!currentUser) return;

    if (!formData.title || !formData.description) {
      setError('Please provide a job title and description.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const skillArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
      const respArray = formData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean);
      const reqArray = formData.requirements.split('\n').map(s => s.trim()).filter(Boolean);

      const jobData = {
        title: formData.title,
        company: companyProfile?.name || 'Verified Employer',
        companyLogo: companyProfile?.logo || 'EMP',
        employerUid: currentUser.uid,
        companyId: companyProfile?.id || '',
        verified: true,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        experience: formData.experience,
        category: formData.category,
        companyType: formData.companyType,
        skills: skillArray,
        postedTime: 'Just now',
        applicantsCount: 0,
        featured: formData.featured,
        urgent: formData.urgent,
        isGovernment: formData.isGovernment,
        description: formData.description,
        responsibilities: respArray.length > 0 ? respArray : ['Perform core role functions.'],
        requirements: reqArray.length > 0 ? reqArray : ['Relevant experience required.'],
        status
      };

      await createJobInFirestore(jobData);
      navigate('/employer/jobs');
    } catch (err: any) {
      setError(err.message || 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-amber-400" /> Post New Job Vacancy
          </h1>
          <p className="text-xs text-slate-400">Fill in vacancy details to start receiving candidate applications on Glitread</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-2xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, 'published')} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">Job Role Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Senior Full Stack Engineer (React & Node.js)"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Job Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              >
                <option value="IT">IT & Software</option>
                <option value="BPO">BPO & Voice Operations</option>
                <option value="Finance">Finance & Banking</option>
                <option value="Marketing">Marketing & Sales</option>
                <option value="Engineering">Engineering & Site</option>
                <option value="Govt">Govt Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Employment Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract / C2H</option>
                <option value="Internship">Internship</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Job Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bengaluru, India or Remote"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Salary Range *</label>
              <input
                type="text"
                required
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                placeholder="₹12 - ₹18 LPA or Tax Free Gulf Salary"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Experience Level</label>
              <input
                type="text"
                value={formData.experience}
                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                placeholder="0 - 2 Yrs / 3 - 5 Yrs"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={e => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, TypeScript, Node.js"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Job Description Overview *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the vacancy, team environment, and core objectives..."
              className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Key Responsibilities (One per line)</label>
            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Design and develop React application modules&#10;Optimize REST API response times"
              className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-6 text-xs font-bold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="accent-amber-400"
              />
              <span>Mark as Featured Vacancy</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={e => setFormData({ ...formData, urgent: e.target.checked })}
                className="accent-amber-400"
              />
              <span>Urgent Hiring</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'draft')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? 'Publishing Vacancy...' : 'Publish Job Vacancy'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
