import React from "react";
import { sampleProducts } from "../data";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <ul className="flex flex-wrap  justify-center items-center sm:flex-1 md:flex-2 lg:flex-3  gap-5 ">
      {sampleProducts.map((product) => (
        <li
          key={product.slug}
          className="flex flex-col justify-between items-center"
        >
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="max-w-[320px] w-full h-[320px] object-contain"
            />
            <div>
              <h2 className="text-xl lg:text-2xl underline">{product.name}</h2>
              <p className="text-xl">${product.price}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Homepage;
