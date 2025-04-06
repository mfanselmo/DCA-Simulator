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

export function formatPrice(price?: number) {
  if (price === undefined) return "";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
}

export function formatPercentage(percentage?: number) {
  if (percentage === undefined) return "";

  return `${percentage.toFixed(2)}%`;
}
