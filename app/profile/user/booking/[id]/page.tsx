'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { convertCourseStatus } from '../utils';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Button, Skeleton, Tag } from 'antd';

interface Course {
  id: string;
  course: {
    name: string;
    content: string;
    coverImage: string;
    category: [string];
    subCategory: [string];
    description: string;
  };
  courseSchedule: {
    startTime: string;
    endTime: string;
  };
  startTime: string;
  endTime: string;
  isCanceled: boolean;
  userCancelReason: string;
  coachCancelReason: string;
  coach: {
    name: string;
  };
  status: string;
  meetingUrl: string;
}

const isWithin12HoursBefore = (time: string) => {
  const targetTime = dayjs(time);
  const twelveHoursBefore = targetTime.subtract(12, 'hour');
  const now = dayjs();
  return now.isAfter(twelveHoursBefore) && now.isBefore(targetTime);
};

export default function BookingCoursesPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/user/booking-course/${params.id}`)
      .then((response) => {
        setLoading(false);
        setCourse(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  // 轉換status 為中文
  // const statusMap: { [key: string]: string } = {
  //   completed: '已完成',
  //   canceled: '已取消',
  //   pending: '待處理',
  // };

  if (loading) {
    return <Skeleton active />;
  }
  // 檢查物件是否有值
  if (!course) {
    return <div>No course data available.</div>;
  }

  const cancelBooking = (courseId: string) => {
    axios.post(`/api/user/cancel-course/${courseId}`).then((response) => {
      console.log('🚀 ~ cancelBooking ~ response', response);
    });
  };
  return (
    <main className="flex min-h-[100dvh] w-full gap-5">
      <div className="flex flex-auto flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-lg">{course.course.name}</h3>
          <Link href={course.meetingUrl} rel="noopener noreferrer" target="_blank" passHref>
            <Button type="primary">進入教室</Button>
          </Link>
        </div>
        <div className="relative h-full max-h-[300px] w-full">
          <Image fill src={course.course.coverImage} className="rounded-md object-cover" alt="course picture"></Image>
        </div>
        <div>
          <p>教練</p>
          <p>{course.coach.name}</p>
        </div>
        <div>
          <p>課程內容</p>
          <p>{course.course.description}</p>
        </div>
        <div>
          <p>課程類型</p>
          {course.course.category.map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
        </div>
        <div>
          <p>預約時間</p>
          <p>
            {dayjs(course.startTime).format('YYYY/MM/DD HH:mm')} - {dayjs(course.endTime).format('HH:mm')}
          </p>
        </div>
        <div>
          <p>狀態</p>
          <p>{convertCourseStatus(course.startTime, course.isCanceled)}</p>
        </div>
        <div>
          <Button
            disabled={isWithin12HoursBefore(course.startTime)}
            type="primary"
            onClick={() => cancelBooking(course.id)}
          >
            取消預約
          </Button>
        </div>
      </div>
    </main>
  );
}
