import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Product } from "../type/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div>
      <Card className="w-[320px]">
        <CardHeader>
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-[320px] aspect-w-1 aspect-h-1 object-cover"
            />
          </Link>
          <Link to={`/product/${product.slug}`}>
            <CardTitle>{product.name}</CardTitle>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </CardHeader>

        <CardContent>
          <CardDescription>${product.price}</CardDescription>
          {/*   <p>Card Content</p> */}
        </CardContent>
        <CardFooter>
          {product.countInStock === 0 ? (
            <Button variant="secondary" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button className="hover:bg-secondary hover:text-primary">
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductItem;
