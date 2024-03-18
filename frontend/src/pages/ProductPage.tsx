import React, { useContext } from "react";
import { Badge } from "@/component/ui/badge";
import LoadingBox from "@/components/LoadingBox";

import Rating from "@/components/Rating";
import { useGetProductDetailsBySlugQuery } from "@/hooks/productHooks";
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import { Button } from "@/component/ui/button";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "@/Store";
import { convertProductToCartItem } from "../utils";
import { toast } from "@/component/ui/use-toast";
import { Alert } from "@/component/ui/alert";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast({
        variant: "destructive",
        title: "Out of Stock",
        description: "The product is out of stock",
      });
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast({
      variant: "success",
      title: "Added to Cart",
      description: "The product has been added to the cart",
    });

    navigate(`/cart`);
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <Alert variant="destructive">{getError(error as ApiError)}</Alert>
  ) : !product ? (
    <Alert variant="destructive">Product Not Found</Alert>
  ) : (
    <div className="mt-3 flex flex-row sm:justify-start items-start sm:flex-1 md:flex-2 lg:flex-3  gap-5 ">
      <div>
        <img className="max-w-[100%]" src={product.image} alt={product.name} />
      </div>
      <div>
        <div className="flex flex-wrap flex-col gap-5">
          <div>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1 className="font-bold  text-4xl">{product.name}</h1>
          </div>
          <div>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div>
            <em> Description: </em>
            <p className="mt-2">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[20%] justify-between gap-3 items-start">
        <div>
          <p className="mt-2">Price: ${product.price}</p>
        </div>
        <div>
          {product.countInStock > 0 ? (
            <Badge variant="outline">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
        <div>
          {product.countInStock > 0 && (
            <Button
              onClick={addToCartHandler}
              className="hover:bg-secondary hover:text-primary"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
