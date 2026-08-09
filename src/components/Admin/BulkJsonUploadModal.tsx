import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileJson, 
  Code, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Copy, 
  Check, 
  Trash2, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GovernmentJob } from '../../types';
import { bulkSaveGovernmentJobs } from '../../lib/govJobs';

interface BulkJsonUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SAMPLE_JOB_JSON = [
  {
    "title": "SSC CGL Recruitment 2026",
    "organization": "Staff Selection Commission",
    "category": "SSC",
    "state": "All India",
    "status": "active",
    "postDate": "2026-08-01",
    "updatedDate": "2026-08-09",
    "vacancyDetails": {
      "totalVacancy": 14000,
      "postTable": [
        { "postName": "Assistant Audit Officer", "total": "1200", "qualification": "Bachelor's Degree" },
        { "postName": "Inspector (CGST)", "total": "3500", "qualification": "Bachelor's Degree" }
      ]
    },
    "importantDates": [
      { "event": "Apply Online Start", "date": "10 August 2026", "isHighlighted": true },
      { "event": "Last Date to Apply", "date": "15 September 2026", "isHighlighted": false }
    ],
    "applicationFee": [
      { "category": "General / OBC / EWS", "amount": "₹100" },
      { "category": "SC / ST / Female", "amount": "₹0 (Exempted)" }
    ],
    "eligibility": [
      { "title": "Age Limit", "details": "18 to 30 years as on 01/08/2026. Age relaxation as per rules." },
      { "title": "Educational Qualification", "details": "Bachelor's Degree in any discipline from a recognized University." }
    ]
  }
];

