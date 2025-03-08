// features/marketplace/products/api/use-get-product.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export const useGetProduct = (id: string) => {
  return useQuery<ProductResponse>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`/api/product/${id}`);

      if (!response) {
        throw new Error("An error occurred while fetching the product");
      }
      return response.data;
    },
    enabled: !!id, // Hanya fetch jika id tersedia
  });
};
