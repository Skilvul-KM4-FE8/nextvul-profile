"use client";

import { useGetProduct } from "@/features/marketplace/products/api/use-get-details-product";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { slug } = params as { slug: string };

  // get from store
  const productsQuery = useGetProduct(slug);
  const productsData = productsQuery.data || [];

  console.log(productsData);
  return <div>My Post: {slug}</div>;
}
