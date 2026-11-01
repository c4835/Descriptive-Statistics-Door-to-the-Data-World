import React, { useState } from 'react';
import { TopicContent, UserTopicState } from '../types/stats';
import { AIExplanationBadge } from './AIExplanationBadge';
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Send,
  Info,
  Check,
} from 'lucide-react';

interface DeliberateMistakeExerciseProps {
  topic: TopicContent;
  userState: UserTopicState;
  currentLanguage: string;
  onUpdateState: (newState: Partial<UserTopicState>) => void;
  onProceedToTeachBack: () => void;
  onLeaveUnfinished: () => void;
}

export const DeliberateMistakeExercise: React.FC<DeliberateMistakeExerciseProps> = ({
  topic,
  userState,
  currentLanguage,
  onUpdateState,
  onProceedToTeachBack,
  onLeaveUnfinished,
}) => {
  const mistake = topic.deliberateMistake;

  const [selectedStep, setSelectedStep] = useState<number | null>(
    userState.learnerMistakeStepIdentified ? parseInt(userState.learnerMistakeStepIdentified, 10) : null
  );
  const [correction, setCorrection] = useState(userState.learnerMistakeCorrection || '');
  const [reason, setReason] = useState(userState.learnerMistakeReason || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(userState.revealedHints || 0);
  const [attemptsCount, setAttemptsCount] = useState<number>(userState.mistakeAttemptsCount || 0);
  const [isSolved, setIsSolved] = useState<boolean>(userState.mistakeSolved || false);
  const [isUnfinished, setIsUnfinished] = useState<boolean>(userState.mistakeUnfinished || false);
  const [feedback, setFeedback] = useState(userState.mistakeFeedback);

  const handleRequestNextHint = () => {
    if (revealedHints < mistake.hints.length) {
      const nextCount = revealedHints + 1;
      setRevealedHints(nextCount);
      onUpdateState({ revealedHints: nextCount });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStep === null || !correction.trim()) return;

    setIsSubmitting(true);
    const newAttemptCount = attemptsCount + 1;
    setAttemptsCount(newAttemptCount);

    // Progressive hint preparation: hints delivered strictly one at a time
    const hintsGivenSoFar = mistake.hints.slice(0, revealedHints);
    const nextHintString =
      revealedHints < mistake.hints.length ? mistake.hints[revealedHints] : '';

    try {
      const res = await fetch('/api/feedback/mistake-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topic.title,
          scenario: mistake.scenario,
          workedSteps: mistake.workedSteps,
          exactMistakeDescription: mistake.exactMistakeDescription,
          correctCorrection: mistake.correctCorrection,
          learnerStep: `Step ${selectedStep}`,
          learnerCorrection: correction,
          learnerReason: reason,
          attemptNumber: newAttemptCount,
          hintsRevealedSoFar: hintsGivenSoFar,
          nextHint: nextHintString,
          language: currentLanguage,
        }),
      });

      const data = await res.json();

      // Check whether step identified matches the deliberate error step
      const isCorrectStep = selectedStep === mistake.errorStepNumber;
      const isModelCorrect = Boolean(data.isCorrect && isCorrectStep);

      // If learner was wrong, automatically increment hint count by 1 (one small hint at a time)
      let updatedHints = revealedHints;
      if (!isModelCorrect && updatedHints < mistake.hints.length) {
        updatedHints += 1;
        setRevealedHints(updatedHints);
      }

      const newFeedback = {
        isCorrect: isModelCorrect,
        isVague: Boolean(data.isVague),
        feedbackText: data.feedbackText,
        hintToOffer: data.hintToOffer || nextHintString,
        revealedFullSolution: isModelCorrect,
      };

      setFeedback(newFeedback);
      if (isModelCorrect) {
        setIsSolved(true);
        setIsUnfinished(false);
      }

      onUpdateState({
        mistakeSolved: isModelCorrect,
        mistakeUnfinished: !isModelCorrect,
        mistakeAttemptsCount: newAttemptCount,
        revealedHints: updatedHints,
        learnerMistakeStepIdentified: String(selectedStep),
        learnerMistakeCorrection: correction,
        learnerMistakeReason: reason,
        mistakeFeedback: newFeedback,
      });
    } catch (err) {
      console.error('Mistake check error', err);
      // Deterministic fallback check on step number
      const isCorrectStep = selectedStep === mistake.errorStepNumber;
      const fallbackFeedback = {
        isCorrect: isCorrectStep,
        isVague: false,
        feedbackText: isCorrectStep
          ? `Well spotted! You accurately identified Step ${selectedStep}.`
          : `Not quite. Take another look at the steps.`,
        hintToOffer: mistake.hints[0],
        revealedFullSolution: isCorrectStep,
      };
      setFeedback(fallbackFeedback);
      if (isCorrectStep) {
        setIsSolved(true);
        setIsUnfinished(false);
      }
      onUpdateState({
        mistakeSolved: isCorrectStep,
        mistakeUnfinished: !isCorrectStep,
        mistakeAttemptsCount: newAttemptCount,
        mistakeFeedback: fallbackFeedback,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeaveForNow = () => {
    setIsUnfinished(true);
    onUpdateState({
      mistakeUnfinished: true,
      status: 'needs_revisiting',
    });
    onLeaveUnfinished();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Exact Prompt Warning Banner */}
      <div
        role="alert"
        className="p-4 sm:p-5 rounded-2xl bg-amber-500/15 dark:bg-amber-950/60 border-2 border-amber-500 dark:border-amber-600 text-stone-900 dark:text-stone-100 space-y-2 shadow-xs"
      >
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Feynman Challenge • Spot the Flaw</span>
        </div>
        <p className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-50 leading-snug">
          &ldquo;This example contains one deliberate mistake. Your task is to find it, correct it and explain why it is wrong.&rdquo;
        </p>
      </div>

      {/* Unfinished Banner if user previously or currently leaves it */}
      {isUnfinished && !isSolved && (
        <div className="p-4 rounded-xl bg-rose-100 dark:bg-rose-950/70 border-2 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 text-xs sm:text-sm font-semibold flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-rose-900 dark:text-rose-100">
              Unfinished: this example still contains a deliberate mistake.
            </strong>
            This exercise has been added to your &ldquo;Topics to revisit&rdquo; list so you never mistake the flawed worked example for a correct solution.
          </div>
        </div>
      )}

      {/* Worked Example with Deliberate Mistake */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
            The Worked Scenario:
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
            {mistake.scenario}
          </p>
        </div>

        {/* Steps Cards (Clickable to select which step has the error) */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Inspect the steps below. Select the step that contains the deliberate mistake:
          </div>
          <div className="space-y-3">
            {mistake.workedSteps.map((step) => {
              const isSelected = selectedStep === step.stepNum;
              return (
                <div
                  key={step.stepNum}
                  onClick={() => !isSolved && setSelectedStep(step.stepNum)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 shadow-xs'
                      : 'border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-700 bg-stone-50/50 dark:bg-stone-800/40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {step.stepNum}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {step.title}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-mono">
                      {step.content}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/80 px-2 py-0.5 rounded shrink-0">
                      Targeted Step
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submission Form (Hidden if solved, showing full correct solution instead) */}
        {!isSolved ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label
                htmlFor="mistake-correction-input"
                className="text-xs font-bold text-stone-800 dark:text-stone-200 block"
              >
                1. What is the correction? (Be specific; avoid vague answers like &ldquo;calculation is wrong&rdquo;)
              </label>
              <textarea
                id="mistake-correction-input"
                value={correction}
                onChange={(e) => setCorrection(e.target.value)}
                placeholder="State the exact calculation or statement that should replace the flawed step..."
                rows={3}
                required
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mistake-reason-input"
                className="text-xs font-bold text-stone-800 dark:text-stone-200 block"
              >
                2. Why is the original step wrong? (Explain the mathematical or conceptual error)
              </label>
              <textarea
                id="mistake-reason-input"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why this mistake occurred and what rule was broken..."
                rows={3}
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Hint System: Delivered one at a time */}
            {revealedHints > 0 && (
              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-2 text-xs text-sky-900 dark:text-sky-200">
                <span className="font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                  Hints Received ({revealedHints} of {mistake.hints.length}):
                </span>
                <ul className="list-disc pl-5 space-y-1 text-[11px]">
                  {mistake.hints.slice(0, revealedHints).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                {revealedHints < mistake.hints.length && (
                  <button
                    type="button"
                    onClick={handleRequestNextHint}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Need a progressive hint? ({revealedHints}/{mistake.hints.length})</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLeaveForNow}
                  className="px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
                >
                  Leave unfinished for now
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedStep === null || !correction.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Checking with Tutor...' : 'Check My Findings'}</span>
                </button>
              </div>
            </div>
          </form>
        ) : null}

        {/* Feedback Display */}
        {feedback && (
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3">
            <div className="flex items-center gap-2">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {feedback.isCorrect ? 'Mistake Successfully Solved!' : 'Tutor Guidance'}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {feedback.feedbackText}
            </p>

            {feedback.isVague && (
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                Notice: Your explanation was a bit vague. Please point to the exact step or numbers that were incorrect.
              </p>
            )}

            <AIExplanationBadge
              topicId={topic.id}
              stageName="Deliberate Mistake"
              feedbackText={feedback.feedbackText}
            />
          </div>
        )}

        {/* Mandatory Full Correct Solution: Displayed upon completion so learner never remembers the wrong one! */}
        {isSolved && (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Full Correct Solution (Permanent Reference)</span>
            </div>
            <pre className="font-mono text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap bg-white dark:bg-stone-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
              {mistake.fullCorrectSolution}
            </pre>
            <p className="text-xs text-stone-600 dark:text-stone-400 italic">
              Notice: You successfully found the error in Step {mistake.errorStepNumber} ({mistake.exactMistakeDescription}).
            </p>
          </div>
        )}

        {/* Next Stage Button */}
        {isSolved && (
          <div className="flex justify-end pt-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onProceedToTeachBack}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Step 4: Independent Teach-Back</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
