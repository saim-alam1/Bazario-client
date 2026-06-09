import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`orders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>{`${user?.displayName} Orders | Dashboard`}</title>
        <meta
          name="description"
          content="See the products you ordered, your order & transaction details."
        />
      </Helmet>

      <div className="mt-10">
        <h2 className="mb-5 text-xl font-semibold">
          {user?.displayName}'s orders
        </h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Trx. Id</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Ordered At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-14 h-14 rounded-md object-cover shrink-0"
                      />

                      <div>
                        <h4 className="font-medium text-headings truncate">
                          {order.productName}
                        </h4>
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {order.quantity}
                  </td>

                  {/* Total Price */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {order.totalPrice}৳
                  </td>

                  {/* Payment Status */}
                  <td
                    className={`${order.paymentStatus === "paid" ? "text-green-600" : "text-red-500"} p-4 font-medium whitespace-nowrap`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </td>

                  {/* Transaction Id */}
                  <td className="p-4 font-medium whitespace-nowrap">
                    {order.transactionId}
                  </td>

                  {/* Status */}
                  <td
                    className={`${order.orderStatus === "Delivered" ? "text-green-500" : "text-yellow-600"} p-4 font-medium whitespace-nowrap`}
                  >
                    {order.orderStatus}
                  </td>

                  {/* Ordered At */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {new Date(order.orderedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
