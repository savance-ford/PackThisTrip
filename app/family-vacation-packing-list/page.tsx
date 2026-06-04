import type { Metadata } from "next";
import { SeoPackingListPage } from "@/components/SeoPackingListPage";
import { seoPackingListPages } from "@/data/seoPackingListPages";

const page = seoPackingListPages.familyVacationPackingList;

export const metadata: Metadata = {
  title: { absolute: page.metadataTitle },
  description: page.description
};

export default function FamilyVacationPackingListPage() {
  return <SeoPackingListPage {...page} />;
}
