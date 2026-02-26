"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import MagneticButton from '@/components/ui/MagneticButton';

type Option = { label: string; value: number; nextId: string | null };
type QuestionNode = {
  id: string;
  stepNumber: string;
  text: string;
  options: Option[];
};

type QuestionId = 'q1' | 'q2' | 'q3';

const QUESTION_GRAPH: Record<QuestionId, QuestionNode> = {
  q1: {
    id: 'q1',
    stepNumber: '01 // 03',
    text: 'How do you currently acquire new customers?',
    options: [
      { label: 'Word of mouth', value: 1, nextId: 'q2' },
      { label: 'Sporadic Ads', value: 2, nextId: 'q2' },
      { label: 'Documented Funnels', value: 3, nextId: 'q2' },
    ],
  },
  q2: {
    id: 'q2',
    stepNumber: '02 // 03',
    text: 'What is your current Customer Acquisition Cost (CAC)?',
    options: [
      { label: 'Unknown', value: 1, nextId: 'q3' },
      { label: 'Fluctuates wildly', value: 2, nextId: 'q3' },
      { label: 'Tracked and stable', value: 3, nextId: 'q3' },
    ],
  },
  q3: {
    id: 'q3',
    stepNumber: '03 // 03',
    text: 'How are you leveraging AI in your operations?',
    options: [
      { label: 'Not at all', value: 1, nextId: null },
      { label: 'Team uses ChatGPT occasionally', value: 2, nextId: null },
      {
        label: 'Integrated into standard operating procedures',
        value: 3,
        nextId: null,
      },
    ],
  },
} as const;

const QUESTION_ORDER: QuestionId[] = ['q1', 'q2', 'q3'];

const ANALYSIS_PHRASES: readonly string[] = [
  'Analyzing data points...',
  'Calculating CAC efficiency...',
  'Generating Architecture...',
] as const;

