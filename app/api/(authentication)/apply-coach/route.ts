import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the structure of the request body
interface RequestBody {
  language: [];
  subject: string;
  specialty: string;
  workExperience: object;
  education: object;
  certifiedDocuments: [];
}

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/apply-coach`;

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Get the token from the cookie
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    // Return a 401 status code if the token is missing
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // Parse the request body
    const body: RequestBody = await req.json();

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token.value}`,
      },
    });
    // Parse the response data
    const data = await response.json();

    // Handle non-OK responses
    if (!response.ok) {
      return NextResponse.json(data);
    }
    return NextResponse.json(data);
  } catch (error) {
    // Return a 500 status code for internal server errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

// import { request } from '@/util/request';

// export const login = (postData: RequestBody) =>
//   request({
//     url: 'api/auth/apply-coach',
//     method: 'POST',
//     data: postData,
//   });
