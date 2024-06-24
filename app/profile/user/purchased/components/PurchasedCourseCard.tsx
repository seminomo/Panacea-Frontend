'use client';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Course {
  id: string;
  createdAt: string;
  paymentDate: string;
  paymentMethod: string;
  price: number;
  status: string;
  imageUrl: string;
  course: {
    name: string;
    coach: {
      name: string;
    };
    content: string;
  };
  purchaseCount: number;
  bookingCount: number;
  remainingCount: number;
}

interface PurchasedPageProps {
  status: string;
}

const CourseCard = ({ status }: PurchasedPageProps) => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  // const [status, setStatus] = useState<string>('PAID');
  useEffect(() => {
    axios
      .get(`/api/user/purchased-courses?status=${status}`)
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [status]);

  const linkToCrouse = (crouseId: string) => {
    console.log('🚀 ~ linToCrouse ~ crouseId', crouseId);
    router.push(`purchased/${crouseId}`);
  };
  return (
    <div className="max-w-[650px]">
      {courses.length === 0 && <div>尚未購買課程</div>}
      {courses?.map((course) => (
        <div key={course.id} className="mb-5 flex flex-col gap-3 rounded-lg border border-neutral-400 px-5 py-3">
          <div className="flex justify-between">
            <ul className="flex max-h-[3.5em] flex-col flex-wrap gap-x-6">
              <li>
                訂單成立 <span>{course.createdAt}</span>
              </li>
              <li>
                付款時間 <span>{course.paymentDate}</span>
              </li>
              <li>
                付款方式 <span>{course.paymentMethod}</span>
              </li>
              <li>
                付款金額 <span>{course.price}</span>
              </li>
            </ul>
            <div>{course.status}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <div className="max-w-28">
                <Image src={course.imageUrl} className="rounded-md" alt="course picture" width={300} height={300} />
              </div>
              <div>
                <ul>
                  <li className="text-lg">{course.course.name}</li>
                  <li>教練： {course.course.coach.name}</li>
                  <li>內容： {course.course.content}</li>
                </ul>
              </div>
            </div>
            <div>NT${course.price}</div>
          </div>
          <div className="flex justify-between">
            <ul className="flex max-h-[3.5em] flex-col flex-wrap gap-x-6">
              <li>購買堂數: {course.purchaseCount}</li>
              <li>已預約堂數: {course.bookingCount}</li>
              <li>剩餘堂數: {course.remainingCount}</li>
            </ul>
            <div>
              <Button onClick={() => linkToCrouse(course.id)} type="primary">
                預約課程
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
