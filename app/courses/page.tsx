'use client';

import Image from "next/image";
import bg from '../../public/bg-pagetop.svg';
import star from '../../public/star.svg';
import comment from '../../public/comment.svg';
import iconCourse from '../../public/icon-course-card.svg';
import { Select, Pagination } from 'antd';
import type { PaginationProps } from 'antd';

interface CourseList {
  id: string;
  imgSrc: string;
  title: string;
  rating: number;
  commentsNum: number;
  recurrenceSchedules: { startedAt: string, endedAt: string }[];   
  description: string;
}

interface pagination {
  currentPage: number;
  total: number;
  perpage: number;
  lastPage: number;
}

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const coursesList: CourseList[] = [
    {
      id: '2404221530',
      imgSrc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '合一覺醒授證課程',
      rating: 4.8,
      commentsNum: 1500,
      recurrenceSchedules: [
        {
          startedAt: '2000-01-02T00:00:00.000+08:00',
          endedAt: '2000-01-02T00:30:00.000+08:00',
        },
        {
          startedAt: '2000-01-02T11:00:00.000+08:00',
          endedAt: '2000-01-02T14:00:00.000+08:00',
        },
        {
          startedAt: '2000-01-02T19:00:00.000+08:00',
          endedAt: '2000-01-03T00:30:00.000+08:00',
        },
        {
          startedAt: '2000-01-03T10:00:00.000+08:00',
          endedAt: '2000-01-03T12:00:00.000+08:00',
        },
      ],
      description: '社會充滿好壞對錯、評判和制約，我們甚至受控於錯誤的信念與制約，遵循著看似可以成功，卻從未帶給我們喜悅快樂的規條、準則。如何跳脫錯誤的信念崇拜，重新活出一個喜悅、豐盛，並且對社會有貢獻的人，是現代人最重要的議題！透過尊者阿瑪巴關(Sri Amma Bhagavan)的智慧教導，幫助你跳脫頭腦的思維，活出你生命的豐盛、喜悅和自由！',
    },
    {
      id: '2404221530',
      imgSrc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '合一覺醒授證課程',
      rating: 4.8,
      commentsNum: 1500,
      recurrenceSchedules: [
        {
          startedAt: '2000-01-02T00:00:00.000+08:00',
          endedAt: '2000-01-02T00:30:00.000+08:00',
        },
        {
          startedAt: '2000-01-02T11:00:00.000+08:00',
          endedAt: '2000-01-02T14:00:00.000+08:00',
        },
        {
          startedAt: '2000-01-02T19:00:00.000+08:00',
          endedAt: '2000-01-03T00:30:00.000+08:00',
        },
        {
          startedAt: '2000-01-03T10:00:00.000+08:00',
          endedAt: '2000-01-03T12:00:00.000+08:00',
        },
      ],
      description: '社會充滿好壞對錯、評判和制約，我們甚至受控於錯誤的信念與制約，遵循著看似可以成功，卻從未帶給我們喜悅快樂的規條、準則。如何跳脫錯誤的信念崇拜，重新活出一個喜悅、豐盛，並且對社會有貢獻的人，是現代人最重要的議題！透過尊者阿瑪巴關(Sri Amma Bhagavan)的智慧教導，幫助你跳脫頭腦的思維，活出你生命的豐盛、喜悅和自由！',
    },
  ]

export default function CoursesPage() {
    return (
        <main className="min-h-[100dvh] pt-[80px]">
            <header style={{ backgroundImage: `url(${bg.src})` }} className="h-[400px] bg-cover flex justify-center items-center">
                <div className="w-[1296px] pb-[100px]">
                  <p className="heading1">課程列表</p>
                  <span className="heading4 text-primary-500">Course List</span>
                </div>
            </header>
            <main className="rounded-tl-[100px] bg-[#fff] pt-[80px] mt-[-80px] flex flex-col justify-center items-center">
              <div className="max-w-[1296px] w-full flex flex-col gap-[40px] mb-[60px] px-[36px]">
              <Select
              defaultValue="4"
    style={{ width: 160 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    options={[
      {
        value: '1',
        label: '心靈',
      },
      {
        value: '2',
        label: '營養',
      },
      {
        value: '3',
        label: '職涯',
      },
      {
        value: '4',
        label: '全部',
      },
    ]}
  />
              </div>
              <ul className="max-w-[1296px] w-full flex flex-col gap-[40px] mb-[60px]">
                { 
                  coursesList.map(({ id, imgSrc, title, rating, commentsNum, recurrenceSchedules, description }) => (
                    <li key={id} className="relative flex gap-[25px] bg-gradient-to-r from-[#fff] to-[rgba(23,127,172,0.1)] rounded-[36px] p-[36px]">
                      <Image src={iconCourse.src} alt={title} width={215} height={215} className="absolute bottom-0 right-0" />
                      <img src={imgSrc} alt={title} className="w-[270px] h-[360px] rounded-[8px] object-cover" />
                      <div className="max-w-[415px]">
                        <h3 className="heading2 mb-[12px]">{title}</h3>
                        <div className="flex items-center gap-[36px] mb-[36px] text-[#525252]">
                          <div className="flex items-center">
                            <Image src={star.src} alt="star" width={24} height={24} className="mr-[5px]" />
                            <span className="body">{rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Image src={comment.src} alt="comment" width={20} height={20} className="mr-[5px]"/>
                            <span>{commentsNum} 個評論</span>
                          </div>
                        </div>
                        <p className="mb-[36px] small-body text-[#525252]">{description}</p>
                        <p className="text-[12px] text-primary-500 underline mb-[36px] cursor-pointer">瀏覽更多</p>
                        <div className="text-right">
                          <button className="rounded-[4px] px-[16px] py-[4px] bg-primary-500 text-[#fff] small-body">查看課程詳情</button>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="mb-[80px]">
                <Pagination total={1000} itemRender={itemRender} />
              </div>
            </main>
        </main>
    )
}