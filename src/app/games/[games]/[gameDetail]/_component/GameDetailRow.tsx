"use client";
import PlatformIcon from "@/components/platform_icon";
import { GamesData, Platform } from "@/types/games";
import { Space, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type DetailRowsProps = {
  title: keyof GamesData;
  content: GamesData[keyof GamesData];
};

export default function GameDetailRow({ title, content }: DetailRowsProps) {
  const t = useTranslations();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const stringfied = useMemo(() => (content ? String(content) : ""), [content]);

  const memorizedContent = useMemo(() => {
    if (title === "lastPlay") {
      return (
        <span style={{ color: "gray" }}>
          {new Date(stringfied).toLocaleDateString()}
        </span>
      );
    }

    if (title === "rating") {
      return !content ? (
        <span style={{ color: "gray" }}>{t("not_rated")}</span>
      ) : (
        <span style={{ color: "gray" }}>{stringfied}/10</span>
      );
    }

    if (title === "platform") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "gray",
            gap: 8,
          }}
        >
          {t(stringfied)}
          <PlatformIcon platform={content as Platform} />
        </span>
      );
    }

    return (
      <span style={{ color: "gray" }}>{capitalizeFirstLetter(stringfied)}</span>
    );
  }, [content, stringfied, title]);

  return (
    <Space direction="horizontal" size={4}>
      <Typography.Text strong>{t(title)}:</Typography.Text>
      <Typography.Text>{memorizedContent}</Typography.Text>
    </Space>
  );
}
