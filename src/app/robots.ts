import { getBaseUrl } from "@/utils/getBaseUrl";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin", 
          "/api/private", 
          "/_next/static",
          "/blogs/saved"
        ],
      }
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
    host: getBaseUrl() // Add explicit host declaration
  };
}
