import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AkeneoListProduct } from "@/types/akeneoListProduct";

interface ProductCardProps {
  product: AkeneoListProduct;
}

const ProductListCard: React.FC<ProductCardProps> = ({ product }) => {
  // Extract values with fallback options
  const name = product.values.name?.[0]?.data || "No name";
  const price = product.values.price?.[0]?.data?.[0]?.amount || "N/A";
  const imageUrl = product.values.image_1?.[0]?.data || "/default-image.png"; // Provide a default image

  return (
    <Card className="bg-zinc-950 border border-zinc-900 rounded-md">
      <CardHeader>
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-[231px] object-cover rounded-t-md" 
        />
      </CardHeader>
      <CardContent className="text-white">
        <p className="text-lg font-semibold mb-1">{name}</p>
        <p className="text-sm">{price} EUR</p>
      </CardContent>
      <CardFooter>
        {/* Optionally add footer content here */}
      </CardFooter>
    </Card>
  );
};

export default ProductListCard;
