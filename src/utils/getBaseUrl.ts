export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  // In production, Vercel automatically sets the VERCEL_URL variable,
  // but it doesn't include the protocol. Prepend "https://" to ensure a valid URL.
  // return process.env.VERCEL_URL
  return `https://${process.env.VERCEL_URL}`;
}
