import useTranslate from "@hooks/use_translate"
import { HomeScreenLayout } from "@pages/main/home/sub_components/layout"

export function DataTableScreen({ image }: { image: string }) {
  const { translate } = useTranslate()
  return (
    <HomeScreenLayout
      image={image}
      heading={translate("home_data_table_screen_title")}
      body={translate("home_data_table_screen_description")}
      imagePosition="right"
    />
  )
}
