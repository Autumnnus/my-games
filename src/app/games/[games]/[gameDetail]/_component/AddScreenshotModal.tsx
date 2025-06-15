import { DeleteOutlined, InboxOutlined, LinkOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Space,
  Spin,
  Tooltip,
  Typography,
  Upload,
  message,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const { Dragger } = Upload;
const { Text } = Typography;

interface UrlItem {
  url: string;
  name?: string;
}

interface FileItem {
  file: File;
  screenshotName?: string;
}

interface AddScreenshotModalProps {
  isOpen: boolean;
  onOk: (values: { items: (UrlItem | FileItem)[] }) => void;
  onCancel: () => void;
}

export default function AddScreenshotModal({ isOpen, onOk, onCancel }: AddScreenshotModalProps) {
  const t = useTranslations();
  const [form] = Form.useForm();
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});
  const [urlList, setUrlList] = useState<UrlItem[]>([{ url: '' }]);
  const [urlPreviews, setUrlPreviews] = useState<{ [key: string]: string }>({});

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const items =
        uploadType === 'file'
          ? fileList.map(file => ({
              file: file.originFileObj as File,
              screenshotName: fileNames[file.uid],
            }))
          : urlList
              .filter(item => item.url.trim())
              .map(item => ({
                url: item.url,
                name: item.name,
              }));

      onOk({ items });
      form.resetFields();
      setFileList([]);
      setFileNames({});
      setUrlList([{ url: '' }]);
      setUrlPreviews({});
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setFileNames({});
    setUrlList([{ url: '' }]);
    setUrlPreviews({});
    onCancel();
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    if (newFileList.length > 50) {
      message.error(t('max_file_limit', { limit: 50 }));

      return;
    }

    setFileList(newFileList);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrlList = [...urlList];
    const oldUrl = newUrlList[index].url;
    newUrlList[index] = { ...newUrlList[index], url: value };
    setUrlList(newUrlList);

    // Önceki URL'in önizlemesini temizle
    if (oldUrl) {
      setUrlPreviews(prev => {
        const newPreviews = { ...prev };
        delete newPreviews[oldUrl];

        return newPreviews;
      });
    }

    // URL'den önizleme yükleme
    if (value) {
      // Önce loading durumunu göster
      setUrlPreviews(prev => ({ ...prev, [value]: 'loading' }));

      const img = new Image();
      img.onload = () => {
        setUrlPreviews(prev => {
          // Eğer URL hala aynıysa güncelle
          if (prev[value] === 'loading') {
            return { ...prev, [value]: value };
          }

          return prev;
        });
      };
      img.onerror = () => {
        setUrlPreviews(prev => {
          // Eğer URL hala aynıysa güncelle
          if (prev[value] === 'loading') {
            return { ...prev, [value]: 'error' };
          }

          return prev;
        });
      };
      img.src = value;
    }
  };

  const handleNameChange = (index: number, value: string) => {
    const newUrlList = [...urlList];
    newUrlList[index] = { ...newUrlList[index], name: value };
    setUrlList(newUrlList);
  };

  const handleScreenshotNameChange = (fileUid: string, value: string) => {
    setFileNames(prev => ({ ...prev, [fileUid]: value }));
  };

  const addUrlField = () => {
    if (urlList.length >= 100) {
      message.error(t('max_url_limit', { limit: 100 }));

      return;
    }

    setUrlList([...urlList, { url: '' }]);
  };

  const removeUrlField = (index: number) => {
    const newUrlList = urlList.filter((_, i) => i !== index);
    setUrlList(newUrlList.length ? newUrlList : [{ url: '' }]);
  };

  const renderUrlPreview = (url: string) => {
    if (!url) return null;

    const preview = urlPreviews[url];
    if (!preview) {
      return (
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
          <Text type="secondary">...</Text>
        </div>
      );
    }

    if (preview === 'error') {
      return (
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
          <Text type="danger">!</Text>
        </div>
      );
    }

    if (preview === 'loading') {
      return (
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
          <Spin size="small" />
        </div>
      );
    }

    return (
      <Image
        src={url}
        alt="preview"
        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
        preview={false}
      />
    );
  };

  return (
    <Modal
      title={t('add_screenshot')}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ padding: '24px' }}
    >
      <Form form={form} layout="vertical">
        <Card bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Radio.Group value={uploadType} onChange={e => setUploadType(e.target.value)}>
              <Radio.Button value="url">
                <LinkOutlined /> {t('url')}
              </Radio.Button>
              <Radio.Button value="file">
                <InboxOutlined /> {t('file')}
              </Radio.Button>
            </Radio.Group>

            {uploadType === 'url' ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                {urlList.map((item, index) => (
                  <div
                    key={index}
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
                    {urlList.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeUrlField(index)}
                        style={{ padding: '4px 8px' }}
                      />
                    )}
                  </div>
                ))}
                <Button type="dashed" onClick={addUrlField} block>
                  {t('add_url')} ({urlList.length}/100)
                </Button>
              </Space>
            ) : (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Dragger
                  multiple
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  style={{ padding: '24px' }}
                  accept="image/*"
                  showUploadList={false}
                  disabled={fileList.length >= 50}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {fileList.length >= 50
                      ? t('max_file_limit_reached', { limit: 50 })
                      : t('click_or_drag_files')}
                  </p>
                  <p className="ant-upload-hint">
                    <Text type="secondary">
                      {t('support_multiple_files')} ({fileList.length}/50)
                    </Text>
                  </p>
                </Dragger>
                {fileList.length > 0 && (
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
                              style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
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
                )}
              </Space>
            )}
          </Space>
        </Card>
      </Form>
    </Modal>
  );
}
