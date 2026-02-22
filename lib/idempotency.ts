import { prisma } from "@/lib/prisma";
import type { EventType } from "@prisma/client";

export async function findOrCreateEvent(params: {
  eventType: EventType;
  payload: object;
  idempotencyKey: string | null;
}): Promise<{ created: boolean; id: string }> {
  const { eventType, payload, idempotencyKey } = params;

  if (idempotencyKey) {
    const existing = await prisma.eventLog.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      return { created: false, id: existing.id };
    }
  }

  const event = await prisma.eventLog.create({
    data: {
      eventType,
      payload,
      idempotencyKey: idempotencyKey ?? undefined,
    },
  });

  return { created: true, id: event.id };
}
