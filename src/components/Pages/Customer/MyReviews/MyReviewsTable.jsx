import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useNotifications from "../../../../Hooks/useNotifications";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading/Loading";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const MyReviewsTable = ({ products }) => {
  const {
    register: registerReview,
    handleSubmit: handleSubmitReview,
    reset: resetReview,
    formState: { errors: reviewErrors },
  } = useForm();

  const {
    register: registerReport,
    handleSubmit: handleSubmitReport,
    reset: resetReport,
    formState: { errors: reportErrors },
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

  const { data: reports = [] } = useQuery({
    queryKey: ["my-reports", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`my-reports-to-admin/${user?.email}`);
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
      productName: selectedProduct.productName,
      productImage: selectedProduct.productImage,
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

      resetReview();
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
    Swal.fire({
      title: "Are you sure?",
      text: `Delete review for ${productName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomerReview({
          reviewId: id,
          buyerEmail: user?.email,
          productName,
        });
      }
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

  const handleReportToAdmin = (data) => {
    if (!selectedProduct) return;

    const reportData = {
      buyerEmail: user?.email,
      ...data,
      productId: selectedProduct.productId,
      orderId: selectedProduct._id,
      vendorEmail: selectedProduct.vendorEmail,
      productName: selectedProduct.productName,
      productImage: selectedProduct.productImage,
    };

    reportToAdmin(reportData);
  };

  const { mutate: reportToAdmin, isPending: reporting } = useMutation({
    mutationFn: async (report) => {
      const res = await axiosSecure.post("report-to-admin", report);
      return res.data;
    },
    onSuccess: (res) => {
      document.getElementById("my_modal_6")?.close();

      queryClient.invalidateQueries({ queryKey: ["my-reviews", user?.email] });
      queryClient.invalidateQueries({ queryKey: ["my-reports", user?.email] });

      addNotification({
        receiverEmail: user?.email,
        message: `Your report for ${selectedProduct.productName} has been submitted to admin successfully`,
      });

      toast.success(
        res?.message ||
          `Your report for ${selectedProduct.productName} has been submitted to admin successfully`,
      );

      resetReport();
      setSelectedProduct(null);
    },

    onError: (error) => {
      document.getElementById("my_modal_6")?.close();

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
            <th>Review Message</th>
            <th>Admin Report</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            // 1. Find the review matching this product from the reviews array
            const vendorReview = myReviews.find(
              (r) => r.productId === product.productId,
            );

            // 2. Find the report matching this product from the separate reports array
            const adminReport = reports.find(
              (r) => r.productId === product.productId,
            );

            // 3. Determine if this product has already been reported to disable the button
            const isAlreadyReported = !!adminReport;

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
                  {vendorReview && vendorReview.ratings ? (
                    <div className="flex">
                      {[...Array(Math.floor(vendorReview.ratings) || 0)].map(
                        (_, i) => (
                          <FaStar key={i} className="text-amber-600" />
                        ),
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Not Rated Yet</span>
                  )}
                </td>

                <td className="max-w-xs truncate">
                  {vendorReview ? (
                    <span className="text-gray-700">
                      {vendorReview.reviewMessage}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No Review Submitted
                    </span>
                  )}
                </td>

                <td className="max-w-xs truncate">
                  {adminReport ? (
                    <div className="text-sm">
                      <p className="font-semibold text-red-600">
                        Sub: {adminReport.subject}
                      </p>
                      <p
                        className="text-gray-600 truncate"
                        title={adminReport.reportMessage}
                      >
                        {adminReport.reportMessage}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Clean / No Issues
                    </span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-warning whitespace-nowrap"
                    onClick={() => {
                      setSelectedProduct(product);
                      document.getElementById("my_modal_5").showModal();
                    }}
                  >
                    Product Review
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-warning whitespace-nowrap"
                    disabled={isAlreadyReported || reporting}
                    onClick={() => {
                      setSelectedProduct(product);
                      document.getElementById("my_modal_6").showModal();
                    }}
                  >
                    {isAlreadyReported ? "Reported" : "Report Admin"}
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-error whitespace-nowrap"
                    disabled={!vendorReview || reviewDeleting}
                    onClick={() =>
                      deleteReview(vendorReview._id, product.productName)
                    }
                  >
                    {reviewDeleting ? "..." : "Delete Review"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Product Reviews Modal */}
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
              noValidate
              onSubmit={handleSubmitReview(handleReviews)}
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
                    {...registerReview("ratings", {
                      required: "Ratings is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Ratings must be at least 1" },
                      max: { value: 5, message: "Ratings cannot exceed 5" },
                    })}
                  />

                  {reviewErrors.ratings && (
                    <p className="text-red-500 text-sm">
                      {reviewErrors.ratings.message}
                    </p>
                  )}

                  {/* Review Message */}
                  <div className="flex flex-col col-span-1 md:col-span-2">
                    <label className="mb-2 text-base font-semibold text-gray-700">
                      Review Message
                    </label>
                    <textarea
                      {...registerReview("reviewMessage", { required: true })}
                      placeholder="Review Message..."
                      className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
                    />

                    {reviewErrors.reviewMessage && (
                      <span className="text-red-500 text-sm">
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
                    resetReview();
                    document.getElementById("my_modal_5").close();
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* Report To Admin Modal */}
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="mb-10 text-center">
            <h3 className="font-bold text-2xl">Write your issue</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
          </div>
          <div className="w-full">
            <form
              noValidate
              onSubmit={handleSubmitReport(handleReportToAdmin)}
              className="w-full"
            >
              <div className="flex items-center justify-center">
                <div className="flex flex-col w-full space-y-4">
                  {/* Subject */}
                  <div>
                    <label className="mb-2 text-base font-semibold text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Subject..."
                      className="block placeholder:text-sm
      placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40 mt-2 mb-1"
                      {...registerReport("subject", { required: true })}
                    />
                    {reportErrors.subject && (
                      <span className="text-red-500 text-sm">
                        Subject field is required
                      </span>
                    )}
                  </div>

                  {/* Review Message */}
                  <div className="flex flex-col col-span-1 md:col-span-2">
                    <label className="mb-2 text-base font-semibold text-gray-700">
                      Review Message
                    </label>
                    <textarea
                      {...registerReport("reportMessage", { required: true })}
                      placeholder="Review Message..."
                      className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
                    />

                    {reportErrors?.reportMessage && (
                      <span className="text-red-500 text-sm">
                        Report message is required
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
                  {reporting ? "Submitting..." : "Submit"}
                </button>

                <button
                  className="btn btn-error border-none shadow-none"
                  type="button"
                  disabled={reporting}
                  onClick={() => {
                    resetReport();
                    document.getElementById("my_modal_6").close();
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
