import useAddScreenshotModalStore from '@/store/game_detail/addScreenshotModal';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Image, Input, Space, Tooltip, Typography } from 'antd';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

export default function FileUploadRow() {
  const t = useTranslations();
  const { fileList, fileNames, handleScreenshotNameChange, setFileList, setFileNames } =
    useAddScreenshotModalStore();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {fileList.map(file => (
        <div
          key={file.uid}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 8,
            border: '1px solid #f0f0f0',
            borderRadius: 4,
          }}
        >
          <Tooltip title={file.name}>
            {file.type?.startsWith('image/') ? (
              <Image
                src={URL.createObjectURL(file.originFileObj as File)}
                alt={file.name}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
                preview={false}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}
              >
                <Text type="secondary">?</Text>
              </div>
            )}
          </Tooltip>
          <Space direction="vertical" style={{ flex: 1 }}>
            <Input
              value={fileNames[file.uid] || ''}
              onChange={e => handleScreenshotNameChange(file.uid, e.target.value)}
              placeholder={t('screenshot_name') + ' (' + t('optional') + ')'}
            />
          </Space>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setFileList(fileList.filter(f => f.uid !== file.uid));
              const newFileNames = { ...fileNames };
              delete newFileNames[file.uid];
              setFileNames(newFileNames);
            }}
            style={{ padding: '4px 8px' }}
          />
        </div>
      ))}
    </Space>
  );
}
