import { getBaseUrl } from "@/utils/getBaseUrl";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/$", "/blogs", "/blogs/*","/about","/contact", "/login", "/signup"],
        disallow: ["/admin/", "/api/", "/blogs/saved", "/_next/static"],
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
