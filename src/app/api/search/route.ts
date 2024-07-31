import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchAkeneoToken from '@/utils/fetchAkeneoToken';
import { AkeneoProductResponse, AkeneoListProduct } from '@/types/akeneoListProduct';

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
    const products: AkeneoListProduct[]= response.data._embedded.items;

    // const products: ListProduct[] = response.data._embedded.items.map((item: AkeneoListProduct) => ({
    //   identifier: item.identifier,
    //   values: {
    //     name: item.values.name[0]?.data ?? 'No Name',
    //     price: item.values.price[0]?.data.amount ?? 'No Price',
    //     image: item.values.image_1 ? item.values.image_1[0]?._links.download.href : null
    //   }
    // }));

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
