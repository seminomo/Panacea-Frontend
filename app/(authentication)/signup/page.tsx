'use client';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Image from 'next/image';
import signupImage from '/public/signup.svg';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface SignupData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  // TODO: 自定義 HOOK
  const signupUserAPI = async (postData: SignupData): Promise<void> => {
    try {
      const apiPath = '/api/signup';
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
        message.error('註冊失敗！請檢查是否輸入正確');
        return;
      }
      message.success(data.message);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // get submit data
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Process filteredValues (without agreement)
      const { agreement, ...filteredValues } = values;
      await signupUserAPI(filteredValues);
      // 跳轉至驗證信頁面
      const encodedEmail = encodeURIComponent(values.email);
      router.push(`/notification/email-sent?email=${encodedEmail}&type=signup`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center">
      <div className="text-center mb-10">
        <h3 className="text-2xl">註冊學員</h3>
      </div>
      <div className="flex justify-center items-center w-full">
        <Image className="w-1/2 max-w-[300px]" src={signupImage} alt="Picture of the author" />
        <Form className="w-1/2 max-w-[400px]" layout="vertical" onFinish={onFinish}>
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '請輸入姓名' }]}>
            <Input />
          </Form.Item>
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
            name="password"
            label="密碼"
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
              { min: 8, message: '請設定至少8碼英文與數字' },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="確認密碼"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '請確認密碼',
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
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('需要同意條款')),
              },
            ]}
          >
            <Checkbox>
              我已閱讀並同意 <Link href="">服務條款</Link>及<Link href="">隱私權政策</Link>
            </Checkbox>
          </Form.Item>

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
