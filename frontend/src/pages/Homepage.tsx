import ProductItem from "../components/ProductItem";
import LoadingBox from "../components/LoadingBox";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "@/hooks/productHooks";
import { getError } from "@/utils";
import { ApiError } from "@/type/ApiErros";
import { Alert, AlertDescription, AlertTitle } from "@/component/ui/alert";
import { CloudOff } from "lucide-react";

const Homepage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <Alert>
      <CloudOff className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{getError(error as ApiError)}</AlertDescription>
    </Alert>
  ) : (
    <ul className="flex flex-wrap sm:justify-start md:justify-center items-start sm:flex-1 md:flex-2 lg:flex-3  gap-5 ">
      <Helmet>
        <title>KE-Commerce</title>
      </Helmet>
      {products!.map((product) => (
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
