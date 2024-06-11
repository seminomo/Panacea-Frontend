'use client';

import Image from "next/image";

let isLogin: boolean = false;

interface NavbarOption {
  title: string;
  url: string;
}

let navbarOptions: NavbarOption[] = isLogin ? 
[
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
] :
[
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
]

export default function Navbar() {
  return (
    <nav className="flex fixed z-10 top-0 right-0 left-0 items-center justify-center pt-[30px] pb-[23px] bg-[#FFF] shadow-sm">
      <div className="max-w-[1296px] w-full flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="cursor-pointer">
            <Image src="/logo.svg" alt="logo" width={200} height={26} className="mr-[60px]" />
          </a>
          <a href="/courses" className="cursor-pointer">課程列表</a>
        </div>
        <div className="flex items-center absolute top-0 bg-[#FAFAFA] rounded-b-[8px] right-[20%] shadow-sm">
          <ul className="flex items-center gap-[20px] px-[48px] py-[40px]">
            {
              navbarOptions.map(({ url, title }, index) => (
                <li key={index}>
                  <a href={url}>{title}</a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}