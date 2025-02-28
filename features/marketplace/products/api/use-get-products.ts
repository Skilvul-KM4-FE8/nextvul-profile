import { useQuery } from "@tanstack/react-query";

import axios from "axios";

// {
//  "id": "cm7cve1l50001jf2ctd16bdbm",
//  "name": "name",
//  "description": "description",
//  "price": 120000,
//  "createdAt": "2025-02-20T04:56:43.912Z",
//  "updatedAt": "2025-02-20T04:56:43.912Z",
//  "sellerId": "cm6tkxjy500002hjk73dv3pm1",
//  "categoryId": "1"
//  },

type ResponseType = {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  categoryId: string;
};

export const useGetProducts = () => {
  const queryClient = useQuery<ResponseType[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/product");

      if (!response) {
        throw new Error("An error occurred while fetching the data");
      }
      const data = response.data;
      return data;
    },
  });
  return queryClient;
};
