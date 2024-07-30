import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AkeneoListProduct } from "@/types/akeneoListProduct";

interface ProductListCardProps {
  product: AkeneoListProduct;
  accessToken: string | null;
}

const ProductListCard: React.FC<ProductListCardProps> = ({ product, accessToken }) => {
  const name = product.values.name?.[0]?.data || "No name";
  const price = product.values.price?.[0]?.data?.[0]?.amount || "N/A";
  const imageUrl = product.values.image_1?.[0]._links?.download.href || "/default-image.png";

  const [imageSrc, setImageSrc] = useState("/default-image.png");

  useEffect(() => {
    let isMounted = true; // Prevents state updates if the component is unmounted

    if (imageUrl !== "/default-image.png" && accessToken) {
      const proxyUrl = `/api/image?url=${encodeURIComponent(imageUrl)}&token=${encodeURIComponent(accessToken)}`;
      
      fetch(proxyUrl)
        .then(response => response.blob())
        .then(blob => {
          if (isMounted) {
            const imageObjectURL = URL.createObjectURL(blob);
            setImageSrc(imageObjectURL);
          }
        })
        .catch(error => {
          console.error("Error fetching image through proxy:", error);
          if (isMounted) {
            setImageSrc("/default-image.png"); // Fallback in case of error
          }
        });

      return () => {
        // Cleanup the object URL when the component unmounts
        URL.revokeObjectURL(imageSrc);
      };
    }
  }, [imageUrl, accessToken]);

  return (
    <Card className="bg-zinc-950 border border-zinc-900 rounded-md">
      <CardHeader>
        <img 
          src={imageSrc} 
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
