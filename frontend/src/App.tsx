import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-full flex flex-col">
        <Navbar />

        <main className="my-2 mx-auto w-4/5 flex flex-1 justify-center items-start">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
