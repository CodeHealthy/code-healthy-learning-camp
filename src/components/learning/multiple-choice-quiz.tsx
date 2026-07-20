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
            className="overflow-hidden rounded-3xl border border-border bg-surface shadow-xl"
        >
            <div className="border-b border-border bg-brand-soft px-7 py-6 sm:px-9">
                <p className="font-bold text-brand">{title}</p>

                <h2
                    id={`${quizId}-title`}
                    className="mt-2 font-display text-2xl font-extrabold"
                >
                    {question}
                </h2>
            </div>

            <div className="p-7 sm:p-9">
                {code && (
                    <pre className="overflow-x-auto rounded-2xl bg-code-background p-5 font-mono text-sm leading-7 text-code-foreground shadow-lg">
                        <code>{code}</code>
                    </pre>
                )}

                <form onSubmit={handleSubmit} className="mt-7">
                    <fieldset disabled={hasSubmitted}>
                        <legend className="sr-only">Select one answer</legend>

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
                                        className={`flex items-center gap-3 rounded-xl border p-4 font-bold transition ${isCorrectOption
                                            ? "border-success bg-success-soft text-foreground"
                                            : isIncorrectSelection
                                                ? "border-danger bg-danger-soft text-foreground"
                                                : isSelected
                                                    ? "border-brand bg-brand-soft text-foreground"
                                                    : "border-border bg-surface-muted text-foreground hover:border-brand hover:bg-brand-soft"
                                            } ${hasSubmitted
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
                                            className="size-4 accent-brand"
                                        />

                                        <span className="flex-1">{option.label}</span>

                                        {isCorrectOption && (
                                            <CheckCircle2
                                                aria-label="Correct answer"
                                                className="size-5 shrink-0 text-success"
                                            />
                                        )}

                                        {isIncorrectSelection && (
                                            <XCircle
                                                aria-label="Incorrect answer"
                                                className="size-5 shrink-0 text-danger"
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
                                className="rounded-xl bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Check answer
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={resetQuiz}
                                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 font-bold text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand"
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
                            className={`mt-6 rounded-2xl border p-5 ${isCorrect
                                ? "border-success bg-success-soft"
                                : "border-warning bg-warning-soft"
                                }`}
                        >
                            <div className="flex gap-3">
                                {isCorrect ? (
                                    <CheckCircle2
                                        aria-hidden="true"
                                        className="mt-1 size-6 shrink-0 text-success"
                                    />
                                ) : (
                                    <CircleAlert
                                        aria-hidden="true"
                                        className="mt-1 size-6 shrink-0 text-warning"
                                    />
                                )}

                                <div>
                                    <h3 className="font-display font-bold">
                                        {isCorrect
                                            ? "Correct!"
                                            : "Not quite—review the calculation."}
                                    </h3>

                                    <p className="mt-2 leading-7 text-muted-foreground">
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