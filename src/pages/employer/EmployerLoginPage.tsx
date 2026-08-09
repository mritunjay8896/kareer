import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Lock, Mail, ArrowRight, AlertCircle, Building, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployerLoginPage: React.FC = () => {
  const { currentUser, userRole, authInitialized, loginEmployer, loginWithGoogle, demoEmployerLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (authInitialized && currentUser) {
      if (userRole === 'employer') {
        navigate('/employer/dashboard', { replace: true });
      }
    }
  }, [authInitialized, currentUser, userRole, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get('error') === 'candidate_account'
      ? 'Your logged-in account is registered as a Candidate. Please sign in with an Employer account.'
      : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both work email and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await loginEmployer(email, password);
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
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
      setError(err.message || 'Demo employer sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle('employer');
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-400/20">
            <Building className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-display">
            Glit<span className="text-amber-400">read</span>
          </span>
        </Link>

        <div>
          <h2 className="text-2xl font-black text-white">Employer & Recruiter Sign In</h2>
          <p className="text-xs text-slate-400 mt-1">Access your hiring dashboard and active candidate applications</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 space-y-6">
          
          {/* Quick 1-Click Demo Login Banner */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-xs font-black text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Demo Employer Account
              </p>
              <p className="text-[11px] text-slate-400">Skip password, instant access to Recruiter Portal</p>
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              ⚡ Quick Demo Login
            </button>
          </div>

          {error && (
            <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-2xl text-xs font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div>
                <span>{error}</span>
                {error.includes('Candidate') && (
                  <div className="mt-2">
                    <Link to="/login" className="underline font-bold text-white hover:text-amber-300">
                      Go to Candidate Login →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In to Hiring Hub'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500 text-[10px] font-bold">Or</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In with Work Google Account</span>
          </button>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 space-y-1">
            <p>Don't have an employer account yet?</p>
            <Link to="/employers/register" className="font-extrabold text-amber-400 hover:underline inline-block">
              Register Employer Account & Post Jobs Free →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
