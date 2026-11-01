import React from 'react';
import {
  DoorOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Lightbulb,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/language';
import { TOPICS_DATA } from '../data/statisticsContent';
import { TopicStatus } from '../types/stats';

interface WelcomeScreenProps {
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onStartLearning: (topicId?: number) => void;
  onOpenAbout: () => void;
  revisitCount: number;
  onOpenRevisitList: () => void;
  lastActiveTopicId?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  currentLanguage,
  onSelectLanguage,
  onStartLearning,
  onOpenAbout,
  revisitCount,
  onOpenRevisitList,
  lastActiveTopicId = 1,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Section with Door Motif */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 border border-amber-300/30 text-amber-100 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>For Adults Aged 18+ • Beginner Friendly</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight leading-tight">
              An Introduction to Descriptive Statistics
            </h1>
            <p className="text-lg sm:text-xl font-medium text-amber-100">
              A Door to the Data World
            </p>

            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-xl">
              Statistics is not dry equations or complicated jargon. It is simply the art of turning everyday observations — like grocery shopping, travel times, and electricity bills — into clear, confident decisions.
            </p>

            {/* Language & CTA buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onStartLearning(lastActiveTopicId)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-amber-950 font-bold hover:bg-amber-50 active:scale-95 transition-all shadow-lg shadow-black/20 text-sm sm:text-base cursor-pointer"
              >
                <span>{lastActiveTopicId > 1 ? `Resume Topic ${lastActiveTopicId}` : 'Step Through the Door'}</span>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </button>

              {revisitCount > 0 && (
                <button
                  type="button"
                  onClick={onOpenRevisitList}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-white font-medium border border-amber-400/30 text-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-amber-300" />
                  <span>Review {revisitCount} Topics to Revisit</span>
                </button>
              )}
            </div>
          </div>

          {/* Door Motif Graphic */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-44 h-64 sm:w-52 sm:h-72 rounded-t-full border-4 border-amber-300/60 bg-gradient-to-b from-amber-800 to-amber-950 flex flex-col items-center justify-between p-4 shadow-2xl overflow-hidden group">
              {/* Door Frame Inner Arch */}
              <div className="absolute inset-2 rounded-t-full border-2 border-dashed border-amber-400/40" />

              {/* Glowing door light */}
              <div className="relative mt-8 text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-300/40 shadow-inner">
                  <DoorOpen className="w-8 h-8 text-amber-200 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-amber-200 uppercase tracking-widest">
                  Feynman Method
                </div>
              </div>

              {/* Door Handle & Details */}
              <div className="relative w-full flex items-center justify-between px-3 pb-2 text-[11px] text-amber-300/80">
                <span className="font-mono">8 Topics</span>
                <div className="w-3 h-3 rounded-full bg-amber-300 shadow-md border border-amber-600" />
                <span>Everyday Life</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Preference Card */}
      <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
            <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Learn in Your Preferred Language
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Type explanations and receive feedback in your mother tongue.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="welcome-language-picker" className="text-xs font-medium text-stone-600 dark:text-stone-400">
            Language:
          </label>
          <select
            id="welcome-language-picker"
            value={currentLanguage}
            onChange={(e) => onSelectLanguage(e.target.value)}
            className="text-xs sm:text-sm font-semibold bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* The 4-Step Feynman Method Explainer */}
      <section className="space-y-4">
        <div className="text-center sm:text-left space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            How You Will Learn
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            The Feynman 4-Stage Learning Cycle
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
            Nobel laureate Richard Feynman showed that true understanding happens when you can explain something in plain words without memorising formulas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Read & Visualise
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Read a simple explanation rooted in an everyday adult story with small, friendly numbers.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Explain It Back
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Put the idea into your own words and solve one short practice question. Get 3-part constructive feedback.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Spot the Deliberate Mistake
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Inspect a worked example containing exactly one hidden mistake. Find it, correct it, and explain why it failed.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-sm">
              4
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Teach-Back & Final Pause
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Teach it in 2-3 sentences using your own real-world situation. Ask any lingering questions before moving forward.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap */}
      <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              The 8 Guided Topics
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Designed in sequence, building step-by-step from data types to a complete household budget scenario.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onStartLearning(1)}
            className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
          >
            Start Topic 1 →
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {TOPICS_DATA.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onStartLearning(topic.id)}
              className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 bg-stone-50/60 dark:bg-stone-800/40 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-all cursor-pointer flex items-start gap-3 group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {topic.id}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <span>{topic.title}</span>
                  <span className="text-[10px] font-normal text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/80 px-1.5 py-0.2 rounded">
                    {topic.badge}
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-1">
                  {topic.everydayContext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust, Privacy & Ethics Badges */}
      <section className="bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 rounded-2xl p-5 text-xs text-stone-600 dark:text-stone-300 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold text-stone-800 dark:text-stone-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ethical, Accessible & Privacy-First Learning</span>
          </div>
          <button
            type="button"
            onClick={onOpenAbout}
            className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
          >
            Read Full Disclosures & EU AI Act Notes →
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 pt-1 text-[11px] leading-relaxed">
          <div className="space-y-1">
            <strong className="text-stone-900 dark:text-stone-100 block">No Accounts or Tracking</strong>
            Your progress is stored strictly in your browser (localStorage). No cookies, no analytics, no sign-ups.
          </div>
          <div className="space-y-1">
            <strong className="text-stone-900 dark:text-stone-100 block">Formative AI Only</strong>
            AI provides gentle feedback, hints, and translation. It never grades, certifies, or ranks you.
          </div>
          <div className="space-y-1">
            <strong className="text-stone-900 dark:text-stone-100 block">Code-Verified Math</strong>
            All calculations are checked by rigorous code algorithms first, ensuring AI never misleads on numbers.
          </div>
        </div>
      </section>
    </div>
  );
};
