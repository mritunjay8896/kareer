import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CandidateNavbar } from './CandidateNavbar';
import { EmployerNavbar } from './EmployerNavbar';

interface NavbarProps {
  currentUser?: string | null;
  userRole?: 'candidate' | 'employer' | null;
  onLogout?: () => void;
  onSwitchRole?: (role: 'candidate' | 'employer') => void;
  onOpenAuth?: (mode: 'login' | 'register', role?: 'candidate' | 'employer') => void;
  onOpenEmployer?: () => void;
  onTriggerSearch?: (query: string) => void;
  onNavClick?: (topic: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  const isEmployerRoute = 
    location.pathname.startsWith('/employer') || 
    location.pathname.startsWith('/employers');

  // Render Employer Navbar on employer routes or when logged in as employer
  if (isEmployerRoute || userRole === 'employer') {
    return <EmployerNavbar />;
  }

  // Render Candidate Navbar by default
  return <CandidateNavbar />;
};
