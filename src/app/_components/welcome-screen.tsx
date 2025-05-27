import { Layout, Typography } from 'antd';
import { useTranslations } from 'next-intl';

const { Text, Title } = Typography;
const { Content } = Layout;

export default function WelcomeScreen({ image }: { image: string }) {
  const t = useTranslations();

  return (
    <Content
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        scrollSnapAlign: 'start',
        overflow: 'hidden',
        padding: 1,
      }}
    >
      <Title
        style={{
          color: '#fff',
          textShadow: '5px 10px 10px #000000bf,-3px 10px 12px #000000bf',
          textAlign: 'center',
          //   fontSize: {
          //     xs: "3rem",
          //     md: "4rem",
          //   },
        }}
      >
        {t('welcome_to_my_games')}
      </Title>
      <Text
        style={{
          color: '#fff',
          textShadow: '5px 10px 10px #000000bf,-3px 10px 12px #000000bf',
          textAlign: 'center',
          //   fontSize: {
          //     xs: "1rem",
          //     md: "1.5rem"
          //   }
        }}
      >
        {t('welcome_to_my_games_description')}
      </Text>
    </Content>
  );
}
