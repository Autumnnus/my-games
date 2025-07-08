'use client';
import { useForgotPassword } from '@/api/queries/useAuth';
import { AuthForgotPasswordData } from '@/types/auth';
import { LockOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const { Title } = Typography;

export default function AuthForgotPasswordPage() {
  const t = useTranslations();
  const router = useRouter();
  const { mutateAsync, isPending } = useForgotPassword();

  const onFinish = async (formData: AuthForgotPasswordData) => {
    try {
      await mutateAsync(formData);
      toast.success('Email sent successfully. Check your email for the reset link.');
      router.push('/');
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
              <Form.Item<AuthForgotPasswordData>
                label={t('email')}
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Invalid email!' },
                ]}
              >
                <Input placeholder="abcdef@gmail.com" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={isPending}>
                  {t('send')}
                </Button>
              </Form.Item>
            </Form>
            <Row justify="space-between">
              <Typography.Link onClick={() => router.push('/auth/login')}>
                {t('login')}
              </Typography.Link>
              <Typography.Link onClick={() => router.push('/auth/signup')}>
                {t('dont_have_account')}
              </Typography.Link>
            </Row>
          </Space>
        </div>
      </Col>
    </Row>
  );
}
