'use client';
import { useLogin, useSignup } from '@/api/queries/useAuth';
import useAppStore from '@/store/appStore';
import { AuthSignupData } from '@/types/auth';
import { LockOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function AuthSignupPage() {
  const setMe = useAppStore(state => state.setMe);
  const router = useRouter();
  const t = useTranslations();
  const {
    mutateAsync: signupMutate,
    isPending: isSignupPending,
    isError: isSignupError,
  } = useSignup();
  const { mutateAsync: loginMutate, isPending: isLoginPending } = useLogin();

  const onFinish = async (formData: AuthSignupData) => {
    try {
      await signupMutate(formData);
      if (!isSignupError) {
        const loginData = await loginMutate(formData);
        if (loginData) {
          setMe(loginData);
          router.push('/');
        }
      }
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
              {t('signup')}
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item<AuthSignupData>
                label={t('name')}
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="My Nickname" />
              </Form.Item>
              <Form.Item
                label={t('email')}
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Invalid email!' },
                ]}
              >
                <Input placeholder="abcdef@gmail.com" />
              </Form.Item>
              <Form.Item<AuthSignupData>
                label={t('password')}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="*********" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isSignupPending || isLoginPending}
                >
                  {t('signup')}
                </Button>
              </Form.Item>
            </Form>
            <Row justify="center">
              <Typography.Link onClick={() => router.push('/auth/login')}>
                {t('already_have_account')}
              </Typography.Link>
            </Row>
          </Space>
        </div>
      </Col>
    </Row>
  );
}
