"use client";
import { Flex, Layout, theme, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Header, Content } = Layout;

export default function PageHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const t = useTranslations();

  return (
    <Header
      style={{
        paddingTop: 10,
        paddingBottom: 20,
        background: colorBgContainer,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography.Title
        level={4}
        style={{ cursor: "pointer" }}
        //   onClick={() => navigate("/")}
      >
        My Games
      </Typography.Title>
      <Flex gap={20} style={{ alignItems: "center" }}>
        <Typography.Title
          level={4}
          style={{ cursor: "pointer" }}
          //   onClick={() => navigate("/")}
        >
          {t("home")}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{ cursor: "pointer", marginTop: 0 }}
          //   onClick={() => navigate("/")}
        >
          {t("statistics")}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{ cursor: "pointer", marginTop: 0 }}
          //   onClick={() => navigate("/")}
        >
          {t("games")}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{ cursor: "pointer", marginTop: 0 }}
          //   onClick={() => navigate("/")}
        >
          {t("users")}
        </Typography.Title>
      </Flex>
    </Header>
  );
}
