import React from "react";
import { sampleProducts } from "./data";

function App() {
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold py-4"> KE-commerce</h1>
      </header>
      <main>
        <ul className="flex flex-col justify-center items-center gap-5">
          {sampleProducts.map((product, index) => (
            <li key={index}>
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[400px] w-full"
              />
              <h2 className="text-2xl underline">{product.name}</h2>
              <p className="text-xl">${product.price}</p>
            </li>
          ))}
        </ul>
      </main>
      <footer>KE-commerce. All rights reserved</footer>
    </>
  );
}

export default App;
