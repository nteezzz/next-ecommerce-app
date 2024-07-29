import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const response = await axios.post(
      `${process.env.AKENEO_BASE_URL}/api/oauth/v1/token`,
      {
        grant_type: 'password',
        client_id: process.env.AKENEO_CLIENT_ID,
        client_secret: process.env.AKENEO_CLIENT_SECRET,
        username: process.env.AKENEO_USERNAME,
        password: process.env.AKENEO_PASSWORD,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching token:', error.response?.data || error.message);
    return NextResponse.json(error.response?.data || { error: 'Error fetching token' }, { status: error.response?.status || 500 });
  }
}
