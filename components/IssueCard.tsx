"use client";

import React from "react";

export type IssueCardProps = {
  key?: string; // optional, React will ignore if provided via mapping
  title: string;
  url: string;
  repo_name?: string; // accept repo_name from page.tsx
  labels?: string[];
  reactions?: number;
  comments?: number;
  level?: string;
  reason?: string;
};

export function IssueCard({
  title,
  url,
  repo_name,
  labels = [],
  reactions = 0,
  comments = 0,
  level,
  reason,
}: IssueCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <header className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 truncate">{title}</h3>
          {repo_name && (
            <p className="mt-1 text-xs text-slate-500 truncate">{repo_name}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600">
          {level && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5">{level}</span>
          )}
        </div>
      </header>

      <div className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3">
        <div className="w-1 rounded-full bg-blue-600" />
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Why this is good for you
          </p>
          <p className="text-sm leading-relaxed text-slate-700">
            {reason ?? "Good first issue — suitable for learning and contribution."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <strong className="text-slate-800">{reactions}</strong>
            <span className="text-xs text-slate-500">reactions</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <strong className="text-slate-800">{comments}</strong>
            <span className="text-xs text-slate-500">comments</span>
          </span>
          {labels.length > 0 && (
            <span className="ml-2 flex gap-1">
              {labels.slice(0, 3).map((l) => (
                <span key={l} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                  {l}
                </span>
              ))}
            </span>
          )}
        </div>

        <div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-blue-700"
            aria-label={`Open issue ${title} on GitHub`}
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </article>
  );
}
