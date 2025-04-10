
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

// Tipe responsenya biar clean
type ResponseType = {
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

// Custom hook untuk fetch product user
export const useGetProductUser = () => {
  const { userId } = useAuth(); // Clerk Auth (di client)

  const { data, isLoading, isError } = useQuery<ResponseType[]>({
    queryKey: ["products", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not authenticated");
      const response = await axios.get(`/api/product/${userId}`);
      return response.data;
    },
    enabled: !!userId, // Fetch hanya kalau userId ada
  });

  return { data, isLoading, isError };
};
