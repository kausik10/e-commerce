"use client";
import React from "react";

import { Link } from "react-router-dom";
import { Store } from "@/Store";

import { Button } from "@/component/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";

export default function SignInInfo() {
  const { state, dispatch } = React.useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const [position, setPosition] = React.useState("bottom");
  return (
    <>
      {userInfo ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{userInfo.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">
                {userInfo.name}
              </DropdownMenuRadioItem>

              <DropdownMenuSeparator />
              <Link
                className="ml-8 text-xs font-semibold  hover:text-gray-500 cursor-pointer"
                to="#signout"
                onClick={signOutHandler}
              >
                Sign Out{" "}
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          className="text-blue-400 text-lg font-semibold hover:underline hover:text-blue-300 cursor-pointer"
          to="/signin"
        >
          Sign In
        </Link>
      )}
    </>
  );
}
