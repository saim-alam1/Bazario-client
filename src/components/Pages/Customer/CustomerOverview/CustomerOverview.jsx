import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";

const CustomerOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // customer stats numbers
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["customer-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`customer-stats/${user?.email}`);
      return res.data;
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`orders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const statsInfo = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
    },
    {
      title: "Products Ordered",
      value: stats.totalOrderPlaced,
    },
    {
      title: "Orders On Transit",
      value: stats.totalOnShippingOrders,
    },
    {
      title: "Products Received",
      value: stats.totalDeliveredOrders,
    },
    {
      title: "Total Cost",
      value: `${stats.totalSpent}৳`,
    },
  ];

  const chartData = [
    {
      name: "Total Orders",
      value: stats.totalOrders || 0,
    },
    {
      name: "Order On Placed",
      value: stats.totalOrderPlaced || 0,
    },
    {
      name: "Orders In Transit",
      value: stats.totalOnShippingOrders || 0,
    },
    {
      name: "Products Received",
      value: stats.totalDeliveredOrders || 0,
    },
    // {
    //   name: "Total Cost",
    //   value: stats.totalSpent || 0,
    // },
  ];

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Customer Overview | Dashboard</title>
        <meta
          name="description"
          content="Track your orders, cart items & wish lists. orders status, recent orders, quick stats of your whole activity in Bazario."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">
          {user?.displayName} Overview
        </h1>
        <p className="text-descriptions mt-2">
          Track your orders, cart items & wish lists. orders status, recent
          orders, quick stats of your whole activity in Bazario.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statsInfo.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm"
          >
            <p className="text-base text-headings">{stat.title}</p>

            <h2 className="mt-2 text-3xl text-headings font-bold">
              {stat.value || 0}
            </h2>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold">Product Status Overview</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={110} label>
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
                <Cell fill="#3B82F6" />
                <Cell fill="#EF4444" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Your last 5 orders */}
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-semibold">Your last 5 orders</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-center">Ordered At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.slice(0, 5).map((order) => (
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

                  {/* Unit Price */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {order.unitPrice}
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

                  {/* Ordered At */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {new Date(order.orderedAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Track your orders */}
      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold text-headings">
          Track your orders
        </h2>

        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Order Status</th>
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

                  {/* Order Status */}
                  <td
                    className={`${order.orderStatus === "Delivered" ? "text-green-600" : "text-yellow-600"} p-4 font-medium whitespace-nowrap`}
                  >
                    {order.orderStatus}
                  </td>

                  {/* Ordered At */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {new Date(order.orderedAt).toLocaleDateString("en-GB")}
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

export default CustomerOverview;
