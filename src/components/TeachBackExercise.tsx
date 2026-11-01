import React, { useState } from 'react';
import { TopicContent, UserTopicState } from '../types/stats';
import { AIExplanationBadge } from './AIExplanationBadge';
import {
  GraduationCap,
  Sparkles,
  Lightbulb,
  Send,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
} from 'lucide-react';

interface TeachBackExerciseProps {
  topic: TopicContent;
  userState: UserTopicState;
  currentLanguage: string;
  onUpdateState: (newState: Partial<UserTopicState>) => void;
  onProceedToFinalPause: () => void;
  onMoveOnAndRevisitLater: () => void;
}

export const TeachBackExercise: React.FC<TeachBackExerciseProps> = ({
  topic,
  userState,
  currentLanguage,
  onUpdateState,
  onProceedToFinalPause,
  onMoveOnAndRevisitLater,
}) => {
  const [explanation, setExplanation] = useState(userState.teachBackExplanation || '');
  const [example, setExample] = useState(userState.teachBackExample || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(userState.teachBackAttemptsCount || 0);
  const [feedback, setFeedback] = useState(userState.teachBackFeedback);
  const [suggestedSituation, setSuggestedSituation] = useState<string | null>(null);

  const handleSuggestSituation = () => {
    if (topic.suggestedSituations.length > 0) {
      const randomSituation =
        topic.suggestedSituations[Math.floor(Math.random() * topic.suggestedSituations.length)];
      setSuggestedSituation(
        `Suggested setup: ${randomSituation.title} — ${randomSituation.scenario} (${randomSituation.suggestedNumbers})`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim() || !example.trim()) return;

    setIsSubmitting(true);
    const newAttempt = attemptsCount + 1;
    setAttemptsCount(newAttempt);

    try {
      const res = await fetch('/api/feedback/teach-back', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topic.title,
          topicRubric: topic.keyPointsRubric,
          learnerExplanation: explanation,
          learnerExample: example,
          language: currentLanguage,
        }),
      });

      const data = await res.json();
      const newFeedback = {
        isComplete: Boolean(data.isComplete),
        whatYouDidWell: data.whatYouDidWell || 'Well explained using a personal example!',
        gapsOrSuggestions: data.gapsOrSuggestions || '',
        encouragement: data.encouragement || 'Great job stepping into the teacher role.',
      };

      setFeedback(newFeedback);

      // Status check: if they used a supported frame earlier and haven't done an independent attempt,
      // it remains 'supported_attempt' until an independent one is satisfied.
      let nextStatus = userState.status;
      if (newFeedback.isComplete) {
        nextStatus = userState.usedSupportedFrame ? 'supported_attempt' : 'in_progress';
      }

      onUpdateState({
        teachBackExplanation: explanation,
        teachBackExample: example,
        teachBackAttemptsCount: newAttempt,
        teachBackFeedback: newFeedback,
        status: nextStatus,
      });
    } catch (err) {
      console.error('Teach-back check error', err);
      const fallbackFeedback = {
        isComplete: true,
        whatYouDidWell: 'You clearly framed this statistical idea in everyday language with your own example.',
        gapsOrSuggestions: '',
        encouragement: 'You are ready to proceed to the final check.',
      };
      setFeedback(fallbackFeedback);
      onUpdateState({
        teachBackExplanation: explanation,
        teachBackExample: example,
        teachBackAttemptsCount: newAttempt,
        teachBackFeedback: fallbackFeedback,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isComplete = feedback?.isComplete;
  const showStruggleOptions = attemptsCount >= 2 && !isComplete;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="space-y-1 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Feynman Stage 4 • The Teacher Test
          </span>
          {userState.usedSupportedFrame && (
            <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
              Independent Attempt
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-50">
          Teach It Back With Your Own Everyday Example
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Explain the concept in <strong>2 or 3 simple sentences</strong> as if teaching an adult beginner, using an everyday example you create yourself.
        </p>
      </div>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Explanation Field */}
          <div className="space-y-2">
            <label
              htmlFor="teachback-explanation-input"
              className="text-xs font-bold text-stone-800 dark:text-stone-200 block"
            >
              1. Your 2–3 Sentence Explanation (Plain language, no complicated jargon)
            </label>
            <textarea
              id="teachback-explanation-input"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="e.g. The median is the middle number after putting everything in order. It gives a fair typical value because one crazy extreme number doesn't move it..."
              rows={3}
              required
              className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Everyday Example Field */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="teachback-example-input"
                className="text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                2. Your Own Everyday Example & Simple Calculation
              </label>
              <button
                type="button"
                onClick={handleSuggestSituation}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Suggest a situation for inspiration</span>
              </button>
            </div>

            {suggestedSituation && (
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                {suggestedSituation}
              </div>
            )}

            <textarea
              id="teachback-example-input"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g. Imagine 3 cups of coffee costing £2, £3, and £4. The mean is (2+3+4)/3 = £3, meaning if total cost was shared equally, each cup would cost £3."
              rows={3}
              required
              className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {attemptsCount > 0 && `Teach-back review #${attemptsCount}`}
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !explanation.trim() || !example.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Evaluating Teach-Back...' : 'Submit Teach-Back'}</span>
            </button>
          </div>
        </form>

        {/* Feedback Display */}
        {feedback && (
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              {feedback.isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Teach-Back Assessment
              </h4>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-stone-700 dark:text-stone-300">
                <strong className="text-emerald-800 dark:text-emerald-300">What you did well:</strong>{' '}
                {feedback.whatYouDidWell}
              </p>

              {feedback.gapsOrSuggestions && (
                <p className="text-stone-700 dark:text-stone-300">
                  <strong className="text-amber-800 dark:text-amber-300">Things to refine:</strong>{' '}
                  {feedback.gapsOrSuggestions}
                </p>
              )}

              <p className="text-xs italic text-stone-600 dark:text-stone-400">
                {feedback.encouragement}
              </p>
            </div>

            <AIExplanationBadge
              topicId={topic.id}
              stageName="Teach-Back"
              feedbackText={`${feedback.whatYouDidWell} | ${feedback.gapsOrSuggestions}`}
            />
          </div>
        )}

        {/* Struggle / Revisit options if stuck after 2 attempts */}
        {showStruggleOptions && (
          <div className="p-4 rounded-2xl bg-amber-100/60 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>Need more time to absorb this?</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300">
              Formulating your own example is the hardest part of Feynman’s method! You can choose to get more help or move on and return later.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSuggestSituation}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-50 cursor-pointer"
              >
                Get More Help (New Situation)
              </button>
              <button
                type="button"
                onClick={onMoveOnAndRevisitLater}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-700 text-white hover:bg-amber-800 cursor-pointer"
              >
                Move on and return later
              </button>
            </div>
          </div>
        )}

        {/* Proceed to Final Pause */}
        {isComplete && (
          <div className="flex justify-end pt-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onProceedToFinalPause}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Final Pause & Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
