import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { GovernmentJob } from '../../types';
import { fetchGovernmentJobBySlugOrId, saveGovernmentJob } from '../../lib/govJobs';
import { ALL_INDIA_OPTION, INDIAN_STATES, UNION_TERRITORIES } from '../../data/indianStates';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  CreditCard,
  Users,
  GraduationCap,
  ListOrdered,
  BookOpen,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Link2,
  Video,
  Layers
} from 'lucide-react';

const emptyJob: GovernmentJob = {
  id: '',
  slug: '',
  title: '',
  organization: '',
  department: '',
  category: 'SSC',
  state: 'All India',
  language: 'English',
  postDate: new Date().toISOString().split('T')[0],
  updatedDate: new Date().toISOString().split('T')[0],
  status: 'draft',
  shortInformation: '',
  importantDates: {
    notificationDate: '',
    applicationStart: '',
    applicationLastDate: '',
    correctionStart: '',
    correctionLastDate: '',
    admitCardDate: '',
    examDate: '',
    resultDate: 'To Be Announced'
  },
  applicationFee: {
    general: 0,
    obc: 0,
    ews: 0,
    sc: 0,
    st: 0,
    female: 0,
    other: 0,
    paymentMode: 'Online via BHIM UPI, Net Banking, Credit/Debit Card'
  },
  ageLimit: {
    minimumAge: 18,
    maximumAge: 30,
    ageCalculationDate: ''
  },
  ageRelaxation: [
    { category: 'SC / ST', relaxationYears: '5 Years' },
    { category: 'OBC', relaxationYears: '3 Years' }
  ],
  vacancyDetails: {
    totalVacancy: 0,
    note: ''
  },
  postNames: ['General Posts'],
  categoryWiseVacancy: [],
  eligibility: {
    educationalQualification: '',
    nationality: 'Indian',
    experience: 'No prior experience required.',
    physicalRequirements: '',
    otherRequirements: ''
  },
  nationality: 'Indian',
  howToApply: [
    'Visit official website.',
    'Fill the online application form.',
    'Upload required documents and photo.',
    'Pay the application fee online.',
    'Submit and keep printout for reference.'
  ],
  youtubeVideoId: '',
  applyOnlineUrl: '',
  officialNotificationUrl: '',
  officialWebsiteUrl: '',
  syllabus: [],
  examPattern: [],
  previousYearData: [],
  cutoffData: [],
  topicWiseWeightage: [],
  mockTestId: '',
  mockTestUrl: '',
  relatedJobs: []
};

import { 
  getOptimizedMetaTitle, 
  getOptimizedMetaDescription, 
  getOptimizedKeywords, 
  generateJobPostingSchema, 
  generateBreadcrumbSchema, 
  generateFaqSchema, 
  generateAutomatedJobFaqs,
  SITE_DOMAIN
} from '../../utils/seoHelpers';

type FormSection = 
  | 'basic' 
  | 'dates_fees' 
  | 'vacancy_age' 
  | 'eligibility' 
  | 'how_to_apply' 
  | 'syllabus' 
  | 'pattern' 
  | 'previous_data' 
  | 'links_media'
  | 'seo_discover';

