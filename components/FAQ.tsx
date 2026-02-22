"use client";

import { useState } from "react";

const items = [
  {
    q: "Как работают события конверсии?",
    a: "При просмотре страницы, клике на CTA и отправке формы запросы уходят в /api/events и сохраняются в EventLog. Для предотвращения дублей используется idempotencyKey.",
  },
  {
    q: "Нужна ли база данных?",
    a: "Да, проект использует PostgreSQL и Prisma. Настройте DATABASE_URL в .env и выполните prisma migrate dev.",
  },
  {
    q: "Как настроить Telegram?",
    a: "Создайте бота через @BotFather, получите токен. Добавьте бота в чат и узнайте chat_id. Укажите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.",
  },
  {
    q: "Что такое webhook inbox?",
    a: "POST /api/webhook/inbox принимает входящие события. Передайте X-Webhook-Secret и Idempotency-Key. Повторная доставка не создаёт дубликаты.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Частые вопросы
        </h2>
        <div className="mt-12 space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-zinc-900 transition dark:text-zinc-50"
              >
                {item.q}
                <span
                  className={`transform text-xl transition ${open === i ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {open === i && (
                <div className="border-t border-zinc-200 px-6 py-4 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
