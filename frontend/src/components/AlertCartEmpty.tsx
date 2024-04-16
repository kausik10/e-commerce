import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/component/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const AlertCartEmpty = () => {
  const navigate = useNavigate();
  return (
    <AlertDialog>
      <AlertDialogTrigger>Cart Empty</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nothing in Cart.</AlertDialogTitle>
          <AlertDialogDescription>
            Please visit the Products page and Add items to cart.{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate("/")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AlertCartEmpty;
