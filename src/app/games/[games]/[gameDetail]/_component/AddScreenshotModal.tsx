import { InboxOutlined, LinkOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  FormInstance,
  Image,
  Modal,
  Radio,
  Space,
  Spin,
  Typography,
  Upload,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import useAddScreenshotModalStore, {
  UploadType,
  UrlItem,
} from '@/store/game_detail/addScreenshotModal';
import FileUploadRow from './AddScreenshotModal/FileUploadRow';
import UrlInputRow from './AddScreenshotModal/UrlInputRow';

const { Dragger } = Upload;
const { Text } = Typography;

interface AddScreenshotModalProps {
  isOpen: boolean;
  onOk: (values: { items: (UrlItem | FileItem)[] }) => void;
  onCancel: () => void;
}

interface FileItem {
  file: File;
  screenshotName?: string;
}

type AddScreenshotModalContentProps = {
  form: FormInstance<unknown>;
  renderUrlPreview: (url: string) => React.ReactNode;
};

function AddScreenshotModalContent({ form, renderUrlPreview }: AddScreenshotModalContentProps) {
  const t = useTranslations();
  const { uploadType, setUploadType, fileList, urlList, handleUploadChange, addUrlField } =
    useAddScreenshotModalStore();

  return (
    <Form form={form} layout="vertical">
      <Card variant="borderless">
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Radio.Group
            value={uploadType}
            onChange={e => setUploadType(e.target.value as UploadType)}
          >
            <Radio.Button value="url">
              <LinkOutlined /> {t('url')}
            </Radio.Button>
            <Radio.Button value="file">
              <InboxOutlined /> {t('file')}
            </Radio.Button>
          </Radio.Group>

          {uploadType === 'url' ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              {urlList.map((item: UrlItem, index: number) => (
                <UrlInputRow
                  key={item.id}
                  item={item}
                  index={index}
                  renderUrlPreview={renderUrlPreview}
                />
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
                  {fileList.length >= 50 ? t('max_file_limit_reached') : t('click_or_drag_files')}
                </p>
                <p className="ant-upload-hint">
                  <Text type="secondary">
                    {t('support_multiple_files')} ({fileList.length}/50)
                  </Text>
                </p>
              </Dragger>
              {fileList.length > 0 && <FileUploadRow />}
            </Space>
          )}
        </Space>
      </Card>
    </Form>
  );
}

export default function AddScreenshotModal({ isOpen, onOk, onCancel }: AddScreenshotModalProps) {
  const t = useTranslations();
  const [form] = Form.useForm();
  const { uploadType, fileList, fileNames, urlList, urlPreviews, setUrlPreviews, resetAll } =
    useAddScreenshotModalStore();
  const urlDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const items =
        uploadType === 'file'
          ? fileList.map((file: UploadFile) => ({
              file: file.originFileObj as File,
              screenshotName: fileNames[file.uid],
            }))
          : urlList
              .filter((item: UrlItem) => item.url.trim())
              .map((item: UrlItem) => ({
                id: item.id,
                url: item.url,
                name: item.name,
              }));

      onOk({ items });
      resetAll();
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    resetAll();
    form.resetFields();
    onCancel();
  };

  // URL önizlemelerini debounce ile yükle
  useEffect(() => {
    if (urlDebounceRef.current) clearTimeout(urlDebounceRef.current);

    urlDebounceRef.current = setTimeout(() => {
      urlList.forEach((item: UrlItem) => {
        const value = item.url;
        if (!value) return;

        // Önce loading durumunu göster
        setUrlPreviews((prev: Record<string, string>) => ({ ...prev, [value]: 'loading' }));
        const img = new window.Image();
        img.onload = () => {
          setUrlPreviews((prev: Record<string, string>) => {
            if (prev[value] === 'loading') {
              return { ...prev, [value]: value };
            }

            return prev;
          });
        };
        img.onerror = () => {
          setUrlPreviews((prev: Record<string, string>) => {
            if (prev[value] === 'loading') {
              return { ...prev, [value]: 'error' };
            }

            return prev;
          });
        };
        img.src = value;
      });
    }, 400); // 400ms debounce

    return () => {
      if (urlDebounceRef.current) clearTimeout(urlDebounceRef.current);
    };
  }, [urlList, setUrlPreviews]);

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
      styles={{ body: { padding: '24px' } }}
    >
      <AddScreenshotModalContent form={form} renderUrlPreview={renderUrlPreview} />
    </Modal>
  );
}
