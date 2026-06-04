import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.businessTripPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description
};

export default function BusinessTripPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
