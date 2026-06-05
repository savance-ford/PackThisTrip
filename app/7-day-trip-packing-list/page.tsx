import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.sevenDayTripPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description,
  alternates: {
    canonical: "/7-day-trip-packing-list"
  }
};

export default function SevenDayTripPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
