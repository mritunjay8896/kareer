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
