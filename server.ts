import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

const GOV_JOBS_DIR = path.join(process.cwd(), "data", "government-jobs");

// Ensure /data/government-jobs directory exists
if (!fs.existsSync(GOV_JOBS_DIR)) {
  fs.mkdirSync(GOV_JOBS_DIR, { recursive: true });
}

// Helper to read all government job files
function readAllGovJobs() {
  const jobs: any[] = [];
  try {
    if (fs.existsSync(GOV_JOBS_DIR)) {
      const files = fs.readdirSync(GOV_JOBS_DIR);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(GOV_JOBS_DIR, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          try {
            const parsed = JSON.parse(fileContent);
            jobs.push(parsed);
          } catch (e) {
            console.error(`Error parsing JSON file ${file}:`, e);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading government jobs directory:", err);
  }
  return jobs.sort(
    (a, b) => new Date(b.updatedDate || b.postDate).getTime() - new Date(a.updatedDate || a.postDate).getTime()
  );
}

// GitHub API sync helper
async function syncToGitHubRepo(filename: string, content: string, isDelete = false) {
  const token = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER || process.env.GITHUB_REPOSITORY_OWNER;
  const repoName = process.env.GITHUB_REPO_NAME || process.env.GITHUB_REPOSITORY?.split('/')[1];

  if (!token || !repoOwner || !repoName) {
    console.log("GitHub token/repo not configured in environment. File updated locally.");
    return;
  }

  const filePath = `data/government-jobs/${filename}`;
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  try {
    // Check if file exists to get SHA
    let sha: string | undefined;
    const getRes = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (getRes.ok) {
      const existingData = await getRes.json();
      sha = existingData.sha;
    }

    if (isDelete) {
      if (sha) {
        await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `admin: delete government job ${filename}`,
            sha,
          }),
        });
        console.log(`Synced deletion of ${filename} to GitHub`);
      }
    } else {
      const base64Content = Buffer.from(content).toString("base64");
      await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `admin: update government job ${filename}`,
          content: base64Content,
          ...(sha ? { sha } : {}),
        }),
      });
      console.log(`Synced update of ${filename} to GitHub`);
    }
  } catch (err) {
    console.error("Error syncing to GitHub API:", err);
  }
}

// Public API Routes
app.get("/api/government-jobs", (req, res) => {
  const jobs = readAllGovJobs();
  res.json(jobs);
});

// Dynamic XML Sitemap for Google Search & Discover
app.get("/sitemap.xml", (req, res) => {
  try {
    const jobs = readAllGovJobs();
    const domain = "https://glitread.com";
    const nowIso = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static Core Pages
    xml += `  <url>\n    <loc>${domain}/</loc>\n    <lastmod>${nowIso}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${domain}/government-jobs</loc>\n    <lastmod>${nowIso}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>0.95</priority>\n  </url>\n`;

    // Dynamic Job Detail Pages
    for (const job of jobs) {
      const slug = job.slug || job.id;
      const lastmod = job.updatedAt || job.createdAt || (job.updatedDate ? new Date(job.updatedDate).toISOString() : nowIso);
      xml += `  <url>\n`;
      xml += `    <loc>${domain}/government-jobs/${slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      if (job.ogImageUrl) {
        xml += `    <image:image>\n      <image:loc>${job.ogImageUrl}</image:loc>\n      <image:title>${job.title || "Government Job Notification"}</image:title>\n    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).send("Error generating sitemap");
  }
});

// Robots.txt for Search & Generative AI Crawlers
app.get("/robots.txt", (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

# Generative AI & LLM Search Engine Agents (GEO / SearchGPT / Perplexity / Gemini)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://glitread.com/sitemap.xml
`;
  res.header("Content-Type", "text/plain");
  res.send(robots);
});

// /llms.txt Standard for Generative AI Discovery & Indexing
app.get("/llms.txt", (req, res) => {
  try {
    const jobs = readAllGovJobs();
    const domain = "https://glitread.com";

    let md = `# Glitread — Government Exams & Jobs Portal\n\n`;
    md += `> Glitread provides authoritative, up-to-date notifications, eligibility rules, syllabus, age limits, and direct application links for all Central and State Government Exams in India (Sarkari Naukri).\n\n`;
    md += `## Primary Live Government Job Notifications\n\n`;

    for (const job of jobs) {
      const vacancies = job.vacancyDetails?.totalVacancy ? `${job.vacancyDetails.totalVacancy.toLocaleString()} Posts` : 'Multiple Vacancies';
      const lastDate = job.importantDates?.applicationLastDate || 'Check Notification';
      const org = job.organization || 'Govt Body';
      md += `- [${job.title}](${domain}/government-jobs/${job.slug || job.id}): ${org} | Vacancies: ${vacancies} | Last Date: ${lastDate}\n`;
    }

    md += `\n## Core Categories\n`;
    md += `- Central Govt Jobs: SSC, UPSC, Railway RRB, Banking (IBPS/SBI), Defense\n`;
    md += `- State Govt Jobs: All 28 Indian States & 8 Union Territories\n`;
    md += `- Website: ${domain}\n`;

    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(md);
  } catch (err) {
    res.status(500).send("Error generating llms.txt");
  }
});

