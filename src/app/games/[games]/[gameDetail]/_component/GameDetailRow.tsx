"use client";
import PlatformIcon from "@/components/platform_icon";
import { GamesData, Platform } from "@/types/games";
import { Typography } from "antd";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type DetailRowsProps = {
  title: keyof GamesData;
  content: GamesData[keyof GamesData];
};

export default function GameDetailRow({ title, content }: DetailRowsProps) {
  const t = useTranslations();

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const stringfied = useMemo(() => (content ? String(content) : ""), [content]);

  const memorizedContent = useMemo(() => {
    if (title === "lastPlay") {
      return (
        <Typography.Text type="secondary">
          {new Date(stringfied).toLocaleDateString()}
        </Typography.Text>
      );
    }

    if (title === "rating") {
      return !content ? (
        <Typography.Text type="secondary">{t("not_rated")}</Typography.Text>
      ) : (
        <Typography.Text type="secondary">{stringfied}/10</Typography.Text>
      );
    }

    if (title === "platform") {
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ display: "inline-block", lineHeight: "20px" }}>
            {t(stringfied)}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: 20,
              height: 20,
            }}
          >
            <PlatformIcon platform={content as Platform} />
          </span>
        </span>
      );
    }

    return (
      <Typography.Text type="secondary">
        {capitalizeFirstLetter(stringfied)}
      </Typography.Text>
    );
  }, [content, stringfied, title, t]);

  return (
    <>
      <Typography.Text strong>{t(title)}: </Typography.Text>
      <Typography.Text strong>{memorizedContent}</Typography.Text>
    </>
  );
}
