import React, { useState } from 'react';
import { UserTopicState, TopicStatus } from '../types/stats';
import { TOPICS_DATA } from '../data/statisticsContent';
import { getTopicsToRevisit } from '../utils/storage';
import {
  X,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  Trash2,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

interface ProgressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  progress: Record<number, UserTopicState>;
  onSelectTopic: (topicId: number) => void;
  onResetProgress: () => void;
}

export const ProgressDrawer: React.FC<ProgressDrawerProps> = ({
  isOpen,
  onClose,
  progress,
  onSelectTopic,
  onResetProgress,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const topicsToRevisit = getTopicsToRevisit(progress);

  // Calculate completed count
  const completedCount = Object.values(progress).filter(
    (p) => p.status === 'complete' || p.status === 'supported_attempt'
  ).length;
  const progressPercent = Math.round((completedCount / TOPICS_DATA.length) * 100);

  const getStatusBadge = (status: TopicStatus, isMistakeUnfinished: boolean) => {
    if (isMistakeUnfinished) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800">
          <AlertTriangle className="w-3 h-3" />
          Unfinished Mistake
        </span>
      );
    }

    switch (status) {
      case 'complete':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Complete
          </span>
        );
      case 'supported_attempt':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
            <Sparkles className="w-3 h-3" />
            Supported Attempt
          </span>
        );
      case 'needs_revisiting':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
            <RotateCcw className="w-3 h-3" />
            Needs Revisiting
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-800">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
            Not started
          </span>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white dark:bg-stone-900 w-full max-w-md h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <h2 id="progress-drawer-title" className="text-base font-bold text-stone-900 dark:text-stone-100">
              Your Learning Journey
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close progress drawer"
            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Progress Bar Meter */}
          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-700/60 space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
              <span>Overall Completion</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-amber-600 transition-all duration-500 rounded-full"
              />
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              {completedCount} of {TOPICS_DATA.length} topics completed or supported
            </p>
          </div>

          {/* Topics to Revisit List */}
          {topicsToRevisit.length > 0 && (
            <div className="space-y-3 bg-amber-50/70 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Topics to Revisit ({topicsToRevisit.length})</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                You can revisit these topics at any time to try independent attempts or finish deliberate mistake challenges:
              </p>
              <div className="space-y-2 pt-1">
                {topicsToRevisit.map((item) => (
                  <button
                    key={item.topicId}
                    type="button"
                    onClick={() => {
                      onSelectTopic(item.topicId);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-800 hover:border-amber-400 text-left flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        Topic {item.topicId}: {item.title}
                      </div>
                      <div className="text-[11px] text-amber-700 dark:text-amber-400">
                        {item.reason}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Topics List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              All 8 Curriculum Topics
            </h3>
            <div className="space-y-2">
              {TOPICS_DATA.map((t) => {
                const state = progress[t.id];
                const status = state?.status || 'not_started';
                const isMistakeUnfinished = Boolean(state?.mistakeUnfinished);

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTopic(t.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 bg-stone-50/40 dark:bg-stone-800/40 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        {t.id}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {t.title}
                        </div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                          {t.everydayContext}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(status, isMistakeUnfinished)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer: Reset Progress */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
          {!showConfirmReset ? (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset my progress</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 space-y-2 text-xs">
              <p className="font-bold text-rose-900 dark:text-rose-100">
                Are you sure you want to reset all your progress?
              </p>
              <p className="text-rose-700 dark:text-rose-300 text-[11px]">
                This will clear all completed topics, notes, and attempts stored in your browser.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
