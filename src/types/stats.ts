export type TopicStatus =
  | 'not_started'
  | 'in_progress'
  | 'supported_attempt'
  | 'needs_revisiting'
  | 'complete';

export type StageId =
  | 'explain'
  | 'practice'
  | 'mistake'
  | 'teach_back'
  | 'final_pause'
  | 'complete';

export interface StepCalculation {
  step: string;
  detail: string;
  math?: string;
}

export interface JargonTerm {
  term: string;
  plainMeaning: string;
}

export interface ChartItem {
  label: string;
  value: number;
  icon?: string;
  color?: string;
}

export interface TopicChart {
  type: 'bar' | 'pictogram' | 'line';
  title: string;
  description: string;
  xAxisLabel: string;
  yAxisLabel: string;
  units: string;
  items: ChartItem[];
  accessibleSummary: string;
}

export interface MisleadingExample {
  title: string;
  tactic: string;
  whyItMisleads: string;
  howToSpotIt: string;
  data: { label: string; value: number }[];
  yAxisMinTruncated: number;
  yAxisMinHonest: number;
}

export interface DeliberateMistakeStep {
  stepNum: number;
  title: string;
  content: string;
  isErrorStep: boolean;
}

export interface DeliberateMistake {
  scenario: string;
  workedSteps: DeliberateMistakeStep[];
  errorStepNumber: number;
  exactMistakeDescription: string;
  whyWrong: string;
  correctCorrection: string;
  fullCorrectSolution: string;
  hints: string[];
}

export interface PracticeQuestion {
  prompt: string;
  explainPrompt: string;
  calculationPrompt: string;
  data: (number | string)[];
  units: string;
  expectedAnswer: number | string;
  answerType: 'number' | 'text';
  tolerance?: number;
  sentenceFrame: string;
  modelExplanation: string;
  hint: string;
}

export interface SuggestedSituation {
  title: string;
  scenario: string;
  suggestedNumbers: string;
}

export interface TopicContent {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  everydayContext: string;
  badge: string;
  teachingCard: {
    simpleExplanation: string;
    everydayExampleTitle: string;
    everydayExampleStory: string;
    dataList: (number | string)[];
    units: string;
    stepByStep: StepCalculation[];
    result: string;
    whyUseful: string;
    jargonBuster: JargonTerm[];
    keyTakeaway: string;
  };
  alternateExplanation: {
    title: string;
    analogy: string;
    exampleStory: string;
    dataList: (number | string)[];
    units: string;
    stepByStep: StepCalculation[];
    result: string;
    tip: string;
  };
  practiceQuestion: PracticeQuestion;
  deliberateMistake: DeliberateMistake;
  suggestedSituations: SuggestedSituation[];
  keyPointsRubric: string[];
  chart?: TopicChart;
  misleadingDemo?: MisleadingExample;
}

export interface UserTopicState {
  topicId: number;
  status: TopicStatus;
  currentStage: StageId;
  practiceAttemptsCount: number;
  usedSupportedFrame: boolean;
  
  // Practice answers
  learnerExplanation: string;
  learnerCalculation: string;
  practiceFeedback?: {
    isCalculationCorrect: boolean;
    whatYouGotRight: string;
    whatYouMissedOrGotWrong: string;
    howToMakeClearer: string;
    suggestSimpler?: boolean;
    rawFeedback?: string;
  };

  // Mistake exercise
  mistakeSolved: boolean;
  mistakeUnfinished: boolean;
  mistakeAttemptsCount: number;
  revealedHints: number;
  learnerMistakeStepIdentified: string;
  learnerMistakeCorrection: string;
  learnerMistakeReason: string;
  mistakeFeedback?: {
    isCorrect: boolean;
    isVague: boolean;
    feedbackText: string;
    hintToOffer?: string;
    revealedFullSolution?: boolean;
  };

  // Teach back
  teachBackExplanation: string;
  teachBackExample: string;
  teachBackAttemptsCount: number;
  teachBackFeedback?: {
    isComplete: boolean;
    whatYouDidWell: string;
    gapsOrSuggestions: string;
    encouragement: string;
  };

  // Final pause
  pauseQuestion?: string;
  learnerPauseQuestion?: string;
  pauseAnswer?: {
    simpleAnswer: string;
    checkQuestion: string;
    checkAnswerExplanation: string;
  };

  lastUpdated: number;
}

export interface FeedbackReport {
  id: string;
  topicId: number;
  stage: string;
  feedbackText: string;
  userComment: string;
  timestamp: number;
}
