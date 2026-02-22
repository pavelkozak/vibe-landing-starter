"use client";

import { trackCtaClick } from "./tracking";
import { LeadForm } from "./LeadForm";

export function CTA() {
  return (
    <section
      id="cta"
      className="px-6 py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Оставьте заявку
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Заполните форму — мы свяжемся с вами в ближайшее время и ответим на
            все вопросы.
          </p>
          <a
            href="#cta"
            onClick={() => trackCtaClick("cta_section")}
            className="mt-6 inline-block text-violet-600 underline underline-offset-4 hover:text-violet-700"
          >
            Прокрутить к форме →
          </a>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
