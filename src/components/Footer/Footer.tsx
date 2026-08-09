import React, { useState } from 'react';
import { 
  Send, 
  Heart, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Github, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

interface FooterProps {
  onSubscribeNewsletter: (email: string) => void;
  onLinkClick: (label: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribeNewsletter, onLinkClick }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      onSubscribeNewsletter(newsletterEmail.trim());
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
                C
              </div>
              <span className="font-extrabold text-2xl tracking-tight font-display text-white">
                Career<span className="text-blue-500">Pulse</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's premier career portal for Jobs, Internships, Government Vacancies, AI Resume Builder, and Tech Career Roadmaps.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-center">
            <h4 className="font-bold text-sm text-white font-display mb-1">
              Subscribe to Weekly Job Alerts
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Get handpicked remote jobs, internship stipends, and government notification summaries directly in your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You have been subscribed to weekly job alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your candidate or corporate email..."
                  className="flex-1 bg-slate-950 text-xs text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" /> Subscribe Free
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-12 text-xs">
          
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider font-display text-[11px] text-blue-400">Products</h5>
            <ul className="space-y-2 text-slate-400">
              {['Jobs Directory', 'BPO Jobs', 'College Internships', 'Government Jobs', 'AI Resume Builder', 'Portfolio Generator'].map((l) => (
                <li key={l}>
                  <button onClick={() => onLinkClick(l)} className="hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider font-display text-[11px] text-blue-400">Students</h5>
            <ul className="space-y-2 text-slate-400">
              {['Freshers Hiring', 'Remote Opportunities', 'Jobs for Women', 'PPO Internships', 'Placement Courses', 'Career Switch Roadmaps'].map((l) => (
                <li key={l}>
                  <button onClick={() => onLinkClick(l)} className="hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider font-display text-[11px] text-blue-400">Employers</h5>
            <ul className="space-y-2 text-slate-400">
              {['Post Job Free', 'Book Product Demo', 'AI Candidate Matching', 'Campus Hiring Drives', 'Pricing Plans', 'Enterprise ATS'].map((l) => (
                <li key={l}>
                  <button onClick={() => onLinkClick(l)} className="hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider font-display text-[11px] text-blue-400">Govt Exams</h5>
            <ul className="space-y-2 text-slate-400">
              {['SSC CGL & CHSL', 'UPSC Civil Services', 'Railways RRB NTPC', 'Banking IBPS & SBI', 'State PSC Exams', 'Latest Exam Results'].map((l) => (
                <li key={l}>
                  <button onClick={() => onLinkClick(l)} className="hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider font-display text-[11px] text-blue-400">Company</h5>
            <ul className="space-y-2 text-slate-400">
              {['About CareerPulse', 'Careers @ CareerPulse', 'Press & Media', 'Success Stories', 'Partner Colleges', 'Blog & Articles'].map((l) => (
                <li key={l}>
                  <button onClick={() => onLinkClick(l)} className="hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider font-display text-[11px] text-blue-400">Support</h5>
            <ul className="space-y-2 text-slate-400">
              {['Help Center', 'Candidate Safety', 'Report Fraud Job', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((l) => (
                <li key={l}>
                  <button onClick={() => onLinkClick(l)} className="hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CareerPulse Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed with precision for Indian Freshers & Professionals</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
