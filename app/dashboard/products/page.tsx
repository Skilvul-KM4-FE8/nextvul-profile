"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProductUser } from "@/features/marketplace/products/api/use-get-product-user";
import CreateProductModal from "@/features/marketplace/products/components/CreateProductModal";
import useModalStore from "@/store/useModalStore";
import Image from "next/image";
import Link from "next/link";

export default function ProductList() {
  const { openModal } = useModalStore();
  const { data: products, isLoading, isError } = useGetProductUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div>
      <h1>User Products</h1>
      <Button onClick={openModal}>Create Product</Button>
      <CreateProductModal />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
        {products?.map((product) => (
          <Card key={product.id} className="p-4 flex flex-col gap-2">
            {/* Navigasi hanya di gambar dan nama */}
            <Link href={`/marketplace/${product.id}`}>
              <div className="cursor-pointer">
                <img src={product.imageUrl} className="m-auto" alt="photo product" />
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">{product.name}</h2>
              </div>
            </Link>
            <p>{product.description}</p>
            <p> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)}</p>

            <Button className="mt-2 w-full">Edit Product</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
