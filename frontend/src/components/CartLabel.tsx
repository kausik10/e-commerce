// eslint-disable-next-line no-unused-vars
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { FaShoppingCart } from "react-icons/fa";
const CartLabel = () => {
  const {
    state: { cart },
  } = useContext(Store);
  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center text-lg text-blue-400 font-semibold hover:underline cursor-pointer"
    >
      <FaShoppingCart className="mr-1" /> {/* Cart icon */}
      {cart.cartItems.length > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
        </span>
      )}
    </Link>
  );
};

export default CartLabel;
