export function getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }
    // In production, Vercel automatically sets the VERCEL_URL variable.
    return process.env.VERCEL_URL;
  }
  