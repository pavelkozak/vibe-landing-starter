const STORAGE_KEY = "vibe_landing_view_sent";

export function trackLandingView() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "landing_view",
        payload: {},
        idempotencyKey: crypto.randomUUID(),
      }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export function trackCtaClick(source: string) {
  if (typeof window === "undefined") return;
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType: "cta_click",
      payload: { source },
      idempotencyKey: `${source}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }),
  }).catch(() => {});
}
