import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoFlag } from "react-icons/io5";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useNotifications from "../../../../Hooks/useNotifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const ReviewsTable = ({ reviews }) => {
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

  const [reviewData, setReviewData] = useState("");

  const handleReport = (data) => {
    const reportData = {
      ...data,
      customerEmail: reviewData.buyerEmail,
      orderId: reviewData.orderId,
      productId: reviewData.productId,
      reviewId: reviewData._id,
      productImage: reviewData.productImage,
      productName: reviewData.productName,
      customerReviewMessage: reviewData.reviewMessage,
      vendorEmail: user?.email,
    };

    sendReport(reportData);
  };

  const { mutate: sendReport, isPending: reporting } = useMutation({
    mutationFn: async (report) => {
      const res = await axiosSecure.post("vendors-report", report);
      return res.data;
    },
    onSuccess: (data) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      toast.success(data.message || "Reported sent to admin!");

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: `${data.message || "Reported sent to admin!"}`,
      });

      reset();
    },
    onError: (error) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      toast.error(error.response?.data?.message);
    },
  });

  const handleReply = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Product</th>
              <th>Rating</th>
              <th>Comment text</th>
              <th>Reviewed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              return (
                <tr key={review._id} className="hover:bg-gray-50 transition">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squirrel w-12 h-12">
                          <img src={review.productImage} alt="product" />
                        </div>
                      </div>
                      <div className="font-bold whitespace-nowrap">
                        {review.productName}
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex">
                      {[...Array(Math.floor(review.ratings || 0))].map(
                        (_, i) => (
                          <FaStar key={i} className="text-amber-600" />
                        ),
                      )}
                    </div>
                  </td>

                  <td className="text-headings whitespace-nowrap">
                    {review.reviewMessage}
                  </td>

                  <td>
                    {new Date(
                      parseInt(review._id.substring(0, 8), 16) * 1000,
                    ).toLocaleDateString("en-GB")}
                  </td>

                  <td>
                    <button
                      disabled={reporting}
                      title="Report to Admin"
                      className="btn border-none shadow-none whitespace-nowrap"
                      onClick={() => {
                        setReviewData(review);
                        document.getElementById("my_modal_5").showModal();
                      }}
                    >
                      {reporting ? (
                        "Sending Report..."
                      ) : (
                        <>
                          <IoFlag className="text-2xl text-red-500" /> Report
                          admin
                        </>
                      )}
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setReviewData(review);
                        document.getElementById("my_modal_6").showModal();
                      }}
                      className="btn btn-info border-none shadow-none"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal For Report To Admin */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="mb-10 text-center">
            <h3 className="font-bold text-2xl">Report to admin</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
          </div>

          <div>
            <form className="fieldset" onSubmit={handleSubmit(handleReport)}>
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
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <span className="text-red-500 text-[16px] mt-2">
                    Subject field is required
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col col-span-1 md:col-span-2">
                <label className="mb-2 text-base font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  {...register("message", {
                    required: true,
                  })}
                  placeholder="Review Message..."
                  className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
                />

                {errors.message && (
                  <span className="text-red-500 text-[16px] mt-1">
                    Message field is required
                  </span>
                )}
              </div>

              <div className="w-full flex items-center justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="btn shadow-none text-white bg-amber-600 hover:bg-amber-700"
                >
                  {reporting ? "Reporting..." : "Submit Report"}
                </button>

                <button
                  className="btn btn-error border-none shadow-none"
                  type="button"
                  // disabled={reviewPending}
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

export default ReviewsTable;
