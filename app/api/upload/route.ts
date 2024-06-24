import { NextResponse } from 'next/server';

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/upload`;

export const POST = async (req: Request): Promise<NextResponse> => {
  console.log('🚀 ~ POST ~ req:', req);
  try {
    // Parse the request body to get form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'File is required' }, { status: 400 });
    }

    const uploadData = new FormData();
    uploadData.append('file', file);
    console.log('🚀 ~ POST ~ uploadData:', uploadData);

    const response = await fetch(url, {
      method: 'POST',
      body: uploadData,
    });
    // Parse the response data
    const data = await response.json();
    console.log('🚀 ~ POST ~ data:', data);

    // Handle non-OK responses
    if (!response.ok) {
      // return NextResponse.json({ message: data.message || 'Login failed' }, { status: response.status });
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
