import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// import axios from 'axios';

// Define the structure of the request body
interface CustomSearchParams extends URLSearchParams {
  status: string | null;
}

const mockResponse = {
  data: [
    {
      id: '001',
      course: {
        name: '課程名稱',
        coverImage: 'https://picsum.photos/500/400?random=1',
      },
      courseSchedule: {
        startTime: '2024-10-10 00:00:00',
        endTime: '2024-10-10 01:00:00',
      },
      coach: {
        name: '教練名稱',
      },
    },
    {
      id: '002',
      course: {
        name: '課程名稱2',
        coverImage: 'https://picsum.photos/500/400?random=2',
      },
      courseSchedule: {
        startTime: '2024-10-10 00:00:00',
        endTime: '2024-10-10 01:00:00',
      },
      coach: {
        name: '教練名稱2',
      },
    },
  ],
};

const getCookie = (name: string): string | undefined => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
};

export const GET = async (req: NextRequest) => {
  // TODO: filter by status
  const searchParams: CustomSearchParams = req.nextUrl.searchParams as CustomSearchParams;
  const status = searchParams.get('status');
  console.log('🚀 ~ GET ~ status:', status);

  // const apiUral = `${process.env.NEXT_PUBLIC_API_URL}/api/user/booking-course?status=${status}`;
  // axios
  //   .get(apiUral)
  //   .then((response) => {
  //     return NextResponse.json(response);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //     return NextResponse.json(error);
  //   });

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/booking-course`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    });
    // Parse the response data
    const data = await response.json();
    // 暫時解決沒有資料
    if (data.data.length === 0) {
      return NextResponse.json(mockResponse);
    }
    return NextResponse.json(data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error during login:', error);

    // Return a 500 status code for internal server errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
