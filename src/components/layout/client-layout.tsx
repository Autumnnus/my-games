'use client';

import PageHeader from '@/components/header';
import useAppStore from '@/store/appStore';
import { darkTheme, lightTheme } from '@/theme/themeConfig';
import {
  BarChartOutlined,
  BulbFilled,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, Divider, Flex, Layout, Menu, Popover, Switch, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { JSX, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const { Sider } = Layout;
const { Text } = Typography;

type Page = {
  key: string;
  icon: JSX.Element;
  label: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const me = useAppStore(state => state.me);
  const darkMode = useAppStore(state => state.darkMode);
  const toggleDarkMode = useAppStore(state => state.toggleDarkMode);
  const language = useAppStore(state => state.locale);
  const setLanguage = useAppStore(state => state.setLocale);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  const themeName = useMemo(() => (darkMode ? 'dark' : 'light'), [darkMode]);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [isLangPopoverOpen, setIsLangPopoverOpen] = useState(false);

  const pages: Page[] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('home'),
    },
    {
      key: '/statistics',
      icon: <BarChartOutlined />,
      label: t('statistics'),
    },
    !!me?.access_token && {
      key: '/games',
      icon: <RocketOutlined />,
      label: t('games'),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: t('users'),
    },
    !!me?.access_token
      ? {
          key: '/logout',
          icon: <LogoutOutlined />,
          label: t('logout'),
        }
      : {
          key: 'auth/login',
          icon: <LoginOutlined />,
          label: t('login'),
        },
  ].filter(Boolean) as Page[];

  function handleChaneLanguage(locale: 'en' | 'tr') {
    setLanguage(locale);
    router.refresh();
    setIsLangPopoverOpen(false);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ConfigProvider componentSize="large" theme={theme}>
        <Layout style={{ height: '100vh' }}>
          <Sider
            theme={themeName}
            breakpoint="lg"
            collapsedWidth="0"
            // onBreakpoint={(broken) => console.log(broken)}
            // onCollapse={(collapsed, type) => console.log(collapsed, type)}
            collapsible
            trigger={null}
            collapsed={collapsed}
          >
            <Flex justify="space-around" align="center" style={{ height: '64px' }}>
              <Popover
                content={
                  <div>
                    <Text onClick={() => handleChaneLanguage('en')} style={{ cursor: 'pointer' }}>
                      {t('en')}
                    </Text>
                    <Divider type="vertical" />
                    <Text onClick={() => handleChaneLanguage('tr')} style={{ cursor: 'pointer' }}>
                      {t('tr')}
                    </Text>
                  </div>
                }
                open={isLangPopoverOpen}
                onOpenChange={setIsLangPopoverOpen}
                trigger="click"
              >
                <Text style={{ cursor: 'pointer' }}>{t(language)}</Text>
              </Popover>
              <Switch
                checkedChildren={<BulbFilled />}
                unCheckedChildren={<BulbFilled />}
                checked={darkMode}
                onChange={toggleDarkMode}
                style={{ background: darkMode ? '#141414' : '#f5f5f5' }}
              />
            </Flex>
            <Divider style={{ margin: 0 }} />
            <Menu
              theme={themeName}
              mode="inline"
              defaultSelectedKeys={['4']}
              items={pages}
              selectedKeys={[pathname.startsWith('/games') ? '/games' : pathname]}
              onClick={({ key }) => router.push(key === '/games' ? `${key}/${me?.id}` : key)}
            />
          </Sider>
          <Layout>
            <PageHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            {children}
          </Layout>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
