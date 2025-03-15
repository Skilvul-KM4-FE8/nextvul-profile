import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ProductCreateInput = {
  name: string;
  description: string;
  price: number;
  sellerId: string;
  categoryId: string;
};

type ResponseType = {
  name: string;
  description: string;
  price: number;
  sellerId: string;
  categoryId: string;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: ProductCreateInput): Promise<ResponseType> => {
      const response = await axios.post("/api/product", json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
  return mutation;
};
