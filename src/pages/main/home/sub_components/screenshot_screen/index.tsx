import useTranslate from "@hooks/use_translate"
import { HomeScreenLayout } from "@pages/main/home/sub_components/layout"
export function ScreenshotScreen({ image }: { image: string }) {
  const { translate } = useTranslate()
  return (
    <HomeScreenLayout
      image={image}
      heading={translate("home_screenshot_screen_title")}
      body={translate("home_screenshot_screen_description")}
      imagePosition="left"
    />
  )
}
