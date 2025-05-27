import PlatformIcon from '@/assets/PlatformIcons';
import { Platform } from '@/types/games';
import { useTranslations } from 'next-intl';

const usePlatforms = () => {
  const t = useTranslations();
  const platforms = [
    { label: 'Steam', value: Platform.Steam, icon: Platform.Steam },
    {
      label: 'Epic Games',
      value: Platform.EpicGames,
      icon: PlatformIcon.Steam,
    },
    {
      label: 'Ubisoft',
      value: Platform.Ubisoft,
      icon: PlatformIcon.Ubisoft,
    },
    {
      label: 'Xbox(Pc)',
      value: Platform.XboxPc,
      icon: PlatformIcon.XboxPc,
    },
    {
      label: 'EA Games',
      value: Platform.EaGames,
      icon: PlatformIcon.EaGames,
    },
    {
      label: 'Ubisoft',
      value: Platform.Ubisoft,
      icon: PlatformIcon.Ubisoft,
    },
    {
      label: 'Torrent',
      value: Platform.Torrent,
      icon: PlatformIcon.Torrent,
    },
    {
      label: 'Playstation',
      value: Platform.Playstation,
      icon: PlatformIcon.Playstation,
    },
    {
      label: 'Xbox Series',
      value: Platform.XboxSeries,
      icon: PlatformIcon.XboxSeries,
    },
    {
      label: 'Nintendo',
      value: Platform.XboxSeries,
      icon: PlatformIcon.XboxSeries,
    },
    {
      label: 'Mobile',
      value: Platform.Mobile,
      icon: PlatformIcon.Mobile,
    },
    {
      label: t('otherPlatforms'),
      value: Platform.OtherPlatforms,
      icon: PlatformIcon.OtherPlatforms,
    },
  ];

  return platforms;
};

export default usePlatforms;
