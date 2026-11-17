import { ArrowUp, Plus } from "lucide-react";

const SOURCES = ["GitHub", "Jira", "Slack", "Teams", "Google Docs", "SharePoint", "Help desk"];

/**
 * A Glean-style ask bar that floats over the dashboard: a question being typed and the sources
 * Tesseract will search. Part of the product picture, not a working input.
 */
export function AskBar() {
  return (
    <div className="mx-auto w-[700px] rounded-[14px] bg-white p-3 text-left text-ink shadow-[0_30px_70px_-20px_rgb(0_0_0/0.65)] ring-1 ring-black/5">
      <div className="flex items-center gap-3 px-2 py-2.5">
        <Plus className="size-4 text-stone" strokeWidth={1.8} />
        <p className="flex-1 text-[16px]">
          Who owns billing-service, and what changed in it last week?
          <i className="ml-0.5 inline-block h-[1.05em] w-px animate-pulse bg-ink align-[-3px]" />
        </p>
        <span className="grid size-8 place-items-center rounded-full bg-ink text-on-dark">
          <ArrowUp className="size-4" strokeWidth={2} />
        </span>
      </div>
      <div className="mt-1 flex flex-wrap gap-1.5 border-t border-line px-1 pt-3">
        {SOURCES.map((s) => (
          <span key={s} className="flex items-center gap-1.5 rounded-[6px] border border-line px-2 py-1 text-[12px] text-stone">
            <i className="size-[5px] bg-forest" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
