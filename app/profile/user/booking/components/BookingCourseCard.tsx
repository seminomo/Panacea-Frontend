'use client';
import { useEffect, useState } from 'react';
import { Card, Skeleton } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { convertCourseStatus } from '../utils';
import axios from 'axios';
import dayjs from 'dayjs';
const { Meta } = Card;

interface Course {
  _id: string;
  course: {
    _id: string;
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
  startTime: string;
  endTime: string;
  isCanceled: boolean;
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
  if (loading) {
    return <Skeleton active />;
  }
  return (
    <div className="flex max-w-[650px] gap-5">
      {courses.length ? (
        courses.map((course) => (
          <Card
            className="cursor-pointer hover:shadow-md"
            key={course._id}
            style={{ width: 300, marginTop: 16 }}
            cover={!loading && <Image alt="coverImage" width={300} height={150} src={course.course.coverImage} />}
            onClick={() => linkToCrouse(course._id)}
          >
            <Skeleton loading={loading} paragraph={{ rows: 4 }} active>
              <Meta
                title={course.course.name}
                description={
                  <ul>
                    <li>教練: {course.coach.name}</li>
                    <li>預約日期: {dayjs('2024-06-28T19:00:00.000Z').format('YYYY/MM/DD')}</li>
                    <li>
                      預約時間: {dayjs(course.startTime).format('HH:mm')} - {dayjs(course.endTime).format('HH:mm')}
                    </li>
                    <li>狀態: {convertCourseStatus(course.startTime, course.isCanceled)}</li>
                  </ul>
                }
              />
            </Skeleton>
          </Card>
        ))
      ) : (
        <div>尚未有課程資料</div>
      )}
    </div>
  );
};

export default BookingCourseCard;
