"use client";
import { DockDemo } from "@/components/dock-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProducts } from "@/features/marketplace/products/api/use-get-products";
import Image from "next/image";
import TypescriptIcon from "@/public/typescript.png";

export default function Martketplace() {
  const productsQuery = useGetProducts();
  const productsData = productsQuery.data || [];
  console.log(productsData);

  return (
    <>
      <DockDemo />
      <div className="flex flex-col items-center justify-center min-h-screen mt-20 py-10 font-[family-name:var(--font-geist-sans)] p-4">
        <h1 className="text-2xl font-bold ">Marketplace</h1>
        <p className="text-gray-500 mb-10">Welcome to Marketplace page</p>

        {productsQuery.isLoading && <p>Loading...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
          {productsData.map((product, index) => (
            <Card key={index} className="p-4">
              <Image src={TypescriptIcon} width={500} height={500} alt="photo product" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p>Rp {new Intl.NumberFormat("id-ID").format(product.price)}</p>
              <Button className="mt-2 w-full">Buy now</Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
