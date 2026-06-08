import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const CheckoutForm = ({ productId, stockQuantity, finalPrice, quantity }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      // Create Payment Intent
      const res = await axiosSecure.post("/create-payment-intent", {
        productId,
        quantity,
      });

      const clientSecret = res.data.clientSecret;

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
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment Successful!");
        console.log("Transaction ID:", paymentIntent.id);

        // Later we'll save payment info to DB here
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-gray-300 rounded-lg p-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button
        disabled={stockQuantity <= 0 || !stripe}
        className="btn border-none shadow-none bg-amber-500 hover:bg-amber-600 text-white w-full mt-6 text-lg"
      >
        Pay ৳{finalPrice}
      </button>

      {error && (
        <p className="text-base text-red-500 font-semibold text-center mt-3">
          {error}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
