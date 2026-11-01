import React from 'react';
import {
  X,
  ShieldCheck,
  Scale,
  Leaf,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  Eye,
  Info,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl flex flex-col text-stone-900 dark:text-stone-100 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="about-modal-title" className="text-base sm:text-lg font-bold font-serif">
                About, Ethics &amp; Legal Disclosures
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                EU AI Act • UK/EU GDPR • Feynman Pedagogy
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Section 1: EU AI Act & Risk Level */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>EU AI Act Classification &amp; Risk Level (Article 50)</span>
            </h3>
            <p>
              This website is an independent, free, self-paced learning tool that provides{' '}
              <strong>formative feedback only</strong>. It does not grade, certify, admit, rank, or monitor learners, and it does not make decisions affecting access to education. Therefore, it falls outside the Annex III high-risk category of the EU AI Act and is treated as a <strong>limited risk</strong> educational application governed by transparency duties.
            </p>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
              <strong>Architectural Note:</strong> Adding automated grading, certificates, or adoption by an institution to evaluate learners would require re-assessing the risk level under Annex III.
            </div>
          </section>

          {/* Section 2: Privacy & Data Minimisation (GDPR) */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Privacy &amp; Data Minimisation (UK &amp; EU GDPR)</span>
            </h3>
            <p>
              Your privacy is safeguarded by design:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Zero User Accounts:</strong> No sign-up, passwords, or emails required.</li>
              <li><strong>Zero Tracking:</strong> No tracking cookies, marketing pixels, or behavioural telemetry.</li>
              <li><strong>Local Storage Only:</strong> All your progress, answers, and notes remain exclusively inside your own browser&apos;s <code className="font-mono bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">localStorage</code>.</li>
              <li><strong>Data Sent to AI:</strong> When you submit an explanation, only the text you type and the mathematical rubric are sent to Google Gemini (server-side proxy) to formulate constructive feedback. Learners are instructed never to enter personal details.</li>
            </ul>
          </section>

          {/* Section 3: Accuracy & Validation Disclaimer */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Accuracy &amp; Validation Disclaimer</span>
            </h3>
            <p>
              Generative AI can occasionally make errors or misunderstand nuanced phrases. To guarantee accuracy:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Deterministic Code Math:</strong> Every numerical calculation is verified by deterministic JavaScript logic before the AI writes feedback. The AI is strictly prohibited from overriding verified numbers.</li>
              <li><strong>Human-Reviewed Curriculum:</strong> The English teaching text, worked examples, and deliberate mistakes were carefully authored and human-reviewed.</li>
              <li><strong>Problem Reporting:</strong> Every AI feedback block features a &ldquo;Report a problem with this feedback&rdquo; link for learners to flag inaccuracies anonymously.</li>
            </ul>
          </section>

          {/* Section 4: Critical AI Literacy */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>AI Literacy &amp; Critical Thinking</span>
            </h3>
            <p>
              AI is a supportive study partner, not an omniscient authority. Learning statistics means developing healthy scepticism: questioning numbers, checking whether charts start at zero, and verifying claims. Apply that same critical mindset to AI responses themselves!
            </p>
          </section>

          {/* Section 5: Sustainability & Green Computing */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <Leaf className="w-4 h-4" />
              <span>Sustainability &amp; Resource Efficiency</span>
            </h3>
            <p>
              To minimise energy consumption and digital carbon footprint:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Lesson teaching cards are delivered as static data with zero AI overhead.</li>
              <li>Translations are cached so identical pages are never re-translated.</li>
              <li>Math is computed in millisecond local code rather than energy-intensive LLM loops.</li>
              <li>A compact, low-latency Flash model is selected for minimal token generation.</li>
            </ul>
          </section>

          {/* Section 6: Credits & Project Origin */}
          <section className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
            <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Project Background &amp; MSc Credits</span>
            </div>
            <p>
              Created as part of an MSc module in Generative AI. The project is titled <em>&ldquo;An Introduction to Descriptive Statistics: A Door to the Data World&rdquo;</em>.
            </p>
            <p className="text-stone-500 dark:text-stone-400 text-[11px]">
              Designed specifically for adults aged 18 and over with little or no prior background in statistics. Written in plain UK English with diverse, culturally neutral examples. Icons by Lucide.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
