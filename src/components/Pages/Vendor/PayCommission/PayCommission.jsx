import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CommissionForm from "./CommissionForm";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PayCommission = () => {
  return (
    <Elements stripe={stripePromise}>
      <CommissionForm />
    </Elements>
  );
};

export default PayCommission;
