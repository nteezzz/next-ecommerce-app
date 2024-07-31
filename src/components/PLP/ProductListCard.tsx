import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AkeneoListProduct } from "@/types/akeneoListProduct";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListCardProps {
  product: AkeneoListProduct;
  accessToken: string | null;
}

const ProductListCard: React.FC<ProductListCardProps> = ({ product, accessToken }) => {
  const name = product.values.name?.[0]?.data || "No name";
  const price = product.values.price?.[0]?.data?.[0]?.amount || "N/A";
  const imageUrl = product.values.image_1?.[0]._links?.download.href || "/default-image.png";

  const [imageSrc, setImageSrc] = useState("/default-image.png");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 
    if (imageUrl !== "/default-image.png" && accessToken) {
      const proxyUrl = `/api/image?url=${encodeURIComponent(imageUrl)}&token=${encodeURIComponent(accessToken)}`;
      fetch(proxyUrl)
        .then(response => response.blob())
        .then(blob => {
          if (isMounted) {
            const imageObjectURL = URL.createObjectURL(blob);
            setImageSrc(imageObjectURL);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error("Error fetching image through proxy:", error);
          if (isMounted) {
            setImageSrc("/default-image.png"); // Fallback in case of error
            setIsLoading(false);
          }
        });

      return () => {
        // Cleanup the object URL when the component unmounts
        URL.revokeObjectURL(imageSrc);
      };
    } else {
      setIsLoading(false);
    }
  }, [imageUrl, accessToken]);

  return (
    <Card className="bg-zinc-950 border border-zinc-900 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-zinc-800">
      <CardHeader className="p-0">
        {isLoading ? (
          <Skeleton className="w-full h-[180px] rounded-t-md" />
        ) : (
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-full h-[180px] object-cover rounded-t-md" 
          />
        )}
      </CardHeader>
      <CardContent className="p-4 text-white">
        {isLoading ? (
          <>
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-1/2 h-5" />
          </>
        ) : (
          <>
            <p className="text-sm font-medium mb-1">{name}</p>
            <p className="text-xl font-bold">{price} EUR</p>
          </>
        )}
      </CardContent>
      <CardFooter >
      </CardFooter>
    </Card>
  );
};

export default ProductListCard;
