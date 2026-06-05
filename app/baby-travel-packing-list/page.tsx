import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.babyTravelPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description,
  alternates: {
    canonical: "/baby-travel-packing-list"
  }
};

export default function BabyTravelPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
