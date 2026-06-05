import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

      <div className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-5 text-xl font-semibold">Product Status Overview</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={110} label>
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
                <Cell fill="#3B82F6" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default VendorsOverview;
