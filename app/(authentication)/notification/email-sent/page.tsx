'use client';

import { Suspense } from 'react';
import { message } from 'antd';
import Image from 'next/image';
import messageSentImage from '/public/message_sent.svg';
import { useSearchParams } from 'next/navigation';

interface ForgotPasswordData {
  email: string;
}

// TODO: 自定義 HOOK
const resetEmailAPI = async (postData: ForgotPasswordData, type: string): Promise<void> => {
  try {
    const getApiPath = (type: string): string => {
      const apiPaths: { [key: string]: string } = {
        'forgot-password': '/api/forgot-password',
        signup: '/api/verify-email',
      };
      return apiPaths[type];
    };
    const apiPath = getApiPath(type);
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
// 為解決 ： Missing Suspense boundary with useSearchParams
// 所以分兩段寫
const EmailContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const type = searchParams.get('type');

  const resentEmail = async () => {
    if (!email || !type) {
      message.error('出現錯誤，請重新操作');
      return;
    }
    try {
      await resetEmailAPI({ email }, type);
      // message.success('重寄信件成功');
    } catch (error) {
      message.error('重寄信件失敗');
    }
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <h2 className="text-center text-lg mb-4">驗證信已送出</h2>
      {type === 'signup' && (
        <p>
          註冊驗證信已發到你的信箱 {email}
          <br />
          請至信箱收註冊驗證信，點擊信件中的連結來驗證帳戶是否為本人。
        </p>
      )}
      {type === 'forgot-password' && (
        <p>
          重置密碼信已發到你的信箱 {email}
          <br />
          請至信箱收重置密碼信，點擊信件中的連結來重新設定密碼。
        </p>
      )}
      <div className="flex justify-center">
        <Image className="w-1/2 max-w-[300px]" src={messageSentImage} alt="Picture of the author" />
      </div>
      <p className="text-gray-700">
        尚未收到信嗎？點此
        <span onClick={resentEmail} className="underline cursor-pointer pl-2">
          重新寄出信件
        </span>
      </p>
    </div>
  );
};

export default function EmailSent() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <EmailContent />
      </Suspense>
    </main>
  );
}
