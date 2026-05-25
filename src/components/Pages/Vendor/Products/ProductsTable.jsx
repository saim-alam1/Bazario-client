import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const ProductsTable = ({ productsData }) => {
  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-100 text-headings text-[16px]">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Added On</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {productsData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No applications found
              </td>
            </tr>
          ) : (
            productsData.map(
              (product, index) => (
                console.log(product),
                (
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
                    <td>{product.category}</td>
                    <td>৳{product.price}</td>
                    <td>{product.stockQuantity}</td>
                    <td>
                      {new Date(product.addedAt).toLocaleDateString("en-GB")}
                    </td>

                    {/* Actions */}
                    <td className="flex gap-3">
                      <Link
                        to={`/products-details/${product._id}`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit size={24} />
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <FaTrash size={24} />
                      </button>
                    </td>
                  </tr>
                )
              ),
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
