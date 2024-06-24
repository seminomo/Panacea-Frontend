import React from 'react';
import SideBar from './sidebar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[80px]">
      <div className="mb-[2rem] w-full bg-primary-200 px-3 py-5">
        <div>帳號設定</div>
        <div>Account preference</div>
      </div>
      <section className="mx-auto w-3/4">
        <div className="flex flex-row gap-x-10">
          <SideBar Username="user1" />
          {children}
        </div>
      </section>
    </div>
  );
}
