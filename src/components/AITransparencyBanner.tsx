import React from 'react';
import { Bot, ShieldCheck, X } from 'lucide-react';

interface AITransparencyBannerProps {
  onDismiss: () => void;
  onOpenAbout: () => void;
}

export const AITransparencyBanner: React.FC<AITransparencyBannerProps> = ({
  onDismiss,
  onOpenAbout,
}) => {
  return (
    <div
      role="region"
      aria-label="AI Transparency Notice"
      className="bg-amber-100/90 dark:bg-amber-950/80 border-b border-amber-300 dark:border-amber-800 text-stone-800 dark:text-amber-100 px-4 py-2.5 text-xs sm:text-sm"
    >
      <div className="max-w-6xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="font-semibold">AI Transparency Notice (EU AI Act, Art. 50):</strong>{' '}
            This website uses AI (Google Gemini 3.8 Flash) to provide formative feedback on your written explanations, mistake hints, and translations. Numeric calculations are independently checked by code. No grades or certificates are issued.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenAbout}
            className="text-xs font-semibold text-amber-900 dark:text-amber-200 underline hover:text-amber-700 transition-colors"
          >
            Learn more
          </button>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss AI notice"
            className="p-1 rounded-md hover:bg-amber-200/60 dark:hover:bg-amber-900/60 text-stone-600 dark:text-stone-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
