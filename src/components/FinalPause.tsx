import React, { useState } from 'react';
import { TopicContent, UserTopicState } from '../types/stats';
import { AIExplanationBadge } from './AIExplanationBadge';
import {
  HelpCircle,
  CheckCircle2,
  Send,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Check,
} from 'lucide-react';

interface FinalPauseProps {
  topic: TopicContent;
  userState: UserTopicState;
  currentLanguage: string;
  onUpdateState: (newState: Partial<UserTopicState>) => void;
  onMarkTopicComplete: () => void;
  onMoveOnAndRevisitLater: () => void;
}

export const FinalPause: React.FC<FinalPauseProps> = ({
  topic,
  userState,
  currentLanguage,
  onUpdateState,
  onMarkTopicComplete,
  onMoveOnAndRevisitLater,
}) => {
  const [question, setQuestion] = useState(userState.learnerPauseQuestion || '');
  const [isAsking, setIsAsking] = useState(false);
  const [pauseAnswer, setPauseAnswer] = useState(userState.pauseAnswer);
  const [confirmedUnderstanding, setConfirmedUnderstanding] = useState(false);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsAsking(true);
    try {
      const res = await fetch('/api/feedback/pause-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topic.title,
          question,
          language: currentLanguage,
        }),
      });

      const data = await res.json();
      const ans = {
        simpleAnswer: data.simpleAnswer || 'In statistics, comparing your values and looking at the raw spread always clarifies questions.',
        checkQuestion: data.checkQuestion || 'Do you feel comfortable with how this idea applies to daily life?',
        checkAnswerExplanation: data.checkAnswerExplanation || 'Take your time to reflect on everyday examples.',
      };

      setPauseAnswer(ans);
      onUpdateState({
        learnerPauseQuestion: question,
        pauseAnswer: ans,
      });
    } catch (err) {
      console.error('Final pause QA error', err);
      const fallbackAns = {
        simpleAnswer: 'In descriptive statistics, focusing on everyday examples and sorting values first helps answer almost any question.',
        checkQuestion: 'Does the median or mean stay steadier when an outlier appears?',
        checkAnswerExplanation: 'The median stays steadier because it only looks at the middle position.',
      };
      setPauseAnswer(fallbackAns);
      onUpdateState({
        learnerPauseQuestion: question,
        pauseAnswer: fallbackAns,
      });
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Exact Prompt Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Feynman Final Pause • Lingering Questions
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-50 leading-snug">
            &ldquo;Is there anything you&apos;re still unsure about, or any other question you&apos;d like to explore before we move on?&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            No question is too simple. Ask anything you’d like to double check, or proceed directly if you feel confident!
          </p>
        </div>

        {/* Question Submission Form */}
        {!pauseAnswer ? (
          <form onSubmit={handleAskQuestion} className="space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type any question or doubt here (e.g., 'What happens if all numbers are equal?' or 'Can the median be a decimal?')..."
              rows={3}
              className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onMoveOnAndRevisitLater}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Move on and revisit later</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onMarkTopicComplete}
                  className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  No, I&apos;m ready to move on
                </button>
                <button
                  type="submit"
                  disabled={isAsking || !question.trim()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAsking ? 'Thinking...' : 'Ask Tutor'}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Q&A Response and Check Question */
          <div className="space-y-5 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>Tutor’s Explanation</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                {pauseAnswer.simpleAnswer}
              </p>
            </div>

            {/* Quick check question to confirm understanding */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2">
              <div className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Quick Check: {pauseAnswer.checkQuestion}</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                Answer note: {pauseAnswer.checkAnswerExplanation}
              </p>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedUnderstanding}
                  onChange={(e) => setConfirmedUnderstanding(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer"
                />
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  I understand this now and feel ready to conclude this topic.
                </span>
              </label>
            </div>

            <AIExplanationBadge
              topicId={topic.id}
              stageName="Final Pause"
              feedbackText={pauseAnswer.simpleAnswer}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={onMoveOnAndRevisitLater}
                className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:underline"
              >
                Move on and revisit later
              </button>

              <button
                type="button"
                disabled={!confirmedUnderstanding}
                onClick={onMarkTopicComplete}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Complete Topic {topic.id} & Continue</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
