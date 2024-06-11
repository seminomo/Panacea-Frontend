'use client';

import { Button, Form, Input, message, Modal } from 'antd';
import Image from 'next/image';
import loginImage from '/public/looking_out.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ForgotPasswordData {
  password: string;
  confirmPassword: string;
}

interface SearchParams {
  userId: string | null;
  expires: string | null;
  signature: string | null;
}

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getSearchParams = (): SearchParams => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      userId: searchParams.get('userId'),
      expires: searchParams.get('expires'),
      signature: searchParams.get('signature'),
    };
  };

  const resetPasswordAPI = async (postData: ForgotPasswordData): Promise<void> => {
    const { userId, expires, signature } = getSearchParams();
    if (!userId || !expires || !signature) {
      message.error('缺少必要的查詢參數');
      return;
    }

    const apiPath = `/api/reset-password/${userId}?expires=${expires}&signature=${signature}`;
    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (data.code !== 200 || !data.code) {
        message.error(data.message);
        return;
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error during login:', error);
      message.error('重置密碼失敗，請稍後再試');
    }
  };

  const onFinish = async (values: ForgotPasswordData) => {
    setLoading(true);
    try {
      await resetPasswordAPI(values);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center">
      <div className="flex justify-center items-center w-full">
        <Image className="w-1/2 max-w-[300px]" src={loginImage} alt="Picture of the author" />
        <div className="w-1/2 max-w-[400px]">
          <div className="mb-5">
            <h3 className="text-lg text-center mb-3">重新設定密碼</h3>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="password"
              label="新密碼"
              rules={[
                {
                  required: true,
                  message: '請輸入新密碼',
                },
                { min: 8, message: '請設定至少8碼英文與數字' },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="確認新密碼"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '請確認新密碼',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('密碼不一致，請確認密碼是否相同'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={loading}>
                送出
              </Button>
            </Form.Item>
          </Form>
          <Modal
            centered
            title="設定成功"
            open={isModalOpen}
            onOk={handleOk}
            closable={false}
            footer={[
              <Button key="ok" type="primary" onClick={handleOk}>
                確認
              </Button>,
            ]}
          >
            <p className="text-center">
              設定密碼完成
              <br />
              請重新登入
            </p>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
