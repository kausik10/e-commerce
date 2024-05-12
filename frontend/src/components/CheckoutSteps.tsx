type CheckoutStepsProps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};
export default function CheckoutSteps(props: CheckoutStepsProps) {
  return (
    <>
      <div className="flex flex-row justify-between items-center mx-auto mt-8 mb-4">
        <div
          className={`flex-1 mb-2 md:mb-0 text-left md:text-center ${props.step1 ? " text-blue-500 font-semibold" : ""}`}
        >
          Sign-In
        </div>

        <div
          className={`flex-1 mb-2 md:mb-0 text-left md:text-center ${props.step2 ? " text-blue-500 font-semibold" : ""}`}
        >
          Shipping
        </div>

        <div
          className={`flex-1 mb-2 md:mb-0 text-left md:text-center ${props.step3 ? " text-blue-500 font-semibold" : ""}`}
        >
          Payment
        </div>

        <div
          className={`flex-1 mb-2 md:mb-0 text-left md:text-center ${props.step4 ? " text-blue-500 font-semibold" : ""}`}
        >
          Place Order
        </div>
      </div>
      {/* Progress bar */}
      <div className="flex-1 h-2 bg-gray-200 w-full rounded-full mt-2 md:mt-1 mb-8 md:mb-16">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{
            width: `${(props.step1 ? 25 : 0) + (props.step2 ? 25 : 0) + (props.step3 ? 25 : 0) + (props.step4 ? 25 : 0)}%`,
          }}
        ></div>
      </div>
    </>
  );
}
