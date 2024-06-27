'use client';
import { useEffect, useState } from 'react';
import { Button, Skeleton } from 'antd';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Course {
  _id: string;
  courseId: string;
  name: string;
  price: string;
  purchaseCount: string;
  totalPrice: string;
  remainingCount: number;
  bookingCount: number;
  status: string;
  paymentType: string;
  payTime: string;
  createdAt: string;
  imageUrl: string;
  course: {
    coach: {
      name: string;
    };
    content: string;
  };
}

interface PurchasedPageProps {
  status: string;
}

const CourseCard = ({ status }: PurchasedPageProps) => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetchCourses(status);
  }, [status]);

  const fetchCourses = async (status: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/purchased-courses?status=${status}`);
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const linkToCrouse = (crouseId: string) => {
    // console.log('🚀 ~ linToCrouse ~ crouseId', crouseId);
    router.push(`purchased/${crouseId}`);
  };
  if (loading) {
    return <Skeleton active />;
  }
  return (
    <div className="max-w-[650px]">
      {courses.length ? (
        courses.map((course) => (
          <div
            key={course.courseId}
            className="mb-5 flex flex-col gap-3 rounded-lg border border-neutral-400 px-5 py-3"
          >
            <div className="flex justify-between">
              <ul className="flex max-h-[3.5em] flex-col flex-wrap gap-x-6">
                <li>
                  訂單成立 <span>{course.createdAt}</span>
                </li>
                <li>
                  付款時間 <span>{course.payTime}</span>
                </li>
                <li>
                  付款方式 <span>{course.paymentType}</span>
                </li>
                <li>
                  付款金額 <span>{course.price}</span>
                </li>
              </ul>
              <div>{course.status}</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                {/* <div className="max-w-28">
                  <Image src={course.imageUrl} className="rounded-md" alt="course picture" width={300} height={300} />
                </div> */}
                <div>
                  <ul>
                    <li className="text-lg">{course.name}</li>
                    {/* <li>教練： {course.course.coach.name}</li>
                    <li>內容： {course.course.content}</li> */}
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
                <Button onClick={() => linkToCrouse(course.courseId)} type="primary">
                  預約課程
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>尚未有課程資料</div>
      )}
    </div>
  );
};

export default CourseCard;
