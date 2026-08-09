import React, { useState } from 'react';
import { Search, Sparkles, User, Mail, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const EmployerCandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const candidatesList = [
    { id: 'cand-1', name: 'Aarav Sharma', headline: 'Senior Full Stack Developer (React & Node.js)', skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'], location: 'Bengaluru, India', experience: '4 Yrs', notice: '15 Days', matchScore: '95%' },
    { id: 'cand-2', name: 'Ananya Verma', headline: 'Customer Operations & Voice QA Specialist', skills: ['Voice Process', 'English Communication', 'CRM', 'Quality Audit'], location: 'Gurugram / Remote', experience: '3 Yrs', notice: 'Immediate', matchScore: '89%' },
    { id: 'cand-3', name: 'Rohan Mehta', headline: 'Frontend Engineer - C2H Specialist', skills: ['React', 'Tailwind CSS', 'Redux', 'REST API'], location: 'Hyderabad, India', experience: '2.5 Yrs', notice: 'Immediate', matchScore: '92%' },
    { id: 'cand-4', name: 'Sneha Patel', headline: 'BPO Quality Analyst & Team Leader', skills: ['Quality Audit', 'Excel', 'Team Leadership', 'Coaching'], location: 'Jaipur, India', experience: '5 Yrs', notice: '30 Days', matchScore: '87%' }
  ];

  const filtered = candidatesList.filter(c => {
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return c.name.toLowerCase().includes(s) || c.headline.toLowerCase().includes(s) || c.skills.some(sk => sk.toLowerCase().includes(s));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-amber-400" /> Discover & Sourcing Candidate Talent
            </h1>
            <p className="text-xs text-slate-400">Search Glitread candidate pool by skill, location, and notice period</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by React, BPO, Voice, Node.js..."
              className="pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none w-72"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(cand => (
            <div key={cand.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-all space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center">
                    {cand.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      {cand.name}
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                        {cand.matchScore} High Match
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">{cand.headline}</p>
                    <p className="text-[11px] text-slate-400">{cand.location} • {cand.experience} Exp • Notice: <strong className="text-amber-300">{cand.notice}</strong></p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {cand.skills.map(sk => (
                  <span key={sk} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-[10px] font-semibold rounded-lg border border-slate-800">
                    {sk}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => alert(`Invite sent to ${cand.name}!`)}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Invite to Apply
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
