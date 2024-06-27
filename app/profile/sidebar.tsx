'use client';
import Link from 'next/link';
import Image from 'next/image';
import userStore from '@/stores/user';
import { LogoutOutlined, IdcardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

export default function SideBar() {
  const { name, isCoach } = userStore();
  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      key: 'profile',
      label: <Link href={'/profile'}>帳號設定</Link>,
      icon: <IdcardOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'user',
      label: '學員中心',
      icon: <UserOutlined />,
      children: [
        { key: '1', label: <Link href={'/profile/user/booking'}>已預約課程管理</Link> },
        { key: '2', label: <Link href={'/profile/user/purchased'}>已購買課程管理</Link> },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'coach',
      label: '教練中心',
      icon: <UserOutlined />,
      children: [
        { key: '3', label: <Link href={'/profile/coach'}>教練檔案</Link> },
        { key: '4', label: <Link href={'/profile/course-manage'}>課程管理</Link> },
        { key: '5', label: <Link href={'/profile/course-list'}>課程清單</Link> },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'admin',
      label: '系統管理員',
      icon: <SettingOutlined />,
      children: [{ key: '6', label: <Link href={'/admin'}>進入後台</Link> }],
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '登出',
      icon: <LogoutOutlined />,
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  return (
    <aside className="mb-10 h-full w-64">
      <div className="rounded-l bg-primary-200">
        <div className="mb-4 flex flex-col p-4">
          <h5 className="flex gap-1 align-baseline">
            <Image src="/account.svg" alt="icon" width={22} height={22} />
            <span className="text-xl">{name}</span>
          </h5>
          {isCoach && (
            <div className="flex flex-col pl-7">
              <span className="flex justify-between">
                <span>教練審核狀態</span>
                <div className="flex gap-1 align-baseline">
                  <Image src={'./checked.svg'} alt={'icon'} width={22} height={22} />
                  <span>已審核</span>
                </div>
              </span>
            </div>
          )}
        </div>
      </div>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['profile']}
        defaultOpenKeys={['user', 'coach', 'admin']}
        mode="inline"
        items={items}
      />
    </aside>
  );
}
