import { Button } from "@/component/ui/button";
import CheckoutSteps from "@/components/CheckoutSteps";
import { Store } from "@/Store";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Esewa",
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });

    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <div className="w-full">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="m-auto w-3/5 lg:w-2/5">
          <form
            className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="mb-4">
              <div>
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="Paypal"
                  checked={paymentMethodName === "Paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal" className="ml-2">
                  Paypal
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="esewa"
                  name="paymentMethod"
                  value="Esewa"
                  checked={paymentMethodName === "Esewa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="esewa" className="ml-2">
                  Esewa
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
