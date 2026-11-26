"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const field =
  "h-11 w-full rounded-xl border border-[#eee6df] bg-[#fdfbf9] px-4 text-sm outline-none focus:border-[#d98a2b]";

const label = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#888]";

const MAX_BOOKING_MINUTES = 8 * 60;

// "90 min" | "30 mins" | "1 hr" | "1.5 hours" | "1h 30m" | 45 -> minutes
function parseDurationMinutes(value: string | number | undefined | null): number {
  if (typeof value === "number") return value > 0 ? value : 60;
  if (value == null) return 60;

  const text = String(value).toLowerCase();
  const hours = text.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)/);
  const mins = text.match(/(\d+(?:\.\d+)?)\s*(?:m|min|mins|minute|minutes)/);

  if (hours || mins) {
    const total =
      (hours ? parseFloat(hours[1]) * 60 : 0) + (mins ? parseFloat(mins[1]) : 0);
    return Math.round(total) || 60;
  }

  const plain = parseFloat(text); // just a number -> minutes
  return plain > 0 ? plain : 60;
}

function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (!h) return `${m} min`;
  if (!m) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export default function BookingForm({
  serviceId,
  serviceName,
  price,
  duration,
  headingClassName,
}: {
  serviceId: string;
  serviceName: string;
  price: number; // price for one service duration (e.g. $150 for 90 min)
  duration?: string | number | null; // e.g. "90 min"
  headingClassName?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [sessions, setSessions] = useState(1);

  const baseMinutes = parseDurationMinutes(duration);
  const maxSessions = Math.min(8, Math.max(1, Math.floor(MAX_BOOKING_MINUTES / baseMinutes)));
  const options = Array.from({ length: maxSessions }, (_, i) => i + 1);

  const totalMinutes = baseMinutes * sessions;
  const total = price * sessions;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);

    try {
      // Adjust this endpoint to your backend / API route
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          serviceName,
          date: form.get("date"),
          time: form.get("time"),
          sessions,
          durationMinutes: totalMinutes,
          totalPrice: total,
          notes: form.get("notes"),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-3 text-sm text-[#2f6b4f]">
        Request sent! We&apos;ll confirm your appointment shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date" className={label}>
            Date
          </label>
          <input id="date" type="date" name="date" required className={field} />
        </div>
        <div>
          <label htmlFor="time" className={label}>
            Time
          </label>
          <input id="time" type="time" name="time" required className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="length" className={label}>
          How long do you want to book?
        </label>
        <select
          id="length"
          value={sessions}
          onChange={(e) => setSessions(Number(e.target.value))}
          className={field}
        >
          {options.map((n) => (
            <option key={n} value={n}>
              {formatMinutes(baseMinutes * n)} — ${(price * n).toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Anything we should know? (optional)"
          className="w-full rounded-xl border border-[#eee6df] bg-[#fdfbf9] p-4 text-sm outline-none focus:border-[#d98a2b]"
        />
      </div>

      {/* Price summary */}
      <div className="rounded-xl bg-[#faf6f0] p-4 text-sm text-[#666]">
        <div className="flex justify-between">
          <span>Service ({formatMinutes(baseMinutes)})</span>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className="mt-1.5 flex justify-between">
          <span>Booking length</span>
          <span>
            {formatMinutes(totalMinutes)} (× {sessions})
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#eadfce] pt-3">
          <span className="font-medium text-[#333]">Total</span>
          <span
            className={cn(headingClassName, "text-3xl font-semibold text-[#d98a2b]")}
          >
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="h-11 w-full rounded-full bg-[#d98a2b] text-sm font-medium text-white transition hover:bg-[#c07a22] disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : `Request appointment · $${total.toFixed(2)}`}
      </button>
    </form>
  );
}