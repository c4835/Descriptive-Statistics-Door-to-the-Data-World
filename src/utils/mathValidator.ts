/**
 * Deterministic code-based math calculations and validators.
 * As required by the pedagogical principles, AI never evaluates raw mathematics
 * without code-checked ground truths.
 */

export function parseLearnerNumber(input: string): number | null {
  if (!input) return null;
  // Strip currency symbols (£, $, €, ₹), whitespace, and letters like "pounds", "units", "mins"
  const cleaned = input
    .replace(/[£$€₹]/g, '')
    .replace(/,/g, '')
    .trim();

  // Find the first float or integer
  const match = cleaned.match(/[-+]?\d*\.?\d+/);
  if (!match) return null;
  const num = parseFloat(match[0]);
  return isNaN(num) ? null : num;
}

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / values.length).toFixed(2));
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
}

export function calculateMode(values: (number | string)[]): (number | string)[] {
  if (values.length === 0) return [];
  const freqMap = new Map<string, number>();
  for (const v of values) {
    const key = String(v).trim().toLowerCase();
    freqMap.set(key, (freqMap.get(key) || 0) + 1);
  }

  let maxCount = 0;
  freqMap.forEach((count) => {
    if (count > maxCount) maxCount = count;
  });

  // If every item occurs once, there is no mode
  if (maxCount <= 1) return [];

  const modes: (number | string)[] = [];
  freqMap.forEach((count, key) => {
    if (count === maxCount) {
      // Find original representation if possible
      const original = values.find((v) => String(v).trim().toLowerCase() === key);
      modes.push(original ?? key);
    }
  });

  return modes;
}

export function calculateRange(values: number[]): number {
  if (values.length === 0) return 0;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Number((max - min).toFixed(2));
}

export function checkNumericAnswer(
  learnerInput: string,
  expected: number | string,
  tolerance = 0.05
): {
  isCorrect: boolean;
  parsedNumber: number | null;
  feedbackNote: string;
} {
  if (typeof expected === 'number') {
    const parsed = parseLearnerNumber(learnerInput);
    if (parsed === null) {
      return {
        isCorrect: false,
        parsedNumber: null,
        feedbackNote: 'Please enter a number for the calculation.',
      };
    }

    const diff = Math.abs(parsed - expected);
    const isCorrect = diff <= tolerance;

    let feedbackNote = '';
    if (isCorrect) {
      feedbackNote = `Correct! The calculation gave ${expected}.`;
    } else {
      feedbackNote = `The calculation result was ${parsed}, but the target value is ${expected}.`;
    }

    return { isCorrect, parsedNumber: parsed, feedbackNote };
  } else {
    // String matching (e.g. for categorical vs numerical, or mode name)
    const cleanedLearner = learnerInput.toLowerCase().trim();
    const cleanedExpected = String(expected).toLowerCase().trim();
    const isCorrect =
      cleanedLearner.includes(cleanedExpected) ||
      cleanedExpected.split(',').some((part) => cleanedLearner.includes(part.trim()));

    return {
      isCorrect,
      parsedNumber: null,
      feedbackNote: isCorrect
        ? `Correct! Identified as "${expected}".`
        : `Identified answer does not match the target "${expected}".`,
    };
  }
}

/**
 * Format currency / numbers according to locale
 */
export function formatValueWithLocale(
  val: number | string,
  locale = 'en-GB',
  currencySymbol = '£'
): string {
  if (typeof val === 'number') {
    return `${currencySymbol}${val.toLocaleString(locale, {
      minimumFractionDigits: Number.isInteger(val) ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return String(val);
}
