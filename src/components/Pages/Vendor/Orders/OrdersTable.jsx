import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotifications from "../../../../Hooks/useNotifications";

const OrdersTable = ({ orders }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const handleOrderStatus = (orderId, status, buyerEmail) => {
    orderStatus({ orderId, status, buyerEmail });
  };

  const { mutate: orderStatus, isPending } = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const res = await axiosSecure.patch(`update-order-status/${orderId}`, {
        status,
      });
      return res.data;
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variables.buyerEmail,
        message: `Your order is now ${variables.status}`,
      });

      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Product</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Trx. Id</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squirrel w-12 h-12">
                        <img src={order.productImage} alt="product" />
                      </div>
                    </div>
                    <div className="font-bold whitespace-nowrap">
                      {order.productName}
                    </div>
                  </div>
                </td>
                <td className="font-semibold whitespace-nowrap">
                  {order.buyerName}
                </td>
                <td className="font-semibold">৳{order.totalPrice}</td>
                <td className="font-semibold">{order.transactionId}</td>
                <td>
                  <span
                    className={`badge ${order.paymentStatus === "paid" ? "badge-success" : "badge-error"} text-white`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </span>
                </td>
                <td>
                  <span className="font-medium text-descriptions whitespace-nowrap">
                    {order.orderStatus}
                  </span>
                </td>
                <td className="text-descriptions">
                  {new Date(order.orderedAt).toLocaleDateString("en-GB")}
                </td>
                <td className="text-descriptions">
                  <button
                    onClick={() =>
                      handleOrderStatus(
                        order._id,
                        order.orderStatus === "Order Placed"
                          ? "In Transit"
                          : "Delivered",
                        order.buyerEmail,
                      )
                    }
                    disabled={isPending || order.orderStatus === "Delivered"}
                    className="btn btn-success border-none shadow-none whitespace-nowrap disabled:cursor-not-allowed"
                  >
                    {isPending
                      ? "Processing..."
                      : order.orderStatus === "Order Placed"
                        ? "In Transit"
                        : "Delivered"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
