import { NextResponse } from "next/server";
import { findOrCreateEvent } from "@/lib/idempotency";

export async function POST(req: Request) {
  const secret =
    req.headers.get("X-Webhook-Secret") ??
    req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

  const expectedSecret = process.env.WEBHOOK_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idempotencyKey = req.headers.get("Idempotency-Key")?.trim();
  if (!idempotencyKey) {
    return NextResponse.json(
      { error: "Idempotency-Key header is required" },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const payload = typeof body === "object" ? body : { raw: body };
  const { created } = await findOrCreateEvent({
    eventType: "webhook_event",
    payload,
    idempotencyKey,
  });

  return NextResponse.json(
    { ok: true, idempotent: !created },
    { status: created ? 201 : 200 }
  );
}
