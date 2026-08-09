import React, { useState } from 'react';
import { Settings, ShieldCheck, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployerSettingsPage: React.FC = () => {
  const { employerProfile, currentUser } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" /> Employer Account Settings
          </h1>
          <p className="text-xs text-slate-400">Configure email notifications, security, and account preferences</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-2xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings saved!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-amber-400">Recruiter Information</h3>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
              <p><strong className="text-slate-400">Name:</strong> {employerProfile?.name || 'Recruiter'}</p>
              <p><strong className="text-slate-400">Work Email:</strong> {employerProfile?.email || currentUser?.email}</p>
              <p><strong className="text-slate-400">Designation:</strong> {employerProfile?.designation || 'Talent Acquisition'}</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase text-amber-400">Notification Preferences</h3>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={e => setEmailNotifs(e.target.checked)}
                className="accent-amber-400"
              />
              <span>Receive instant email notifications when new candidates apply</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
