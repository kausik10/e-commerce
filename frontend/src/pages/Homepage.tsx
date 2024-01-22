import React, { useEffect, useReducer } from "react";
// impo Link } from "react-router-dom";
import { Product } from "../type/Product";
import ProductItem from "../components/ProductItem";
import { getError } from "../utils";
import { ApiError } from "../type/ApiErros";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const Homepage = () => {
  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await fetch("http://localhost:4000/api/products");
        // const response = await fetch("/foo");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: result });
        } else {
          console.error("Unexpected response content type:", contentType);
        }
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error as ApiError) });
        console.error("This is the error.");
      }
    };
    fetchProducts();
  }, []);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <ul className="flex flex-wrap sm:justify-start md:justify-center items-start sm:flex-1 md:flex-2 lg:flex-3  gap-5 ">
      {products.map((product) => (
        <li
          key={product.slug}
          className="flex flex-col justify-between items-start"
        >
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
};

export default Homepage;
