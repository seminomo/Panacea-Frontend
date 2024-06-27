import { NextResponse, NextRequest } from 'next/server';
// import axios from 'axios';
import { cookies } from 'next/headers';

// Define the structure of the request body
interface CustomSearchParams extends URLSearchParams {
  status: string | null;
}

// const mockResponse = {
//   data: [
//     {
//       id: '0001',
//       createdAt: '2024-10-10 00:00:00',
//       status: 'PAID',
//       price: 1000,
//       purchaseCount: 5,
//       remainingCount: 3,
//       bookingCount: 2,
//       paymentDate: '2024-10-10 00:00:00',
//       course: {
//         name: '課程名稱',
//         content: '課程內容',
//         coach: {
//           name: '教練名稱',
//         },
//       },
//       imageUrl: 'https://picsum.photos/500/400?random=1',
//       paymentMethod: 'CreaditCard',
//     },
//     {
//       id: '0002',
//       createdAt: '2024-10-10 00:00:00',
//       status: 'PAID',
//       price: 1000,
//       purchaseCount: 5,
//       remainingCount: 3,
//       bookingCount: 2,
//       paymentDate: '2024-10-10 00:00:00',
//       course: {
//         name: '課程名稱2',
//         content: '課程內容2',
//         coach: {
//           name: '教練名稱2',
//         },
//       },
//       imageUrl: 'https://picsum.photos/500/400?random=2',
//       paymentMethod: 'CreaditCard',
//     },
//   ],
// };

const getCookie = (name: string): string | undefined => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
};

export const GET = async (req: NextRequest) => {
  const searchParams: CustomSearchParams = req.nextUrl.searchParams as CustomSearchParams;
  const status = searchParams.get('status');

  // status pending,success,fail
  // axios
  //   .get(`/api/user/order/list?status=${status}`)
  //   .then((response) => {
  //     return NextResponse.json(response);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/order/list?status=${status}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    });
    // Parse the response data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error during login:', error);

    // Return a 500 status code for internal server errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
