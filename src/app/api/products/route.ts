import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchAkeneoToken from '../../../utils/fetchAkeneoToken';

export async function GET() {
  try {
    const token = await fetchAkeneoToken();
    const response = await axios.get(`${process.env.AKENEO_BASE_URL}/api/rest/v1/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
