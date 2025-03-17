import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isSafeURL = (url?: string) => {
  if(!url)return
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) && 
      !parsed.hostname.includes('malicious-domain.com');
  } catch {
    return false;
  }
};