import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";
import { FaShieldAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const BuyProduct = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: productInfo = {}, isLoading } = useQuery({
    queryKey: ["buy-product", id],
    queryFn: async () => {
      const res = await axiosInstance(`/product-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    productName,
    productImage,
    productDescriptions,
    price,
    discount,
    flashDiscount,
    category,
    stockQuantity,
  } = productInfo;

  const activeDiscount = flashDiscount || discount;

  const finalPrice = activeDiscount
    ? Math.ceil(price - (price * activeDiscount) / 100)
    : price;

  const savedAmount = activeDiscount ? Math.ceil(price - finalPrice) : 0;

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <Helmet>
        <title>
          {productName ? `Checkout - ${productName}` : "Checkout | VibeCart"}
        </title>

        <meta
          name="description"
          content="Secure checkout and payment for your selected product."
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Checkout Summary
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex items-center bg-white rounded-3xl border p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={productImage}
              alt={productName}
              className="w-full md:w-64 h-64 object-cover rounded-2xl border"
            />

            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                {category}
              </span>

              <h2 className="text-2xl font-bold mt-3">{productName}</h2>

              <p className="text-gray-600 text-base mt-3 line-clamp-4">
                {productDescriptions}
              </p>

              <div className="mt-5 space-y-2 text-lg">
                <p>
                  <span className="font-semibold">Available Stock:</span>{" "}
                  {stockQuantity}
                </p>

                <div className="flex items-center gap-2 text-green-600 text-lg">
                  <MdLocalShipping />
                  Fast Delivery Available
                </div>

                <div className="flex items-center gap-2 text-blue-600 text-lg">
                  <FaShieldAlt />
                  Secure Payment Protection
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-3xl border p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Original Price</span>

              <span>৳{price}</span>
            </div>

            {activeDiscount > 0 && (
              <div className="flex justify-between text-green-600 text-lg font-semibold">
                <span>Discount</span>

                <span>-৳{savedAmount}</span>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>

              <span className="text-green-600">৳{finalPrice}</span>
            </div>
          </div>

          {/* STRIPE PAYMENT AREA */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4 text-lg">Make Payment</h3>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                stockQuantity={stockQuantity}
                finalPrice={finalPrice}
              />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyProduct;
