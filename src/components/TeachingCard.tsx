import React, { useState } from 'react';
import { TopicContent } from '../types/stats';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import { TopicChartViewer } from './TopicChartViewer';

interface TeachingCardProps {
  topic: TopicContent;
  onProceedToPractice: () => void;
}

export const TeachingCard: React.FC<TeachingCardProps> = ({
  topic,
  onProceedToPractice,
}) => {
  const [showSimpler, setShowSimpler] = useState(false);
  const [showJargon, setShowJargon] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Badge & Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            {topic.badge}
          </span>
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            Topic {topic.id} of 8
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-50">
          {topic.title}
        </h2>
        <p className="text-sm sm:text-base font-medium text-stone-600 dark:text-stone-300">
          {topic.subtitle}
        </p>
      </div>

      {/* Primary Teaching Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Core Simple Explanation */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              {topic.teachingCard.simpleExplanation}
            </p>
          </div>
        </div>

        {/* Everyday Scenario Showcase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Everyday Adult Example: {topic.teachingCard.everydayExampleTitle}</span>
            </h3>
          </div>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200/80 dark:border-stone-700/60">
            {topic.teachingCard.everydayExampleStory}
          </p>
        </div>

        {/* Interactive Chart if provided for this topic */}
        {topic.chart && <TopicChartViewer chart={topic.chart} />}
        {topic.misleadingDemo && <TopicChartViewer misleadingDemo={topic.misleadingDemo} />}

        {/* Step-by-Step Calculation Walkthrough */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Step-by-Step Calculation Walkthrough
          </h4>
          <div className="space-y-3">
            {topic.teachingCard.stepByStep.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    {item.step}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    {item.detail}
                  </p>
                </div>
                {item.math && (
                  <div className="font-mono text-xs font-bold bg-white dark:bg-stone-900 text-amber-900 dark:text-amber-200 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 shrink-0 self-start">
                    {item.math}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why it is useful */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Why This Is Useful in Adult Life</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {topic.teachingCard.whyUseful}
          </p>
        </div>

        {/* Jargon Buster Accordion */}
        {topic.teachingCard.jargonBuster.length > 0 && (
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowJargon(!showJargon)}
              className="w-full p-3.5 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-left flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-200 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Plain Language Jargon Buster ({topic.teachingCard.jargonBuster.length} terms)
              </span>
              {showJargon ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showJargon && (
              <div className="p-4 space-y-2.5 bg-white dark:bg-stone-900 divide-y divide-stone-100 dark:divide-stone-800 text-xs">
                {topic.teachingCard.jargonBuster.map((jargon, i) => (
                  <div key={i} className="pt-2 first:pt-0 space-y-0.5">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {jargon.term}:
                    </span>{' '}
                    <span className="text-stone-600 dark:text-stone-400">
                      {jargon.plainMeaning}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Toggle Alternative / Simpler Analogy */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800">
          <button
            type="button"
            onClick={() => setShowSimpler(!showSimpler)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer underline decoration-dotted"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{showSimpler ? 'Hide Simpler Analogy' : 'Show Simpler / Different Example'}</span>
          </button>
        </div>

        {/* Alternative / Simpler Analogy Panel */}
        {showSimpler && (
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-800/60 space-y-3 animate-in fade-in">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              {topic.alternateExplanation.title}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {topic.alternateExplanation.exampleStory}
            </p>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 italic">
              Tip: {topic.alternateExplanation.tip}
            </p>
          </div>
        )}
      </div>

      {/* Action to Proceed to Feynman Step 2 */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onProceedToPractice}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <span>Step 2: Explain Back & Practice</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
