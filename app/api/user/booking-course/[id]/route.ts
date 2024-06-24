import { NextResponse, NextRequest } from 'next/server';
// import axios from 'axios';

// Define the structure of the request body
// interface CustomSearchParams extends URLSearchParams {
//   status: string | null;
// }

const mockResponse = {
  code: '200',
  data: {
    id: '001',
    course: {
      name: '營養與代謝：了解食物如何影響身體',
      content: '多吃蔬菜多吃肉，努力長高又長大。偶爾一杯無糖奶茶也可以。',
      coverImage: 'https://picsum.photos/500/400?random=1',
      courseCategories: ['心理'],
    },
    courseSchedule: {
      startTime: '2024-10-10 00:00:00',
      endTime: '2024-10-10 01:00:00',
    },
    coach: {
      name: '琦玉老師',
    },
    status: 'completed',
    meetingUrl: 'zoom會議連結',
  },
};

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  console.log('🚀 ~ GET ~ id:', id);
  return NextResponse.json(mockResponse);
  // axios
  //   .get(`/api/user/booking-course/${id}`)
  //   .then((response) => {
  //     console.log('🚀 ~ GET ~ response:', response);
  //     return NextResponse.json(response);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //     return NextResponse.json(error);
  //   });

  // try {
  //   // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/order/list?status=${status}`;
  //   // const response = await fetch(url);
  //   // // Parse the response data
  //   // const data = await response.json();
  //   return NextResponse.json(response);
  // } catch (error) {
  //   // Log the error for debugging
  //   console.error('Error during login:', error);

  //   // Return a 500 status code for internal server errors
  //   return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  // }
};
