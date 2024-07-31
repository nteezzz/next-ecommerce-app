import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchAkeneoToken from '../../../utils/fetchAkeneoToken';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const link = url.searchParams.get('link') || `${process.env.AKENEO_BASE_URL}/api/rest/v1/products`;

  console.log('Fetching token...');
  try {
    const token = await fetchAkeneoToken();
    console.log('Token fetched:', token);

    console.log('Fetching products from Akeneo API...');
    const response = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Products fetched successfully:', response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