export const AdminJobFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<GovernmentJob>(emptyJob);
  const [activeTab, setActiveTab] = useState<FormSection>('basic');
  const [loading, setLoading] = useState<boolean>(isEditMode);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchGovernmentJobBySlugOrId(id).then((data) => {
        if (data) {
          setFormData(data);
        } else {
          setSaveError(`Job with ID or slug '${id}' not found.`);
        }
        setLoading(false);
      });
    }
  }, [id]);

  // Handle Basic Auto-slug generation
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!isEditMode && !formData.id) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        title,
        id: generatedSlug,
        slug: generatedSlug
      }));
    } else {
      setFormData(prev => ({ ...prev, title }));
    }
  };

  const handleSave = async (statusOverride?: 'draft' | 'active' | 'closed' | 'upcoming') => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    const targetStatus = statusOverride || formData.status;
    const today = new Date().toISOString().split('T')[0];

    const payload: GovernmentJob = {
      ...formData,
      status: targetStatus,
      updatedDate: today,
      updatedAt: new Date().toISOString()
    };

    const res = await saveGovernmentJob(payload);
    setSaving(false);

    if (res.success && res.job) {
      setFormData(res.job);
      setSaveSuccess(`Job successfully saved as JSON file: /data/government-jobs/${res.job.slug}.json`);
      setTimeout(() => setSaveSuccess(null), 5000);
      if (!isEditMode) {
        navigate(`/admin/jobs/${res.job.id}/edit`, { replace: true });
      }
    } else {
      setSaveError(res.error || 'Failed to save government job JSON file.');
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-slate-600">Loading Job JSON configuration...</p>
      </div>
    );
  }

  const sections: { id: FormSection; label: string; icon: any }[] = [
    { id: 'basic', label: '1. Basic Info', icon: Layers },
    { id: 'dates_fees', label: '2. Dates & Fees', icon: Calendar },
    { id: 'vacancy_age', label: '3. Vacancies & Age', icon: Users },
    { id: 'eligibility', label: '4. Eligibility', icon: GraduationCap },
    { id: 'how_to_apply', label: '5. How To Apply', icon: ListOrdered },
    { id: 'syllabus', label: '6. Syllabus', icon: BookOpen },
    { id: 'pattern', label: '7. Exam Pattern', icon: FileSpreadsheet },
    { id: 'previous_data', label: '8. Cutoff & Analytics', icon: BarChart3 },
    { id: 'links_media', label: '9. Official Links & Video', icon: Link2 },
    { id: 'seo_discover', label: '10. SEO & Google Discover', icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-20 z-20">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/jobs"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              {isEditMode ? `Edit Recruitment JSON: ${formData.title || formData.id}` : 'Create New Government Recruitment JSON'}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              /data/government-jobs/{formData.slug || 'new-job'}.json
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {formData.slug && (
            <Link
              to={`/government-jobs/${formData.slug}`}
              target="_blank"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Preview Page</span>
            </Link>
          )}

          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-300" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => handleSave('active')}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Active</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alert Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-semibold rounded-xl">
          {saveError}
        </div>
      )}

      {/* Tab Navigation Navigation */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeTab === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* TAB 1: BASIC INFORMATION */}
        {activeTab === 'basic' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2">
              Basic Recruitment Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Recruitment Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g., SSC CGL Recruitment 2026 Notice (17,727 Posts)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unique JSON Slug / ID *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value, id: e.target.value }))}
                  placeholder="e.g., ssc-cgl-recruitment-2026"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                >
                  <option value="draft">Draft (Hidden from Public Website)</option>
                  <option value="active">Active (Live Recruitment)</option>
                  <option value="upcoming">Upcoming (Announced Soon)</option>
                  <option value="closed">Closed (Applications Ended)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Conducting Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="e.g., Staff Selection Commission (SSC)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department / Ministry</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g., Department of Personnel & Training"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exam Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                >
                  {['SSC', 'Banking', 'Railways', 'UPSC', 'Police', 'Teaching', 'Defense', 'State PSC', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State / Region *</label>
                <select
                  value={
                    [ALL_INDIA_OPTION, ...INDIAN_STATES, ...UNION_TERRITORIES].includes(formData.state)
                      ? formData.state
                      : 'CUSTOM'
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'CUSTOM') {
                      setFormData(prev => ({ ...prev, state: '' }));
                    } else {
                      setFormData(prev => ({ ...prev, state: val }));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                >
                  <option value={ALL_INDIA_OPTION}>All India / Central Govt</option>
                  
                  <optgroup label="28 Indian States">
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </optgroup>

                  <optgroup label="8 Union Territories">
                    {UNION_TERRITORIES.map((ut) => (
                      <option key={ut} value={ut}>{ut}</option>
                    ))}
                  </optgroup>

                  <option value="CUSTOM">Custom State / Multiple States...</option>
                </select>

                {(![ALL_INDIA_OPTION, ...INDIAN_STATES, ...UNION_TERRITORIES].includes(formData.state)) && (
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Enter custom state or region (e.g. UP & MP)"
                    className="w-full mt-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notification Language / Exam Medium</label>
                <select
                  value={(formData as any).language || 'English'}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value } as any))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                >
                  <option value="English">English Medium</option>
                  <option value="Hindi">हिन्दी / Hindi Medium</option>
                  <option value="Bilingual">Bilingual (English + Hindi)</option>
                  <option value="Regional">Regional Language (Tamil, Telugu, Bengali, etc.)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Information / Summary</label>
                <textarea
                  rows={3}
                  value={formData.shortInformation}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortInformation: e.target.value }))}
                  placeholder="Brief overview of recruitment notification, who conducts it, eligible candidates, etc."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATES & FEES */}
        {activeTab === 'dates_fees' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2 mb-4">
                Important Recruitment Schedule
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Notification Release Date</label>
                  <input
                    type="text"
                    value={formData.importantDates.notificationDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      importantDates: { ...prev.importantDates, notificationDate: e.target.value }
                    }))}
                    placeholder="e.g., 01 Aug 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Application Start Date</label>
                  <input
                    type="text"
                    value={formData.importantDates.applicationStart}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      importantDates: { ...prev.importantDates, applicationStart: e.target.value }
                    }))}
                    placeholder="e.g., 01 Aug 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Application Last Date *</label>
                  <input
                    type="text"
                    value={formData.importantDates.applicationLastDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      importantDates: { ...prev.importantDates, applicationLastDate: e.target.value }
                    }))}
                    placeholder="e.g., 31 Aug 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admit Card Date</label>
                  <input
                    type="text"
                    value={formData.importantDates.admitCardDate || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      importantDates: { ...prev.importantDates, admitCardDate: e.target.value }
                    }))}
                    placeholder="e.g., September 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exam Date</label>
                  <input
                    type="text"
                    value={formData.importantDates.examDate || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      importantDates: { ...prev.importantDates, examDate: e.target.value }
                    }))}
                    placeholder="e.g., 22 Sep 2026 - 10 Oct 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Result Date</label>
                  <input
                    type="text"
                    value={formData.importantDates.resultDate || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      importantDates: { ...prev.importantDates, resultDate: e.target.value }
                    }))}
                    placeholder="e.g., To Be Announced"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2 mb-4">
                Category-wise Application Fee Structure (₹)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['general', 'obc', 'ews', 'sc', 'st', 'female', 'other'].map((catKey) => (
                  <div key={catKey}>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{catKey} Fee (₹)</label>
                    <input
                      type="number"
                      value={(formData.applicationFee as any)[catKey] || 0}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        applicationFee: { ...prev.applicationFee, [catKey]: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                ))}
                <div className="col-span-2 sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Modes</label>
                  <input
                    type="text"
                    value={formData.applicationFee.paymentMode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      applicationFee: { ...prev.applicationFee, paymentMode: e.target.value }
                    }))}
                    placeholder="Online via Net Banking, BHIM UPI, Debit/Credit Card"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VACANCY & AGE */}
        {activeTab === 'vacancy_age' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2 mb-4">
                Total Vacancies & Post Distribution
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Vacancy Count *</label>
                  <input
                    type="number"
                    value={formData.vacancyDetails.totalVacancy}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vacancyDetails: { ...prev.vacancyDetails, totalVacancy: Number(e.target.value) }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vacancy Notes / Disclaimer</label>
                  <input
                    type="text"
                    value={formData.vacancyDetails.note || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vacancyDetails: { ...prev.vacancyDetails, note: e.target.value }
                    }))}
                    placeholder="e.g., Vacancies are tentative and subject to change."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Category Wise Vacancy Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Post-wise & Category Breakdown Table
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    categoryWiseVacancy: [
                      ...prev.categoryWiseVacancy,
                      { postName: 'New Post Name', ur: 0, obc: 0, sc: 0, st: 0, ews: 0, other: 0, total: 0 }
                    ]
                  }))}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-emerald-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Post Breakdown Row</span>
                </button>
              </div>

              {formData.categoryWiseVacancy.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                  No post breakdown rows added yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 font-bold text-slate-600">
                      <tr>
                        <th className="p-2">Post Name</th>
                        <th className="p-2 w-16">UR</th>
                        <th className="p-2 w-16">OBC</th>
                        <th className="p-2 w-16">SC</th>
                        <th className="p-2 w-16">ST</th>
                        <th className="p-2 w-16">EWS</th>
                        <th className="p-2 w-20">Total</th>
                        <th className="p-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {formData.categoryWiseVacancy.map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-1">
                            <input
                              type="text"
                              value={row.postName}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData(prev => {
                                  const list = [...prev.categoryWiseVacancy];
                                  list[idx].postName = val;
                                  return { ...prev, categoryWiseVacancy: list };
                                });
                              }}
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                            />
                          </td>
                          {['ur', 'obc', 'sc', 'st', 'ews'].map((catKey) => (
                            <td key={catKey} className="p-1">
                              <input
                                type="number"
                                value={(row as any)[catKey]}
                                onChange={(e) => {
                                  const num = Number(e.target.value);
                                  setFormData(prev => {
                                    const list = [...prev.categoryWiseVacancy];
                                    (list[idx] as any)[catKey] = num;
                                    list[idx].total = list[idx].ur + list[idx].obc + list[idx].sc + list[idx].st + list[idx].ews + (list[idx].other || 0);
                                    return { ...prev, categoryWiseVacancy: list };
                                  });
                                }}
                                className="w-full px-1 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-semibold"
                              />
                            </td>
                          ))}
                          <td className="p-1 font-bold text-slate-900">{row.total}</td>
                          <td className="p-1 text-center">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                categoryWiseVacancy: prev.categoryWiseVacancy.filter((_, i) => i !== idx)
                              }))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Age Limits */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2 mb-4">
                Age Requirements & Category Relaxation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Minimum Age (Years)</label>
                  <input
                    type="number"
                    value={formData.ageLimit.minimumAge}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ageLimit: { ...prev.ageLimit, minimumAge: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Maximum Age (Years)</label>
                  <input
                    type="number"
                    value={formData.ageLimit.maximumAge}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ageLimit: { ...prev.ageLimit, maximumAge: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age Calculation Cutoff Date</label>
                  <input
                    type="text"
                    value={formData.ageLimit.ageCalculationDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ageLimit: { ...prev.ageLimit, ageCalculationDate: e.target.value }
                    }))}
                    placeholder="e.g., 01 Aug 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ELIGIBILITY */}
        {activeTab === 'eligibility' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2">
              Candidate Qualifications & Physical Criteria
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Educational Qualification *</label>
              <textarea
                rows={3}
                value={formData.eligibility.educationalQualification}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  eligibility: { ...prev.eligibility, educationalQualification: e.target.value }
                }))}
                placeholder="e.g., Bachelor Degree (Graduation) in any discipline from a recognized University in India."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Physical Requirements (if any)</label>
              <textarea
                rows={2}
                value={formData.eligibility.physicalRequirements || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  eligibility: { ...prev.eligibility, physicalRequirements: e.target.value }
                }))}
                placeholder="e.g., Height: 168 cm for Male; 152 cm for Female..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Experience Requirements</label>
              <input
                type="text"
                value={formData.eligibility.experience || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  eligibility: { ...prev.eligibility, experience: e.target.value }
                }))}
                placeholder="e.g., Freshers eligible. No prior experience required."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
        )}

        {/* TAB 5: HOW TO APPLY */}
        {activeTab === 'how_to_apply' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600">
                Numbered Step-by-Step Application Instructions
              </h3>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  howToApply: [...prev.howToApply, 'New application step instruction.']
                }))}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.howToApply.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const list = [...prev.howToApply];
                        list[idx] = val;
                        return { ...prev, howToApply: list };
                      });
                    }}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      howToApply: prev.howToApply.filter((_, i) => i !== idx)
                    }))}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600">
                Detailed Subject-wise Syllabus
              </h3>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  syllabus: [...prev.syllabus, { subject: 'New Subject Name', topics: ['Topic 1', 'Topic 2'] }]
                }))}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Subject</span>
              </button>
            </div>

            {formData.syllabus.map((syl, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={syl.subject}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const list = [...prev.syllabus];
                        list[idx].subject = val;
                        return { ...prev, syllabus: list };
                      });
                    }}
                    placeholder="Subject Name (e.g. General Awareness)"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      syllabus: prev.syllabus.filter((_, i) => i !== idx)
                    }))}
                    className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Subject</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Topics (comma-separated)</label>
                  <input
                    type="text"
                    value={syl.topics.join(', ')}
                    onChange={(e) => {
                      const topicsArr = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setFormData(prev => {
                        const list = [...prev.syllabus];
                        list[idx].topics = topicsArr;
                        return { ...prev, syllabus: list };
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: EXAM PATTERN */}
        {activeTab === 'pattern' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600">
                Examination Pattern Table
              </h3>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  examPattern: [
                    ...prev.examPattern,
                    { subject: 'New Test Subject', questions: 25, marks: 50, duration: '60 Mins', negativeMarking: '0.50 Marks', mode: 'Online CBT' }
                  ]
                }))}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Test Paper Row</span>
              </button>
            </div>

            {formData.examPattern.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No exam pattern rows defined.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-600">
                    <tr>
                      <th className="p-2">Subject / Paper</th>
                      <th className="p-2 w-20">Questions</th>
                      <th className="p-2 w-20">Marks</th>
                      <th className="p-2 w-28">Duration</th>
                      <th className="p-2 w-28">Negative Mark</th>
                      <th className="p-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {formData.examPattern.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-1">
                          <input
                            type="text"
                            value={row.subject}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData(prev => {
                                const list = [...prev.examPattern];
                                list[idx].subject = val;
                                return { ...prev, examPattern: list };
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            type="number"
                            value={row.questions}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setFormData(prev => {
                                const list = [...prev.examPattern];
                                list[idx].questions = val;
                                return { ...prev, examPattern: list };
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            type="number"
                            value={row.marks}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setFormData(prev => {
                                const list = [...prev.examPattern];
                                list[idx].marks = val;
                                return { ...prev, examPattern: list };
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            type="text"
                            value={row.duration}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData(prev => {
                                const list = [...prev.examPattern];
                                list[idx].duration = val;
                                return { ...prev, examPattern: list };
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            type="text"
                            value={row.negativeMarking}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData(prev => {
                                const list = [...prev.examPattern];
                                list[idx].negativeMarking = val;
                                return { ...prev, examPattern: list };
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-1 text-center">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              examPattern: prev.examPattern.filter((_, i) => i !== idx)
                            }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: CUTOFF & PREVIOUS YEAR ANALYTICS */}
        {activeTab === 'previous_data' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600">
                  Cutoff Marks History
                </h3>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    cutoffData: [...prev.cutoffData, { year: '2025 Tier 1', category: 'UR (Unreserved)', cutoff: 135.0 }]
                  }))}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Cutoff Record</span>
                </button>
              </div>

              {formData.cutoffData.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No cutoff records present.</p>
              ) : (
                <div className="space-y-2">
                  {formData.cutoffData.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={c.year}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => {
                            const list = [...prev.cutoffData];
                            list[idx].year = val;
                            return { ...prev, cutoffData: list };
                          });
                        }}
                        placeholder="Year / Stage"
                        className="w-32 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                      />
                      <input
                        type="text"
                        value={c.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => {
                            const list = [...prev.cutoffData];
                            list[idx].category = val;
                            return { ...prev, cutoffData: list };
                          });
                        }}
                        placeholder="Category"
                        className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                      />
                      <input
                        type="text"
                        value={c.cutoff}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => {
                            const list = [...prev.cutoffData];
                            list[idx].cutoff = val;
                            return { ...prev, cutoffData: list };
                          });
                        }}
                        placeholder="Cutoff Score"
                        className="w-28 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-emerald-700"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          cutoffData: prev.cutoffData.filter((_, i) => i !== idx)
                        }))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 9: LINKS & MEDIA */}
        {activeTab === 'links_media' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600 border-b border-slate-100 pb-2">
              Official Links, Video Walkthrough & Mock Tests
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Apply Online URL</label>
                <input
                  type="url"
                  value={formData.applyOnlineUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, applyOnlineUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Notification PDF URL</label>
                <input
                  type="url"
                  value={formData.officialNotificationUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, officialNotificationUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={formData.officialWebsiteUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, officialWebsiteUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Video ID (Hindi Form Guide)</label>
                <input
                  type="text"
                  value={formData.youtubeVideoId || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtubeVideoId: e.target.value }))}
                  placeholder="e.g., YIn_Yp2pM1k (Do NOT download video)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mock Test URL</label>
                <input
                  type="text"
                  value={formData.mockTestUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, mockTestUrl: e.target.value }))}
                  placeholder="/mock-tests?exam=ssc-cgl"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: SEO & GOOGLE DISCOVER */}
        {activeTab === 'seo_discover' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-600">
                  Search Engine Optimization & Google Discover Configuration
                </h3>
                <p className="text-xs text-slate-500">
                  Configure custom meta titles, descriptions, keywords, and previews to maximize Google Discover & Search rankings.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Controls Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Custom SEO Meta Title (Leave blank for auto-generator)
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder={getOptimizedMetaTitle(formData)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Current Title Length: {(formData.metaTitle || getOptimizedMetaTitle(formData)).length} chars (Recommended: 50-65)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Custom SEO Meta Description (Leave blank for auto-generator)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.metaDescription || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder={getOptimizedMetaDescription(formData)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Current Description Length: {(formData.metaDescription || getOptimizedMetaDescription(formData)).length} chars (Recommended: 120-160)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords ? formData.keywords.join(', ') : ''}
                    onChange={(e) => {
                      const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setFormData(prev => ({ ...prev, keywords: arr }));
                    }}
                    placeholder={getOptimizedKeywords(formData).join(', ')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Discover Card Image URL (High Resolution Image)
                  </label>
                  <input
                    type="url"
                    value={formData.ogImageUrl || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, ogImageUrl: e.target.value }))}
                    placeholder="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Google Discover requires high-resolution images (min 1200px wide) for maximum click-through rates.
                  </span>
                </div>
              </div>

              {/* Live Preview Column */}
              <div className="space-y-5">
                {/* 1. Google Search SERP Snippet Preview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Live Google Search Snippet Preview</span>
                  </div>
                  
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs font-sans">
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 truncate">
                      <span className="font-bold text-slate-800">Glitread</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 truncate">{`${SITE_DOMAIN}/government-jobs/${formData.slug || 'job-id'}`}</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-800 hover:underline cursor-pointer mt-0.5 line-clamp-1">
                      {getOptimizedMetaTitle(formData)}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-snug">
                      {getOptimizedMetaDescription(formData)}
                    </p>
                  </div>
                </div>

                {/* 2. Google Discover Feed Card Preview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Google Discover Mobile Feed Card Preview</span>
                  </div>

                  <div className="max-w-xs mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="h-36 bg-slate-200 relative overflow-hidden">
                      <img
                        src={formData.ogImageUrl || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"}
                        alt={formData.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                        {formData.organization || 'Govt Notice'}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">
                        {formData.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {formData.shortInformation || getOptimizedMetaDescription(formData)}
                      </p>
                      <div className="mt-2 text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span>glitread.com</span>
                        <span>{formData.updatedDate || 'Today'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Schema JSON Inspector */}
            <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  Auto-Generated Google JobPosting JSON-LD Schema
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-mono">
                  Schema.org / JobPosting
                </span>
              </div>
              <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-xl overflow-x-auto text-slate-300 max-h-48 border border-slate-800">
                {JSON.stringify(generateJobPostingSchema(formData), null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
