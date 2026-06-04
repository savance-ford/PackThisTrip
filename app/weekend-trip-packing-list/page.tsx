import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.weekendTripPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description
};

export default function WeekendTripPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
