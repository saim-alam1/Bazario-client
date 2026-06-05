import LottiePlayer from "lottie-react";
import { formatDistanceToNow } from "date-fns";
import noData from "../../../../assets/noData.json";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useNotifications from "../../../../Hooks/useNotifications";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";

const DiscountsTable = ({ products }) => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const handleEditDiscount = (data) => {
    editDiscountData.mutate({
      id: selectedProduct._id,
      ...data,
    });
  };

  const editDiscountData = useMutation({
    mutationFn: async ({ id, discount, flashDiscount, duration }) => {
      const res = await axiosSecure.patch(`/flash-discount/${id}`, {
        discount: Number(discount),
        flashDiscount: Number(flashDiscount),
        duration,
      });

      return res.data;
    },

    onSuccess: (res) => {
      document.getElementById("my_modal_5")?.close();

      addNotification({
        receiverEmail: user?.email,
        message: `${selectedProduct.productName} discount value updated`,
      });

      queryClient.invalidateQueries({
        queryKey: ["my-products", user?.email],
      });

      toast.success(res?.message || "Discounts data updated");

      reset();
      setSelectedProduct(null);
    },

    onError: (error) => {
      document.getElementById("my_modal_5")?.close();

      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-72">
          <Lottie animationData={noData} loop />
        </div>

        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-100 text-headings text-[16px] w-full">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Discount</th>
            <th>Flash Discount</th>
            <th>Final Price</th>
            <th>Duration</th>
            <th className="whitespace-nowrap">Discount Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {products.map((product, index) => {
            const appliedDiscount =
              product.flashDiscount != null
                ? product.flashDiscount
                : product.discount;

            const finalPrice =
              appliedDiscount != null
                ? Math.ceil(
                    product.price - (product.price * appliedDiscount) / 100,
                  )
                : Math.ceil(product.price);

            return (
              <tr
                key={product._id || index}
                className={
                  product.stockQuantity < 5
                    ? "bg-red-500 hover:bg-red-600 text-white [&_a]:text-white [&_button]:text-white"
                    : "hover:bg-gray-50"
                }
              >
                <th>{index + 1}</th>
                <td>{product.productName}</td>
                <td>৳{product.price}</td>

                <td>
                  {product.discount != null
                    ? `${product.discount}%`
                    : "No Discount"}
                </td>

                <td>
                  {product.flashDiscount != null
                    ? `${product.flashDiscount}%`
                    : "No Discount"}
                </td>

                <td>৳{finalPrice}</td>

                <td>
                  {product.discountDuration
                    ? product.discountDuration
                    : "Not Available"}
                </td>

                <td className="whitespace-nowrap">
                  {product.discountUpdatedAt
                    ? formatDistanceToNow(new Date(product.discountUpdatedAt), {
                        addSuffix: true,
                      })
                    : "Not Updated"}
                </td>

                <td>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        document.getElementById("my_modal_5").showModal();
                      }}
                      className="btn btn-success border-none shadow-none"
                    >
                      Edit Discount
                    </button>

                    <button className="btn btn-error border-none shadow-none">
                      Remove Discount
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="mb-10 text-center">
            <h3 className="font-bold text-2xl">Edit your discount</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
          </div>
          <div className="w-full">
            <form
              method="dialog"
              onSubmit={handleSubmit(handleEditDiscount)}
              className="w-full"
            >
              <div className="flex items-center justify-center">
                <div className="flex flex-col w-full space-y-4">
                  {/* Discount Amount */}
                  <label className="block mb-2 text-base text-descriptions font-medium">
                    Discount Amount %
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    placeholder="Discount %"
                    className="input input-bordered w-full"
                    {...register("discount", {
                      required: "Discount is required",
                      min: {
                        value: 1,
                        message: "Discount must be at least 1%",
                      },
                      max: {
                        value: 90,
                        message: "Discount cannot exceed 90%",
                      },
                    })}
                  />

                  {errors.discount && (
                    <p className="text-red-500 text-sm">
                      {errors.discount.message}
                    </p>
                  )}

                  {/* Flash Discount */}
                  <label className="block mb-2 text-base text-descriptions font-medium">
                    Flash Discount %
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    placeholder="Discount %"
                    className="input input-bordered w-full"
                    {...register("flashDiscount", {
                      required: "Discount is required",
                      min: {
                        value: 1,
                        message: "Discount must be at least 1%",
                      },
                      max: {
                        value: 90,
                        message: "Discount cannot exceed 90%",
                      },
                    })}
                  />

                  {errors.flashDiscount && (
                    <p className="text-red-500 text-sm">
                      {errors.flashDiscount.message}
                    </p>
                  )}

                  <label className="block mb-2 text-base text-descriptions font-medium">
                    Duration
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("duration", {
                      required: "Please select a duration",
                    })}
                  >
                    <option value="">Duration</option>
                    <option value="24h">24 Hours</option>
                    <option value="48h">48 Hours</option>
                    <option value="72h">72 Hours</option>
                    <option value="7d">7 Days</option>
                  </select>

                  {errors.duration && (
                    <p className="text-red-500 text-sm">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex items-center justify-end gap-4 mt-4">
                <button
                  type="submit"
                  disabled={editDiscountData.isPending}
                  className="btn shadow-none text-white bg-amber-600 hover:bg-amber-700"
                >
                  {editDiscountData.isPending
                    ? "Updating..."
                    : "Update Discount"}
                </button>

                <button
                  className="btn btn-error border-none shadow-none"
                  type="button"
                  onClick={() => {
                    (reset(), document.getElementById("my_modal_5").close());
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DiscountsTable;
