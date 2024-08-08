import { Store } from "@/Store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { toast } from "@/component/ui/use-toast";
import CheckoutSteps from "@/components/CheckoutSteps";
import { userCreateOrderMutation } from "@/hooks/orderHooks";
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/component/ui/button";
import LoadingBox from "@/components/LoadingBox";

export default function PlaceOrder() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);

  const { cart, userInfo } = state;

  const round2 = (num: number) => Number(num.toFixed(2));

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0),
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isLoading } = userCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast({
        title: "Error. Error",
        description: getError(err as ApiError),
      });
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart]);

  return (
    <>
      <Helmet>
        <title>PlaceOrder</title>
      </Helmet>
      <div className="w-full">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="flex flex-col ">
          <h1 className="font-bold text-black text-2xl">Preview Order</h1>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3 w-full">
              <Card className="mb-3 mt-3">
                <CardHeader>
                  <CardTitle>Shipping</CardTitle>
                </CardHeader>
                <CardContent>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </CardContent>
                <CardFooter>
                  <Link
                    className="text-blue-800 hover:underline hover:text-blue-300 font-light hover:font-semibold"
                    to="/shipping"
                  >
                    Modify
                  </Link>
                </CardFooter>
              </Card>

              <Card className="mb-3 mt-3">
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <strong>Method:</strong> {cart.paymentMethod} <br />
                </CardContent>
                <CardFooter>
                  <Link
                    className="text-blue-800 hover:underline hover:text-blue-300 font-light hover:font-semibold"
                    to="/payment"
                  >
                    Modify
                  </Link>
                </CardFooter>
              </Card>

              <Card className="mb-3 mt-3">
                <CardHeader>
                  <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.cartItems.map((item) => (
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
                  <div className="flex flex-row gap-2 mb-1 justify-between">
                    <div className="flex flex-col">
                      <span>Items:</span>
                    </div>
                    <div className="flex flex-col">
                      <span>${cart.itemsPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row mb-1 justify-between">
                    <div className="flex flex-col">
                      <span>Shipping Price:</span>
                    </div>
                    <div className="flex flex-col">
                      <span>${cart.shippingPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row mb-1 justify-between">
                    <div className="flex flex-col">
                      <span>Tax Price:</span>
                    </div>
                    <div className="flex flex-col">
                      <span>${cart.taxPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row mb-1 justify-between">
                    <div className="flex flex-col">
                      <span>Total Price:</span>
                    </div>
                    <div className="flex flex-col">
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="grid">
                    <Button
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0 || isLoading}
                      className="hover:bg-secondary mt-2 hover:text-primary"
                    >
                      Place Order{" "}
                    </Button>
                    {isLoading && <LoadingBox />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
