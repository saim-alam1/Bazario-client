import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";

const VendorsOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: productsStats = {}, isLoading } = useQuery({
    queryKey: ["vendor-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`vendor-stats/${user?.email}`);
      return res.data;
    },
  });

  const { data: lowStockProducts = [] } = useQuery({
    queryKey: ["low-stock-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/low-stock-products/${user?.email}`);
      return res.data;
    },
  });

  const { data: flashSummary = {} } = useQuery({
    queryKey: ["flash-summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/flash-deals-summary/${user?.email}`);

      return res.data;
    },
  });

  const { data: currencyStats = {} } = useQuery({
    queryKey: ["vendors-currency-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`vendors-currency-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const stats = [
    {
      title: "Total Products",
      value: productsStats.totalProducts || 0,
    },
    {
      title: "Active Products",
      value: productsStats.activeProducts || 0,
    },
    {
      title: "Paused Products",
      value: productsStats.pausedProducts || 0,
    },
    {
      title: "Total Stock Units",
      value: productsStats.totalStockUnits || 0,
    },
    {
      title: "Products On Discount",
      value: productsStats.productsOnDiscount || 0,
    },
    {
      title: "Products On Flash Discount",
      value: productsStats.productsOnFlashDiscount || 0,
    },
    {
      title: "Low Stock",
      value: productsStats.lowStockProducts || 0,
    },
    {
      title: "Total Orders",
      value: productsStats.totalOrders || 0,
    },
    {
      title: "Orders In Transit",
      value: productsStats.totalProductsInTransit || 0,
    },
    {
      title: "Orders Delivered",
      value: productsStats.productsDelivered || 0,
    },
    {
      title: "Platform Fee Due",
      value: `${productsStats.platformFeeDue || 0}৳`,
    },
    {
      title: "Platform Fee Paid",
      value: `${productsStats.totalPlatformFeePaid || 0}৳`,
    },
  ];

  const chartData = [
    {
      name: "Active Products",
      value: productsStats.activeProducts || 0,
    },
    {
      name: "Paused Products",
      value: productsStats.pausedProducts || 0,
    },
    {
      name: "Discounted Products",
      value: productsStats.productsOnDiscounts || 0,
    },
    {
      name: "Flash Discounted Products",
      value: productsStats.productsOnFlashDiscount || 0,
    },
    {
      name: "Low Stock",
      value: productsStats.lowStockProducts || 0,
    },
    {
      name: "Total Orders",
      value: productsStats.totalOrders || 0,
    },
    {
      name: "Orders In Transit",
      value: productsStats.totalProductsInTransit || 0,
    },
    {
      name: "Orders Delivered",
      value: productsStats.productsDelivered || 0,
    },
  ];

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Vendor Overview | Bazario</title>
        <meta
          name="description"
          content="Track products, stock levels, discounts, and inventory performance from your vendor dashboard."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">Vendor Overview</h1>
        <p className="text-descriptions mt-2">
          Monitor your inventory, stock levels, and product performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm hover:shadow-md"
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
        <h2 className="mb-5 text-xl font-semibold">
          Vendors Stats (Pie Chart)
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={110} label>
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
                <Cell fill="#3B82F6" />
                <Cell fill="#EF4444" />
                <Cell fill="#8B5CF6" />
                <Cell fill="#EC4899" />
                <Cell fill="#14B8A6" />
                <Cell fill="#F97316" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Products */}
      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold text-red-500">
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
      </div>

      {/* Platform Fee Paid */}
      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold text-red-500">
          ⚠ Platform Fee To Be Paid
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-base-300 p-3">
            <div>
              <h3 className="font-medium text-headings">
                Platform Commission Due
              </h3>
            </div>

            <div>
              <h3 className="font-bold text-red-500">
                {currencyStats?.platformFeeDue}৳
              </h3>
            </div>

            <div className="flex items-center gap-8">
              <Link
                to="/dashboard-layout/payouts"
                className="btn btn-warning border-none shadow-none"
              >
                Pay <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Discount Products */}
      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
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
      </div>
    </section>
  );
};

export default VendorsOverview;
