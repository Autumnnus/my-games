"use client";
import useAppStore from "@/store/appStore";
import { MenuOutlined } from "@ant-design/icons";
import { Flex, Grid, Layout, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function PageHeader({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const t = useTranslations();
  const screens = useBreakpoint();
  const me = useAppStore((state) => state.me);

  return (
    <Header
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        background: colorBgContainer,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <Flex gap={20} style={{ alignItems: "center" }}>
        <MenuOutlined
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: 18, cursor: "pointer" }}
        />
        <Typography.Title level={4} style={{ cursor: "pointer" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            My Games
          </Link>
        </Typography.Title>
      </Flex>
      {screens.md && (
        <Flex gap={20} style={{ alignItems: "center" }}>
          <Typography.Title level={4} style={{ cursor: "pointer" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              {t("home")}
            </Link>
          </Typography.Title>
          <Typography.Title
            level={4}
            style={{ cursor: "pointer", marginTop: 0 }}
          >
            <Link
              href="/statistics"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("statistics")}
            </Link>
          </Typography.Title>
          <Typography.Title
            level={4}
            style={{
              cursor: "pointer",
              marginTop: 0,
              display: !me?.access_token ? "none" : "",
            }}
          >
            <Link
              href={`/games/${me?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("games")}
            </Link>
          </Typography.Title>
          <Typography.Title
            level={4}
            style={{ cursor: "pointer", marginTop: 0 }}
          >
            <Link
              href="/users"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("users")}
            </Link>
          </Typography.Title>
        </Flex>
      )}
    </Header>
  );
}
