import { NextResponse } from 'next/server';

// Define the structure of the request body
interface RequestBody {
  email: string;
}

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email `;

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Parse the request body
    const body: RequestBody = await req.json();

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
    return NextResponse.json(data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error during login:', error);

    // Return a 500 status code for internal server errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
