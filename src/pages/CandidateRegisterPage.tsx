import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, AlertCircle, Building2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CandidateRegisterPage: React.FC = () => {
  const { currentUser, userRole, authInitialized, registerCandidate, demoCandidateLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authInitialized && currentUser) {
      if (userRole === 'employer') {
        navigate('/employer/dashboard', { replace: true });
      } else {
        navigate('/candidate/dashboard', { replace: true });
      }
    }
  }, [authInitialized, currentUser, userRole, navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await registerCandidate(name, email, password, phone);
      navigate('/candidate/dashboard');
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
      await demoCandidateLogin();
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo candidate sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-3 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-600/20">
            G
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
            Glit<span className="text-blue-600">read</span>
          </span>
        </Link>

        <div>
          <h2 className="text-2xl font-black text-slate-900">Create Candidate Account</h2>
          <p className="text-xs text-slate-500 mt-1">Apply to 10,000+ jobs, internships & government notices for free</p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-slate-200/80 py-8 px-6 shadow-xl rounded-3xl sm:px-10 space-y-6">
          
          {/* Quick Demo Candidate Login Banner */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-xs font-black text-blue-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Demo Candidate Account
              </p>
              <p className="text-[11px] text-slate-500">Instant access as Priya Sharma</p>
            </div>
            <button
              onClick={handleDemoLogin}
              type="button"
              disabled={loading}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer active:scale-95"
            >
              ⚡ Instant Demo Login
            </button>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Priya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              {loading ? 'Creating Account...' : 'Register Candidate Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <p>Already registered? <Link to="/login" className="font-extrabold text-blue-600 hover:underline">Log In Here</Link></p>
            
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-left text-[11px] text-amber-900 mt-2 flex items-center justify-between">
              <span>Recruiter or Employer?</span>
              <Link to="/employers/register" className="font-black text-amber-900 hover:underline flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Post Jobs Here →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
