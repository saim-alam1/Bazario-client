import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Loading from "../../../UI/Loading/Loading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: overview, isLoading } = useQuery({
    queryKey: ["admin-overview", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`admin-overview/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const stats = [
    {
      title: "Total Customers",
      value: overview.totalCustomer || 0,
    },
    {
      title: "Total Vendor",
      value: overview.totalVendor || 0,
    },
    {
      title: "Total Admin",
      value: overview.totalAdmin || 0,
    },
    {
      title: "Total Unit Product Been Sold",
      value: overview.totalUnitProductsSold || 0,
    },
    {
      title: "Total Orders Been Placed",
      value: overview.totalOrderPlaced || 0,
    },
    {
      title: "Total Orders In Transit",
      value: overview.totalOrderInTransit || 0,
    },
    {
      title: "Total Orders Been Delivered",
      value: overview.TotalOrdersDelivered || 0,
    },
    {
      title: "Customers Joined This Month",
      value: overview.totalCustomerInThisMonth || 0,
    },
    {
      title: "Platform Total Revenue",
      value: overview.totalRevenue || 0,
    },
    {
      title: "Total Revenue Received",
      value: overview.totalRevenueReceived || 0,
    },
    {
      title: "Total Revenue Due",
      value: overview.totalRevenueDue || 0,
    },
    {
      title: "Revenue This Month",
      value: overview.totalRevenueThisMonth || 0,
    },
    {
      title: "Vendors Total Order Revenue",
      value: overview.vendorsTotalOrderRevenue || 0,
    },
  ];

  const barData = [
    { name: "Customers", value: overview.totalCustomer || 0 },
    { name: "Vendors", value: overview.totalVendor || 0 },
    { name: "Orders Delivered", value: overview.TotalOrdersDelivered || 0 },
    { name: "Revenue", value: overview.totalRevenue || 0 },
    { name: "Revenue Due", value: overview.totalRevenueDue || 0 },
  ];

  const lineData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 28000 },
    { month: "Jun", revenue: overview.totalRevenueThisMonth || 0 },
  ];

  const pieData = [
    { name: "Placed", value: overview.totalOrderPlaced || 0 },
    { name: "In Transit", value: overview.totalOrderInTransit || 0 },
    { name: "Delivered", value: overview.TotalOrdersDelivered || 0 },
  ];

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Admin Overview | Bazario Platform</title>
        <meta
          name="description"
          content="Monitor platform-wide analytics including users, vendors, orders, revenue, and performance insights from the Bazario admin dashboard."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">Admin Overview</h1>
        <p className="text-descriptions mt-2">
          Track platform growth, manage users, monitor orders, and analyze
          revenue performance across Bazario.
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

      {/* Bar Chart */}
      <div className="mt-10 rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="mt-10 rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Revenue Growth</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="mt-10 rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status Breakdown</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              <Cell fill="#F59E0B" />
              <Cell fill="#3B82F6" />
              <Cell fill="#10B981" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminOverview;
