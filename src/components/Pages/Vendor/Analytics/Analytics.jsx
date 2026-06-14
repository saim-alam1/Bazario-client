import { Helmet } from "react-helmet-async";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#ff4d4f",
  "#722ed1",
  "#13c2c2",
];

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["vendors-analytics", user?.email],
    queryFn: async () =>
      (await axiosSecure(`vendors-analytics/${user?.email}`)).data,
  });

  if (isLoading) return <Loading />;

  // UPDATED FORMATTING FOR NEW SERVER STRUCTURE
  const monthlyData = stats.monthlySells.map((m) => ({
    name: `${m._id.month}/${m._id.year}`,
    revenue: m.revenue,
  }));

  const orderStatusData = stats.orderStatus.map((s) => ({
    name: s._id, // e.g., "In Transit"
    count: s.count,
  }));

  const categoryData = stats.revenueByCategory.map((c) => ({
    name: c.category,
    value: c.revenue,
  }));

  return (
    <section className="p-6 bg-gray-50">
      <Helmet>
        <title>Vendor Dashboard | Analytics</title>
      </Helmet>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Total Revenue"
          value={`৳${stats.totalRevenue.toLocaleString()}`}
        />
        <StatCard title="Total Orders" value={`${stats.totalOrders} Orders`} />
        <StatCard title="Products Sold" value={`${stats.productsSold} Units`} />
        <StatCard
          title="Avg Order Value"
          value={`৳${stats.averageOrderValue}`}
        />
        <StatCard
          title="Total Customers"
          value={`${stats.totalCustomers} Customers`}
        />
        <StatCard title="Conversion Rate" value="2.4%" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-4">Best Selling</h3>
          {stats.bestSellingProducts.map((p) => (
            <div key={p._id} className="flex justify-between py-2 border-b">
              <span>{p.productName}</span> <b>{p.totalSold}</b>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-4">Worst Performing</h3>
          {stats.worstPerformedProducts.map((p, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b">
              <span>{p.productName}</span> <b>{p.totalSold}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
    <p className="text-xs text-gray-400 uppercase">{title}</p>
    <p className="text-lg font-bold mt-1">{value}</p>
  </div>
);

export default Analytics;
