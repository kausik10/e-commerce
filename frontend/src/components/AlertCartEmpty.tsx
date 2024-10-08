import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/component/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const AlertCartEmpty = () => {
  const navigate = useNavigate();
  return (
    <AlertDialog defaultOpen>
      {/* <AlertDialogTrigger>Cart Empty</AlertDialogTrigger> */}
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
