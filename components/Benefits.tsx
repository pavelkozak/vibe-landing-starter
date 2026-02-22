const benefits = [
  {
    title: "Сохранение лидов",
    desc: "Все заявки попадают в PostgreSQL и не теряются.",
    icon: "💾",
  },
  {
    title: "Трекинг конверсий",
    desc: "События landing_view, cta_click, lead_created пишутся в БД.",
    icon: "📊",
  },
  {
    title: "Webhook inbox",
    desc: "Входящие события с секретом и идемпотентностью.",
    icon: "🔔",
  },
  {
    title: "TG-уведомления",
    desc: "Мгновенные сообщения в Telegram при каждом новом лиде.",
    icon: "✈️",
  },
];

export function Benefits() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Преимущества
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
          Всё необходимое для старта лендинга в одном репозитории.
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-zinc-200 p-6 transition hover:border-violet-300 hover:shadow-md dark:border-zinc-700 dark:hover:border-violet-600"
            >
              <span className="text-3xl">{b.icon}</span>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
                {b.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
