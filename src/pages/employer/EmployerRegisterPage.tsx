import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Building2, User, Mail, Lock, Phone, Globe, Users, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployerRegisterPage: React.FC = () => {
  const { currentUser, userRole, authInitialized, registerEmployer, demoEmployerLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authInitialized && currentUser) {
      if (userRole === 'employer') {
        navigate('/employer/dashboard', { replace: true });
      }
    }
  }, [authInitialized, currentUser, userRole, navigate]);

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    pass: '',
    companyName: '',
    companyWebsite: '',
    companySize: '50 - 200 Employees',
    industry: 'Technology / IT',
    phone: '',
    designation: 'Talent Acquisition Lead'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.pass || !formData.companyName || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.pass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await registerEmployer(formData);
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await demoEmployerLogin();
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo recruiter sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-xl space-y-3 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-400/20">
            <Building className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-display">
            Glit<span className="text-amber-400">read</span>
          </span>
        </Link>

        <div>
          <h2 className="text-2xl font-black text-white">Create Employer Account</h2>
          <p className="text-xs text-slate-400 mt-1">Register your company and start hiring top candidates on Glitread</p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 space-y-6">
          
          {/* Quick 1-Click Demo Login Banner */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-xs font-black text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Demo Employer Access
              </p>
              <p className="text-[11px] text-slate-400">Skip form, instant 1-click access to Recruiter Portal</p>
            </div>
            <button
              onClick={handleDemoLogin}
              type="button"
              disabled={loading}
              className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              ⚡ Instant Demo Login
            </button>
          </div>

          {error && (
            <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-2xl text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">1. Recruiter Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Siddharth Rao"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Designation *</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={e => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="HR Lead / Technical Recruiter"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Work Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.workEmail}
                    onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="siddharth@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Create Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={formData.pass}
                  onChange={e => setFormData({ ...formData, pass: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <div className="border-b border-slate-800 pt-3 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">2. Company Profile Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Name *</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Swiggy / Razorpay / TechCorp"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Website</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={e => setFormData({ ...formData, companyWebsite: e.target.value })}
                    placeholder="https://company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Industry</label>
                <select
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                >
                  <option value="Technology / IT">Technology / IT</option>
                  <option value="BPO / Customer Support">BPO / Customer Support</option>
                  <option value="Fintech & Banking">Fintech & Banking</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                  <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                  <option value="Manufacturing & Engg">Manufacturing & Engg</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                >
                  <option value="1 - 10 Employees">1 - 10 Employees (Startup)</option>
                  <option value="10 - 50 Employees">10 - 50 Employees</option>
                  <option value="50 - 200 Employees">50 - 200 Employees</option>
                  <option value="200 - 1000 Employees">200 - 1000 Employees</option>
                  <option value="1000+ Employees">1000+ Employees (Enterprise)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {loading ? 'Creating Employer Account...' : 'Register Employer Account & Access Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Already have an employer account?{' '}
            <Link to="/employers/login" className="font-extrabold text-amber-400 hover:underline">
              Sign In Here →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
