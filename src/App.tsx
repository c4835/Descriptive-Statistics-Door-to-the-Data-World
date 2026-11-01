import React, { useState, useEffect } from 'react';
import { TOPICS_DATA } from './data/statisticsContent';
import { UserTopicState, StageId, TopicContent } from './types/stats';
import {
  loadAllProgress,
  saveTopicState,
  resetAllProgress,
  getTopicsToRevisit,
  loadUserLanguage,
  saveUserLanguage,
  loadDarkMode,
  saveDarkMode,
  hasAcceptedAINotice,
  saveAcceptedAINotice,
  getInitialTopicState,
} from './utils/storage';
import {
  getBrowserDefaultLanguage,
  isLanguageRTL,
  SUPPORTED_LANGUAGES,
} from './utils/language';
import { Header } from './components/Header';
import { AITransparencyBanner } from './components/AITransparencyBanner';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TeachingCard } from './components/TeachingCard';
import { ExplainBackPractice } from './components/ExplainBackPractice';
import { DeliberateMistakeExercise } from './components/DeliberateMistakeExercise';
import { TeachBackExercise } from './components/TeachBackExercise';
import { FinalPause } from './components/FinalPause';
import { ProgressDrawer } from './components/ProgressDrawer';
import { AboutModal } from './components/AboutModal';
import {
  BookOpen,
  Send,
  AlertTriangle,
  GraduationCap,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function App() {
  // 1. Language state
  const [currentLanguage, setCurrentLanguage] = useState<string>(() =>
    loadUserLanguage(getBrowserDefaultLanguage())
  );

  // 2. Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => loadDarkMode());

  // 3. AI Banner notice state
  const [showAIBanner, setShowAIBanner] = useState<boolean>(() => !hasAcceptedAINotice());

  // 4. Progress state
  const [progress, setProgress] = useState<Record<number, UserTopicState>>(() =>
    loadAllProgress()
  );

  // 5. Active view: null for Welcome screen, number 1-8 for Topic
  const [activeTopicId, setActiveTopicId] = useState<number | null>(null);

  // 6. Active stage within current topic
  const [activeStage, setActiveStage] = useState<StageId>('explain');

  // 7. Modals / Drawers
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Sync dark mode class and RTL direction
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const isRTL = isLanguageRTL(currentLanguage);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLanguage);
    saveUserLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleDismissAIBanner = () => {
    setShowAIBanner(false);
    saveAcceptedAINotice();
  };

  const handleSelectTopic = (topicId: number) => {
    setActiveTopicId(topicId);
    // Restore learner's current stage for this topic
    const topicState = progress[topicId] || getInitialTopicState(topicId);
    setActiveStage(topicState.currentStage || 'explain');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateTopicState = (newState: Partial<UserTopicState>) => {
    if (activeTopicId === null) return;
    const current = progress[activeTopicId] || getInitialTopicState(activeTopicId);
    const updated: UserTopicState = {
      ...current,
      ...newState,
      topicId: activeTopicId,
      currentStage: activeStage,
      lastUpdated: Date.now(),
    };

    setProgress((prev) => ({
      ...prev,
      [activeTopicId]: updated,
    }));
    saveTopicState(updated);
  };

  const handleResetProgress = () => {
    resetAllProgress();
    setProgress(loadAllProgress());
    setActiveTopicId(null);
    setActiveStage('explain');
  };

  // Revisit helper
  const topicsToRevisit = getTopicsToRevisit(progress);

  // Determine active topic content
  const currentTopic = activeTopicId !== null
    ? TOPICS_DATA.find((t) => t.id === activeTopicId) || TOPICS_DATA[0]
    : null;

  const currentTopicState = activeTopicId !== null
    ? progress[activeTopicId] || getInitialTopicState(activeTopicId)
    : getInitialTopicState(1);

  // Stages metadata for tabs
  const stagesList: { id: StageId; label: string; icon: any }[] = [
    { id: 'explain', label: '1. Teach', icon: BookOpen },
    { id: 'practice', label: '2. Practice', icon: Send },
    { id: 'mistake', label: '3. Mistake', icon: AlertTriangle },
    { id: 'teach_back', label: '4. Teach-Back', icon: GraduationCap },
    { id: 'final_pause', label: '5. Pause', icon: MessageSquare },
  ];

  // Stage navigation transitions
  const handleProceedToPractice = () => {
    setActiveStage('practice');
    handleUpdateTopicState({ currentStage: 'practice', status: 'in_progress' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToMistake = () => {
    setActiveStage('mistake');
    handleUpdateTopicState({ currentStage: 'mistake' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToTeachBack = () => {
    setActiveStage('teach_back');
    handleUpdateTopicState({ currentStage: 'teach_back' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToFinalPause = () => {
    setActiveStage('final_pause');
    handleUpdateTopicState({ currentStage: 'final_pause' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkTopicComplete = () => {
    if (activeTopicId === null) return;
    const wasSupported = currentTopicState.usedSupportedFrame;
    const finalStatus = wasSupported ? 'supported_attempt' : 'complete';

    handleUpdateTopicState({
      status: finalStatus,
      currentStage: 'final_pause',
    });

    // Check if next topic exists
    if (activeTopicId < TOPICS_DATA.length) {
      handleSelectTopic(activeTopicId + 1);
    } else {
      // Completed last topic (Topic 8: Capstone)!
      setIsProgressOpen(true);
    }
  };

  const handleMoveOnAndRevisitLater = () => {
    if (activeTopicId === null) return;
    handleUpdateTopicState({
      status: 'needs_revisiting',
    });

    if (activeTopicId < TOPICS_DATA.length) {
      handleSelectTopic(activeTopicId + 1);
    } else {
      setIsProgressOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors">
      {/* 1. EU AI Act Upfront Notice Banner */}
      {showAIBanner && (
        <AITransparencyBanner
          onDismiss={handleDismissAIBanner}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      )}

      {/* 2. Non-English Translation Caveat Banner */}
      {currentLanguage !== 'en' && (
        <div
          role="status"
          className="bg-amber-100/70 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800/80 px-4 py-2 text-xs text-amber-950 dark:text-amber-200"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <p>
              <strong>Translation note:</strong> This translation was produced by AI and may contain errors. The English version is the reviewed original.
            </p>
            <button
              type="button"
              onClick={() => setCurrentLanguage('en')}
              className="font-bold underline shrink-0 hover:text-amber-800"
            >
              Switch to English original
            </button>
          </div>
        </div>
      )}

      {/* 3. Header */}
      <Header
        currentTopicId={activeTopicId}
        totalTopics={TOPICS_DATA.length}
        revisitCount={topicsToRevisit.length}
        currentLanguage={currentLanguage}
        isDarkMode={isDarkMode}
        onSelectLanguage={setCurrentLanguage}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenRevisitList={() => setIsProgressOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onGoHome={() => setActiveTopicId(null)}
      />

      {/* 4. Main Body */}
      <main className="flex-1 py-6">
        {activeTopicId === null ? (
          /* Welcome Screen */
          <WelcomeScreen
            currentLanguage={currentLanguage}
            onSelectLanguage={setCurrentLanguage}
            onStartLearning={(id) => handleSelectTopic(id || 1)}
            onOpenAbout={() => setIsAboutOpen(true)}
            revisitCount={topicsToRevisit.length}
            onOpenRevisitList={() => setIsProgressOpen(true)}
            lastActiveTopicId={
              Object.keys(progress).length > 0
                ? Math.min(
                    TOPICS_DATA.length,
                    Math.max(
                      1,
                      ...Object.values(progress)
                        .filter((p) => p.status !== 'not_started')
                        .map((p) => p.topicId)
                    )
                  )
                : 1
            }
          />
        ) : (
          /* Topic Learning Interface */
          currentTopic && (
            <div className="max-w-4xl mx-auto px-4 space-y-6">
              {/* Back to Home & Topic Selector */}
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTopicId(null)}
                  className="inline-flex items-center gap-1 font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Welcome &amp; Overview</span>
                </button>

                <div className="flex items-center gap-1">
                  {TOPICS_DATA.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTopic(t.id)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        t.id === activeTopicId
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                      }`}
                      aria-label={`Go to topic ${t.id}: ${t.title}`}
                    >
                      {t.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feynman Stage Pills Navigation */}
              <nav
                aria-label="Feynman learning stages"
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-1.5 shadow-xs flex items-center justify-between gap-1 overflow-x-auto"
              >
                {stagesList.map((stg) => {
                  const Icon = stg.icon;
                  const isActive = activeStage === stg.id;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => {
                        setActiveStage(stg.id);
                        handleUpdateTopicState({ currentStage: stg.id });
                      }}
                      className={`flex-1 min-w-[75px] sm:min-w-[100px] py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{stg.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Stage Viewport */}
              <div className="min-h-[500px]">
                {activeStage === 'explain' && (
                  <TeachingCard
                    topic={currentTopic}
                    onProceedToPractice={handleProceedToPractice}
                  />
                )}

                {activeStage === 'practice' && (
                  <ExplainBackPractice
                    topic={currentTopic}
                    userState={currentTopicState}
                    currentLanguage={currentLanguage}
                    onUpdateState={handleUpdateTopicState}
                    onProceedToMistake={handleProceedToMistake}
                    onMoveOnAndRevisitLater={handleMoveOnAndRevisitLater}
                    onBackToExplanation={() => setActiveStage('explain')}
                  />
                )}

                {activeStage === 'mistake' && (
                  <DeliberateMistakeExercise
                    topic={currentTopic}
                    userState={currentTopicState}
                    currentLanguage={currentLanguage}
                    onUpdateState={handleUpdateTopicState}
                    onProceedToTeachBack={handleProceedToTeachBack}
                    onLeaveUnfinished={handleMoveOnAndRevisitLater}
                  />
                )}

                {activeStage === 'teach_back' && (
                  <TeachBackExercise
                    topic={currentTopic}
                    userState={currentTopicState}
                    currentLanguage={currentLanguage}
                    onUpdateState={handleUpdateTopicState}
                    onProceedToFinalPause={handleProceedToFinalPause}
                    onMoveOnAndRevisitLater={handleMoveOnAndRevisitLater}
                  />
                )}

                {activeStage === 'final_pause' && (
                  <FinalPause
                    topic={currentTopic}
                    userState={currentTopicState}
                    currentLanguage={currentLanguage}
                    onUpdateState={handleUpdateTopicState}
                    onMarkTopicComplete={handleMarkTopicComplete}
                    onMoveOnAndRevisitLater={handleMoveOnAndRevisitLater}
                  />
                )}
              </div>

              {/* Bottom Quick Navigation */}
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">
                {activeTopicId > 1 ? (
                  <button
                    type="button"
                    onClick={() => handleSelectTopic(activeTopicId - 1)}
                    className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Topic {activeTopicId - 1}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => setIsProgressOpen(true)}
                  className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Topic Status &amp; Revisit List</span>
                </button>

                {activeTopicId < TOPICS_DATA.length ? (
                  <button
                    type="button"
                    onClick={() => handleSelectTopic(activeTopicId + 1)}
                    className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100"
                  >
                    <span>Topic {activeTopicId + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )
        )}
      </main>

      {/* 5. Accessible Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-6 px-4 bg-white/60 dark:bg-stone-900/60 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            &copy; 2026 An Introduction to Descriptive Statistics • Built with Feynman&apos;s Learning Method for Adult Beginners.
          </p>
          <div className="flex items-center gap-4 font-medium">
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="hover:underline text-amber-700 dark:text-amber-400"
            >
              Ethics &amp; EU AI Act Notes
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsProgressOpen(true)}
              className="hover:underline"
            >
              Check Progress
            </button>
            <span>•</span>
            <span>WCAG 2.2 AA Accessible</span>
          </div>
        </div>
      </footer>

      {/* 6. Modals */}
      <ProgressDrawer
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        progress={progress}
        onSelectTopic={handleSelectTopic}
        onResetProgress={handleResetProgress}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
