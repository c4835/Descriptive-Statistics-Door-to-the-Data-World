import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  STATS_TUTOR_SYSTEM_INSTRUCTION,
  buildExplainFeedbackPrompt,
  buildMistakeHintPrompt,
  buildTeachBackPrompt,
  buildPauseQAPrompt,
  buildTranslationPrompt,
} from './src/server/prompts.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MODEL_NAME = 'gemini-3.8-flash';

// In-memory translation cache to uphold sustainability and avoid duplicate AI calls
const translationCache = new Map<string, any>();

// Problem reports storage (privacy-first: no personal data, stored in memory)
const problemReports: any[] = [];

/**
 * Helper to safely extract JSON from Gemini text response
 */
function cleanAndParseJSON(rawText: string | undefined): any {
  if (!rawText) return null;
  let text = rawText.trim();
  // Strip markdown code fences if present
  if (text.startsWith('```json')) {
    text = text.substring(7);
  } else if (text.startsWith('```')) {
    text = text.substring(3);
  }
  if (text.endsWith('```')) {
    text = text.substring(0, text.length - 3);
  }
  text = text.trim();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse model JSON:', text, err);
    return null;
  }
}

/**
 * Route: Formative feedback on explanation and calculation
 */
app.post('/api/feedback/explain', async (req: Request, res: Response) => {
  try {
    const {
      topicTitle,
      topicRubric,
      learnerExplanation,
      learnerCalculation,
      expectedCalculationAnswer,
      isCalculationCorrect,
      codeMathFeedback,
      language = 'en',
    } = req.body;

    if (!learnerExplanation && !learnerCalculation) {
      return res.status(400).json({ error: 'Please provide an explanation or calculation.' });
    }

    const prompt = buildExplainFeedbackPrompt({
      topicTitle,
      topicRubric: topicRubric || [],
      learnerExplanation: learnerExplanation || '',
      learnerCalculation: learnerCalculation || '',
      expectedCalculationAnswer,
      isCalculationCorrect: Boolean(isCalculationCorrect),
      codeMathFeedback: codeMathFeedback || '',
      language,
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: STATS_TUTOR_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJSON(response.text);

    if (parsed) {
      return res.json({
        ...parsed,
        isCalculationCorrect: Boolean(isCalculationCorrect),
        aiGenerated: true,
      });
    }

    // Graceful fallback if JSON parsing failed
    return res.json({
      whatYouGotRight: isCalculationCorrect
        ? 'Your calculation matched the expected answer!'
        : 'Thank you for putting your thoughts into your own words.',
      whatYouMissedOrGotWrong: codeMathFeedback || 'Review the core definition and try comparing your steps.',
      howToMakeClearer: 'Try using the everyday example to talk through each step out loud.',
      suggestSimpler: !isCalculationCorrect,
      isCalculationCorrect: Boolean(isCalculationCorrect),
      aiGenerated: true,
    });
  } catch (error: any) {
    console.error('Explain feedback error:', error);
    // Even if Gemini fails, code-calculated truth is returned!
    return res.json({
      whatYouGotRight: req.body.isCalculationCorrect
        ? 'Your calculation was verified correct by our mathematical engine.'
        : 'You engaged with the practice question.',
      whatYouMissedOrGotWrong: req.body.codeMathFeedback,
      howToMakeClearer: 'Consider reviewing the teaching card steps once more.',
      suggestSimpler: !req.body.isCalculationCorrect,
      isCalculationCorrect: Boolean(req.body.isCalculationCorrect),
      aiGenerated: false,
      notice: 'AI feedback was momentarily unavailable, but your calculation was checked by code.',
    });
  }
});

/**
 * Route: Deliberate mistake evaluation and progressive hints
 */
app.post('/api/feedback/mistake-hint', async (req: Request, res: Response) => {
  try {
    const {
      topicTitle,
      scenario,
      workedSteps,
      exactMistakeDescription,
      correctCorrection,
      learnerStep,
      learnerCorrection,
      learnerReason,
      attemptNumber = 1,
      hintsRevealedSoFar = [],
      nextHint = '',
      language = 'en',
    } = req.body;

    const prompt = buildMistakeHintPrompt({
      topicTitle,
      scenario,
      workedSteps: JSON.stringify(workedSteps, null, 2),
      exactMistakeDescription,
      correctCorrection,
      learnerStep: learnerStep || '',
      learnerCorrection: learnerCorrection || '',
      learnerReason: learnerReason || '',
      attemptNumber,
      hintsRevealedSoFar,
      nextHint,
      language,
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: STATS_TUTOR_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJSON(response.text);
    if (parsed) {
      return res.json({
        ...parsed,
        aiGenerated: true,
      });
    }

    return res.json({
      isCorrect: false,
      isVague: false,
      feedbackText: 'Keep looking closely at the calculation in each step. Which number looks unusual?',
      hintToOffer: nextHint || 'Check the very first step.',
      revealedFullSolution: false,
      aiGenerated: true,
    });
  } catch (error: any) {
    console.error('Mistake hint error:', error);
    return res.json({
      isCorrect: false,
      isVague: false,
      feedbackText: 'Take another look at the steps. Pay close attention to what numbers were used.',
      hintToOffer: req.body.nextHint || 'Check which numbers are in the list.',
      revealedFullSolution: false,
      aiGenerated: false,
    });
  }
});

/**
 * Route: Independent teach-back evaluation
 */
app.post('/api/feedback/teach-back', async (req: Request, res: Response) => {
  try {
    const { topicTitle, topicRubric, learnerExplanation, learnerExample, language = 'en' } = req.body;

    const prompt = buildTeachBackPrompt({
      topicTitle,
      topicRubric: topicRubric || [],
      learnerExplanation: learnerExplanation || '',
      learnerExample: learnerExample || '',
      language,
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: STATS_TUTOR_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJSON(response.text);
    if (parsed) {
      return res.json({ ...parsed, aiGenerated: true });
    }

    return res.json({
      isComplete: true,
      whatYouDidWell: 'Great job explaining this idea in your own words with a practical situation!',
      gapsOrSuggestions: '',
      encouragement: 'You are ready to put this into practice.',
      aiGenerated: true,
    });
  } catch (error: any) {
    console.error('Teach back error:', error);
    return res.json({
      isComplete: true,
      whatYouDidWell: 'Thank you for explaining this concept with your own example.',
      gapsOrSuggestions: '',
      encouragement: 'Well done on completing this teach-back.',
      aiGenerated: false,
    });
  }
});

/**
 * Route: Final pause question answering and check
 */
app.post('/api/feedback/pause-qa', async (req: Request, res: Response) => {
  try {
    const { topicTitle, question, language = 'en' } = req.body;

    const prompt = buildPauseQAPrompt({
      topicTitle,
      question: question || '',
      language,
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: STATS_TUTOR_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJSON(response.text);
    if (parsed) {
      return res.json({ ...parsed, aiGenerated: true });
    }

    return res.json({
      simpleAnswer: 'That is a thoughtful question. In descriptive statistics, keeping things simple and looking at the raw data first is always the best guide.',
      checkQuestion: 'Does the median or the mean stay steadier when an extreme number occurs?',
      checkAnswerExplanation: 'The median stays steadier because it only looks at the middle position.',
      aiGenerated: true,
    });
  } catch (error: any) {
    console.error('Pause QA error:', error);
    return res.json({
      simpleAnswer: 'In descriptive statistics, focusing on everyday examples and sorting your data first helps answer most questions.',
      checkQuestion: 'Are you ready to move forward to the next topic?',
      checkAnswerExplanation: 'Take your time and explore when ready.',
      aiGenerated: false,
    });
  }
});

/**
 * Route: On-demand multilingual translation with caching
 */
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { targetLanguage, topicId, content } = req.body;

    if (!targetLanguage || targetLanguage === 'en' || targetLanguage === 'en-GB') {
      return res.json({ translated: content, cached: true });
    }

    const cacheKey = `${topicId || 'generic'}_${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      return res.json({ translated: translationCache.get(cacheKey), cached: true, aiGenerated: true });
    }

    const prompt = buildTranslationPrompt({
      targetLanguage,
      contentToTranslate: content,
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const translated = cleanAndParseJSON(response.text) || content;
    translationCache.set(cacheKey, translated);

    return res.json({ translated, cached: false, aiGenerated: true });
  } catch (error: any) {
    console.error('Translation error:', error);
    return res.json({ translated: req.body.content, cached: false, aiGenerated: false, error: 'Translation failed' });
  }
});

/**
 * Route: Report problem with AI feedback (privacy-friendly, no PII)
 */
app.post('/api/report-problem', (req: Request, res: Response) => {
  const { topicId, stage, feedbackText, userComment } = req.body;
  const report = {
    id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    topicId,
    stage,
    feedbackText: (feedbackText || '').slice(0, 500),
    userComment: (userComment || '').slice(0, 500),
    timestamp: Date.now(),
  };
  problemReports.push(report);
  console.log('Received feedback problem report:', report);
  return res.json({ success: true, reportId: report.id });
});

/**
 * Setup Vite in dev or static files in production
 */
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Educational statistics server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot error:', err);
  process.exit(1);
});
