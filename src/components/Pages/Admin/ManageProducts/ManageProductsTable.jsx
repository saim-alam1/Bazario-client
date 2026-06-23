import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../UI/Loading/Loading";

const ManageProductsTable = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/all-products");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          No Customers Found
        </h3>

        <p className="text-descriptions mt-2">
          There are currently no registered customers on the platform.
        </p>
      </div>
    );
  }

  return (
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
          {products.map((product) => (
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
                    product.stockStatus === "paused"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {product.stockStatus.charAt(0).toUpperCase() +
                    product.stockStatus.slice(1)}
                </span>
              </td>

              <td className="text-headings">
                {new Date(product.addedAt).toLocaleDateString("en-GB")}
              </td>
              <td>
                {product.status === "suspended" ? (
                  <button
                    // disabled={reactivating}
                    className="btn btn-success border-none shadow-none"
                    // onClick={() =>
                    //   handleReactivate(
                    //     customer._id,
                    //     customer.fullName,
                    //     customer.email,
                    //   )
                    // }
                  >
                    {/* {reactivating ? "Reactivating..." : "Reactivate"} */}{" "}
                    Reactivate
                  </button>
                ) : (
                  <button
                    // disabled={suspendingCustomer}
                    className="btn btn-warning border-none shadow-none"
                    // onClick={() =>
                    //   handleSuspend(
                    //     customer._id,
                    //     customer.fullName,
                    //     customer.email,
                    //   )
                    // }
                  >
                    {/* {suspendingCustomer ? "Suspending..." : "Suspend"} */}
                    Suspend
                  </button>
                )}
              </td>

              <td>
                <button
                  // disabled={removingCustomer}
                  // onClick={() =>
                  //   handleRemove(
                  //     customer._id,
                  //     customer.fullName,
                  //     customer.email,
                  //   )
                  // }
                  className="btn btn-error border-none shadow-none"
                >
                  {/* {removingCustomer ? "Removing..." : "Remove"} */}Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProductsTable;
