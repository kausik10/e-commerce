import apiClient from "@/apiClient";
import { ShippingAddress } from "@/type/Cart";
import { Order } from "@/type/Order";
import { Product } from "@/type/Product";
import { useMutation, useQuery } from "@tanstack/react-query";

type OrderType = {
  orderItems: Product[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export const userOrderDetailQuery = (id: string) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: async () => (await apiClient.get<Order>(`api/order/${id}`)).data,
  });

export const userCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: OrderType) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/order`,
          order,
        )
      ).data,
  });
