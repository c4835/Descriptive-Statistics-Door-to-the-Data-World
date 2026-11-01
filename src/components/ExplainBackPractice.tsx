import React, { useState } from 'react';
import { TopicContent, UserTopicState } from '../types/stats';
import { checkNumericAnswer } from '../utils/mathValidator';
import { AIExplanationBadge } from './AIExplanationBadge';
import {
  Send,
  Sparkles,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  CornerDownRight,
} from 'lucide-react';

interface ExplainBackPracticeProps {
  topic: TopicContent;
  userState: UserTopicState;
  currentLanguage: string;
  onUpdateState: (newState: Partial<UserTopicState>) => void;
  onProceedToMistake: () => void;
  onMoveOnAndRevisitLater: () => void;
  onBackToExplanation: () => void;
}

export const ExplainBackPractice: React.FC<ExplainBackPracticeProps> = ({
  topic,
  userState,
  currentLanguage,
  onUpdateState,
  onProceedToMistake,
  onMoveOnAndRevisitLater,
  onBackToExplanation,
}) => {
  const [explanation, setExplanation] = useState(userState.learnerExplanation || '');
  const [calculation, setCalculation] = useState(userState.learnerCalculation || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSentenceFrame, setShowSentenceFrame] = useState(false);
  const [feedback, setFeedback] = useState(userState.practiceFeedback);
  const [attemptsCount, setAttemptsCount] = useState(userState.practiceAttemptsCount || 0);
  const [usedSupportedFrame, setUsedSupportedFrame] = useState(userState.usedSupportedFrame || false);

  const handleUseSentenceFrame = () => {
    setShowSentenceFrame(true);
    setUsedSupportedFrame(true);
    if (!explanation) {
      setExplanation(topic.practiceQuestion.sentenceFrame);
    }
    onUpdateState({ usedSupportedFrame: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim() && !calculation.trim()) return;

    setIsSubmitting(true);
    const newAttemptCount = attemptsCount + 1;
    setAttemptsCount(newAttemptCount);

    // 1. Rigorous, deterministic code check of calculation answer
    const codeMathCheck = checkNumericAnswer(
      calculation,
      topic.practiceQuestion.expectedAnswer,
      topic.practiceQuestion.tolerance || 0.05
    );

    try {
      // 2. Call server-side Gemini API with code-checked ground truth and rubric
      const res = await fetch('/api/feedback/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topic.title,
          topicRubric: topic.keyPointsRubric,
          learnerExplanation: explanation,
          learnerCalculation: calculation,
          expectedCalculationAnswer: topic.practiceQuestion.expectedAnswer,
          isCalculationCorrect: codeMathCheck.isCorrect,
          codeMathFeedback: codeMathCheck.feedbackNote,
          language: currentLanguage,
        }),
      });

      const data = await res.json();

      const newFeedback = {
        isCalculationCorrect: codeMathCheck.isCorrect,
        whatYouGotRight: data.whatYouGotRight || (codeMathCheck.isCorrect ? 'Calculation matches!' : 'Good effort.'),
        whatYouMissedOrGotWrong: data.whatYouMissedOrGotWrong || codeMathCheck.feedbackNote,
        howToMakeClearer: data.howToMakeClearer || 'Review the core definition and try comparing your steps.',
        suggestSimpler: data.suggestSimpler,
        rawFeedback: JSON.stringify(data),
      };

      setFeedback(newFeedback);

      // Determine new status
      const updatedStatus = usedSupportedFrame ? 'supported_attempt' : 'in_progress';

      onUpdateState({
        learnerExplanation: explanation,
        learnerCalculation: calculation,
        practiceAttemptsCount: newAttemptCount,
        usedSupportedFrame,
        status: updatedStatus,
        practiceFeedback: newFeedback,
      });
    } catch (err) {
      console.error('Failed to submit explanation feedback', err);
      // Resilient fallback: code-calculated answer still provides full value!
      const fallbackFeedback = {
        isCalculationCorrect: codeMathCheck.isCorrect,
        whatYouGotRight: codeMathCheck.isCorrect
          ? 'Your calculation matched the expected value!'
          : 'Thank you for answering the practice question.',
        whatYouMissedOrGotWrong: codeMathCheck.feedbackNote,
        howToMakeClearer: 'Keep your explanation to 1 or 2 plain sentences.',
        suggestSimpler: !codeMathCheck.isCorrect,
      };
      setFeedback(fallbackFeedback);
      onUpdateState({
        learnerExplanation: explanation,
        learnerCalculation: calculation,
        practiceAttemptsCount: newAttemptCount,
        usedSupportedFrame,
        practiceFeedback: fallbackFeedback,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCalculationPassed = feedback?.isCalculationCorrect;
  const isEligibleToProceed = isCalculationPassed && feedback && attemptsCount >= 1;
  const showStruggleOptions = attemptsCount >= 2 && (!isCalculationPassed || feedback?.suggestSimpler);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Feynman Stage 2 • Test Your Understanding
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-50">
            Explain It Back in Your Own Words
          </h2>
        </div>
        <button
          type="button"
          onClick={onBackToExplanation}
          className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 underline"
        >
          ← Review Teaching Card
        </button>
      </div>

      {/* GDPR Privacy Notice Reminder before typing */}
      <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Privacy reminder:</strong> Please do not type any personal information (names, real addresses, or bank details). Your answers are sent to Google Gemini to generate constructive educational feedback.
        </p>
      </div>

      {/* Practice Question Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            Practice Scenario
          </div>
          <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200">
            {topic.practiceQuestion.prompt}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Conceptual Explanation Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="learner-explanation-input"
                className="text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                1. {topic.practiceQuestion.explainPrompt}
              </label>
              <button
                type="button"
                onClick={handleUseSentenceFrame}
                className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showSentenceFrame ? 'Sentence frame active' : 'Need a sentence frame?'}</span>
              </button>
            </div>

            {showSentenceFrame && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CornerDownRight className="w-3.5 h-3.5" />
                  Sentence Frame (Recorded as a Supported Attempt):
                </span>
                <p className="font-mono text-[11px] bg-white dark:bg-stone-900 p-2 rounded border border-amber-200 dark:border-amber-800/60">
                  {topic.practiceQuestion.sentenceFrame}
                </p>
              </div>
            )}

            <textarea
              id="learner-explanation-input"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain it simply in 1 or 2 sentences as if explaining to a friend..."
              rows={4}
              required
              className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Practice Calculation Input */}
          <div className="space-y-2">
            <label
              htmlFor="learner-calculation-input"
              className="text-xs font-bold text-stone-800 dark:text-stone-200 block"
            >
              2. {topic.practiceQuestion.calculationPrompt}
            </label>
            <div className="flex items-center gap-3">
              <input
                id="learner-calculation-input"
                type="text"
                value={calculation}
                onChange={(e) => setCalculation(e.target.value)}
                placeholder={`e.g. ${topic.practiceQuestion.expectedAnswer}`}
                required
                className="w-full sm:w-64 p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {topic.practiceQuestion.units}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
              Hint: {topic.practiceQuestion.hint}
            </p>
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-stone-500 dark:text-stone-400">
              {attemptsCount > 0 && `Attempt #${attemptsCount}`}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || (!explanation.trim() && !calculation.trim())}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Evaluating with AI & Math Engine...' : 'Check My Explanation'}</span>
            </button>
          </div>
        </form>

        {/* 3-Part Feedback Panel */}
        {feedback && (
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
              <div className="flex items-center gap-2">
                {isCalculationPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Tutor Feedback
                </h4>
              </div>

              {usedSupportedFrame && (
                <span className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
                  Supported Attempt
                </span>
              )}
            </div>

            {/* 3 Short Parts */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  ✓ What you got right:
                </span>
                <p className="text-stone-700 dark:text-stone-300 pl-4 border-l-2 border-emerald-500">
                  {feedback.whatYouGotRight}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  ! What you missed or got wrong:
                </span>
                <p className="text-stone-700 dark:text-stone-300 pl-4 border-l-2 border-amber-500">
                  {feedback.whatYouMissedOrGotWrong}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-sky-800 dark:text-sky-300 block">
                  💡 How to make your explanation clearer:
                </span>
                <p className="text-stone-700 dark:text-stone-300 pl-4 border-l-2 border-sky-500">
                  {feedback.howToMakeClearer}
                </p>
              </div>
            </div>

            {/* Model explanation accordion if supported */}
            {usedSupportedFrame && topic.practiceQuestion.modelExplanation && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 text-xs">
                <strong className="block text-amber-900 dark:text-amber-200 mb-1">
                  Reference Model Explanation:
                </strong>
                <p className="text-stone-700 dark:text-stone-300">
                  {topic.practiceQuestion.modelExplanation}
                </p>
              </div>
            )}

            {/* AI badge & problem report */}
            <AIExplanationBadge
              topicId={topic.id}
              stageName="Explain Back"
              feedbackText={`${feedback.whatYouGotRight} | ${feedback.whatYouMissedOrGotWrong}`}
            />
          </div>
        )}

        {/* Revisit Option after 2 further attempts */}
        {showStruggleOptions && (
          <div className="p-4 rounded-2xl bg-amber-100/60 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>Would you like to keep practising or move on and come back later?</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300">
              Learning takes time! If this topic feels tricky right now, you can leave it marked as &ldquo;Needs revisiting&rdquo; and return whenever you feel fresh.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setFeedback(undefined);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-50 cursor-pointer"
              >
                Keep Practising This Topic
              </button>
              <button
                type="button"
                onClick={onMoveOnAndRevisitLater}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-700 text-white hover:bg-amber-800 cursor-pointer"
              >
                Move on and come back later
              </button>
            </div>
          </div>
        )}

        {/* Proceed to Deliberate Mistake Stage */}
        {isEligibleToProceed && (
          <div className="pt-4 flex justify-end border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onProceedToMistake}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Proceed to Step 3: Find the Deliberate Mistake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
