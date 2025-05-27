import { HomeSectionCard } from '@/app/_components/home-section-card';
import { useTranslations } from 'next-intl';

export function ScreenshotScreen({ image }: { image: string }) {
  const t = useTranslations();

  return (
    <HomeSectionCard
      image={image}
      heading={t('home_screenshot_screen_title')}
      body={t('home_screenshot_screen_description')}
      imagePosition="left"
    />
  );
}
