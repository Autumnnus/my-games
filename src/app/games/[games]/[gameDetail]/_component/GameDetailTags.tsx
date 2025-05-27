'use client';
import { NameId } from '@/types/games';
import { Space, Tag, Typography } from 'antd';
import { useTranslations } from 'next-intl';

export default function Tags({ title, tags }: { title: string; tags: NameId[] }) {
  const t = useTranslations();

  return (
    <Space direction="vertical" size="small">
      <Typography.Text>{t(title)}</Typography.Text>
      <Space wrap>
        {tags.map(tag => (
          <Tag key={tag.id}>{tag.name}</Tag>
        ))}
      </Space>
    </Space>
  );
}
