import { Screenshot } from '@/types/screenshot';
import { Form, Input, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

interface EditScreenshotModalProps {
  isOpen: boolean;
  screenshot: Screenshot | null;
  onOk: (values: { name: string; url: string }) => void;
  onCancel: () => void;
}

export default function EditScreenshotModal({
  isOpen,
  screenshot,
  onOk,
  onCancel,
}: EditScreenshotModalProps) {
  const t = useTranslations();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isOpen && screenshot) {
      form.setFieldsValue({
        name: screenshot.name,
        url: screenshot.url,
      });
    }
  }, [isOpen, screenshot, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal title={t('edit_screenshot')} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={t('screenshot_name')}
          rules={[{ required: true, message: t('required_field') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label={t('screenshot_url')}
          rules={[{ required: true, message: t('required_field') }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
