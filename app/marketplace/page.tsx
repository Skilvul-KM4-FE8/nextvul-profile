"use client";
import { DockDemo } from "@/components/dock-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProducts } from "@/features/marketplace/products/api/use-get-products";
import TypescriptIcon from "@/public/typescript.png";

import { useCartStore } from "@/store/cart-store"; // Import store
import DropdownCart from "@/components/molecules/dropdownCart";
import Link from "next/link";
import { toast } from "sonner";

export default function Marketplace() {
  const productsQuery = useGetProducts();
  const productsData = productsQuery.data || [];
  const { addToCart } = useCartStore(); // store

  const handleAddToCart = (product: any, index: any) => {
    addToCart({ ...product, id: index, quantity: 1 });
    toast.success(`${product.name} added to cart`);
    // use toasts
  };



  return (
    <>
      <DockDemo />

      <div className="flex flex-col items-center justify-center min-h-screen mt-20 py-10 font-[family-name:var(--font-geist-sans)] p-4">
        <Button onClick={() => toast.success("Hello")}>Add Product</Button>
        <div className="flex w-full px-5 max-w-6xl mt-10">
          <div className="justify-items-start">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <p className="text-gray-500 mb-10">Welcome to Marketplace page</p>
          </div>
          <div className="justify-items-end ml-auto">
            <DropdownCart />
          </div>
        </div>

        {productsQuery.isLoading && <p>Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
          {productsData.map((product, index) => (
            <Card key={index} className="p-4 flex flex-col gap-2">
              {/* Navigasi hanya di gambar dan nama */}
              <Link href={`/marketplace/${product.id}`}>
                <div className="cursor-pointer">
                  <img src={product.imageUrl ? product.imageUrl : TypescriptIcon.src} className="m-auto" alt="photo product" />
                  <h2 className="text-lg font-semibold text-blue-600 hover:underline">{product.name}</h2>
                </div>
              </Link>
              <p>{product.description}</p>
              <p>Rp {new Intl.NumberFormat("id-ID").format(product.price)}</p>
              <Button className="mt-2 w-full" onClick={() => handleAddToCart(product, index)}>
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
