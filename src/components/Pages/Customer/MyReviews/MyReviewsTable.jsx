import { useForm } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import { RiEditBoxLine } from "react-icons/ri";

const MyReviewsTable = ({ products }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleReviews = (data) => {
    console.log(data);
  };

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
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50 transition">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squirrel w-12 h-12">
                      <img src={product.productImage} alt="product" />
                    </div>
                  </div>
                  <div className="font-bold">{product.productName}</div>
                </div>
              </td>

              <td className="text-headings">Not Rated Yet</td>

              <td className="text-headings">Not Reviewed Yet</td>

              <td className="text-headings font-medium">
                <span className="badge badge-success">
                  {product.orderStatus}
                </span>
              </td>

              <td>
                <button
                  className="btn"
                  onClick={() => {
                    // setSelectedProduct(product);
                    document.getElementById("my_modal_5").showModal();
                  }}
                >
                  <RiEditBoxLine className="text-2xl" />
                </button>
              </td>

              <td>
                <button className="btn">
                  <FiDelete className="text-2xl" />
                </button>
              </td>
            </tr>
          ))}
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
                    max="90"
                    placeholder="Ratings..."
                    className="input input-bordered w-full"
                    {...register("ratings", {
                      required: "Ratings is required",
                      min: {
                        value: 1,
                        message: "Ratings must be at least 1",
                      },
                      max: {
                        value: 10,
                        message: "Discount cannot exceed 10",
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
                        reviewMessage field is required
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
                  Update
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

export default MyReviewsTable;
