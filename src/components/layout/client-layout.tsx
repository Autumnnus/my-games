"use client";

import PageHeader from "@/components/header";
import useAppStore from "@/store/appStore";
import { darkTheme, lightTheme } from "@/theme/themeConfig";
import {
  BulbFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Menu,
  Popover,
  Switch,
  Typography,
} from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createElement, useMemo, useState } from "react";

const { Sider } = Layout;
const { Text } = Typography;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const language = useAppStore((state) => state.locale);
  const setLanguage = useAppStore((state) => state.setLocale);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  const themeName = useMemo(() => (darkMode ? "dark" : "light"), [darkMode]);
  const t = useTranslations();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  // Dil popover'ı için ayrı state
  const [isLangPopoverOpen, setIsLangPopoverOpen] = useState(false);

  function handleChaneLanguage(locale: "en" | "tr") {
    setLanguage(locale);
    router.refresh();
    setIsLangPopoverOpen(false);
  }

  return (
    <ConfigProvider componentSize="large" theme={theme}>
      <Layout style={{ height: "100vh" }}>
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
          <Flex
            justify="space-around"
            align="center"
            style={{ height: "64px" }}
          >
            <Popover
              content={
                <div>
                  <Text
                    onClick={() => handleChaneLanguage("en")}
                    style={{ cursor: "pointer" }}
                  >
                    {t("en")}
                  </Text>
                  <Divider type="vertical" />
                  <Text
                    onClick={() => handleChaneLanguage("tr")}
                    style={{ cursor: "pointer" }}
                  >
                    {t("tr")}
                  </Text>
                </div>
              }
              open={isLangPopoverOpen}
              onOpenChange={setIsLangPopoverOpen}
              trigger="click"
            >
              <Text style={{ cursor: "pointer" }}>{t(language)}</Text>
            </Popover>
            <Switch
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbFilled />}
              checked={darkMode}
              onChange={toggleDarkMode}
              style={{ background: darkMode ? "#141414" : "#f5f5f5" }}
            />
          </Flex>
          <Divider style={{ margin: 0 }} />
          <Menu
            theme={themeName}
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout>
          <PageHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          {children}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
