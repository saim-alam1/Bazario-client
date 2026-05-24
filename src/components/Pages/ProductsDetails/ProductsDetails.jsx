import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { FaStar, FaBolt, FaShoppingCart, FaHeart } from "react-icons/fa";
import { MdOutlineInventory2, MdLocalShipping } from "react-icons/md";

const ProductsDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: productInfo = {}, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/product-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    addedAt,
    category,
    discount,
    discountDuration,
    flashDiscount,
    price,
    productDescriptions,
    productImage,
    productName,
    stockQuantity,
    stockStatus,
  } = productInfo || {};

  const finalPrice = flashDiscount
    ? (price - (price * flashDiscount) / 100).toFixed(2)
    : discount
      ? (price - (price * discount) / 100).toFixed(2)
      : price;

  const activeDiscount = flashDiscount || discount;

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 px-4 md:px-8 py-10">
      <Helmet>
        <title>
          {productName ? `${productName} | Product Details` : "Product Details"}
        </title>

        <meta
          name="description"
          content={
            productDescriptions?.slice(0, 140) ||
            "View product details and pricing"
          }
        />
      </Helmet>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE */}
        <div className="bg-white rounded-3xl overflow-hidden border shadow-lg">
          <div className="relative overflow-hidden">
            <img
              src={productImage}
              alt={productName}
              className="w-full h-125 object-cover hover:scale-105 transition duration-500"
            />

            {/* CATEGORY */}
            <div className="absolute top-5 left-5 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-sm font-semibold text-gray-800 border">
                {category}
              </span>

              {stockStatus === "paused" && (
                <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-semibold">
                  Paused
                </span>
              )}
            </div>

            {/* DISCOUNT */}
            {activeDiscount && (
              <div className="absolute top-5 right-5">
                <div className="bg-rose-500 text-white px-4 py-2 rounded-full shadow-lg font-bold flex items-center gap-2">
                  <FaBolt />
                  {flashDiscount ? `${flashDiscount}% OFF` : `${discount}% OFF`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* TITLE */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {productName}
            </h1>

            <div className="flex items-center gap-2 mt-3 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-gray-300" />

              <span className="text-gray-500 text-sm ml-2">
                4.8 Product Rating
              </span>
            </div>
          </div>

          {/* PRICE */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-end gap-4 flex-wrap">
              <h2 className="text-4xl font-bold text-green-600">
                ৳{finalPrice}
              </h2>

              {activeDiscount && (
                <p className="text-xl text-gray-400 line-through">৳{price}</p>
              )}
            </div>

            {flashDiscount && (
              <p className="text-rose-500 mt-2 font-medium">
                Flash Sale Active • {discountDuration}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Product Description
            </h3>

            <p className="text-gray-600 leading-relaxed text-[15px]">
              {productDescriptions}
            </p>
          </div>

          {/* PRODUCT INFO */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <MdOutlineInventory2 className="text-2xl text-amber-500" />

                <h4 className="font-semibold text-gray-900">Available Stock</h4>
              </div>

              <p className="text-2xl font-bold text-gray-800">
                {stockQuantity}
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <MdLocalShipping className="text-2xl text-amber-500" />

                <h4 className="font-semibold text-gray-900">Delivery Status</h4>
              </div>

              <p
                className={`text-lg font-bold capitalize ${
                  stockStatus === "paused" ? "text-red-500" : "text-green-600"
                }`}
              >
                {stockStatus || "active"}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex-1 min-w-45 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-xl transition flex items-center justify-center gap-3 cursor-pointer">
              <FaShoppingCart />
              Add To Cart
            </button>

            <button className="flex-1 min-w-45 border border-gray-300 hover:border-amber-500 hover:text-amber-500 py-4 rounded-2xl font-semibold text-lg transition flex items-center justify-center gap-3 cursor-pointer bg-white">
              <FaHeart />
              Wishlist
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-500">Category</span>
              <span className="font-semibold text-gray-900">{category}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-500">Added On</span>
              <span className="font-semibold text-gray-900">
                {new Date(addedAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
