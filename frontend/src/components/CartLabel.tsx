import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

import { ShoppingCart } from "lucide-react";
const CartLabel = () => {
  const {
    state: { cart },
  } = useContext(Store);
  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center text-lg text-blue-400 font-semibold hover:underline cursor-pointer"
    >
      <ShoppingCart className="" /> {/* Cart icon */}
      {/* {cart.cartItems.length > 0 && ( */}
        <span className="absolute top-0 right-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
        </span>
      {/* )} */}
    </Link>
  );
};

export default CartLabel;
