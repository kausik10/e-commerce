import { toast } from "@/component/ui/use-toast";
import { CartItem } from "@/type/Cart";
import { Store } from "@/Store";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/component/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "@/component/ui/button";
import { Card } from "@/component/ui/card";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast({
        variant: "destructive",
        title: "Out of Stock",
        description: "The product is out of stock",
      });
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };
  return (
    <div className="flex flex-col lg:w-full ">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className=" mb-2 font-semibold text-4xl">Shopping Cart</h1>
      <div className="flex flex-row gap-3   justify-start mt-3 items-start">
        <div className="flex flex-col gap-3 w-full ">
          {cartItems.length === 0 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cart Empty</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Nothing in Cart</AlertDialogTitle>
                  <AlertDialogDescription>
                    There is nothing ini your cart. Please visit the Products
                    page and Add items to cart. Visit Products page ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => navigate("/")}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <div className="flex flex-col  gap-5 items-start justify-between ">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="border p-2  border-x-current flex flex-row justify-center gap-4 items-center rounded-lg w-full"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16  h-16 object-cover"
                    />
                    <div className="flex flex-col ">
                      <Link to={`/product/${item.name}`} className="hover:blue">
                        {item.name}
                      </Link>
                      <span className="text-xs text-gray-500">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <Button
                      value={item.quantity}
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                      variant="outline"
                      disabled={item.quantity === 1}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </Button>{" "}
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}
                    >
                      <i className="fsa fa-plus-circle"></i>
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="border-none"
                      variant="outline"
                      onClick={() => removeItemHandler(item)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <Card className="m-1 p-2 w-[40%] ">
            <div className="flex flex-col gap-3">
              <div className="flex justify-end">
                <h2 className="text-2xl font-semibold">
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items) : $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </h2>
              </div>
              <div>
                <Button
                  className="w-full hover:bg-secondary hover:text-primary"
                  onClick={checkOutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
export default CartPage;
