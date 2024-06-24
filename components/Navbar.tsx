'use client';

import Image from 'next/image';
// import { getUserInfo } from '@/app/api/user';
import { useEffect } from 'react';
// import userStore from '../stores/user';

const isLogin: boolean = false;

interface NavbarOption {
  title: string;
  url: string;
}

const navbarOptions: NavbarOption[] = isLogin
  ? [
      {
        title: '成為教練',
        url: '/logout',
      },
      {
        title: '刊登課程',
        url: '/logout',
      },
      {
        title: '',
        url: '/logout',
      },
    ]
  : [
      {
        title: '成為教練',
        url: '/signup',
      },
      {
        title: '登入',
        url: '/login',
      },
      {
        title: '註冊',
        url: '/signup',
      },
    ];

export default function Navbar() {
  // const { setUserInfo } = userStore();

  useEffect(() => {
    const getUserInfoHandler = async () => {
      // const { name: userName, email, avatar, isAdmin, isCoach } = await getUserInfo();
      // console.log(setUserInfo);
      // console.log(userName);
      // setUserInfo({
      //   name: userName,
      //   email,
      //   avatar,
      //   isAdmin,
      //   isCoach,
      // });
      // const { name } = userStore.getState();
      // console.log(name);
    };

    getUserInfoHandler();
  });

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-center bg-[#FFF] pb-[23px] pt-[30px] shadow-sm">
      <div className="flex w-full max-w-[1296px] items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="cursor-pointer">
            <Image src="/logo.svg" alt="logo" width={200} height={26} className="mr-[60px]" />
          </a>
          <a href="/courses" className="cursor-pointer">
            課程列表
          </a>
        </div>
        <div className="absolute right-[20%] top-0 flex items-center rounded-b-[8px] bg-[#FAFAFA] shadow-sm">
          <ul className="flex items-center gap-[20px] px-[48px] py-[40px]">
            {navbarOptions.map(({ url, title }, index) => (
              <li key={index}>
                <a href={url}>{title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
