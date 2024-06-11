'use client';
import { Button, Form, Input, message } from 'antd';
import Image from 'next/image';
import loginImage from '/public/looking_out.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ForgotPasswordData {
  email: string;
}

const validateMessages = {
  required: '此為必填',
  types: {
    email: '請輸入正確的 email 格式',
  },
};

// TODO: 自定義 HOOK
const resetPasswordAPI = async (postData: ForgotPasswordData): Promise<void> => {
  try {
    const apiPath = '/api/forgot-password';
    const response = await fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    // 確保 HTTP 回應狀態碼在 200-299 範圍內。如果不在這個範圍內，則拋出錯誤。
    if (!response.ok) {
      throw new Error('reset password failed');
    }
    const data = await response.json();
    if (data.code !== 200) {
      message.error(data.message);
      return;
    }
    message.success(data.message);
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // get submit data
  const onFinish = async (values: ForgotPasswordData) => {
    setLoading(true);
    try {
      await resetPasswordAPI(values);
      const encodedEmail = encodeURIComponent(values.email);
      // 跳轉至驗證信頁面
      router.push(`/notification/email-sent?email=${encodedEmail}&type=forgot-password`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center">
      <div className="flex justify-center items-center w-full">
        <Image className="w-1/2 max-w-[300px]" src={loginImage} alt="Picture of the author" />
        <div className="w-1/2 max-w-[400px]">
          <div className="mb-5">
            <h3 className="text-lg text-center mb-3">寄送密碼重置信</h3>
            <p>請輸入你在本系統所使用的 Email，我們會發送一封信件，點擊信件中的連結以重設密碼。</p>
          </div>
          <Form layout="vertical" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item label="Email" name="email" rules={[{ required: true }, { type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={loading}>
                送出
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
