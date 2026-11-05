import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { NAV_PAGES } from "@/lib/nav";

export const dynamic = "force-static";

/// مطالب بلاگ از API می‌آیند و در زمان بیلد در دسترس نیستند؛ فقط صفحات ثابت اینجاست.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    ...NAV_PAGES.map((p) => ({
      url: `${SITE_URL}${p.href}`,
      changeFrequency: "weekly" as const,
      priority: p.href === "/blog/" ? 0.6 : 0.8,
    })),
  ];
}
