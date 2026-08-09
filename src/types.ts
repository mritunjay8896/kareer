export interface RecruiterInfo {
  name: string;
  role: string;
  avatar: string;
  company: string;
  responseRate: string;
  activeJobsCount: number;
  linkedInUrl?: string;
  email?: string;
}

export interface JobItem {
  id: string;
  slug?: string;
  title: string;
  company: string;
  companySlug?: string;
  logo: string;
  logoBg?: string;
  rating?: number;
  reviewsCount?: number;
  verified?: boolean;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Remote' | 'Hybrid' | 'Walk-in' | 'Women Only';
  salary: string;
  experience: string;
  category: 'IT' | 'BPO' | 'Finance' | 'Marketing' | 'Data Science' | 'Engineering' | 'Recommended' | 'Jobs' | 'Remote Jobs' | 'Women' | 'Govt' | 'C2H' | 'Internship';
  department?: string;
  roleCategory?: string;
  companyType?: 'Foreign MNC' | 'Corporate' | 'Indian MNC' | 'Startup' | 'Unicorn' | 'Govt';
  education?: string;
  industry?: string;
  skills: string[];
  postedTime: string;
  postedDateIso?: string;
  applicantsCount: number;
  featured?: boolean;
  urgent?: boolean;
  isGovernment?: boolean;
  dept?: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  preferredSkills?: string[];
  perks?: string[];
  benefits?: string[];
  aboutCompany?: string;
  workCulture?: string;
  hiringProcess?: string[];
  techStack?: string[];
  officeLocations?: string[];
  recruiter?: RecruiterInfo;
}

export interface CompanyReview {
  id: string;
  authorRole: string;
  rating: number;
  date: string;
  title: string;
  pros: string;
  cons: string;
  likesCount: number;
}

export interface SalaryInsight {
  role: string;
  expRange: string;
  avgSalary: string;
  minMax: string;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
  logoBg?: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  bannerImg: string;
  industry: string;
  companySize: string;
  website: string;
  linkedIn?: string;
  foundedYear: string;
  headquarters: string;
  about: string;
  mission: string;
  values: string[];
  benefits: { icon: string; title: string; desc: string }[];
  officePhotos: string[];
  videos?: { title: string; url: string; thumbnail: string }[];
  reviews: CompanyReview[];
  salaryInsights: SalaryInsight[];
  openJobsCount: number;
  hiringLocations: string[];
  faqs: { question: string; answer: string }[];
}

export interface ApplicationTimelineStep {
  step: 'Applied' | 'Viewed' | 'Shortlisted' | 'Interview Scheduled' | 'Assessment' | 'Offer' | 'Rejected';
  date: string;
  completed: boolean;
  current?: boolean;
  notes?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'Applied' | 'Viewed' | 'Shortlisted' | 'Interview Scheduled' | 'Assessment' | 'Offer' | 'Rejected';
  resumeName: string;
  coverLetter?: string;
  portfolioUrl?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  preferredLocation?: string;
  timeline: ApplicationTimelineStep[];
}

export interface UserEducation {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface UserExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface UserCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface UserProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  headline: string;
  bio: string;
  atsScore: number;
  profileCompletion: number;
  resumeName: string;
  resumeUrl: string;
  resumeLastUpdated: string;
  portfolioUrl: string;
  linkedIn: string;
  github: string;
  noticePeriod: string;
  expectedSalary: string;
  preferredLocation: string;
  skills: string[];
  languages: string[];
  achievements: string[];
  education: UserEducation[];
  experience: UserExperience[];
  projects: UserProject[];
  certifications: UserCertification[];
}

export interface InternshipItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  logoBg?: string;
  stipend: string;
  duration: string;
  location: string;
  mode: 'Remote' | 'In-office' | 'Hybrid';
  startDate: string;
  applyBy: string;
  skills: string[];
  perks: string[];
  openings: number;
}

export interface TrendingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  bgGradient: string;
  iconName: string;
  ctaText: string;
  ctaLink?: string;
}

export interface GovJobCategory {
  title: string;
  icon: string;
  count: number;
  items: { name: string; tag?: string; link?: string }[];
}

export interface CourseCategory {
  category: string;
  items: { title: string; duration: string; rating: number; learners: string; tag?: string }[];
}

export interface SuccessStory {
  id: string;
  studentName: string;
  studentPhoto: string;
  previousRole: string;
  currentRole: string;
  company: string;
  companyLogo: string;
  salaryIncrease: string;
  quote: string;
  branch?: string;
}

export interface CareerSwitchPath {
  id: string;
  title: string;
  fromRole: string;
  steps: { role: string; timeline: string; skills: string[] }[];
  avgSalary: string;
  demandGrowth: string;
  duration: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Students' | 'Employers' | 'General';
}

export interface SEOCategory {
  title: string;
  icon: string;
  items: { label: string; url: string; badge?: string }[];
}
