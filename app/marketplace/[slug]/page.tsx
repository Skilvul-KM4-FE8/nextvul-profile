// // app/marketplace/[id].tsx
"use client";

// import { useRouter } from "next/router";

import { useGetProduct } from "@/features/marketplace/products/api/use-get-details-product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/router";

export default function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: product, isLoading, error } = useGetProduct(slug as string);
  const { addToCart } = useCartStore();

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Image src={product.imageUrl || "/placeholder.jpg"} alt={product.name} width={500} height={500} className="rounded-lg w-full" />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <p className="text-lg font-semibold mt-2">Rp {new Intl.NumberFormat("id-ID").format(product.price)}</p>
        <Button className="mt-4 w-full" onClick={() => addToCart({ ...product, id: Number(product.id), quantity: 1 })}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
