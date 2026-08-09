import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const CandidateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userRole, loading, authInitialized } = useAuth();
  const location = useLocation();

  if (!authInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-600">Verifying Candidate Credentials...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole === 'employer') {
    return <Navigate to="/employer/dashboard" replace />;
  }

  return <>{children}</>;
};

export const EmployerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userRole, loading, authInitialized } = useAuth();
  const location = useLocation();

  if (!authInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-600">Verifying Employer Access...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/employers/login" state={{ from: location }} replace />;
  }

  if (userRole === 'candidate') {
    return <Navigate to="/employers/login?error=candidate_account" replace />;
  }

  return <>{children}</>;
};

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userRole, loading, authInitialized } = useAuth();
  const location = useLocation();

  if (!authInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-600">Verifying Super Admin Credentials...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
            🔒
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">403 - Super Admin Access Required</h2>
          <p className="text-sm text-slate-600 mb-6">
            You are logged in as <span className="font-semibold text-slate-800">{currentUser.email}</span> ({userRole}). This section is restricted strictly to authorized Government Jobs Super Admins.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/admin/login"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-colors block"
            >
              Log in with Super Admin Account
            </a>
            <a
              href="/"
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm transition-colors block"
            >
              Return to Public Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

