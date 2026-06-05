import type { MetadataRoute } from "next";
import { APPROVED_DESTINATION_MONTHS } from "@/data/climateProfiles";

const baseUrl = "https://packthistrip.com";

const staticPaths = [
  "/",
  "/packing-list-generator",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/carry-on-packing-list",
  "/beach-vacation-packing-list",
  "/cruise-packing-list",
  "/business-trip-packing-list",
  "/international-travel-packing-list",
  "/family-vacation-packing-list",
  "/baby-travel-packing-list",
  "/7-day-trip-packing-list",
  "/weekend-trip-packing-list",
  "/winter-travel-packing-list",
  "/summer-travel-packing-list",
  "/packing-list"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationPaths = APPROVED_DESTINATION_MONTHS.map(
    (item) => `/packing-list/${item.destination}/${item.month}`
  );

  return [...staticPaths, ...destinationPaths].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}
