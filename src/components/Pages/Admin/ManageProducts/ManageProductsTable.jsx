import { useState } from "react"; // Added useState
import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../UI/Loading/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useNotifications from "../../../../Hooks/useNotifications";

const ManageProductsTable = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/all-products");
      return res.data;
    },
  });

  console.log(products);

  const handleSuspendProduct = (productId, productName, vendorsEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Suspend ${productName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, suspend it!",
    }).then((result) => {
      if (result.isConfirmed) {
        suspendProduct({
          productId,
          productName,
          vendorsEmail,
        });
      }
    });
  };

  const { mutate: suspendProduct, isPending: suspendingProduct } = useMutation({
    mutationFn: async ({ productId }) => {
      const res = await axiosSecure.patch(`product/${productId}/suspend`);
      return res.data;
    },
    onSuccess: (data, variable) => {
      toast.success(
        data?.message || `${variable.productName} suspended successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["all-products", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable.vendorsEmail,
        message: `Dear vendor, your product ${variable.productName} on Bazario platform has been temporarily suspended.`,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  if (isLoading) return <Loading />;

  const filteredProducts = products.filter((product) =>
    product?.productName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />
        <h3 className="text-3xl font-semibold text-headings">
          No Products Found
        </h3>
        <p className="text-descriptions mt-2">
          There are currently no registered products on the platform.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center max-w-sm ml-auto">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full shadow-sm bg-white border-gray-200 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl border border-gray-100 shadow-sm">
          <Lottie animationData={noData} loop={true} className="w-48" />
          <h4 className="text-xl font-medium text-headings mt-2">
            No matching products found
          </h4>
          <p className="text-sm text-descriptions">
            Try adjusting your search query keyword.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>Name</th>
                <th>Vendor Email</th>
                <th>Status</th>
                <th>Added At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td>
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <div className="text-headings">{product.productName}</div>
                    </div>
                  </td>

                  <td className="text-headings">{product.vendorsEmail}</td>

                  <td className="text-headings">
                    <span
                      className={`font-medium ${
                        product.productStatus === "suspended"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {product?.productStatus
                        ? product.productStatus.charAt(0).toUpperCase() +
                          product.productStatus.slice(1)
                        : "Active"}
                    </span>
                  </td>

                  <td className="text-headings">
                    {new Date(product.addedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {product.productStatus === "suspended" ? (
                      <button className="btn btn-success border-none shadow-none whitespace-nowrap">
                        Restore Product
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleSuspendProduct(
                            product._id,
                            product.productName,
                            product.vendorsEmail,
                          )
                        }
                        className="btn btn-warning border-none shadow-none whitespace-nowrap"
                      >
                        {suspendingProduct
                          ? "Suspending..."
                          : "Suspend Product"}
                      </button>
                    )}
                  </td>

                  <td>
                    <button className="btn btn-error border-none shadow-none">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProductsTable;
