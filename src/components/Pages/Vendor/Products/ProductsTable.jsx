import LottiePlayer from "lottie-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import noData from "../../../../assets/noData.json";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import useNotifications from "../../../../Hooks/useNotifications";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductsTable = ({ productsData }) => {
  const { user } = useAuth();
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const handleDelete = async (id, productName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${productName}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      deleteVendorsProduct({
        productId: id,
        productName,
        vendorsEmail: user?.email,
      });
    }
  };

  const { mutate: deleteVendorsProduct, isPending } = useMutation({
    mutationFn: async ({ productId, vendorsEmail }) => {
      const res = await axiosSecure.delete(`delete-product/${productId}`, {
        data: {
          vendorsEmail,
        },
      });
      return res.data;
    },
    onSuccess: async (res, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["my-products", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: `${variable.productName} deleted successfully`,
      });

      toast.success(`${variable.productName} deleted successfully`);
    },
  });

  if (!productsData?.length) {
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
          {productsData.map((product, index) => (
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
              <td>{product.price}৳</td>
              <td>{product.stockQuantity}</td>
              <td>{new Date(product.addedAt).toLocaleDateString("en-GB")}</td>

              {/* Actions */}
              <td className="flex gap-3">
                <Link
                  to={`/products-details/${product._id}`}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaEdit size={24} />
                </Link>

                <button
                  disabled={isPending}
                  onClick={() => {
                    handleDelete(product._id, product.productName);
                  }}
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <FaTrash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
