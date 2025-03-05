import { HomeSectionCard } from "@/app/_components/home-section-card";
import useTranslate from "@/hooks/use-translate";

export function DataTableScreen({ image }: { image: string }) {
  const { translate } = useTranslate();

  return (
    <HomeSectionCard
      image={image}
      heading={translate("home_data_table_screen_title")}
      body={translate("home_data_table_screen_description")}
      imagePosition="right"
    />
  );
}
