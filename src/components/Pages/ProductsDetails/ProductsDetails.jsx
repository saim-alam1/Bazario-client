import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import {
  FaStar,
  FaBolt,
  FaShoppingCart,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineInventory2, MdLocalShipping } from "react-icons/md";
import useUserRole from "../../../Hooks/useUserRole";
import { useForm } from "react-hook-form";
import useNotifications from "../../../Hooks/useNotifications";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useLocalStorage from "../../../Hooks/useLocalStorage";

const ProductsDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { userRole } = useUserRole();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const { addItem: addCartItem } = useLocalStorage("cart-items");

  const { addItem: addWishlistItem } = useLocalStorage("wishlist-items");

  const { data: productInfo = {}, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/product-details/${id}`);
      return res.data;
    },
  });

  const handleProductUpdate = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ""),
    );

    updateProduct(filteredData);
  };

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: async (productInfo) => {
      const res = await axiosSecure.patch(`update-product/${id}`, productInfo);
      return res.data;
    },
    onSuccess: (data) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: "Profile updated successfully!",
      });

      toast.success(data?.message || "Product updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["product-details", id],
      });
      reset();
    },
    onError: (error) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  const {
    _id,
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

  const handleAddToCart = (id) => {
    const added = addCartItem(id);

    if (added) {
      toast.success("Product added to cart");
      queryClient.invalidateQueries({
        queryKey: ["cart-products"],
      });
    } else {
      toast.warning("Product already exists in cart");
    }
  };

  const handleAddToWishlist = (id) => {
    const added = addWishlistItem(id);

    if (added) {
      toast.success("Product added to wishlist");
      queryClient.invalidateQueries({
        queryKey: ["wishlist-products"],
      });
    } else {
      toast.warning("Product already exists in wishlist");
    }
  };

  const finalPrice = flashDiscount
    ? Math.ceil(price - (price * flashDiscount) / 100)
    : discount
      ? Math.ceil(price - (price * discount) / 100)
      : price;

  const activeDiscount = flashDiscount || discount;

  if (isLoading) return <Loading />;

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
            {userRole !== "vendor" ? (
              <>
                {/* CUSTOMER ACTIONS */}
                <button
                  onClick={() => handleAddToCart(_id)}
                  className="flex-1 min-w-45 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-xl transition flex items-center justify-center gap-3 cursor-pointer"
                >
                  Add To Cart
                  <FaShoppingCart />
                </button>

                <button
                  onClick={() => handleAddToWishlist(_id)}
                  className="flex-1 min-w-45 border border-gray-300 hover:border-amber-500 hover:text-amber-500 py-4 rounded-2xl font-semibold text-lg transition flex items-center justify-center gap-3 bg-white cursor-pointer"
                >
                  Wishlist
                  <FaHeart className="text-red-500" />
                </button>

                <Link
                  to={`/buy-product/${_id}`}
                  className="flex-1 min-w-45 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-xl transition flex items-center justify-center gap-3 cursor-pointer"
                >
                  Buy
                  <FaArrowRight />
                </Link>
              </>
            ) : (
              /* VENDOR ACTION */
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-xl transition flex items-center justify-center gap-3 cursor-pointer"
              >
                Update Product
              </button>
            )}
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

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle backdrop-blur-xs"
      >
        <div className="modal-box mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-50 max-w-11/12">
          {/* Header */}
          <h3 className="font-bold text-2xl md:text-3xl text-gray-800 text-center mb-8 tracking-tight">
            Add your business information
          </h3>

          {/* Form Layout Fixed */}
          <form
            onSubmit={handleSubmit(handleProductUpdate)}
            className="space-y-6"
          >
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Name */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  {...register("productName")}
                  type="text"
                  placeholder="Product Name"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Category
                </label>
                <input
                  {...register("category")}
                  type="text"
                  placeholder="Category"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price")}
                  placeholder="Business Address"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Discount (optional) */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Discount (optional)
                </label>
                <input
                  type="number"
                  {...register("discount")}
                  placeholder="Discount"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Stock Quantity */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  {...register("stockQuantity")}
                  placeholder="Stock Quantity"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Product Image */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Product Image
                </label>
                <input
                  type="url"
                  {...register("productImage")}
                  placeholder="Product Image"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Product Descriptions */}
              <div className="flex flex-col col-span-1 md:col-span-2">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Product Descriptions
                </label>
                <textarea
                  {...register("productDescriptions")}
                  placeholder="Product Descriptions..."
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
                />
              </div>
            </div>

            {/* Action Buttons Container */}
            <div className="modal-action pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2.5 rounded-xl text-white font-medium text-sm bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-amber-600/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isPending ? "Updating..." : "Update Details"}
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default ProductsDetails;
