'use client';
import { LockOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Row, Space, Typography } from 'antd';

import { useResetPassword } from '@/hooks/useAuth';
import { AuthResetPasswordData } from '@/types/auth';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

const { Title } = Typography;

export default function AuthResetPasswordPage() {
  const t = useTranslations();
  const { mutateAsync, isPending } = useResetPassword();
  const resetPasswordToken = new URLSearchParams(location.search).get(
    'resetPasswordToken'
  ) as string;

  const onFinish = async (formData: AuthResetPasswordData) => {
    try {
      await mutateAsync({ ...formData, resetPasswordToken });
      toast.success('Password reset successfully. You can now login with your new password.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col xs={0} sm={10} style={{ background: '#f0f2f5' }}>
        {/* AuthImageSide: Görsel bölüm */}
      </Col>
      <Col
        xs={24}
        sm={14}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400, padding: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Avatar size={64} style={{ backgroundColor: '#1890ff' }} icon={<LockOutlined />} />
            <Title level={2} style={{ textAlign: 'center' }}>
              {t('reset_password')}
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item<AuthResetPasswordData>
                label={t('password')}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="**********" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={isPending}>
                  {t('reset')}
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </Col>
    </Row>
  );
}
