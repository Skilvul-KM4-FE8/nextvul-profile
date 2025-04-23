"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProductUser } from "@/features/marketplace/products/api/use-get-product-user";
import CreateProductModal from "@/features/marketplace/products/components/CreateProductModal";
import useModalStore from "@/store/useModalStore";

import Link from "next/link";

export default function ProductList() {
  const { openModal } = useModalStore();
  const { data: products, isLoading, isError } = useGetProductUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="ml-10">
      <div>
        <h1 className="text-2xl font-bold mt-5 ">Product List</h1>
        <p className="text-gray-500 mb-3 ">Welcome to your product list page</p>
      </div>
      <Button onClick={openModal}>Create Product</Button>
      <CreateProductModal />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
        {products?.map((product) => (
          <Card key={product.id} className="p-4 flex flex-col gap-2">
            {/* Navigasi hanya di gambar dan nama */}
            <Link href={`/marketplace/${product.id}`}>
              <div className="cursor-pointer">
                <img src={product.imageUrl} className="m-auto" alt="photo product" />
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">{product.name}</h2>
              </div>
            </Link>
            <div>{product.description}</div>
            <div> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)}</div>

            <Button className="mt-2 w-full">Edit Product</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
