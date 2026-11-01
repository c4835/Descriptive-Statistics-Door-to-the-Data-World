import { UserTopicState, TopicStatus, FeedbackReport } from '../types/stats';
import { TOPICS_DATA } from '../data/statisticsContent';

const STORAGE_KEY_PROGRESS = 'descriptive_stats_progress_v1';
const STORAGE_KEY_LANG = 'descriptive_stats_lang_v1';
const STORAGE_KEY_DARK = 'descriptive_stats_dark_v1';
const STORAGE_KEY_REPORTS = 'descriptive_stats_reports_v1';
const STORAGE_KEY_AI_NOTICE = 'descriptive_stats_ai_notice_v1';

export function getInitialTopicState(topicId: number): UserTopicState {
  return {
    topicId,
    status: 'not_started',
    currentStage: 'explain',
    practiceAttemptsCount: 0,
    usedSupportedFrame: false,
    learnerExplanation: '',
    learnerCalculation: '',
    mistakeSolved: false,
    mistakeUnfinished: false,
    mistakeAttemptsCount: 0,
    revealedHints: 0,
    learnerMistakeStepIdentified: '',
    learnerMistakeCorrection: '',
    learnerMistakeReason: '',
    teachBackExplanation: '',
    teachBackExample: '',
    teachBackAttemptsCount: 0,
    lastUpdated: Date.now(),
  };
}

export function loadAllProgress(): Record<number, UserTopicState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) {
      const initial: Record<number, UserTopicState> = {};
      TOPICS_DATA.forEach((t) => {
        initial[t.id] = getInitialTopicState(t.id);
      });
      return initial;
    }
    const parsed = JSON.parse(raw);
    TOPICS_DATA.forEach((t) => {
      if (!parsed[t.id]) {
        parsed[t.id] = getInitialTopicState(t.id);
      }
    });
    return parsed;
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    const fallback: Record<number, UserTopicState> = {};
    TOPICS_DATA.forEach((t) => {
      fallback[t.id] = getInitialTopicState(t.id);
    });
    return fallback;
  }
}

export function saveTopicState(state: UserTopicState): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadAllProgress();
    current[state.topicId] = {
      ...state,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save topic state to localStorage', e);
  }
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
  } catch (e) {
    console.error('Failed to reset progress', e);
  }
}

export function getTopicsToRevisit(progress: Record<number, UserTopicState>): Array<{
  topicId: number;
  title: string;
  reason: string;
}> {
  const list: Array<{ topicId: number; title: string; reason: string }> = [];

  TOPICS_DATA.forEach((topic) => {
    const state = progress[topic.id];
    if (!state) return;

    if (state.status === 'needs_revisiting') {
      list.push({
        topicId: topic.id,
        title: topic.title,
        reason: 'Learner requested to move on and revisit later',
      });
    } else if (state.mistakeUnfinished) {
      list.push({
        topicId: topic.id,
        title: topic.title,
        reason: 'Unfinished: deliberate mistake exercise still contains an error',
      });
    } else if (state.status === 'supported_attempt') {
      list.push({
        topicId: topic.id,
        title: topic.title,
        reason: 'Completed with support; independent attempt available',
      });
    }
  });

  return list;
}

export function loadUserLanguage(defaultLang: string): string {
  if (typeof window === 'undefined') return defaultLang;
  return localStorage.getItem(STORAGE_KEY_LANG) || defaultLang;
}

export function saveUserLanguage(lang: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_LANG, lang);
}

export function loadDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem(STORAGE_KEY_DARK);
  if (saved !== null) {
    return saved === 'true';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function saveDarkMode(isDark: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_DARK, String(isDark));
}

export function hasAcceptedAINotice(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY_AI_NOTICE) === 'true';
}

export function saveAcceptedAINotice(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_AI_NOTICE, 'true');
}

export function saveReportLocally(report: FeedbackReport): void {
  if (typeof window === 'undefined') return;
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY_REPORTS);
    const existing: FeedbackReport[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push(report);
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save report locally', e);
  }
}
