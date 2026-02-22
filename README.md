# Vibe Landing Starter

Минималистичный лендинг с формой лидов, трекингом конверсий и webhook inbox.

---

## 1. Как запустить локально

**Требования:** Node.js 18+, PostgreSQL, npm или pnpm

```bash
npm install
```

Скопируйте `env.example` в `.env` и заполните переменные:

```
DATABASE_URL="postgresql://user:pass@localhost:5432/vibe_db"
WEBHOOK_SECRET="your-webhook-secret"
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_CHAT_ID="your-chat-id"
```

Запуск:

```bash
npm run dev
```

Откройте http://localhost:3000

---

## 2. Миграции и seed

**Миграции** (создание/обновление таблиц):

```bash
npm run db:migrate
# или
npx prisma migrate dev
```

**Seed** (демо-данные в пустую БД):

```bash
npm run db:seed
# или
npx prisma db seed
```

Seed создаёт 2 демо-лида, если таблица Lead пуста.

**Просмотр данных:**

```bash
npm run db:studio
# или
npx prisma studio
```

---

## 3. Демо-скрипт (проверка за 2 минуты)

1. Запустите сервер в первом терминале:
   ```bash
   npm run dev
   ```

2. Во втором терминале выполните:
   ```bash
   npm run demo
   ```

Скрипт проверяет:
- создание лида через `POST /api/leads`
- webhook inbox (первая доставка)
- идемпотентность (повторная доставка с тем же `Idempotency-Key` не создаёт дубль)

**Ручная проверка:**
- Откройте http://localhost:3000, заполните форму, отправьте
- `npx prisma studio` — просмотр лидов и событий в БД

---

## Функционал

1. **Landing** — 5 секций: Hero, Proof, Benefits, FAQ, CTA
2. **Форма лида** — имя, контакт (email или Telegram), согласие → Postgres
3. **События конверсии** — landing_view, cta_click, lead_created (в БД)
4. **Webhook inbox** — `POST /api/webhook/inbox` с `X-Webhook-Secret` и `Idempotency-Key`
5. **Идемпотентность** — повторная доставка не создаёт дубли
6. **TG-уведомления** — при lead_created отправляется сообщение в Telegram
