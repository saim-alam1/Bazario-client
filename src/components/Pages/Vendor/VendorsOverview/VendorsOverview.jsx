import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "react-router";

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

  if (isLoading) return <Loading />;

  const stats = [
    {
      title: "Total Products",
      value: productsStats.totalProducts,
    },
    {
      title: "Active Products",
      value: productsStats.activeProducts,
    },
    {
      title: "Paused Products",
      value: productsStats.pausedProducts,
    },
    {
      title: "Total Stock Units",
      value: productsStats.totalStockUnits,
    },
    {
      title: "On Discount",
      value: productsStats.productsOnDiscount,
    },
    {
      title: "Low Stock",
      value: productsStats.lowStockProducts,
    },
  ];

  const chartData = [
    {
      name: "Active",
      value: productsStats.activeProducts || 0,
    },
    {
      name: "Paused",
      value: productsStats.pausedProducts || 0,
    },
    {
      name: "Discount",
      value: productsStats.productsOnDiscount || 0,
    },
    {
      name: "Low Stock",
      value: productsStats.lowStockProducts,
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

      {/* Features: Total Sales, Revenue, Pending Orders, Low Stock Alerts, Best
      Selling, Products, Recent Orders, Performance summary */}

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
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
      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
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
      </div>
    </section>
  );
};

export default VendorsOverview;
