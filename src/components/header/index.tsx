"use client";
import { Flex, Layout, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

const { Header } = Layout;

export default function PageHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const t = useTranslations();

  return (
    <Header
      style={{
        paddingTop: 10,
        paddingBottom: 0,
        background: colorBgContainer,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography.Title level={4} style={{ cursor: "pointer" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          My Games
        </Link>
      </Typography.Title>
      <Flex gap={20} style={{ alignItems: "center" }}>
        <Typography.Title level={4} style={{ cursor: "pointer" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            {t("home")}
          </Link>
        </Typography.Title>
        <Typography.Title level={4} style={{ cursor: "pointer", marginTop: 0 }}>
          <Link
            href="/statistics"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("statistics")}
          </Link>
        </Typography.Title>
        <Typography.Title level={4} style={{ cursor: "pointer", marginTop: 0 }}>
          <Link
            href="/games"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("games")}
          </Link>
        </Typography.Title>
        <Typography.Title level={4} style={{ cursor: "pointer", marginTop: 0 }}>
          <Link
            href="/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("users")}
          </Link>
        </Typography.Title>
      </Flex>
    </Header>
  );
}
