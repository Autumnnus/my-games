import { HomeSectionCard } from "@/app/_components/home-section-card";
import { useTranslations } from "next-intl";

export function DataTableScreen({ image }: { image: string }) {
  const t = useTranslations();

  return (
    <HomeSectionCard
      image={image}
      heading={t("home_data_table_screen_title")}
      body={t("home_data_table_screen_description")}
      imagePosition="right"
    />
  );
}
