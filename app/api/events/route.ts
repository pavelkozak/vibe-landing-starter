import { NextResponse } from "next/server";
import { z } from "zod";
import { findOrCreateEvent } from "@/lib/idempotency";

const eventSchema = z.object({
  eventType: z.enum(["landing_view", "cta_click", "lead_created"]),
  payload: z.record(z.unknown()).optional().default({}),
  idempotencyKey: z.string().min(1).optional().nullable(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { eventType, payload, idempotencyKey } = parsed.data;
  const { created, id } = await findOrCreateEvent({
    eventType,
    payload: payload as object,
    idempotencyKey: idempotencyKey ?? null,
  });

  return NextResponse.json(
    { ok: true, id },
    { status: created ? 201 : 200 }
  );
}
