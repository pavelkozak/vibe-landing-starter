import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { findOrCreateEvent } from "@/lib/idempotency";
import { sendTelegramNotification } from "@/lib/telegram";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_REGEX = /^@?[a-zA-Z0-9_]{5,32}$|^t\.me\/[a-zA-Z0-9_]{5,32}$/;

const leadSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  contact: z
    .string()
    .min(1, "Contact is required")
    .trim()
    .refine(
      (val) => EMAIL_REGEX.test(val) || TELEGRAM_REGEX.test(val),
      "Введите email или Telegram (@username)"
    ),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent must be given" }),
  }),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, contact } = parsed.data;

  const lead = await prisma.lead.create({
    data: { name, contact, consent: true },
  });

  await findOrCreateEvent({
    eventType: "lead_created",
    payload: { leadId: lead.id, name, contact },
    idempotencyKey: null,
  });

  await sendTelegramNotification(
    `Новый лид: ${name}, контакт: ${contact}\nID: ${lead.id}`
  );

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}
