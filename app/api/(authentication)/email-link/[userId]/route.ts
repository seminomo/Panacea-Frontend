import { NextResponse, NextRequest } from 'next/server';

// Define the structure of the request body
interface CustomSearchParams extends URLSearchParams {
  expires: string | null;
  signature: string | null;
}

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const searchParams: CustomSearchParams = req.nextUrl.searchParams as CustomSearchParams;
  // const { expires, signature } = searchParams;
  const expires = searchParams.get('expires');
  const signature = searchParams.get('signature');
  const userId = params.userId;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-link/${userId}?expires=${expires}&signature=${signature}`;
    const response = await fetch(url);
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
