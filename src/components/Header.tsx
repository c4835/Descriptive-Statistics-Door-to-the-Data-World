import React from 'react';
import {
  DoorOpen,
  Moon,
  Sun,
  Globe,
  RotateCcw,
  BookOpen,
  Layers,
  HelpCircle,
  Home,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/language';
import { TopicStatus } from '../types/stats';

interface HeaderProps {
  currentTopicId: number | null; // null if on home/welcome
  totalTopics: number;
  revisitCount: number;
  currentLanguage: string;
  isDarkMode: boolean;
  onSelectLanguage: (lang: string) => void;
  onToggleDarkMode: () => void;
  onOpenProgress: () => void;
  onOpenRevisitList: () => void;
  onOpenAbout: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTopicId,
  totalTopics,
  revisitCount,
  currentLanguage,
  isDarkMode,
  onSelectLanguage,
  onToggleDarkMode,
  onOpenProgress,
  onOpenRevisitList,
  onOpenAbout,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <DoorOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400">
                A Door to the Data World
              </div>
              <h1 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">
                Descriptive Statistics
              </h1>
            </div>
          </button>
        </div>

        {/* Current Topic indicator */}
        {currentTopicId !== null && (
          <div className="hidden md:flex items-center gap-2 bg-stone-100 dark:bg-stone-800/80 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 dark:text-stone-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>
              Topic {currentTopicId} of {totalTopics}
            </span>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Topics to revisit badge button */}
          {revisitCount > 0 && (
            <button
              type="button"
              onClick={onOpenRevisitList}
              aria-label={`Topics to revisit: ${revisitCount}`}
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">To Revisit</span>
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {revisitCount}
              </span>
            </button>
          )}

          {/* Progress Overview Button */}
          <button
            type="button"
            onClick={onOpenProgress}
            aria-label="View overall progress"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Layers className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            <span className="hidden sm:inline">Progress</span>
          </button>

          {/* Language Selector */}
          <div className="relative inline-flex items-center">
            <label htmlFor="header-language-select" className="sr-only">
              Select preferred language
            </label>
            <Globe className="w-3.5 h-3.5 text-stone-500 absolute left-2 pointer-events-none" />
            <select
              id="header-language-select"
              value={currentLanguage}
              onChange={(e) => onSelectLanguage(e.target.value)}
              className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 pl-7 pr-4 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-amber-500 cursor-pointer appearance-none font-medium"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* About / Ethics */}
          <button
            type="button"
            onClick={onOpenAbout}
            aria-label="About this site and ethical disclosures"
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
