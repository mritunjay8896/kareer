import React, { useState } from 'react';
import { Building2, Globe, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployerCompanyPage: React.FC = () => {
  const { companyProfile, updateCompanyProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: companyProfile?.name || 'Swiggy',
    industry: companyProfile?.industry || 'Technology / Food Tech',
    companySize: companyProfile?.companySize || '200 - 1000 Employees',
    website: companyProfile?.website || 'https://swiggy.com',
    headquarters: companyProfile?.headquarters || 'Bengaluru, India',
    about: companyProfile?.about || 'Leading consumer tech company.'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-400" /> Employer Company Profile Branding
          </h1>
          <p className="text-xs text-slate-400">Manage your public employer profile, logo, website, and company description</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-2xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Company profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Headquarters Location</label>
              <input
                type="text"
                value={formData.headquarters}
                onChange={e => setFormData({ ...formData, headquarters: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">About Company</label>
            <textarea
              rows={4}
              value={formData.about}
              onChange={e => setFormData({ ...formData, about: e.target.value })}
              className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
          >
            Save Company Details
          </button>
        </form>

      </div>
    </div>
  );
};
