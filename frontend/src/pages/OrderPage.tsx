import { Store } from "@/Store";
import { Alert } from "@/component/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/component/ui/card";
import { toast } from "@/component/ui/use-toast";
import LoadingBox from "@/components/LoadingBox";
import { userOrderDetailQuery } from "@/hooks/orderHooks";
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const { data: order, isLoading, error } = userOrderDetailQuery(orderId!);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    toast({
      title: "Error",
      variant: "destructive",
      description: getError(error as ApiError),
    })
  ) : !order ? (
    toast({
      title: "Error",
      variant: "destructive",
      description: "Order not found",
    })
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-3">
          <Card className="mb-3 mt-3">
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </CardContent>
            <CardFooter>
              {order.isDelivered ? (
                <Alert variant="default">{`Order Delivered with order id: ${order._id}`}</Alert>
              ) : (
                <Alert variant="destructive">{`Order is not delivered`} </Alert>
              )}
            </CardFooter>
          </Card>
          <Card className="mb-3 mt-3">
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <strong>Method:</strong> {order.paymentMethod} <br />
            </CardContent>
            <CardFooter>
              {order.isPaid ? (
                <Alert variant="default">{`Order Delivered with order id: ${order.paidAt}`}</Alert>
              ) : (
                <Alert variant="destructive">{`Payment not received`} </Alert>
              )}
            </CardFooter>
          </Card>
          <Card className="mb-3 mt-3">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              {order.orderItems.map((item) => (
                <div
                  className="grid grid-cols-[2fr,1fr,1fr] items-center gap-3 "
                  key={item._id}
                >
                  <div className="flex justify-start items-center gap-2 text-sm   ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded w-16  h-16 object-cover"
                    />
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-blue-800 font-extralight hover:underline hover:text-blue-500 "
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>{item.quantity}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>${item.price}</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link
                className="text-blue-800 hover:underline hover:text-blue-300 font-light hover:font-semibold"
                to="/cart"
              >
                Modify
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card className="mb-3 mt-3">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-[1fr,1fr] gap-3">
                <div className="flex flex-col"> Items</div>
                <div className="flex flex-col">
                  {" "}
                  ${order.itemPrice.toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-[1fr,1fr] gap-3">
                <div className="flex flex-col"> Shipping</div>
                <div className="flex flex-col">
                  {" "}
                  ${order.shippingPrice.toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-[1fr,1fr] gap-3">
                <div className="flex flex-col"> Tax</div>
                <div className="flex flex-col">
                  {" "}
                  ${order.taxPrice.toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-[1fr,1fr] gap-3">
                <div className="flex flex-col">
                  {" "}
                  <strong>Order Total</strong>
                </div>
                <div className="flex flex-col">
                  {" "}
                  ${order.totalPrice.toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
