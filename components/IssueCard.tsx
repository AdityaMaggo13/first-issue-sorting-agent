"use client";

import React from "react";

type IssueCardProps = {
  id?: string | number;
  title: string;
  url: string;
  repo_name?: string;
  labels?: string[];
  reactions?: number;
  comments?: number;
  level?: string;
  reason?: string;
};

export default function IssueCard(props: IssueCardProps) {
  const {
    title,
    url,
    repo_name,
    labels = [],
    reactions = 0,
    comments = 0,
    level,
    reason,
  } = props;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      
      {/* TOP */}
      <div className="flex-grow">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">{title}</h3>
            {repo_name && (
              <p className="mt-1 text-xs text-slate-500 truncate">{repo_name}</p>
            )}
          </div>
          {level && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
              {level}
            </span>
          )}
        </div>

        <div className="rounded-xl bg-slate-50 px-4 py-3 mb-4">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Why this is good for you
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {reason ?? "Good first issue — suitable for learning and contribution."}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>
            <strong>{reactions}</strong> reactions
          </span>
          <span>
            <strong>{comments}</strong> comments
          </span>

          <div className="flex flex-wrap gap-1">
            {labels.slice(0, 3).map((l) => (
              <span key={l} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BUTTON AT BOTTOM FIXED */}
      <div className="mt-6">
        <a
          href={url}
          target="_blank"
          className="inline-block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          View on GitHub →
        </a>
      </div>

    </article>
  );
}
