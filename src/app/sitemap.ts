import type { MetadataRoute } from "next";

import { GALLERY_YEARS } from "@/lib/gallery-years";
import { db } from "@/lib/db";

const baseUrl = "https://hanuri.or.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hanuries = await db.hanuri.findMany({
    select: { id: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...GALLERY_YEARS.map((year) => ({
      url: `${baseUrl}/gallery/${year}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = hanuries.map((item) => ({
    url: `${baseUrl}/hanuri/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
