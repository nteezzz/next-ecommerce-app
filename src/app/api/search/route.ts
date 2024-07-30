// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchAkeneoToken from '@/utils/fetchAkeneoToken';
import { AkeneoProductResponse, AkeneoListProduct } from '@/types/akeneoListProduct';
import { ListProduct } from '@/types/listProduct';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const token = await fetchAkeneoToken();
    const response = await axios.get<AkeneoProductResponse>(`${process.env.AKENEO_BASE_URL}/api/rest/v1/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: JSON.stringify({
          name: {
            operator: 'CONTAINS',
            value: q,
          },
        }),
      },
    });

    const products: ListProduct[] = response.data._embedded.items.map((item: AkeneoListProduct) => ({
      id: item.identifier,
      name: item.values.name[0].data,
      price: item.values.price[0].data,
      image: item.values.image?.[0]?.data || '', // Safely access image data
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
