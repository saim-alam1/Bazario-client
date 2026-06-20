import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { toast } from "react-toastify";

const CommissionForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: commission = {}, isLoading } = useQuery({
    queryKey: ["commission-amount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`commission-amount/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const dueAmount = commission?.platformFeeDue;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);

    if (!card) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
    } else {
      setError("");
      setProcessing(false);
      // console.log("payment method", paymentMethod);

      // Create Payment Intent
      const res = await axiosSecure.post("/create-commission-payment-intent", {
        email: user?.email,
        amountToPay: dueAmount,
      });

      const clientSecret = res.data.clientSecret;
      const cardType = paymentMethod.card.brand;

      // Confirm Payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: "Customer",
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        toast.error(error);
        setProcessing(false);
        return;
      }

      console.log(paymentIntent);

      if (paymentIntent.status === "succeeded") {
        toast.success("Platform due cleared successfully!");
      }
    }
  };

  const iframeStyles = {
    base: {
      color: "#1f2937",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  };

  return (
    <div className="w-full my-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-headings">Secure Payment</h2>
        <p className="text-sm text-gray-500 mt-1">
          Complete your commission payment safely.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-3.5 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition duration-150 ease-in-out">
            <CardElement options={{ style: iframeStyles }} />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn w-full border-none bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ${dueAmount} BDT`
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>SSL Encrypted & Secured by Stripe</span>
      </div>
    </div>
  );
};

export default CommissionForm;
