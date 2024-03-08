import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { StoreProvider } from "./Store";
import { Toaster } from "./component/ui/toaster";
function App() {
  return (
    <StoreProvider>
      <div className="w-full flex flex-col">
        <Navbar />

        <main className="my-2 mx-auto w-4/5 flex flex-1 justify-center items-start">
          <Outlet />
        </main>

        <Toaster />
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;
