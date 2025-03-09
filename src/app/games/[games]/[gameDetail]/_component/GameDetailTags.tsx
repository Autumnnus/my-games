"use client";

import { NameId } from "@/types/games";
import { Space, Typography } from "antd";
import { useTranslations } from "next-intl";
export default function Tags({
  title,
  tags,
}: {
  title: string;
  tags: NameId[];
}) {
  const t = useTranslations();

  return (
    <Space direction="vertical" size="small">
      <Typography.Text>{t(title)}</Typography.Text>
      <Space wrap>
        {tags.map((tag) => (
          <Typography.Text
            key={tag.id}
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 4,
              padding: "0.2rem 0.5rem",
              color: "gray",
            }}
          >
            {tag.name}
          </Typography.Text>
        ))}
      </Space>
    </Space>
  );
}
