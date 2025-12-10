"use client";

import React from "react";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top nav */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 md:px-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">
              First Issue Finder
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              beta
            </span>
          </div>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-slate-900"
          >
            View on GitHub →
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex-1 w-full max-w-5xl px-6 py-10 md:px-10 md:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand + description */}
            <div className="max-w-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white">
                  FI
                </div>
                <span className="text-base font-semibold text-slate-900">
                  First Issue Finder
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Helping developers find their perfect first open source
                contribution. No AI bias, just smart deterministic ranking
                based on real data.
              </p>
            </div>

            {/* Columns */}
            <div className="grid gap-8 text-sm text-slate-700 sm:grid-cols-2 sm:gap-12">
              {/* Product column */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Product
                </h3>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900"
                    >
                      How it works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Team column */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Team thala7code
                </h3>
                <ul className="mt-3 space-y-3">
                  {/* Aditya */}
                  <li className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      Aditya Maggo
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <a
                        href="https://x.com/maggo_aditya"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Aditya Maggo on X"
                        className="underline-offset-2 hover:underline hover:text-slate-900"
                      >
                        X
                      </a>
                      <span className="text-slate-300">•</span>
                      <a
                        href="https://www.linkedin.com/in/aditya-maggo-aaa30b274"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Aditya Maggo on LinkedIn"
                        className="underline-offset-2 hover:underline hover:text-slate-900"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </li>

                  {/* Sanchit */}
                  <li className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      Sanchit Wadhwa
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <a
                        href="https://x.com/wadhwasanchit"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Sanchit Wadhwa on X"
                        className="underline-offset-2 hover:underline hover:text-slate-900"
                      >
                        X
                      </a>
                      <span className="text-slate-300">•</span>
                      <a
                        href="https://www.linkedin.com/in/sanchit-wadhwa-5b8282285"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Sanchit Wadhwa on LinkedIn"
                        className="underline-offset-2 hover:underline hover:text-slate-900"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </li>

                  {/* Ojasv */}
                  <li className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      Ojasv Kapoor
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <a
                        href="https://x.com/itsokaykapoor"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Ojasv Kapoor on X"
                        className="underline-offset-2 hover:underline hover:text-slate-900"
                      >
                        X
                      </a>
                      <span className="text-slate-300">•</span>
                      <a
                        href="https://www.linkedin.com/in/ojasvkapoor24"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Ojasv Kapoor on LinkedIn"
                        className="underline-offset-2 hover:underline hover:text-slate-900"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center">
            <span>Built by Team thala7code</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-700">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-700">
                Terms
              </a>
              <a href="#" className="hover:text-slate-700">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
