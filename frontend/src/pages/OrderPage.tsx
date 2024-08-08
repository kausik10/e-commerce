
import { Store } from "@/Store";
import { Alert } from "@/component/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/component/ui/card";

import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import { toast, useToast } from "@/component/ui/use-toast";
import LoadingBox from "@/components/LoadingBox";
import { useGetPaypalClientIdQuery, usePayOrderMutation, userOrderDetailQuery } from "@/hooks/orderHooks";
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/component/ui/button";

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const {toast} = useToast();
  const params = useParams();
  const { id: orderId } = params;

  const { data: order, isLoading, error, refetch } = userOrderDetailQuery(orderId!);

  const {mutateAsync: payOrder, isLoading: loadingPayment} = usePayOrderMutation();

  // for development mode only 
  const testPayHandler = async () => {
     await payOrder({orderId: orderId!});
    refetch();
    toast({
      title: "Success",
      description: "Payment Successful",
    });
  }

const [{isPending, isRejected}, paypalDispatch] = usePayPalScriptReducer();

const {data: paypalConfig} = useGetPaypalClientIdQuery();

useEffect(() => {
  if (paypalConfig && paypalConfig.clientId) {
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypalConfig!.clientId,
          currency: 'USD',
        },
      })
      paypalDispatch({
        type: 'setLoadingStatus',
        value: SCRIPT_LOADING_STATE.PENDING,
      })
    }
    loadPaypalScript()
  }
}, [paypalConfig])

const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
  style: { layout: 'vertical' },
  createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              
              value: order!.totalPrice.toString(),
             
            },
          },
        ],
      })
      .then((orderID: string) => {
        return orderID
      })
  },
  onApprove(data, actions) {
    return actions.order!.capture().then(async (details) => {
      try {
        await payOrder({ orderId: orderId!, ...details })
        refetch()
        toast({
          title: "Success",
          description: "Payment Successful",
        });
      } catch (err) {
        toast({
          title: "Failed",
          variant: "destructive",
          description: getError(err as ApiError),
        });
      }
    })
  },
  onError: (err) => {
    toast({
      title: "Failed",
      variant: "destructive",
      description: getError(err as ApiError),
    });
  },
}

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    // toast({
    //   title: "Error",
    //   variant: "destructive",
    //   description: getError(error as ApiError),
    // })
    <Alert variant="destructive">
      Error: {getError(error as ApiError)}
    </Alert>
  ) : !order ? (
    // toast({
    //   title: "Error",
    //   variant: "destructive",
    //   description: "Order not found",
    // })
    <Alert variant="destructive">
      Error: Order not found
    </Alert>
  ) : (
    <>
    <div className="w-full">
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full gap-3">
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
                <Alert variant="default">{`Order Paid at: ${order.paidAt}`}</Alert>
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
        <div className="flex flex-col w-[40%]">
          <Card className="mb-3 mt-3">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between p-2 ">
                <div className="flex flex-col"> Items</div>
                <div className="flex flex-col">
                  {" "}
                  ${order.itemPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div className="flex flex-col"> Shipping</div>
                <div className="flex flex-col">
                  {" "}
                  ${order.shippingPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div className="flex flex-col"> Tax</div>
                <div className="flex flex-col">
                  {" "}
                  ${order.taxPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div className="flex flex-col">
                  {" "}
                  <strong>Order Total</strong>
                </div>
                <div className="flex flex-col">
                  {" "}
                  ${order.totalPrice.toFixed(2)}
                </div>
              </div>
              {!order.isPaid && (
              <div className="grid grid-cols-[1fr, 1fr] gap-3">
                  <div className="flex flex-col">
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <Alert variant="destructive">
                        "Paypal script loading failed"
                      </Alert>
                    ) : (
                      <div>
                      <PayPalButtons
                        {...paypalbuttonTransactionProps}
                      
                      ></PayPalButtons>
                      <Button className="w-full" onClick={testPayHandler}>Test Pay</Button>
                      </div>
                    )}
                  </div>
                {loadingPayment && <LoadingBox />}

              </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
