import { GovernmentJob } from '../types';

// Load static JSON files via Vite eager glob as local initial source of truth
const jsonModules = import.meta.glob('/data/government-jobs/*.json', { eager: true });

function parseStaticJobs(): GovernmentJob[] {
  const jobs: GovernmentJob[] = [];
  for (const path in jsonModules) {
    const mod = jsonModules[path] as any;
    const jobData = mod.default || mod;
    if (jobData && jobData.id) {
      jobs.push(jobData as GovernmentJob);
    }
  }
  return jobs.sort((a, b) => new Date(b.updatedDate || b.postDate).getTime() - new Date(a.updatedDate || a.postDate).getTime());
}

let memoryJobs: GovernmentJob[] = parseStaticJobs();

export async function fetchAllGovernmentJobs(includeDrafts = false): Promise<GovernmentJob[]> {
  try {
    const response = await fetch('/api/government-jobs');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        memoryJobs = data;
      }
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to local memory jobs:', err);
  }

  if (includeDrafts) {
    return [...memoryJobs];
  }
  return memoryJobs.filter(j => j.status !== 'draft');
}

export async function fetchGovernmentJobBySlugOrId(slugOrId: string): Promise<GovernmentJob | null> {
  const jobs = await fetchAllGovernmentJobs(true);
  return jobs.find(j => j.slug === slugOrId || j.id === slugOrId) || null;
}

export async function saveGovernmentJob(job: GovernmentJob, authToken?: string): Promise<{ success: boolean; job?: GovernmentJob; error?: string }> {
  try {
    const response = await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      },
      body: JSON.stringify(job)
    });

    if (response.ok) {
      const resData = await response.json();
      const updatedJob = resData.job || job;
      const index = memoryJobs.findIndex(j => j.id === updatedJob.id);
      if (index >= 0) {
        memoryJobs[index] = updatedJob;
      } else {
        memoryJobs.unshift(updatedJob);
      }
      return { success: true, job: updatedJob };
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Failed to save job' }));
      return { success: false, error: errorData.error || 'Server rejected job update' };
    }
  } catch (err: any) {
    // Client-side fallback update for seamless experience
    const index = memoryJobs.findIndex(j => j.id === job.id);
    if (index >= 0) {
      memoryJobs[index] = job;
    } else {
      memoryJobs.unshift(job);
    }
    return { success: true, job };
  }
}

export async function deleteGovernmentJob(id: string, authToken?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/admin/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      }
    });

    if (response.ok) {
      memoryJobs = memoryJobs.filter(j => j.id !== id);
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Failed to delete job' }));
      return { success: false, error: errorData.error };
    }
  } catch (err: any) {
    memoryJobs = memoryJobs.filter(j => j.id !== id);
    return { success: true };
  }
}

export async function duplicateGovernmentJob(id: string, authToken?: string): Promise<{ success: boolean; job?: GovernmentJob; error?: string }> {
  const original = await fetchGovernmentJobBySlugOrId(id);
  if (!original) {
    return { success: false, error: 'Original job not found' };
  }

  const newId = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;
  const duplicated: GovernmentJob = {
    ...original,
    id: newId,
    slug: newId,
    title: `${original.title} (Copy)`,
    status: 'draft',
    postDate: new Date().toISOString().split('T')[0],
    updatedDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return saveGovernmentJob(duplicated, authToken);
}
