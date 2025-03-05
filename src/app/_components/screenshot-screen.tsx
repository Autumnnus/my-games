import { HomeSectionCard } from "@/app/_components/home-section-card";
import useTranslate from "@/hooks/use-translate";

export function ScreenshotScreen({ image }: { image: string }) {
  const { translate } = useTranslate();

  return (
    <HomeSectionCard
      image={image}
      heading={translate("home_screenshot_screen_title")}
      body={translate("home_screenshot_screen_description")}
      imagePosition="left"
    />
  );
}
