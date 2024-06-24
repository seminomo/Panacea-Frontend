'use client';

import Image from 'next/image';
import Cookies from 'js-cookie';
import { getUserInfo } from '@/app/api/user';
import { useState, useEffect } from 'react';
import userStore from '../stores/user';

interface NavbarOption {
  title: string;
  url: string;
}

export default function Navbar() {
  const { setUserInfo } = userStore();
  const [navbarOptions, setNavbarOptions] = useState<NavbarOption[]>([
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
  ]);
  const getUserInfoHandler = async () => {
    const { name: storeName } = userStore.getState();

    if (Cookies.get('token') && !storeName) {
      const data = await getUserInfo();
      const { name, email, avatar, isAdmin, isCoach } = data;

      setUserInfo({
        name,
        email,
        avatar,
        isAdmin,
        isCoach,
      });

      if (isCoach) {
        setNavbarOptions([
          {
            title: '刊登課程',
            url: '/profile/coach/course-manage',
          },
          {
            title: name,
            url: '/profile',
          },
        ]);
      } else {
        setNavbarOptions([
          {
            title: '成為教練',
            url: '/apply-coach',
          },
          {
            title: '',
            url: '/login',
          },
          {
            title: name,
            url: '/profile',
          },
        ]);
      }
    }
  };

  useEffect(() => {
    getUserInfoHandler();
  }, []);

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
                {url === '/profile' ? (
                  <a href={url} className="heading6 flex items-center gap-[4px]">
                    {' '}
                    <Image src="/avatar.svg" width={32} height={32} alt="notify icon" /> {title}{' '}
                  </a>
                ) : title ? (
                  <a href={url}>{title}</a>
                ) : (
                  <div>
                    <Image src="/notifications.svg" width={20} height={20} alt="notify icon" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
