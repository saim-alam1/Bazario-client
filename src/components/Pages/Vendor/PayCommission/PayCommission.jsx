import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CommissionForm from "./CommissionForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const PayCommission = () => {
  return (
    <Elements stripe={stripePromise}>
      <CommissionForm />
    </Elements>
  );
};

export default PayCommission;
