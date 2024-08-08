import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Homepage from "./pages/Homepage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { StoreProvider } from "./Store.tsx";
import CartPage from "./pages/CartPage.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ShippingAddressPage from "./pages/ShippingAddress.tsx";
import PaymentMethod from "./pages/PaymentMethod.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PlaceOrder from "./pages/PlaceOrder.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx";

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "product/:slug",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "shipping",
            element: <ShippingAddressPage />,
          },
          {
            path: "payment",
            element: <PaymentMethod />,
          },
          {
            path: "placeorder",
            element: <PlaceOrder />,
          },
          {
            path: "/order/:id",
            element: <OrderPage />,
          },
          {
            path: "/orderhistory",
            element: <OrderHistoryPage />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <StoreProvider>
        <PayPalScriptProvider options={{ "clientId": "sb" }} deferLoading={true}>

        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
          </PayPalScriptProvider>
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
