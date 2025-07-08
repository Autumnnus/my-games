'use client';
import { useLogin } from '@/api/queries/useAuth';
import useAppStore from '@/store/appStore';
import { AuthLoginData } from '@/types/auth';
import { LockOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function AuthLoginPage() {
  const setMe = useAppStore(state => state.setMe);
  const t = useTranslations();
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const onFinish = async (formData: AuthLoginData) => {
    try {
      const data = await mutateAsync(formData);
      setMe(data);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col xs={0} sm={10} style={{ background: '#f0f2f5' }}></Col>
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
              {t('login')}
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item<AuthLoginData>
                label={t('email')}
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Invalid email!' },
                ]}
              >
                <Input placeholder="abcdef@gmail.com" />
              </Form.Item>
              <Form.Item<AuthLoginData>
                label={t('password')}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="*********" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={isPending}>
                  {t('login')}
                </Button>
              </Form.Item>
            </Form>
            <Row justify="space-between">
              <Typography.Link onClick={() => router.push('/auth/forgot-password')}>
                {t('forgot_password')}
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
