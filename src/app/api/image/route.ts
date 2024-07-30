// app/api/image/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const token = request.nextUrl.searchParams.get('token');

  if (!url || !token) {
    return NextResponse.json({ error: 'URL or token missing' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
  }
}
