export function Proof() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Уже выбирают
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-violet-600">500+</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Лидов в месяц
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-violet-600">98%</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Довольных клиентов
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-violet-600">24/7</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Поддержка
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              quote: "Простотой и скоростью запуска приятно удивлены.",
              author: "Алексей К.",
            },
            {
              quote: "Форма лидов работает без сбоев, всё в TG приходит.",
              author: "Мария С.",
            },
            {
              quote: "Минимум кода, максимум функционала.",
              author: "Дмитрий В.",
            },
          ].map((item) => (
            <blockquote
              key={item.author}
              className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <p className="text-zinc-700 dark:text-zinc-300">"{item.quote}"</p>
              <cite className="mt-3 block text-sm text-zinc-500 not-italic">
                — {item.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
