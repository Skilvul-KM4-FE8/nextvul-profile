import axios from "axios";

export const createProduct = async (productData: any) => {
  const response = await axios.post("/api/products", productData);
  return response.data;
};
