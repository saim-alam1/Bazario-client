import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotifications from "../../../../Hooks/useNotifications";

const CheckoutForm = ({
  productId,
  stockQuantity,
  finalPrice,
  quantity,
  productInfo,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { reset } = useForm();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const { productName, productImage, vendorsEmail } = productInfo;

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
      toast.error(error.message);
    } else {
      setError("");
      // console.log("payment method", paymentMethod);

      // Create Payment Intent
      const res = await axiosSecure.post("/create-payment-intent", {
        productId,
        quantity,
      });

      const clientSecret = res.data.clientSecret;
      const cardType = paymentMethod.card.brand;
      const cardLast4Digit = paymentMethod.card.last4;

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
        toast.success("Payment Successful!");

        // save payment info to DB
        const orderData = {
          productId,
          productName,
          productImage,
          vendorEmail: vendorsEmail,
          buyerEmail: user?.email,
          quantity,
          cardType,
          cardLast4Digit,
          transactionId: paymentIntent.id,
        };

        postOrders(orderData);

        await queryClient.invalidateQueries({
          queryKey: ["buy-product", productId],
        });

        await queryClient.invalidateQueries({
          queryKey: ["product-details", productId],
        });

        // Posting Data In Notification Collection
        addNotification({
          receiverEmail: user?.email,
          message: `${productName} purchased successfully`,
        });

        reset();

        const card = elements.getElement(CardElement);
        if (card) card.clear();
      }
    }
  };

  const { mutate: postOrders, isPending } = useMutation({
    mutationFn: async (ordersInfo) => {
      const res = await await axiosSecure.post("/create-order", ordersInfo);
      res.data;
    },
  });

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
        {isPending ? "Paying..." : `Pay ৳${finalPrice}`}
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
