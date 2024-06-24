'use client';
import { useEffect, useState } from 'react';
import { Card, Skeleton } from 'antd';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const { Meta } = Card;

interface Course {
  id: string;
  course: {
    name: string;
    coverImage: string;
  };
  courseSchedule: {
    startTime: string;
    endTime: string;
  };
  coach: {
    name: string;
  };
}
const BookingCourseCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/booking-courses`);
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const linkToCrouse = (crouseId: string) => {
    router.push(`booking/${crouseId}`);
  };
  return (
    <div className="flex max-w-[650px] gap-5">
      {courses?.map((course) => (
        <Card
          className="cursor-pointer hover:shadow-md"
          key={course.id}
          style={{ width: 300, marginTop: 16 }}
          cover={!loading && <Image alt="coverImage" width={300} height={150} src={course.course.coverImage} />}
          onClick={() => linkToCrouse(course.id)}
        >
          <Skeleton loading={loading} paragraph={{ rows: 4 }} active>
            <Meta
              title={course.course.name}
              description={
                <ul>
                  <li>教練{course.coach.name}</li>
                  <li>預約日期{course.courseSchedule.startTime}</li>
                  <li>預約時間</li>
                  <li>狀態</li>
                </ul>
              }
            />
          </Skeleton>
        </Card>
      ))}
    </div>
  );
};

export default BookingCourseCard;
