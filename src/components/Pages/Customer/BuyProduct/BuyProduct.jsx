import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";
import { FaShieldAlt, FaMinus, FaPlus } from "react-icons/fa";
import { MdLocalShipping, MdVerifiedUser } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const BuyProduct = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [quantity, setQuantity] = useState(1);

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
    deliveryCapability,
  } = productInfo;

  const deliveryType = deliveryCapability?.toLowerCase();

  const activeDiscount = flashDiscount || discount;
  const finalPrice = activeDiscount
    ? Math.ceil(price - (price * activeDiscount) / 100)
    : price;

  const savedAmount = activeDiscount ? Math.ceil(price - finalPrice) : 0;
  const totalPrice = finalPrice * quantity;

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>
          {productName ? `Checkout | ${productName}` : "Secure Checkout"}
        </title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Your Purchase
          </h1>
          <p className="mt-2 text-slate-500">
            Secure checkout powered by Stripe
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: PRODUCT INFO */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100/80 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/40">
              <div className="flex flex-col sm:flex-row p-6 md:p-8 gap-8">
                {/* 1. Image Canvas Wrapper */}
                <div className="relative group w-full sm:w-64 md:w-72 shrink-0 aspect-4/5 sm:aspect-auto sm:h-96 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle Dark Gradient Overlay for Badges */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Absolute Badges */}
                  {activeDiscount > 0 && (
                    <div className="absolute top-4 left-4 bg-rose-500 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wider shadow-lg shadow-rose-500/30 animate-pulse">
                      {activeDiscount}% SAVED
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 bg-amber-500 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase">
                    {category}
                  </div>
                </div>

                {/* 2. Product Intelligence Panel */}
                <div className="flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3">
                    {/* Stock Notification Badge */}
                    {stockQuantity <= 5 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-100 animate-bounce">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Almost Gone! Only {stockQuantity} Left
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        In Stock & Ready to Ship
                      </span>
                    )}

                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight uppercase">
                      {productName}
                    </h2>

                    <div className="h-0.5 w-12 bg-amber-500 rounded-full"></div>
                  </div>

                  {/* Cleaned up Description block */}
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-4 bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-100 italic">
                    "{productDescriptions}"
                  </p>

                  {/* 3. Sleek Premium Trust Rows */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 transition-all duration-200 group/row">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-white shadow-sm group-hover/row:scale-110 transition-transform ${
                            deliveryType === "yes"
                              ? "text-green-600"
                              : deliveryType === "partner courier only"
                                ? "text-blue-600"
                                : "text-red-500"
                          }`}
                        >
                          <MdLocalShipping className="text-2xl" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-headings uppercase tracking-wide">
                            Shipping Logistics
                          </p>
                          <p className="text-sm text-descriptions">
                            {deliveryType === "yes" &&
                              "Vendor provides direct delivery service."}

                            {deliveryType === "partner courier only" &&
                              "Delivery handled through trusted courier partners."}

                            {deliveryType === "no" &&
                              "Currently no delivery service available."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 transition-all duration-200 group/row">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white shadow-sm text-emerald-600 group-hover/row:scale-110 transition-transform">
                          <FaShieldAlt className="text-xl" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-headings uppercase tracking-wide">
                            Buyer Protection
                          </p>
                          <p className="text-sm text-descriptions">
                            Authorized dealer warranty protection included
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modernized Bottom Trust Accent Strip */}
            <div className="bg-gray-200 text-white rounded-2xl p-4 flex justify-between items-center px-6 shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-base font-bold uppercase tracking-widest text-headings">
                  VibeCart Verified
                </span>
              </div>
              <div className="text-xs text-headings font-semibold flex items-center gap-1.5">
                <MdVerifiedUser className="text-amber-500 text-2xl" /> 100%
                Genuine Guarantee
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY & PAYMENT (Sticky) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                Order Summary
                <span className="text-sm font-normal text-slate-400">
                  #INV-9902
                </span>
              </h3>

              <div className="space-y-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Price ({quantity} item)</span>
                  <span className="font-semibold text-slate-800">
                    ৳{price * quantity}
                  </span>
                </div>

                {activeDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center gap-1 italic">
                      Flash Savings
                    </span>
                    <span className="font-semibold">
                      -৳{savedAmount * quantity}
                    </span>
                  </div>
                )}

                <div className="pt-4 border-t border-dashed border-slate-200">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-headings">
                      Grand Total
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-amber-600">
                        ৳{totalPrice}
                      </p>
                      <p className="text-base uppercase text-slate-400 font-semibold tracking-tighter">
                        VAT Included
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Interaction */}
              <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase">
                  Adjust Quantity
                </label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <FaMinus className="text-xs text-slate-600" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.min(stockQuantity, prev + 1))
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors cursor-pointer"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-400 uppercase">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold text-slate-800">
                      ৳{totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stripe Payment Section */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <span className="text-base font-bold uppercase tracking-widest">
                    Secure Payment
                  </span>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>

                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    productId={id}
                    stockQuantity={stockQuantity}
                    finalPrice={totalPrice}
                    quantity={quantity}
                    productInfo={productInfo}
                  />
                </Elements>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BuyProduct;
