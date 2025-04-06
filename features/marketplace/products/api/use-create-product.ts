import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ProductCreateInput = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  sellerId: string;
  imageUrl: string;
};

type ResponseType = {
  status: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    sellerId: string;
    categoryId: string;
  };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductCreateInput): Promise<ResponseType> => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("categoryId", data.categoryId);
      formData.append("sellerId", data.sellerId);
      formData.append("imageUrl", data.imageUrl);
      const response = await axios.post("/api/product", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
