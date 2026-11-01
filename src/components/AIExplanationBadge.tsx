import React, { useState } from 'react';
import { Sparkles, Flag, Check, AlertCircle } from 'lucide-react';
import { FeedbackReport } from '../types/stats';
import { saveReportLocally } from '../utils/storage';

interface AIExplanationBadgeProps {
  topicId: number;
  stageName: string;
  feedbackText?: string;
  showReportButton?: boolean;
}

export const AIExplanationBadge: React.FC<AIExplanationBadgeProps> = ({
  topicId,
  stageName,
  feedbackText = '',
  showReportButton = true,
}) => {
  const [isReporting, setIsReporting] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    const report: FeedbackReport = {
      id: `rep_${Date.now()}`,
      topicId,
      stage: stageName,
      feedbackText,
      userComment: comment,
      timestamp: Date.now(),
    };

    saveReportLocally(report);

    try {
      await fetch('/api/report-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
    } catch {
      // Offline fallback: saved locally already
    }

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setIsReporting(false);
      setSubmitted(false);
      setComment('');
    }, 2200);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
      <div className="inline-flex items-center gap-1.5 font-medium bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-2.5 py-1 rounded-md border border-amber-300/40 dark:border-amber-700/40">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>AI-generated formative feedback</span>
        <span className="text-[10px] text-amber-700/80 dark:text-amber-300/80 font-normal">
          (Calculations checked by code)
        </span>
      </div>

      {showReportButton && (
        <button
          type="button"
          onClick={() => setIsReporting(true)}
          className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition-colors underline decoration-dotted text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          title="Report inaccurate or unhelpful AI feedback"
        >
          <Flag className="w-3 h-3" />
          <span>Report a problem with this feedback</span>
        </button>
      )}

      {isReporting && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl p-5 max-w-md w-full shadow-2xl text-stone-800 dark:text-stone-100">
            <h3 id="report-modal-title" className="text-base font-semibold flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Report Feedback Accuracy Issue
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 mb-3">
              We value accuracy. If the AI feedback was misleading, confusing, or missed the mark, please describe the issue. No personal data is stored.
            </p>

            {submitted ? (
              <div className="flex items-center gap-2 py-4 text-emerald-700 dark:text-emerald-400 font-medium text-sm">
                <Check className="w-5 h-5 text-emerald-600" />
                Thank you! Your feedback report has been logged.
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What was inaccurate or unclear about this feedback?"
                  rows={3}
                  className="w-full p-2.5 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReporting(false)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !comment.trim()}
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Send Anonymous Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
