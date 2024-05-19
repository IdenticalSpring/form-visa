import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isValidDateTimeString(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
