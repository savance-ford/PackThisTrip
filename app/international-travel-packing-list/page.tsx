import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.internationalTravelPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description,
  alternates: {
    canonical: "/international-travel-packing-list"
  }
};

export default function InternationalTravelPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
