import { NextResponse } from "next/server";

// Explicit TypeScript interfaces to fix all ts(7006) errors
interface RequestBody {
  skills?: string;
  level?: string;
  interest?: string;
}

interface GitHubLabel {
  name: string;
}

interface GitHubReaction {
  total_count: number;
}

interface GitHubIssue {
  number: number;
  title: string;
  html_url: string;
  body?: string;
  labels?: GitHubLabel[];
  reactions?: GitHubReaction;
  comments?: number;
  repository_url?: string;
}

interface RepoInfo {
  full_name: string;
  name: string;
  stars: number;
  open_issues_count: number;
  pushed_at: string;
  topics: string[];
}

interface ProcessedIssue {
  title: string;
  html_url: string;
  repo_name: string;
  labels: string[];
  reactions: number;
  comments: number;
  repo_stars: number;
}

interface FinalScoreIssue extends ProcessedIssue {
  finalScore: number;
  labelBoost: number;
}

// Dynamic repo mapping based on skills and interests
const SKILL_TO_REPOS: Record<string, string[]> = {
  "javascript": ["facebook/react", "vuejs/vue", "angular/angular", "sveltejs/svelte"],
  "typescript": ["microsoft/TypeScript", "facebook/react", "angular/angular"],
  "python": ["django/django", "pandas-dev/pandas", "fastai/fastai", "tiangolo/fastapi"],
  "react": ["facebook/react", "remix-run/remix", "vitejs/vite"],
  "node": ["nodejs/node", "expressjs/express", "nestjs/nest"],
  "go": ["golang/go"],
  "rust": ["rust-lang/rust"],
  "java": ["spring-projects/spring-framework"],
  "ml": ["tensorflow/tensorflow", "pytorch/pytorch", "huggingface/transformers"],
  "web": ["vercel/next.js", "nuxt/nuxt", "sveltekit/sveltekit"],
  "css": ["tailwindlabs/tailwindcss", "postcss/postcss"],
  "devops": ["kubernetes/kubernetes", "docker/docker", "helm/helm"],
  "testing": ["jestjs/jest", "vitest-dev/vitest", "cypress-io/cypress"],
  "backend": ["expressjs/express", "nestjs/nest", "fastapi/fastapi"],
  "frontend": ["facebook/react", "vuejs/vue", "angular/angular"],
  "mobile": ["facebook/react-native", "flutter/flutter"],
  "api": ["expressjs/express", "fastapi/fastapi", "nestjs/nest"],
  "database": ["prisma/prisma", "sequelize/sequelize", "typeorm/typeorm"],
  "cloud": ["aws/aws-cli", "google/cloud-sdk-python", "azure/azure-cli"]
};

const INTEREST_TO_REPOS: Record<string, string[]> = {
  "web development": ["vercel/next.js", "facebook/react", "vuejs/vue", "tailwindlabs/tailwindcss"],
  "machine learning": ["tensorflow/tensorflow", "pytorch/pytorch", "scikit-learn/scikit-learn"],
  "data science": ["pandas-dev/pandas", "numpy/numpy", "jupyter/notebook"],
  "mobile": ["facebook/react-native", "flutter/flutter", "ionic-team/ionic"],
  "devops": ["kubernetes/kubernetes", "docker/docker", "helm/helm"],
  "game development": ["Unity-Technologies/Unity", "godotengine/godot"],
  "blockchain": ["ethereum/go-ethereum", "bitcoin/bitcoin"],
  "backend": ["nodejs/node", "django/django", "fastapi/fastapi"],
  "frontend": ["facebook/react", "vuejs/vue", "angular/angular"],
  "testing": ["jestjs/jest", "cypress-io/cypress", "playwright/playwright"]
};

// Default high-quality repos for fallback
const DEFAULT_REPOS: string[] = [
  "facebook/react",
  "vercel/next.js", 
  "vuejs/vue",
  "angular/angular",
  "sveltejs/svelte",
  "django/django",
  "fastapi/fastapi",
  "nodejs/node",
  "expressjs/express",
  "nestjs/nest",
  "pytorch/pytorch",
  "tensorflow/tensorflow",
  "pandas-dev/pandas",
  "scikit-learn/scikit-learn",
  "kubernetes/kubernetes",
  "docker/docker",
  "jestjs/jest",
  "vitest-dev/vitest",
  "tailwindlabs/tailwindcss",
  "typescript-eslint/typescript-eslint"
];

function getRelevantRepos(skills: string, interest: string): { skillRepos: string[], interestRepos: string[] } {
  const skillRepos: string[] = [];
  const interestRepos: string[] = [];

  // Parse skills and extract relevant repos
  const skillsLower = skills.toLowerCase();
  Object.entries(SKILL_TO_REPOS).forEach(([skill, repos]) => {
    if (skillsLower.includes(skill)) {
      skillRepos.push(...repos);
    }
  });

  // Parse interest and extract relevant repos
  const interestLower = interest.toLowerCase();
  Object.entries(INTEREST_TO_REPOS).forEach(([interestKey, repos]) => {
    if (interestLower.includes(interestKey)) {
      interestRepos.push(...repos);
    }
  });

  return { skillRepos, interestRepos };
}

