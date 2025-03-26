"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProductUser } from "@/features/marketplace/products/api/use-get-product-user";
import Image from "next/image";
import Link from "next/link";

export default function ProductList() {
  const { data: products, isLoading, isError } = useGetProductUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products</p>;

  // {productsQuery.isLoading && <p>Loading...</p>}

  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
  //           {productsData.map((product, index) => (
  //             <Card key={index} className="p-4 flex flex-col gap-2">
  //               {/* Navigasi hanya di gambar dan nama */}
  //               <Link href={`/marketplace/${product.id}`}>
  //                 <div className="cursor-pointer">
  //                   <img src={product.imageUrl ? product.imageUrl : TypescriptIcon.src} className="m-auto" alt="photo product" />
  //                   <h2 className="text-lg font-semibold text-blue-600 hover:underline">{product.name}</h2>
  //                 </div>
  //               </Link>
  //               <p>{product.description}</p>
  //               <p>Rp {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)}</p>

  //               <Button className="mt-2 w-full" onClick={() => handleAddToCart(product, index)}>
  //                 Add to Cart
  //               </Button>
  //             </Card>
  //           ))}

  return (
    <div>
      <h1>User Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
        {products?.map((product) => (
          <Card key={product.id} className="p-4 flex flex-col gap-2">
            {/* Navigasi hanya di gambar dan nama */}
            <Link href={`/marketplace/${product.id}`}>
              <div className="cursor-pointer">
                <img src={product.imageUrl ? product.imageUrl : "/fallback-image.png"} className="m-auto" alt="photo product" />
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">{product.name}</h2>
              </div>
            </Link>
            <p>{product.description}</p>
            <p>Rp {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)}</p>

            {/* <Button className="mt-2 w-full" onClick={() => handleAddToCart(product, index)}>
              Add to Cart
            </Button> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
