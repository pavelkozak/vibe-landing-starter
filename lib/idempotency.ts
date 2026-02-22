import { prisma } from "@/lib/prisma";

const EVENT_TYPES = [
  "landing_view",
  "cta_click",
  "lead_created",
  "webhook_event",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

type EventLogDelegate = {
  findUnique: (args: { where: { idempotencyKey: string } }) => Promise<{ id: string } | null>;
  create: (args: { data: { eventType: EventType; payload: object; idempotencyKey?: string } }) => Promise<{ id: string }>;
};

export async function findOrCreateEvent(params: {
  eventType: EventType;
  payload: object;
  idempotencyKey: string | null;
}): Promise<{ created: boolean; id: string }> {
  const { eventType, payload, idempotencyKey } = params;
  const db = prisma as unknown as { eventLog: EventLogDelegate };

  if (idempotencyKey) {
    const existing = await db.eventLog.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      return { created: false, id: existing.id };
    }
  }

  const event = await db.eventLog.create({
    data: {
      eventType,
      payload,
      idempotencyKey: idempotencyKey ?? undefined,
    },
  });

  return { created: true, id: event.id };
}
