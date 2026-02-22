#!/usr/bin/env node
/**
 * Демо-скрипт: проверка API за ~30 секунд
 * Запустите в другом терминале: npm run dev
 */

const BASE = "http://localhost:3000";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "your-webhook-secret";

async function run() {
  console.log("\n=== Vibe Landing Demo ===\n");

  try {
    // 1. Создать лид
    console.log("1. POST /api/leads ...");
    const leadRes = await fetch(`${BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Demo User",
        contact: "demo@test.ru",
        consent: true,
      }),
    });
    const leadData = await leadRes.json();
    if (!leadRes.ok) {
      throw new Error(`Lead failed: ${JSON.stringify(leadData)}`);
    }
    console.log("   OK, leadId:", leadData.leadId);

    // 2. Webhook inbox (первая доставка)
    const idempotencyKey = `demo-${Date.now()}`;
    console.log("\n2. POST /api/webhook/inbox (first)...");
    const wh1 = await fetch(`${BASE}/api/webhook/inbox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": WEBHOOK_SECRET,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({ event: "test", source: "demo" }),
    });
    const wh1Data = await wh1.json();
    if (!wh1.ok) throw new Error(`Webhook failed: ${JSON.stringify(wh1Data)}`);
    console.log("   OK, created:", wh1Data.idempotent === false);

    // 3. Webhook inbox (повтор — идемпотентность)
    console.log("\n3. POST /api/webhook/inbox (retry)...");
    const wh2 = await fetch(`${BASE}/api/webhook/inbox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": WEBHOOK_SECRET,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({ event: "test", source: "demo" }),
    });
    const wh2Data = await wh2.json();
    if (!wh2.ok) throw new Error(`Webhook retry failed: ${JSON.stringify(wh2Data)}`);
    console.log("   OK, idempotent (no duplicate):", wh2Data.idempotent === true);

    console.log("\n=== Demo passed ===\n");
  } catch (err) {
    const isConnRefused =
      err.cause?.code === "ECONNREFUSED" || err.message?.includes("ECONNREFUSED");
    if (isConnRefused) {
      console.error("Ошибка: сервер не запущен. Выполните в другом терминале: npm run dev");
    } else {
      console.error("Ошибка:", err.message);
    }
    process.exit(1);
  }
}

run();
