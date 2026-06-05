import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.winterTravelPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description,
  alternates: {
    canonical: "/winter-travel-packing-list"
  }
};

export default function WinterTravelPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
