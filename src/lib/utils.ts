import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: number) {
  const date = dayjs(timestamp).utc();

  return date.format("YYYY-MM-DD");
}

export function formatPrice(price?: number, currency: string = "CLP") {
  if (price === undefined) return "";
  return new Intl.NumberFormat(currency === "CLP" ? "es-CL" : undefined, {
    style: "currency",
    currency,
  }).format(price);
}

export function formatPercentage(percentage?: number) {
  if (percentage === undefined) return "";

  return `${percentage.toFixed(2)}%`;
}
