import React from "react";
import "./index.css";
import { sampleProducts } from "./data";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <Navbar />
        <main className="my-2 mx-auto w-4/5 flex flex-1 justify-center items-start">
          <ul className="flex flex-wrap  justify-center items-center sm:flex-1 md:flex-2 lg:flex-3  gap-5 ">
            {sampleProducts.map((product, index) => (
              <li
                key={index}
                className="flex flex-col justify-between items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-[320px] w-full h-[320px] object-contain"
                />
                <div>
                  <h2 className="text-xl lg:text-2xl underline">
                    {product.name}
                  </h2>
                  <p className="text-xl">${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