export default function DiagnosticEngine() {
  const [currentStepId, setCurrentStepId] = useState<QuestionId>('q1');
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [analysisIndex, setAnalysisIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const analysisTimeoutRef = useRef<number | null>(null);

  const activeQuestion = useMemo(
    () => QUESTION_GRAPH[currentStepId],
    [currentStepId],
  );

  const handleOptionClick = useCallback(
    (option: Option) => {
      if (isAnalyzing || hasCompleted) {
        return;
      }

      setTotalScore((prev) => prev + option.value);

      if (option.nextId) {
        setCurrentStepId(option.nextId as QuestionId);
        return;
      }

      // Final node: trigger analysis state
      setIsAnalyzing(true);
      setHasCompleted(false);
      setAnalysisIndex(0);

      if (analysisTimeoutRef.current !== null) {
        window.clearTimeout(analysisTimeoutRef.current);
      }

      analysisTimeoutRef.current = window.setTimeout(() => {
        setIsAnalyzing(false);
        setHasCompleted(true);
      }, 2500);
    },
    [hasCompleted, isAnalyzing],
  );

  useEffect(() => {
    if (!isAnalyzing) {
      return;
    }

    setAnalysisIndex(0);
    const intervalId = window.setInterval(() => {
      setAnalysisIndex((prev) => (prev + 1) % ANALYSIS_PHRASES.length);
    }, 800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isAnalyzing]);

  useEffect(
    () => () => {
      if (analysisTimeoutRef.current !== null) {
        window.clearTimeout(analysisTimeoutRef.current);
      }
    },
    [],
  );

  const progressRatio = useMemo(() => {
    if (isAnalyzing || hasCompleted) {
      return 1;
    }

    const index = QUESTION_ORDER.indexOf(currentStepId);
    if (index === -1) {
      return 0;
    }

    return (index + 1) / QUESTION_ORDER.length;
  }, [currentStepId, hasCompleted, isAnalyzing]);

  const headline =
    totalScore < 6 ? 'Foundation Required.' : 'Ready to Scale.';

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log('Diagnostic report', { email, totalScore });
      setSubmitted(true);
    },
    [email, totalScore],
  );

  let phaseKey: string;
  if (isAnalyzing) {
    phaseKey = 'analyzing';
  } else if (hasCompleted) {
    phaseKey = 'capture';
  } else {
    phaseKey = `question-${currentStepId}`;
  }

  return (
    <section className="relative z-10 px-6 pb-24 pt-4 md:px-14 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-icySilver/60">
              Diagnostic Engine / Lead Magnet
            </p>
            <h2 className="font-heading text-xl tracking-heading text-icySilver/95 sm:text-2xl">
              Map your growth architecture in 60 seconds.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.26em] text-icySilver/40 sm:block">
            <p>AJAX-Driven / No Reloads</p>
            <p>Interactive Diagnostic Layer</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-plumNoir/60 bg-plumNoir/40 px-5 py-6 shadow-[0_22px_60px_rgba(15,23,42,0.9)] backdrop-blur-md sm:px-7 sm:py-8">
          {/* Progress bar */}
          <div className="mb-6 h-[2px] w-full overflow-hidden rounded-full bg-sapphire/70">
            <div
              className="h-full rounded-full bg-electricCyan transition-all duration-300"
              style={{ width: `${Math.round(progressRatio * 100)}%` }}
            />
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
            {/* Left: dynamic phases */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {!isAnalyzing && !hasCompleted && (
                  <motion.div
                    key={phaseKey}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-electricCyan/90">
                        {activeQuestion.stepNumber}
                      </span>
                      <p className="font-heading text-lg tracking-heading text-icySilver/95 sm:text-xl">
                        {activeQuestion.text}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {activeQuestion.options.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnalyzing || hasCompleted}
                          className="group flex w-full items-center justify-between rounded-2xl border border-transparent bg-sapphire/50 px-4 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-electricCyan hover:bg-plumNoir/80 focus-visible:-translate-y-1 focus-visible:border-electricCyan focus-visible:bg-plumNoir/80 focus-visible:outline-none sm:px-5 sm:py-5"
                        >
                          <span className="font-body text-sm tracking-body text-icySilver sm:text-base">
                            {option.label}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-icySilver/50 group-hover:text-electricCyan/90 group-focus-visible:text-electricCyan/90">
                            Select
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {isAnalyzing && (
                  <motion.div
                    key={phaseKey}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex flex-col items-center justify-center gap-5 py-6 text-center sm:py-10"
                  >
                    <div className="relative h-16 w-16">
                      <motion.div
                        className="absolute inset-0 rounded-full border border-electricCyan/40"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="absolute inset-3 rounded-[1.75rem] border border-electricCyan/90"
                        animate={{ rotate: [0, 180, 360] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="absolute inset-5 rounded-full bg-electricCyan/80"
                        animate={{ scale: [0.9, 1.05, 0.9] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-icySilver/80">
                      {ANALYSIS_PHRASES[analysisIndex]}
                    </p>
                  </motion.div>
                )}

                {hasCompleted && !isAnalyzing && (
                  <motion.div
                    key={phaseKey}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <div className="space-y-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-electricCyan/90">
                        Final Output
                      </p>
                      <h3 className="font-heading text-2xl tracking-heading text-icySilver sm:text-3xl">
                        {headline}
                      </h3>
                      <p className="max-w-md font-body text-sm leading-relaxed tracking-body text-icySilver/80 sm:text-base">
                        Drop your best email and we&apos;ll send a concise
                        breakdown of where your acquisition architecture is
                        leaking, how AI can augment the stack, and what a
                        90-day upgrade path looks like.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="diagnostic-email"
                          className="mb-1 block font-mono text-[10px] uppercase tracking-[0.26em] text-icySilver/60"
                        >
                          Where should we send the report?
                        </label>
                        <input
                          id="diagnostic-email"
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="w-full border-b border-icySilver/40 bg-transparent pb-2 text-sm text-icySilver outline-none transition-colors duration-200 placeholder:text-icySilver/40 focus:border-electricCyan"
                          placeholder="you@company.com"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <MagneticButton>
                          Deploy Report
                        </MagneticButton>
                        {submitted && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-electricCyan/90">
                            Report Dispatched.
                          </span>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right rail: micro-copy */}
            <div className="mt-6 w-full max-w-xs rounded-2xl border border-plumNoir/70 bg-sapphire/40 px-4 py-4 text-[11px] text-icySilver/75 md:mt-0 md:w-64">
              <p className="mb-2 font-mono uppercase tracking-[0.28em] text-icySilver/60">
                What this isn&apos;t
              </p>
              <p className="mb-4 font-body leading-relaxed tracking-body">
                No generic audit PDF. You&apos;re getting a directional
                diagnosis rooted in how you acquire, measure, and automate
                demand.
              </p>
              <p className="font-body leading-relaxed tracking-body">
                The more honest your answers, the more precise the roadmap we
                send back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

