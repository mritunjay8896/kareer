import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Globe, 
  Linkedin, 
  Github, 
  CheckCircle2, 
  Plus, 
  Edit2, 
  Trash2,
  FileText
} from 'lucide-react';
import { UserProfileData } from '../types';
import { MOCK_USER_PROFILE } from '../data/mockData';
import { Breadcrumb } from '../components/UI/Breadcrumb';

interface ProfilePageProps {
  userProfile?: UserProfileData;
  onSaveProfile?: (profile: UserProfileData) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  onSaveProfile
}) => {
  const [profile, setProfile] = useState<UserProfileData>(userProfile || MOCK_USER_PROFILE);
  const [isSaved, setIsSaved] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    if (onSaveProfile) {
      onSaveProfile(profile);
    }
    setTimeout(() => setIsSaved(false), 3000);
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'My Candidate Profile' }]} />

        {/* Form Container */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-md flex-shrink-0"
              />
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">{profile.fullName}</h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">{profile.headline}</p>
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1-Click Fast Apply Ready
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Changes Saved!
                </span>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Personal & Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Professional Summary</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" /> Key Skills & Expertise
            </h2>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-100 flex items-center gap-1.5"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-rose-600">
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-sm pt-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skill (e.g. Next.js)"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800"
              >
                Add
              </button>
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Work Experience
            </h2>

            <div className="space-y-4">
              {profile.experience.map(exp => (
                <div key={exp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                    <span className="text-slate-400 font-medium">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="font-semibold text-blue-600">{exp.company} • {exp.location}</p>
                  <p className="text-slate-600 pt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" /> Education
            </h2>

            <div className="space-y-3">
              {profile.education.map(edu => (
                <div key={edu.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{edu.degree} - {edu.fieldOfStudy}</h3>
                    <span className="text-slate-400 font-medium">{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <p className="font-semibold text-slate-700">{edu.institution}</p>
                  <p className="text-emerald-600 font-bold">Grade: {edu.grade}</p>
                </div>
              ))}
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
