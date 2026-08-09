import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CandidateLoginPage: React.FC = () => {
  const { currentUser, userRole, authInitialized, loginCandidate, loginWithGoogle, demoCandidateLogin } = useAuth();
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await loginCandidate(email, password);
      navigate('/candidate/dashboard');
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
      await demoCandidateLogin();
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo candidate sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle('candidate');
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
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
          <h2 className="text-2xl font-black text-slate-900">Candidate Login</h2>
          <p className="text-xs text-slate-500 mt-1">Access your job applications, ATS score, and saved vacancies</p>
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
              <p className="text-[11px] text-slate-500">Instant access as Priya Sharma (Full Stack Dev)</p>
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer active:scale-95"
            >
              ⚡ Quick Demo Login
            </button>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div>
                <span>{error}</span>
                {error.includes('Employer') && (
                  <div className="mt-2">
                    <Link to="/employers/login" className="underline font-bold text-slate-900 hover:text-blue-600">
                      Go to Employer Portal Sign In →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              {loading ? 'Logging In...' : 'Log In to Candidate Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 text-[10px] font-bold">Or</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue with Google</span>
          </button>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <p>New to Glitread? <Link to="/register" className="font-extrabold text-blue-600 hover:underline">Register Free Account</Link></p>
            
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-left text-[11px] text-amber-900 mt-2 flex items-center justify-between">
              <span>Are you hiring talent?</span>
              <Link to="/employers/login" className="font-black text-amber-900 hover:underline flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Employer Portal →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
