import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.summerTravelPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description,
  alternates: {
    canonical: "/summer-travel-packing-list"
  }
};

export default function SummerTravelPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
