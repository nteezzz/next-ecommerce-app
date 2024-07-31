import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchAkeneoToken from '@/utils/fetchAkeneoToken';
import { AkeneoProductResponse, AkeneoListProduct } from '@/types/akeneoListProduct';
import { ListProduct } from '@/types/listProduct';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();

  if (!q) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const token = await fetchAkeneoToken();

    const response = await axios.get<AkeneoProductResponse>(`${process.env.AKENEO_BASE_URL}/api/rest/v1/products-uuid?search={"name":[{"operator":"CONTAINS","value":"${q}","locale":"en_US"}]}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    const products: ListProduct[] = response.data._embedded.items.map((item: AkeneoListProduct) => ({
      id: item.identifier,
      name: item.values.name?.[0]?.data || 'No name',
      price: item.values.price?.[0]?.data?.[0]?.amount || 'N/A',
      image: item.values.image_1?.[0]._links?.download.href || '', 
    }));

    return NextResponse.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
