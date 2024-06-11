import { NextResponse, NextRequest } from 'next/server';

// Define the structure of the request body
interface CustomSearchParams {
  expires: string | null;
  signature: string | null;
}

// Define the structure of the request body
interface RequestBody {
  password: string;
  confirmPassword: string;
}

// Helper function to extract search parameters
const getSearchParams = (req: NextRequest): CustomSearchParams => {
  const searchParams = req.nextUrl.searchParams;
  return {
    expires: searchParams.get('expires'),
    signature: searchParams.get('signature'),
  };
};

// Helper function to build the API URL
const buildApiUrl = (userId: string, { expires, signature }: CustomSearchParams): string => {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${userId}?expires=${expires}&signature=${signature}`;
};

// Helper function to fetch data from the API
const fetchData = async (url: string, body: RequestBody): Promise<Response> => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// Main handler function
export const POST = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const searchParams = getSearchParams(req);
    const url = buildApiUrl(params.userId, searchParams);

    const body: RequestBody = await req.json();
    const response = await fetchData(url, body);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during reset password:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