export const BulkJsonUploadModal: React.FC<BulkJsonUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [tab, setTab] = useState<'upload' | 'paste'>('upload');
  const [jsonText, setJsonText] = useState('');
  const [parsedJobs, setParsedJobs] = useState<Array<{ file?: string; data: Partial<GovernmentJob>; isValid: boolean; error?: string }>>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; count?: number; errors?: any[]; error?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process files
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setParseError(null);
    setUploadResult(null);

    const newParsed: Array<{ file?: string; data: Partial<GovernmentJob>; isValid: boolean; error?: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const text = await file.text();
        const json = JSON.parse(text);

        if (Array.isArray(json)) {
          json.forEach((item, idx) => {
            if (item && typeof item === 'object' && item.title) {
              newParsed.push({ file: `${file.name} [#${idx + 1}]`, data: item, isValid: true });
            } else {
              newParsed.push({ file: `${file.name} [#${idx + 1}]`, data: item || {}, isValid: false, error: 'Missing "title" property' });
            }
          });
        } else if (json && typeof json === 'object') {
          if (json.jobs && Array.isArray(json.jobs)) {
            json.jobs.forEach((item: any, idx: number) => {
              if (item && typeof item === 'object' && item.title) {
                newParsed.push({ file: `${file.name} [job #${idx + 1}]`, data: item, isValid: true });
              } else {
                newParsed.push({ file: `${file.name} [job #${idx + 1}]`, data: item || {}, isValid: false, error: 'Missing "title" property' });
              }
            });
          } else if (json.title) {
            newParsed.push({ file: file.name, data: json, isValid: true });
          } else {
            newParsed.push({ file: file.name, data: json, isValid: false, error: 'Missing required "title" property' });
          }
        } else {
          newParsed.push({ file: file.name, data: {}, isValid: false, error: 'Invalid JSON structure' });
        }
      } catch (err: any) {
        newParsed.push({ file: file.name, data: {}, isValid: false, error: `Syntax error: ${err.message}` });
      }
    }

    setParsedJobs(prev => [...prev, ...newParsed]);
  };

  // Process pasted JSON
  const handleParsePastedJson = () => {
    setParseError(null);
    setUploadResult(null);
    if (!jsonText.trim()) {
      setParseError('Please paste valid JSON content');
      return;
    }

    try {
      const json = JSON.parse(jsonText);
      const items: Array<{ file?: string; data: Partial<GovernmentJob>; isValid: boolean; error?: string }> = [];

      if (Array.isArray(json)) {
        json.forEach((item, idx) => {
          if (item && typeof item === 'object' && item.title) {
            items.push({ file: `Pasted Record #${idx + 1}`, data: item, isValid: true });
          } else {
            items.push({ file: `Pasted Record #${idx + 1}`, data: item || {}, isValid: false, error: 'Missing "title" property' });
          }
        });
      } else if (json && typeof json === 'object') {
        if (json.jobs && Array.isArray(json.jobs)) {
          json.jobs.forEach((item: any, idx: number) => {
            if (item && typeof item === 'object' && item.title) {
              items.push({ file: `Pasted Job #${idx + 1}`, data: item, isValid: true });
            } else {
              items.push({ file: `Pasted Job #${idx + 1}`, data: item || {}, isValid: false, error: 'Missing "title" property' });
            }
          });
        } else if (json.title) {
          items.push({ file: 'Pasted Job', data: json, isValid: true });
        } else {
          items.push({ file: 'Pasted Object', data: json, isValid: false, error: 'Missing "title" property' });
        }
      } else {
        setParseError('JSON must be an object or an array of objects');
        return;
      }

      setParsedJobs(items);
    } catch (err: any) {
      setParseError(`JSON Syntax Error: ${err.message}`);
    }
  };

  const handleRemoveItem = (index: number) => {
    setParsedJobs(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setParsedJobs([]);
    setJsonText('');
    setParseError(null);
    setUploadResult(null);
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(JSON.stringify(SAMPLE_JOB_JSON, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSample = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SAMPLE_JOB_JSON, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "sample-government-job.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleStartBulkUpload = async () => {
    const validJobs = parsedJobs.filter(j => j.isValid).map(j => j.data);
    if (validJobs.length === 0) {
      alert('No valid job records ready for upload');
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    const res = await bulkSaveGovernmentJobs(validJobs);
    setIsUploading(false);
    setUploadResult(res);

    if (res.success && res.count && res.count > 0) {
      setTimeout(() => {
        onSuccess();
      }, 1200);
    }
  };

  const validCount = parsedJobs.filter(j => j.isValid).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Bulk Upload Government Jobs (JSON)
              </h2>
              <p className="text-xs text-slate-500">
                Upload multiple <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono font-bold">.json</code> files or paste array of job objects into CMS database.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Tabs & Template Tools */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setTab('upload')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                tab === 'upload' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Select JSON Files</span>
            </button>
            <button
              onClick={() => setTab('paste')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                tab === 'paste' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Paste Raw JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleCopySample}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied Template!' : 'Copy Sample JSON'}</span>
            </button>
            <button
              onClick={handleDownloadSample}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Sample .json</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1">
          {tab === 'upload' && (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFilesSelected(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 transition-all rounded-2xl p-8 text-center cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                />

                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FileJson className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-slate-900 text-sm">
                  Click or Drag & Drop Government Job .JSON Files Here
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  You can select single or multiple files (e.g. <code className="font-mono text-emerald-800 bg-emerald-100 px-1 rounded">ssc-cgl-2026.json</code>, <code className="font-mono text-emerald-800 bg-emerald-100 px-1 rounded">rrb-ntpc.json</code>).
                </p>
              </div>
            </div>
          )}

          {tab === 'paste' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Paste JSON Array or Job Objects</span>
                <span className="text-[10px] text-slate-400 font-normal">Supports single object or Array [...]</span>
              </label>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder={`[\n  {\n    "title": "UPSC Civil Services 2026",\n    "organization": "UPSC",\n    "category": "UPSC",\n    "state": "All India",\n    "status": "active"\n  }\n]`}
                rows={8}
                className="w-full p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleParsePastedJson}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Parse Pasted JSON Text</span>
              </button>
            </div>
          )}

          {parseError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Preview Parsed Items */}
          {parsedJobs.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                  <span>Detected Records Preview ({parsedJobs.length})</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {validCount} Valid
                  </span>
                </div>

                <button
                  onClick={handleClearAll}
                  className="text-slate-400 hover:text-red-600 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Preview</span>
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {parsedJobs.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                      item.isValid
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-red-50/60 border-red-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        {item.isValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        <span className="font-bold text-slate-900">
                          {item.data.title || item.file || 'Untitled Job Record'}
                        </span>
                        {item.file && (
                          <span className="text-[10px] text-slate-400 font-mono">({item.file})</span>
                        )}
                      </div>

                      {item.isValid ? (
                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 pl-6">
                          <span>Org: <strong className="text-slate-700">{item.data.organization || 'Govt Dept'}</strong></span>
                          <span>•</span>
                          <span>Cat: <strong className="text-slate-700">{item.data.category || 'Central Govt'}</strong></span>
                          <span>•</span>
                          <span>Vacancies: <strong className="text-slate-700">{item.data.vacancyDetails?.totalVacancy || 0}</strong></span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-red-600 font-bold pl-6">
                          Error: {item.error}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Status Alert */}
          {uploadResult && (
            <div className={`p-4 rounded-xl border text-xs ${
              uploadResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="font-bold text-sm flex items-center gap-2 mb-1">
                {uploadResult.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                <span>{uploadResult.success ? `Successfully Published ${uploadResult.count} Job(s)!` : 'Bulk Upload Failed'}</span>
              </div>
              {uploadResult.error && <p className="mt-1">{uploadResult.error}</p>}
              {uploadResult.errors && uploadResult.errors.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="font-bold text-[11px]">Partial Warnings / Errors:</div>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                    {uploadResult.errors.map((e, idx) => (
                      <li key={idx}>{e.title ? `${e.title}: ` : ''}{e.error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            {validCount > 0 ? `${validCount} valid record(s) ready` : 'No records parsed yet'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleStartBulkUpload}
              disabled={isUploading || validCount === 0}
              className={`px-5 py-2.5 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 ${
                validCount === 0 || isUploading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing Records...</span>
                </>
              ) : (
                <>
                  <span>Publish {validCount} Job(s) to CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
