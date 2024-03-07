import { ApiError } from "./type/ApiErros";
import { Product } from "./type/Product";
import { CartItem } from "./type/Cart";
export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    slug: product.slug,
    quantity: 1,
  };
  return cartItem;
};
