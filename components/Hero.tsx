"use client";

import { trackCtaClick } from "./tracking";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
          Vibe Landing Starter
        </h1>
        <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
          Минималистичный стартер для лендингов с трекингом конверсий, формой
          лидов и webhook inbox.
        </p>
        <a
          href="#cta"
          onClick={() => trackCtaClick("hero")}
          className="mt-10 inline-flex rounded-full bg-violet-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-violet-700"
        >
          Начать сейчас
        </a>
      </div>
    </section>
  );
}
