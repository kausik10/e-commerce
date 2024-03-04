import apiClient from "@/apiClient";
import { Product } from "../type/Product";
import { useQuery } from "@tanstack/react-query";
export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Product[]>("api/products");
        console.log("API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });
export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Product>(
          `api/products/slug/${slug}`,
        );
        return response.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });
