import useAddScreenshotModalStore from '@/store/game_detail/addScreenshotModal';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

export type UrlItem = {
  id: string;
  url: string;
  name?: string;
};

export type UrlInputRowProps = {
  item: UrlItem;
  index: number;
  renderUrlPreview: (url: string) => React.ReactNode;
};

const UrlInputRow: React.FC<UrlInputRowProps> = React.memo(function UrlInputRow({
  item,
  index,
  renderUrlPreview,
}) {
  const t = useTranslations();
  const { handleUrlChange, handleNameChange, removeUrlField, urlList } =
    useAddScreenshotModalStore();
  const canRemove = urlList.length > 1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        border: '1px solid #f0f0f0',
        borderRadius: 4,
      }}
    >
      {renderUrlPreview(item.url)}
      <Space style={{ flex: 1 }} size="small">
        <Input
          value={item.url}
          onChange={e => handleUrlChange(index, e.target.value)}
          placeholder={t('screenshot_url')}
        />
        <Input
          value={item.name}
          onChange={e => handleNameChange(index, e.target.value)}
          placeholder={t('screenshot_name') + ' (' + t('optional') + ')'}
        />
      </Space>
      {canRemove && (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeUrlField(index)}
          style={{ padding: '4px 8px' }}
        />
      )}
    </div>
  );
});

export default UrlInputRow;
