import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import { RiEditBoxLine } from "react-icons/ri";
import useAuth from "../../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useNotifications from "../../../../Hooks/useNotifications";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading/Loading";
import { FaStar } from "react-icons/fa";

const MyReviewsTable = ({ products }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: myReviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`my-reviews/${user?.email}`);
      return res.data;
    },
  });

  const handleReviews = (data) => {
    if (!selectedProduct) return;

    const reviewData = {
      buyerEmail: user?.email,
      ...data,
      productId: selectedProduct.productId,
      orderId: selectedProduct._id,
      vendorEmail: selectedProduct.vendorEmail,
    };
    postReview(reviewData);
  };

  const { mutate: postReview, isPending: reviewPending } = useMutation({
    mutationFn: async (review) => {
      const res = await axiosSecure.post("review", review);
      return res.data;
    },
    onSuccess: (res) => {
      document.getElementById("my_modal_5")?.close();

      queryClient.invalidateQueries(["my-reviews", user?.email]);

      addNotification({
        receiverEmail: user?.email,
        message: `Your review for ${selectedProduct.productName} has been posted successfully`,
      });

      toast.success(
        res?.message ||
          `Your review for ${selectedProduct.productName} has been posted successfully`,
      );

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

  const deleteReview = (id, productName) => {
    deleteCustomerReview({
      reviewId: id,
      buyerEmail: user?.email,
      productName,
    });
  };

  const { mutate: deleteCustomerReview, isPending: reviewDeleting } =
    useMutation({
      mutationFn: async ({ reviewId, buyerEmail }) => {
        const res = await axiosSecure.delete(`delete-review/${reviewId}`, {
          data: { buyerEmail },
        });
        return res.data;
      },
      onSuccess: (res, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["my-reviews", user?.email],
        });

        addNotification({
          receiverEmail: user?.email,
          message: `Your review for ${variables.productName} has been deleted successfully`,
        });

        toast.success(
          res?.message ||
            `Your review for ${variables.productName} has been deleted successfully`,
        );
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred",
        );
      },
    });

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="table w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>Product</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const review = myReviews.find(
              (r) => r.productId === product.productId,
            );

            return (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squirrel w-12 h-12">
                        <img src={product.productImage} alt="product" />
                      </div>
                    </div>
                    <div className="font-bold whitespace-nowrap">
                      {product.productName}
                    </div>
                  </div>
                </td>

                <td className="text-headings whitespace-nowrap">
                  {(() => {
                    const review = myReviews.find(
                      (r) => r.productId === product.productId,
                    );

                    if (!review) return "Not Rated Yet";

                    return (
                      <div className="flex">
                        {[...Array(Math.floor(review.ratings))].map((_, i) => (
                          <FaStar key={i} className="text-amber-600" />
                        ))}
                      </div>
                    );
                  })()}
                </td>

                <td className="text-headings whitespace-nowrap">
                  {review ? review.reviewMessage : "Not Reviewed Yet"}
                </td>

                <td className="text-headings font-medium">
                  <span className="badge badge-success">
                    {product.orderStatus}
                  </span>
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      setSelectedProduct(product);
                      document.getElementById("my_modal_5").showModal();
                    }}
                  >
                    <RiEditBoxLine className="text-2xl" />
                  </button>
                </td>

                <td>
                  <button
                    className="btn"
                    disabled={!review || reviewDeleting}
                    onClick={() =>
                      deleteReview(review._id, product.productName)
                    }
                  >
                    {reviewDeleting ? (
                      "Deleting..."
                    ) : (
                      <FiDelete className="text-2xl" />
                    )}
                  </button>
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
            <h3 className="font-bold text-2xl">Add your review</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
          </div>
          <div className="w-full">
            <form
              method="dialog"
              onSubmit={handleSubmit(handleReviews)}
              className="w-full"
            >
              <div className="flex items-center justify-center">
                <div className="flex flex-col w-full space-y-4">
                  {/* Ratings */}
                  <label className="block mb-2 text-base text-descriptions font-medium">
                    Give Ratings
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Ratings..."
                    className="input input-bordered w-full"
                    {...register("ratings", {
                      required: "Ratings is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Ratings must be at least 1",
                      },
                      max: {
                        value: 5,
                        message: "Discount cannot exceed 5",
                      },
                    })}
                  />

                  {errors.ratings && (
                    <p className="text-red-500 text-sm">
                      {errors.ratings.message}
                    </p>
                  )}

                  {/* Review Message */}
                  <div className="flex flex-col col-span-1 md:col-span-2">
                    <label className="mb-2 text-base font-semibold text-gray-700">
                      Review Message
                    </label>
                    <textarea
                      {...register("reviewMessage", {
                        required: true,
                      })}
                      placeholder="Review Message..."
                      className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
                    />

                    {errors.reviewMessage && (
                      <span className="text-red-500 text-[16px] mt-1">
                        Review Message field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="btn shadow-none text-white bg-amber-600 hover:bg-amber-700"
                >
                  {reviewPending ? "Submitting..." : "Submit"}
                </button>

                <button
                  className="btn btn-error border-none shadow-none"
                  type="button"
                  disabled={reviewPending}
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

export default MyReviewsTable;
