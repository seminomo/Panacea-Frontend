'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Skeleton, Tag } from 'antd';

interface Course {
  id: string;
  course: {
    name: string;
    content: string;
    coverImage: string;
    courseCategories: [string];
  };
  courseSchedule: {
    startTime: string;
    endTime: string;
  };
  coach: {
    name: string;
  };
  status: string;
  meetingUrl: string;
}

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
        console.log('🚀 ~ .then ~ response.data.data:', course);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  // 轉換status 為中文
  const statusMap: { [key: string]: string } = {
    completed: '已完成',
    canceled: '已取消',
    pending: '待處理',
  };

  if (loading) {
    return <Skeleton active />;
  }

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
          <Button type="primary">進入教室</Button>
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
          <p>{course.course.content}</p>
        </div>
        <div>
          <p>課程類型</p>
          {course.course.courseCategories.map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
        </div>
        <div>
          <p>預約時間</p>
          <p>{course.courseSchedule.startTime}</p>
        </div>
        <div>
          <p>狀態</p>
          <p>{statusMap[course.status]}</p>
        </div>
        <div>
          <Button type="primary" onClick={() => cancelBooking(course.id)}>
            取消預約
          </Button>
        </div>
      </div>
    </main>
  );
}
