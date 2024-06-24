import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the structure of the request body
interface RequestBody {
  email: string;
  password: string;
}

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`;
const setCookie = (token: string) => {
  const cookieHeader = cookies();
  return cookieHeader.set({
    name: 'token',
    value: token,
    // TODO: httpOnly 後續要調整為 true
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hour
    sameSite: process.env.NODE_ENV === 'development' ? undefined : 'strict',
  });
};

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Parse the request body
    const body: RequestBody = await req.json();
    console.log(body);
    console.log(url);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    // Parse the response data
    const data = await response.json();

    // Handle non-OK responses
    if (!response.ok) {
      return NextResponse.json(data);
    }
    const { token } = data.data;
    if (token) {
      // Set token in cookie
      setCookie(token);
    }
    return NextResponse.json(data);
  } catch (error) {
    // Return a 500 status code for internal server errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