async function fetchRepoInfo(fullName: string, token: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "first-issue-finder",
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch repo info for ${fullName}:`, res.status);
      return null;
    }

    const data = await res.json();
    
    return {
      full_name: data.full_name,
      name: data.name,
      stars: data.stargazers_count,
      open_issues_count: data.open_issues_count,
      pushed_at: data.pushed_at,
      topics: data.topics || []
    };
  } catch (error) {
    console.error(`Error fetching repo info for ${fullName}:`, error);
    return null;
  }
}

async function fetchIssuesForRepo(fullName: string, token: string): Promise<GitHubIssue[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${fullName}/issues?state=open&per_page=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "first-issue-finder",
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error for ${fullName}:`, res.status);
      return [];
    }

    const data = await res.json();

    return data
      .filter((item: any) => !item.pull_request)
      .map((item: any) => ({
        number: item.number,
        title: item.title,
        html_url: item.html_url,
        body: item.body ?? "",
        labels: Array.isArray(item.labels)
          ? item.labels.map((l: any) => ({ name: String(l.name) }))
          : [],
        reactions: item.reactions || { total_count: 0 },
        comments: item.comments || 0,
        repository_url: item.repository_url
      }));
  } catch (error) {
    console.error(`Error fetching issues for ${fullName}:`, error);
    return [];
  }
}

function filterReposByQuality(repos: RepoInfo[]): RepoInfo[] {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  return repos.filter(repo => 
    repo.stars > 5000 &&
    repo.open_issues_count > 10 &&
    new Date(repo.pushed_at) > ninetyDaysAgo
  );
}

function deduplicateIssues(issues: ProcessedIssue[]): ProcessedIssue[] {
  const seen = new Set<string>();
  return issues.filter(issue => {
    const key = `${issue.title.toLowerCase()}-${issue.repo_name.toLowerCase()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function filterIssuesByLevel(issues: ProcessedIssue[], level: string): ProcessedIssue[] {
  const levelLower = level.toLowerCase();
  
  if (levelLower === 'beginner') {
    return issues.filter(issue => 
      issue.labels.some(label => 
        ['good first issue', 'beginner', 'easy', 'first-timers-only', 'easy-fix'].includes(label.toLowerCase())
      )
    );
  } else if (levelLower === 'intermediate') {
    return issues.filter(issue => 
      issue.labels.some(label => 
        ['bug', 'refactor', 'enhancement', 'feature', 'improvement'].includes(label.toLowerCase())
      )
    );
  } else if (levelLower === 'advanced') {
    return issues.filter(issue => 
      issue.labels.some(label => 
        ['performance', 'architecture', 'core', 'security', 'breaking'].includes(label.toLowerCase())
      )
    );
  }
  
  return issues;
}

function calculateLabelBoost(labels: string[]): number {
  const labelScores: Record<string, number> = {
    'good first issue': 10,
    'beginner': 8,
    'easy': 6,
    'bug': 4,
    'enhancement': 3,
    'feature': 2,
    'documentation': 1,
    'performance': 5,
    'architecture': 7,
    'security': 6
  };
  
  return labels.reduce((total, label) => total + (labelScores[label.toLowerCase()] || 0), 0);
}

function calculateFinalScore(issue: ProcessedIssue): FinalScoreIssue {
  const labelBoost = calculateLabelBoost(issue.labels);
  const repoStarsWeight = Math.min(Math.log10(issue.repo_stars + 1) * 2, 10);
  const finalScore = issue.reactions * 4 + issue.comments * 2 + labelBoost + repoStarsWeight;
  
  return {
    ...issue,
    finalScore,
    labelBoost
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { skills = "", level = "Beginner", interest = "" } = body;
    console.log("REQUEST BODY:", body);

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      console.error("GITHUB_TOKEN missing");
      return NextResponse.json(
        {
          issues: [],
          message: "Server misconfigured: missing GitHub token.",
        },
        { status: 500 }
      );
    }

    const { skillRepos, interestRepos } = getRelevantRepos(skills, interest);

    // --- Combine and dedupe ---
    const allRepos = Array.from(
      new Set([
        ...(skillRepos ?? []),
        ...(interestRepos ?? []),
        ...(DEFAULT_REPOS ?? []),
      ])
    );

    // --- Shuffle (Fisher-Yates) ---
    for (let i = allRepos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRepos[i], allRepos[j]] = [allRepos[j], allRepos[i]];
    }

    // --- Limit to 10 repos ---
    const selectedRepos = allRepos.slice(0, 10);

    // Add a debug log so we can inspect what was chosen when running locally:
    console.info("DEBUG selectedRepos:", selectedRepos);

    // When fetching issues, ensure you collect issues per repo and limit to 1 issue per repo.
    // Example (replace your existing fetch loop with this pattern):

    const allIssues: GitHubIssue[] = [];
    for (const repo of selectedRepos) {
      try {
        const issues = await fetchIssuesForRepo(repo, githubToken); // reuse your existing fetch function
        if (Array.isArray(issues) && issues.length > 0) {
          // push only the first issue for this repo to avoid duplicates across repos
          allIssues.push(issues[0]);
        }
      } catch (err) {
        console.warn(`failed to fetch issues for ${repo}`, err);
      }
    }

    // final returned payload
    const finalOutput = allIssues.map(issue => ({
      id: issue.number,
      title: issue.title,
      html_url: issue.html_url,
      repo_name: issue.repository_url?.split('/').pop() || 'unknown',
      labels: (issue.labels || []).map(l => l.name),
      reactions: issue.reactions?.total_count || 0,
      comments: issue.comments || 0
    }));

    return NextResponse.json({ issues: finalOutput });

  } catch (err) {
    console.error("Error in /api/recommend:", err);

    return NextResponse.json(
      {
        issues: [],
        message: "Unexpected server error while fetching issues.",
      },
      { status: 500 }
    );
  }
}
