'use client';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Image from 'next/image';
import loginImage from '/public/login.svg';
import Link from 'next/link';

import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface LoginData {
    email: string;
    password: string;
  }

  interface SearchParams {
    userId: string | null;
    expires: string | null;
    signature: string | null;
  }

  const getSearchParams = (): SearchParams => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      userId: searchParams.get('userId'),
      expires: searchParams.get('expires'),
      signature: searchParams.get('signature'),
    };
  };

  const verifyEmailLinkAPI = async (params: SearchParams): Promise<void> => {
    const { userId, expires, signature } = params;
    try {
      const apiPath = `/api/email-link/${userId}?expires=${expires}&signature=${signature}`;
      const response = await fetch(apiPath);
      const data = await response.json();
      if (data.code !== 200 || !data.code) {
        message.error(data.message);
        return;
      }
      message.success('驗證成功，請登入');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  //判斷是否有 query
  useEffect(() => {
    const searchParams = getSearchParams();
    if (searchParams.userId) {
      verifyEmailLinkAPI(searchParams);
    }
  }, []);

  // get submit data

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Process filteredValues (without rememberMe)
      // const { remember, ...filteredValues } = values;
      await loginUser(values);
    } finally {
      setLoading(false);
    }
  };

  // 登入
  // TODO: loginUser 改為 hook
  const loginUser = async (postData: LoginData): Promise<void> => {
    try {
      const apiPath = '/api/login';
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      if (data.code !== 200) {
        message.error('登入失敗！請檢查是否輸入正確');
        return;
      }
      // 跳轉至首頁
      router.push('/');
      message.success('登入成功！');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center">
      <div className="text-center mb-10">
        <h3 className="text-2xl">歡迎回來！</h3>
      </div>
      <div className="flex justify-center items-center w-full">
        <Image className="w-1/2 max-w-[300px]" src={loginImage} alt="Picture of the author" />
        <Form
          className="w-1/2 max-w-[400px]"
          layout="vertical"
          // initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: '請輸入正確的 email 格式',
              },
              { required: true, message: '請輸入 email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密碼"
            name="password"
            rules={[
              { required: true, message: '請輸入密碼' },
              { min: 8, message: '請設定至少6碼英文與數字' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
          <div className="mb-5">
            <Link href="/forgot-password">忘記密碼</Link>
          </div>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
