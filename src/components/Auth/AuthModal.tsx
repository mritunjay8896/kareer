import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  Phone, 
  Users, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export type UserRole = 'candidate' | 'employer';
export type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  initialRole?: UserRole;
  onClose: () => void;
  onSuccess: (userName: string, role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  initialRole = 'candidate',
  onClose,
  onSuccess
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sync state when props change or modal reopens
  useEffect(() => {
    if (isOpen) {
      setRole(initialRole);
      setMode(initialMode);
      setSubmitted(false);
      setShowForgotPassword(false);
    }
  }, [isOpen, initialMode, initialRole]);

  // Candidate fields
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateExp, setCandidateExp] = useState('Fresher / Student (2025-2026)');
  const [candidatePassword, setCandidatePassword] = useState('');

  // Employer fields
  const [employerName, setEmployerName] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerCompany, setEmployerCompany] = useState('');
  const [employerPhone, setEmployerPhone] = useState('');
  const [employerHiringNeed, setEmployerHiringNeed] = useState('1 - 10 Immediate Vacancies');
  const [employerPassword, setEmployerPassword] = useState('');

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const displayName = role === 'candidate' 
      ? (candidateName || candidateEmail.split('@')[0] || 'Candidate') 
      : (employerCompany || employerName || 'Employer');

    setTimeout(() => {
      setSubmitted(false);
      onSuccess(displayName, role);
      onClose();
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess(role === 'candidate' ? 'Priya Sharma' : 'Swiggy Hiring Team', role);
      onClose();
    }, 1200);
  };

  const handleLinkedInLogin = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess('Razorpay HR Team', 'employer');
      onClose();
    }, 1200);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotPassword(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-200 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Role Switcher (Candidate vs Employer) */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 mb-6 border border-slate-200/80">
            <button
              type="button"
              onClick={() => { setRole('candidate'); setSubmitted(false); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'candidate'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate / Jobseeker</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('employer'); setSubmitted(false); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'employer'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Employer / Recruiter</span>
            </button>
          </div>

          {/* Header Title */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-1">
              {role === 'candidate' ? (
                <span className="text-blue-600 flex items-center gap-1 font-display">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Candidate Portal
                </span>
              ) : (
                <span className="text-amber-700 flex items-center gap-1 font-display">
                  <Building className="w-3.5 h-3.5 text-amber-600" /> Employer Hiring Hub
                </span>
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              {showForgotPassword ? (
                'Reset Password'
              ) : mode === 'login' ? (
                role === 'candidate' ? 'Candidate Log In' : 'Employer Portal Login'
              ) : (
                role === 'candidate' ? 'Create Candidate Account' : 'Register Employer Account'
              )}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {role === 'candidate'
                ? 'Access 15,000+ jobs, internships, BPO roles, and AI resume tools.'
                : 'Post jobs, access 100,000+ pre-screened freshers, and hire top talent.'}
            </p>
          </div>

          {/* Forgot Password View */}
          {showForgotPassword ? (
            <div className="mt-4 space-y-4">
              {resetSent ? (
                <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-sm text-slate-900">Password Reset Link Sent!</h4>
                  <p className="text-xs text-slate-600">Please check your inbox for instructions to reset your password.</p>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                      {role === 'candidate' ? 'Candidate Email' : 'Work Email'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Back to Login
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : submitted ? (
            /* Success Feedback */
            <div className="my-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-lg text-slate-900">
                {mode === 'login' ? 'Successfully Authenticated!' : 'Account Created Successfully!'}
              </h3>
              <p className="text-xs text-slate-500">
                {role === 'candidate'
                  ? 'Redirecting to candidate dashboard & recommended vacancies...'
                  : 'Redirecting to recruiter control panel & employer portal...'}
              </p>
            </div>
          ) : (
            /* Main Form Area */
            <div className="mt-4 space-y-4">
              {/* Social Login Button */}
              {role === 'candidate' ? (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLinkedInLogin}
                  className="w-full bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs py-2.5 px-4 rounded-xl border border-sky-200 shadow-2xs transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-sky-700" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                  </svg>
                  Recruiter Sign In with LinkedIn
                </button>
              )}

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[10px] text-slate-400 font-bold uppercase">Or with Email</span>
              </div>

              {/* Form implementation */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* CANDIDATE REGISTRATION FIELDS */}
                {role === 'candidate' && mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Mobile / WhatsApp Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={candidatePhone}
                          onChange={(e) => setCandidatePhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Experience Status</label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={candidateExp}
                          onChange={(e) => setCandidateExp(e.target.value)}
                          className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-600"
                        >
                          <option value="Fresher / Student (2025-2026)">Fresher / Student (2025-2026)</option>
                          <option value="Experienced (1 - 3 Years)">Experienced (1 - 3 Years)</option>
                          <option value="Experienced (3 - 5 Years)">Experienced (3 - 5 Years)</option>
                          <option value="Senior (5+ Years)">Senior (5+ Years)</option>
                          <option value="BPO / Non-Tech Career Switcher">BPO / Non-Tech Career Switcher</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* EMPLOYER REGISTRATION FIELDS */}
                {role === 'employer' && mode === 'register' && (
                  <>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Company Name</label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={employerCompany}
                            onChange={(e) => setEmployerCompany(e.target.value)}
                            placeholder="e.g. Swiggy, Razorpay"
                            className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Recruiter Name</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={employerName}
                            onChange={(e) => setEmployerName(e.target.value)}
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Work Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={employerEmail}
                          onChange={(e) => setEmployerEmail(e.target.value)}
                          placeholder="hr@company.com"
                          className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={employerPhone}
                            onChange={(e) => setEmployerPhone(e.target.value)}
                            placeholder="+91 98000 12345"
                            className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Hiring Volume</label>
                        <div className="relative">
                          <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <select
                            value={employerHiringNeed}
                            onChange={(e) => setEmployerHiringNeed(e.target.value)}
                            className="w-full bg-slate-50 text-xs pl-9 pr-2 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                          >
                            <option value="1 - 10 Immediate Vacancies">1 - 10 Vacancies</option>
                            <option value="10 - 50 Hires">10 - 50 Hires</option>
                            <option value="Bulk Campus / Freshers Drive">Bulk / Campus Hiring</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* COMMON EMAIL & PASSWORD FOR LOGIN */}
                {mode === 'login' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        {role === 'candidate' ? 'Candidate Email' : 'Work Email / Company ID'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={role === 'candidate' ? candidateEmail : employerEmail}
                          onChange={(e) => role === 'candidate' ? setCandidateEmail(e.target.value) : setEmployerEmail(e.target.value)}
                          placeholder={role === 'candidate' ? "e.g. priya@example.com" : "e.g. hr@company.com"}
                          className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* COMMON PASSWORD FIELD */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={role === 'candidate' ? candidatePassword : employerPassword}
                      onChange={(e) => role === 'candidate' ? setCandidatePassword(e.target.value) : setEmployerPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className={`w-full py-3 font-bold text-xs rounded-xl shadow-xs transition-all mt-3 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                    role === 'candidate'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-amber-500/20'
                  }`}
                >
                  <span>
                    {mode === 'login'
                      ? (role === 'candidate' ? 'Log In as Candidate' : 'Log In as Employer')
                      : (role === 'candidate' ? 'Register Candidate Account' : 'Create Employer Account')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* TOGGLE LOGIN / REGISTER */}
              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 mt-4">
                {mode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('register')}
                      className="text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      {role === 'candidate' ? 'Sign Up Candidate Free' : 'Register Company Free'}
                    </button>
                  </p>
                ) : (
                  <p>
                    Already registered?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      Log In Here
                    </button>
                  </p>
                )}
              </div>

              {/* Trust Badge Footer */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted & Safe 256-bit SSL Authentication</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
