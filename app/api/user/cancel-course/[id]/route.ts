import { NextResponse, NextRequest } from 'next/server';
// import axios from 'axios';

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  console.log('🚀 ~ GET ~ status:', params.id);
  const id = params.id;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/booking-course/${id}/cancel`;
  console.log('🚀 ~ POST ~ apiUrl:', apiUrl);
  return NextResponse.json('response');
  // axios
  //   .get(`/api/user/booking-course/${id}`)
  //   .then((response) => {
  //     return NextResponse.json(response);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
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
