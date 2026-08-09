import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { CareerTools } from '../components/CareerTools/CareerTools';
import { CareerSwitch } from '../components/CareerSwitch/CareerSwitch';
import { ResourcesSection } from '../components/Resources/ResourcesSection';
import { FAQSection } from '../components/FAQ/FAQSection';
import { SEOHubSection } from '../components/SEOHub/SEOHubSection';
import { JobItem, CareerSwitchPath } from '../types';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
  onSelectTool: (toolName: string) => void;
  onEmployerJobPublished: (title: string, company: string) => void;
  onExplorePath: (path: CareerSwitchPath) => void;
  onSeoLinkClick: (url: string, label: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onSelectTool,
  onExplorePath,
  onSeoLinkClick,
}) => {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero
        onOpenAuth={onOpenAuth}
        onExploreClick={() => {
          const el = document.getElementById('career-tools-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Section 2: Career Tools Bento Grid */}
      <CareerTools onSelectTool={onSelectTool} />

      {/* Section 3: Career Switch Roadmaps */}
      <CareerSwitch onExplorePath={onExplorePath} />

      {/* Section 5: Career Resources */}
      <ResourcesSection />

      {/* Section 6: FAQ */}
      <FAQSection />

      {/* Section 7: SEO Hub */}
      <SEOHubSection onSeoLinkClick={onSeoLinkClick} />
    </>
  );
};
