import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";

const CustomerOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["customer-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`customer-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const statsInfo = [
    {
      title: "Products Ordered",
      value: stats.totalOrderPlaced,
    },
    {
      title: "Orders On Shipping",
      value: stats.totalOnShippingOrders,
    },
    {
      title: "Products Received",
      value: stats.totalDeliveredOrders,
    },
    {
      title: "Total Cost",
      value: `৳${stats.totalSpent}`,
    },
  ];

  const chartData = [
    {
      name: "Products Ordered",
      value: stats.totalOrderPlaced || 0,
    },
    {
      name: "Orders On Shipping",
      value: stats.totalOnShippingOrders || 0,
    },
    {
      name: "Products Received",
      value: stats.totalDeliveredOrders || 0,
    },
    {
      name: "Total Cost",
      value: stats.totalSpent,
    },
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

      {/* Low Stock Products */}
      {/* <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold text-headings">
          ⚠ Products Running Low
        </h2>

        {lowStockProducts.length ? (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between rounded-lg border border-base-300 p-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="h-12 w-12 rounded object-cover"
                  />

                  <div>
                    <h3 className="font-medium text-headings">
                      {product.productName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <p className="font-semibold text-red-500">
                    {product.stockQuantity} left
                  </p>

                  <Link
                    to="/dashboard-layout/inventory"
                    className="btn btn-warning border-none shadow-none"
                  >
                    Go To Inventory
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-descriptions text-xl">
            No low-stock products right now.
          </p>
        )}
      </div> */}

      {/* Flash Discount Products */}
      {/* <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold text-headings">
          🔥 Flash Deals Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total Discounted Products</span>
            <span className="font-bold">
              {flashSummary.totalDiscountedProducts || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Active Flash Deals</span>
            <span className="font-bold">
              {flashSummary.activeFlashDeals || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Highest Discount</span>
            <span className="font-bold">
              {flashSummary.highestDiscountProduct?.productName || "N/A"}
              {flashSummary.highestDiscountProduct &&
                ` (${flashSummary.highestDiscountProduct.flashDiscount}%)`}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Lowest Discount</span>
            <span className="font-bold">
              {flashSummary.lowestDiscountProduct?.productName || "N/A"}
              {flashSummary.lowestDiscountProduct &&
                ` (${flashSummary.lowestDiscountProduct.flashDiscount}%)`}
            </span>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default CustomerOverview;
