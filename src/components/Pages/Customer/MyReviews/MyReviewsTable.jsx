import { FiDelete } from "react-icons/fi";
import { RiEditBoxLine } from "react-icons/ri";

const MyReviewsTable = ({ products }) => {
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
                <button className="btn">
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
    </div>
  );
};

export default MyReviewsTable;
