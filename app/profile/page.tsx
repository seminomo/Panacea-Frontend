'use client';

import { Button, Form, Input } from 'antd';
import { useState } from 'react';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const onFinish = async (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values);
    setLoading(true);
    try {
      // Process filteredValues (without rememberMe)
      // const { remember, ...filteredValues } = values;
      // await loginUser(values);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <div className="flex">
        <div>upload photo</div>
        <div>
          <Form className="w-full" layout="vertical" onFinish={onFinish}>
            <Form.Item label="姓名" name="name" rules={[{ required: true, message: '請輸入' }]}>
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
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                更新資料
              </Button>
            </Form.Item>
          </Form>
          {/*  */}
          <Form className="w-full" layout="vertical" onFinish={onFinish}>
            {isChange ? (
              <>
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
              </>
            ) : (
              <Form.Item name="defaultPassword" label="密碼" initialValue="********">
                <Input.Password disabled />
              </Form.Item>
            )}

            {isChange ? (
              <Button type="primary" htmlType="submit" loading={loading}>
                更新密碼
              </Button>
            ) : (
              <Button onClick={() => setIsChange(true)} type="primary">
                修改密碼
              </Button>
            )}
          </Form>
        </div>
      </div>
    </main>
  );
}
