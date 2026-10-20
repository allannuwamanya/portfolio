import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface DateParts {
  year: string;
  month?: string;
  day?: string;
}

/** Accepts "YYYY", "YYYY-MM" or "YYYY-MM-DD". Anything else is not a date. */
function parseDate(value: string): DateParts | null {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(value);
  if (!match || (match[2] && !MONTHS[Number(match[2]) - 1])) return null;
  return { year: match[1], month: match[2], day: match[3] };
}

/** "2025-03" -> "Mar 2025", "2025-03-28" -> "28 Mar 2025", "2025" -> "2025". Otherwise as written. */
export function formatMonth(value: string): string {
  const parts = parseDate(value);
  if (!parts) return value;
  const month = parts.month ? MONTHS[Number(parts.month) - 1] : null;
  if (!month) return parts.year;
  return parts.day ? `${Number(parts.day)} ${month} ${parts.year}` : `${month} ${parts.year}`;
}

/** "2026-04-13" + "2026-04-17" -> "13–17 Apr 2026". Collapses what the two dates share. */
export function formatDateRange(start: string, end?: string): string {
  if (!end || end === start) return formatMonth(start);

  const a = parseDate(start);
  const b = parseDate(end);
  if (a?.day && b?.day && a.year === b.year && a.month === b.month) {
    return `${Number(a.day)}–${formatMonth(end)}`;
  }
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}
