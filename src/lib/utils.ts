import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Formats a date as "Month DD, YYYY".
 * @param date - The date to format.
 * @returns A string representing the formatted date.
 */
export function formatDateUS(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Estimates the reading time for a given text.
 * @param text - The text to estimate reading time for.
 * @param wordsPerMinute - Average reading speed in words per minute (default: 200).
 * @returns A string representing the estimated reading time (e.g., "8min", "50min", "1h 20min").
 */
export function estimateReadTime(text: string, wordsPerMinute: number = 200): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}min`;
  } else {
    return `${minutes}min`;
  }
}

const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
console.log(estimateReadTime(longText)); // e.g., "1min"