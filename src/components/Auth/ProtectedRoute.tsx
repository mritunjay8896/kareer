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
