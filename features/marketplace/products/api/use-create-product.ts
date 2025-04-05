import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ProductCreateInput = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  sellerId: string;
  image: File;
};

export const useCreateProduct = (p0: { name: string; description: string; price: number; categoryId: string; sellerId: string; Image: any; }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ProductCreateInput) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("categoryId", data.categoryId);
      formData.append("sellerId", data.sellerId);
      formData.append("Image", data.image);

      const response = await axios.post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
