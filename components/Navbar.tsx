import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getUserInfo } from '@/app/api/user';
import userStore from '../stores/user';

interface NavbarOption {
  title: string;
  url: string;
}

const getUserInfoHandler = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const setUserInfo = userStore.getState().setUserInfo;

  let navBarData: NavbarOption[] = [
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

  if (token) {
    const res = await getUserInfo();
    const { name, isCoach, isAdmin, avatar, email } = res;

    setUserInfo({
      name,
      email,
      avatar,
      isAdmin,
      isCoach,
    });

    if (isCoach) {
      navBarData = [
        {
          title: '刊登課程',
          url: '/profile/coach/course-manage',
        },
        {
          title: name,
          url: '/profile',
        },
      ];
    } else {
      navBarData = [
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
      ];
    }
  }
  return { token, navBarData };
};
export default async function Navbar() {
  const { navBarData } = await getUserInfoHandler();
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-center bg-[#FFF] pb-[23px] pt-[30px] shadow-sm">
      <div className="flex w-full max-w-[1296px] items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            <Image src="/logo.svg" alt="logo" width={200} height={26} className="mr-[60px]" />
          </Link>
          <Link href="/courses" className="cursor-pointer">
            課程列表
          </Link>
        </div>
        <div className="absolute right-[20%] top-0 flex items-center rounded-b-[8px] bg-[#FAFAFA] shadow-sm">
          <ul className="flex items-center gap-[20px] px-[48px] py-[40px]">
            {navBarData.map(({ url, title }, index) => (
              <li key={index}>
                {url === '/profile' ? (
                  <Link href={url} className="heading6 flex items-center gap-[4px]">
                    {' '}
                    <Image src="/avatar.svg" width={32} height={32} alt="notify icon" /> {title}{' '}
                  </Link>
                ) : title ? (
                  <Link href={url}>{title}</Link>
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