// /llms-full.txt Detailed Markdown Directory for AI Knowledge Graphs
app.get("/llms-full.txt", (req, res) => {
  try {
    const jobs = readAllGovJobs();
    const domain = "https://glitread.com";

    let md = `# Glitread Government Exams Knowledge Graph & Directory\n\n`;

    for (const job of jobs) {
      md += `## ${job.title}\n`;
      md += `- **URL:** ${domain}/government-jobs/${job.slug || job.id}\n`;
      md += `- **Organization:** ${job.organization || 'N/A'}\n`;
      md += `- **Category:** ${job.category || 'Central Govt'}\n`;
      md += `- **State/Region:** ${job.state || 'All India'}\n`;
      md += `- **Total Vacancies:** ${job.vacancyDetails?.totalVacancy || 'N/A'}\n`;
      md += `- **Educational Qualification:** ${job.eligibility?.educationalQualification || 'Check Official Notice'}\n`;
      md += `- **Age Limit:** ${job.ageLimit?.minimumAge || 18} to ${job.ageLimit?.maximumAge || 35} years\n`;
      md += `- **Application Start:** ${job.importantDates?.applicationStart || 'N/A'}\n`;
      md += `- **Application Last Date:** ${job.importantDates?.applicationLastDate || 'N/A'}\n`;
      md += `- **Official Website:** ${job.officialWebsiteUrl || 'https://india.gov.in'}\n`;
      if (job.shortInformation) {
        md += `- **Summary:** ${job.shortInformation}\n`;
      }
      md += `\n---\n\n`;
    }

    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(md);
  } catch (err) {
    res.status(500).send("Error generating llms-full.txt");
  }
});

app.get("/api/government-jobs/:slugOrId", (req, res) => {
  const { slugOrId } = req.params;
  const jobs = readAllGovJobs();
  const job = jobs.find((j) => j.slug === slugOrId || j.id === slugOrId);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ error: "Government job not found" });
  }
});

// Admin API Routes
app.post("/api/admin/jobs", async (req, res) => {
  try {
    const jobData = req.body;
    if (!jobData || (!jobData.id && !jobData.slug) || !jobData.title) {
      return res.status(400).json({ error: "Invalid job data. 'title' and 'id' or 'slug' required." });
    }

    const slug = jobData.slug || jobData.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const id = jobData.id || slug;
    const nowIso = new Date().toISOString();
    const todayDate = new Date().toISOString().split("T")[0];

    const finalJob = {
      ...jobData,
      id,
      slug,
      updatedDate: todayDate,
      updatedAt: nowIso,
      createdAt: jobData.createdAt || nowIso,
    };

    const filename = `${slug}.json`;
    const filePath = path.join(GOV_JOBS_DIR, filename);
    const jsonStr = JSON.stringify(finalJob, null, 2);

    fs.writeFileSync(filePath, jsonStr, "utf-8");

    // Sync to GitHub if configured
    await syncToGitHubRepo(filename, jsonStr, false);

    res.json({ success: true, job: finalJob });
  } catch (err: any) {
    console.error("Error saving job:", err);
    res.status(500).json({ error: err.message || "Failed to save job JSON" });
  }
});

// Admin Bulk Upload API Route
app.post("/api/admin/jobs/bulk", async (req, res) => {
  try {
    const payload = req.body;
    let jobsList: any[] = [];

    if (Array.isArray(payload)) {
      jobsList = payload;
    } else if (payload && Array.isArray(payload.jobs)) {
      jobsList = payload.jobs;
    } else if (payload && typeof payload === 'object' && payload.title) {
      jobsList = [payload];
    } else {
      return res.status(400).json({ error: "Invalid bulk data. Provide an array of job JSON objects or { jobs: [...] }" });
    }

    if (jobsList.length === 0) {
      return res.status(400).json({ error: "No job items found in upload payload" });
    }

    const savedJobs: any[] = [];
    const errors: Array<{ index: number; title?: string; error: string }> = [];
    const nowIso = new Date().toISOString();
    const todayDate = new Date().toISOString().split("T")[0];

    for (let i = 0; i < jobsList.length; i++) {
      const jobData = jobsList[i];
      if (!jobData || typeof jobData !== 'object') {
        errors.push({ index: i, error: "Invalid JSON object" });
        continue;
      }

      if (!jobData.title) {
        errors.push({ index: i, error: "Missing required 'title' field" });
        continue;
      }

      const slugBase = jobData.slug || jobData.id || jobData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const slug = slugBase || `gov-job-${Date.now()}-${i}`;
      const id = jobData.id || slug;

      const finalJob = {
        category: "Central Govt",
        state: "All India",
        status: "active",
        importantDates: [],
        applicationFee: [],
        vacancyDetails: { totalVacancy: 0, postTable: [] },
        eligibility: [],
        syllabus: [],
        importantLinks: [],
        ...jobData,
        id,
        slug,
        updatedDate: jobData.updatedDate || todayDate,
        postDate: jobData.postDate || todayDate,
        updatedAt: nowIso,
        createdAt: jobData.createdAt || nowIso,
      };

      const filename = `${slug}.json`;
      const filePath = path.join(GOV_JOBS_DIR, filename);
      const jsonStr = JSON.stringify(finalJob, null, 2);

      try {
        fs.writeFileSync(filePath, jsonStr, "utf-8");
        await syncToGitHubRepo(filename, jsonStr, false);
        savedJobs.push(finalJob);
      } catch (e: any) {
        errors.push({ index: i, title: jobData.title, error: e.message || "File write error" });
      }
    }

    res.json({
      success: true,
      count: savedJobs.length,
      savedJobs,
      errors
    });
  } catch (err: any) {
    console.error("Error in bulk saving jobs:", err);
    res.status(500).json({ error: err.message || "Failed bulk job save" });
  }
});

app.delete("/api/admin/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = readAllGovJobs();
    const target = jobs.find((j) => j.id === id || j.slug === id);

    if (!target) {
      return res.status(404).json({ error: "Job not found" });
    }

    const filename = `${target.slug || target.id}.json`;
    const filePath = path.join(GOV_JOBS_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Sync deletion to GitHub if configured
    await syncToGitHubRepo(filename, "", true);

    res.json({ success: true, message: `Deleted job ${id}` });
  } catch (err: any) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: err.message || "Failed to delete job JSON" });
  }
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
