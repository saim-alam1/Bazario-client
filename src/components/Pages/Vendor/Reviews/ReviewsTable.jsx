import { FaStar } from "react-icons/fa";
import { IoFlag } from "react-icons/io5";

const ReviewsTable = ({ reviews }) => {
  return (
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
                    {[...Array(Math.floor(review.ratings || 0))].map((_, i) => (
                      <FaStar key={i} className="text-amber-600" />
                    ))}
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
                    title="Report to Admin"
                    className="btn border-none shadow-none"
                  >
                    <IoFlag className="text-2xl text-red-500" />
                  </button>
                </td>

                <td>
                  <button className="btn btn-info border-none shadow-none">
                    Reply
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
