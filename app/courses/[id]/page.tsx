'use client';

// import Image from 'next/image';
import bg from '../../../public/bg-pagetop.svg';

interface CourseDetails {
  coach: string;
  coachAvatar: string;
  courseName: string;
  courseContent: string;
  coursePrice: {
    price: number;
    count: number;
  }[];
}

const CourseDetails: CourseDetails[] = [
  {
    coach: '測試',
    coachAvatar:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    courseName: '藝術治療',
    courseContent:
      '在感受與真實之間，創作可以是一艘船，接應與連結著我們的心靈。讓我陪你一起透過藝術的創作，跟著心流找到適合自己的一隅。緩緩地，覺察與接納自己獨特的樣貌。',
    coursePrice: [
      {
        price: 200,
        count: 3,
      },
      {
        price: 300,
        count: 5,
      },
      {
        price: 400,
        count: 4,
      },
    ],
  },
];

export default function CourseDetailPage() {
  return (
    <main className="min-h-[100dvh] pt-[80px]">
      <header
        style={{ backgroundImage: `url(${bg.src})` }}
        className="flex h-[400px] items-center justify-center bg-cover"
      ></header>
      <main className="mt-[-80px] flex flex-col items-center justify-center rounded-tl-[100px] bg-[#fff] pt-[80px]">
        <div className="mb-[60px] flex w-full max-w-[1296px] flex-col gap-[40px] px-[36px]"></div>
      </main>
    </main>
  );
}
