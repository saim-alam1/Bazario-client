const OrdersTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Trx. Id</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
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
                    <div className="font-bold">{order.productName}</div>
                  </div>
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
                  <span className="font-medium text-gray-600">
                    {order.orderStatus}
                  </span>
                </td>
                <td className="text-gray-500">
                  {new Date(order.orderedAt).toLocaleDateString("en-GB")}
                </td>
                <td className="text-gray-500">
                  <button
                    disabled={order.orderStatus === "Delivered"}
                    className="btn btn-success border-none shadow-none whitespace-nowrap disabled:cursor-not-allowed"
                  >
                    {order.orderStatus === "Order Placed"
                      ? "In Transit"
                      : order.orderStatus === "In Transit"
                        ? "Delivered"
                        : "Completed"}
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
