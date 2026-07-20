"use client";

import { type FormEvent, useId, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

interface QuizOption {
  id: string;
  label: string;
}

interface MultipleChoiceQuizProps {
  title?: string;
  question: string;
  code?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export function MultipleChoiceQuiz({
  title = "Knowledge check",
  question,
  code,
  options,
  correctOptionId,
  explanation,
}: MultipleChoiceQuizProps) {
  const quizId = useId();
  const shouldReduceMotion = useReducedMotion();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    null,
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const selectedOption = options.find(
    (option) => option.id === selectedOptionId,
  );

  const isCorrect =
    hasSubmitted && selectedOption?.id === correctOptionId;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedOptionId) {
      return;
    }

    setHasSubmitted(true);
  }

  function resetQuiz() {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  }

  return (
    <section
      aria-labelledby={`${quizId}-title`}
      className="overflow-hidden rounded-3xl bg-blue-950 text-white shadow-xl"
    >
      <div className="p-7 sm:p-9">
        <p className="font-semibold text-blue-300">{title}</p>

        <h2
          id={`${quizId}-title`}
          className="mt-2 text-2xl font-bold"
        >
          {question}
        </h2>

        {code && (
          <pre className="mt-6 overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-blue-200">
            <code>{code}</code>
          </pre>
        )}

        <form onSubmit={handleSubmit} className="mt-7">
          <fieldset disabled={hasSubmitted}>
            <legend className="sr-only">
              Select one answer
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {options.map((option) => {
                const isSelected = option.id === selectedOptionId;
                const isCorrectOption =
                  hasSubmitted && option.id === correctOptionId;
                const isIncorrectSelection =
                  hasSubmitted &&
                  isSelected &&
                  option.id !== correctOptionId;

                return (
                  <label
                    key={option.id}
                    htmlFor={`${quizId}-${option.id}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 font-semibold transition ${
                      isCorrectOption
                        ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                        : isIncorrectSelection
                          ? "border-red-400 bg-red-500/20 text-red-100"
                          : isSelected
                            ? "border-blue-300 bg-blue-800 text-white"
                            : "border-blue-700 bg-blue-900/50 text-blue-100 hover:border-blue-400 hover:bg-blue-900"
                    } ${
                      hasSubmitted
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    <input
                      id={`${quizId}-${option.id}`}
                      type="radio"
                      name={`${quizId}-answer`}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => setSelectedOptionId(option.id)}
                      className="size-4 accent-blue-500"
                    />

                    <span className="flex-1">{option.label}</span>

                    {isCorrectOption && (
                      <CheckCircle2
                        aria-label="Correct answer"
                        className="size-5 shrink-0 text-emerald-300"
                      />
                    )}

                    {isIncorrectSelection && (
                      <XCircle
                        aria-label="Incorrect answer"
                        className="size-5 shrink-0 text-red-300"
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6">
            {!hasSubmitted ? (
              <button
                type="submit"
                disabled={!selectedOptionId}
                className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-950 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check answer
              </button>
            ) : (
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-semibold text-white transition hover:border-blue-400 hover:bg-blue-900"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                Try again
              </button>
            )}
          </div>
        </form>

        <AnimatePresence mode="wait">
          {hasSubmitted && (
            <motion.div
              key={isCorrect ? "correct" : "incorrect"}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 12,
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : -12,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
              }}
              role="status"
              aria-live="polite"
              className={`mt-6 rounded-xl border p-5 ${
                isCorrect
                  ? "border-emerald-500/60 bg-emerald-500/15"
                  : "border-amber-500/60 bg-amber-500/15"
              }`}
            >
              <div className="flex gap-3">
                {isCorrect ? (
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-6 shrink-0 text-emerald-300"
                  />
                ) : (
                  <CircleAlert
                    aria-hidden="true"
                    className="mt-1 size-6 shrink-0 text-amber-300"
                  />
                )}

                <div>
                  <h3 className="font-bold">
                    {isCorrect
                      ? "Correct!"
                      : "Not quite—review the calculation."}
                  </h3>

                  <p className="mt-2 leading-7 text-blue-100">
                    {explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}