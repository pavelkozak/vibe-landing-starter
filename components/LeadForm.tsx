"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_REGEX = /^@?[a-zA-Z0-9_]{5,32}$|^t\.me\/[a-zA-Z0-9_]{5,32}$/;

function isValidContact(value: string): boolean {
  const trimmed = value.trim();
  return EMAIL_REGEX.test(trimmed) || TELEGRAM_REGEX.test(trimmed);
}

export function LeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidContact(contact)) {
      setStatus("error");
      setErrorMsg("Введите email или Telegram (@username)");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, consent }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data.error ??
            data.details?.fieldErrors?.contact?.[0] ??
            data.details?.formErrors?.[0] ??
            "Ошибка отправки"
        );
        return;
      }

      setStatus("success");
      setName("");
      setContact("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMsg("Ошибка сети");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
    >
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
      />
      <input
        type="text"
        placeholder="Email или @username"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
        className="rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
      />
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
        />
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Соглашаюсь на обработку персональных данных
        </span>
      </label>
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Спасибо! Мы свяжемся с вами.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
      >
        {status === "loading" ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}
