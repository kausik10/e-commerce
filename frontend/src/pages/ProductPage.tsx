import React from "react";
import { Badge } from "@/component/ui/badge";
import LoadingBox from "@/components/LoadingBox";
import MessageBox from "@/components/MessageBox";
import Rating from "@/components/Rating";
import { useGetProductDetailsBySlugQuery } from "@/hooks/productHooks";
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import { Button } from "@/component/ui/button";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div className="mt-3 flex flex-row sm:justify-start items-start sm:flex-1 md:flex-2 lg:flex-3  gap-5 ">
      <div className="">
        <img className="max-w-[100%]" src={product.image} alt={product.name} />
      </div>
      <div className="">
        <div className="flex flex-wrap flex-col gap-5">
          <div>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1 className="font-bold text-black text-4xl">{product.name}</h1>
          </div>
          <div>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div>Price: ${product.price} </div>
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
            <Button className="hover:bg-secondary hover:text-primary">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
