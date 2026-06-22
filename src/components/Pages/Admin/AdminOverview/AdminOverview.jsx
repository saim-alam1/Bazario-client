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
import {
  FaUsers,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaChartLine,
  FaBox,
  FaStore,
} from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { formatBDT } from "../../../Utils/FormatCurrency/formatCurrency";

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

  // Grouped stats for enterprise UI structure
  const financialStats = [
    {
      title: "Total Revenue",
      value: overview.totalRevenue || 0,
      isCurrency: true,
      icon: FaBangladeshiTakaSign,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Revenue Received",
      value: overview.totalRevenueReceived || 0,
      isCurrency: true,
      icon: FaCheckCircle,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Revenue Due",
      value: overview.totalRevenueDue || 0,
      isCurrency: true,
      icon: FaChartLine,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Revenue (This Month)",
      value: overview.platformRevenueThisMonth || 0,
      isCurrency: true,
      icon: FaBangladeshiTakaSign,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  const fulfillmentStats = [
    {
      title: "Total Orders",
      value: overview.totalOrderPlaced || 0,
      icon: FaShoppingBag,
    },
    {
      title: "In Transit",
      value: overview.totalOrderInTransit || 0,
      icon: FaTruck,
      badge: "Active",
    },
    {
      title: "Delivered",
      value: overview.TotalOrdersDelivered || 0,
      icon: FaCheckCircle,
    },
    {
      title: "Units Sold",
      value: overview.totalUnitProductsSold || 0,
      icon: FaBox,
    },
  ];

  const userStats = [
    {
      title: "Total Customers",
      value: overview.totalCustomer || 0,
      icon: FaUsers,
    },
    {
      title: "New This Month",
      value: overview.totalCustomerInThisMonth || 0,
      icon: FaUsers,
      subtext: "Customers",
    },
    { title: "Total Vendors", value: overview.totalVendor || 0, icon: FaStore },
    { title: "Total Admins", value: overview.totalAdmin || 0, icon: FaUsers },
  ];

  // Chart Formatting Data
  const barData = [
    { name: "Customers", count: overview.totalCustomer || 0 },
    { name: "Vendors", count: overview.totalVendor || 0 },
    { name: "Delivered", count: overview.TotalOrdersDelivered || 0 },
  ];

  // Line Chart
  const lineData = overview.revenueByMonth || [];

  const pieData = [
    { name: "Placed", value: overview.totalOrderPlaced || 0, color: "#3B82F6" },
    {
      name: "In Transit",
      value: overview.totalOrderInTransit || 0,
      color: "#F59E0B",
    },
    {
      name: "Delivered",
      value: overview.TotalOrdersDelivered || 0,
      color: "#10B981",
    },
  ];

  // Currency Formatter Helper
  // const formatCurrency = (val) => {
  //   return new Intl.NumberFormat("en-BD", {
  //     style: "currency",
  //     currency: "BDT",
  //     minimumFractionDigits: 0,
  //   }).format(val);
  // };

  return (
    <section className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <Helmet>
        <title>Admin Overview | Bazario Platform</title>

        <meta
          name="description"
          content="Monitor platform-wide analytics including users, vendors, orders, revenue, and performance insights from the Bazario admin dashboard."
        />
      </Helmet>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Real-time platform updates, performance metrics, and financial
            summaries for Bazario.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-xs text-slate-400 font-medium bg-white px-3 py-2 rounded-lg border shadow-sm self-start">
          Status:{" "}
          <span className="text-emerald-500 font-semibold">● Live Sync</span>
        </div>
      </div>

      {/* FINANCIAL CARDS (Highlight Hero Row) */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Financial Performance
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {financialStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-tight">
                    {stat.title}
                  </p>
                  <h4 className="mt-2 text-2xl font-bold text-slate-900 tracking-tight">
                    {formatBDT(stat.value)}
                  </h4>
                </div>
                <div className={`p-3 rounded-lg border ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: OPERATIONS & USERS (Secondary Grid) */}
      <div className="grid gap-6 lg:grid-cols-2 mb-10">
        {/* Operations */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
          <h3 className="text-base font-semibold text-headings border-b pb-3 mb-4">
            Fulfillment & Operations
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {fulfillmentStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 flex items-start justify-between"
                >
                  <div>
                    <span className="text-base font-medium text-descriptions">
                      {stat.title}
                    </span>
                    <p className="text-xl font-bold text-headings mt-1">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* User Statistics */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
          <h3 className="text-base font-semibold text-headings border-b pb-3 mb-4">
            Accounts & Ecosystem
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {userStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 flex items-start justify-between"
                >
                  <div>
                    <span className="text-base font-medium text-descriptions">
                      {stat.title}
                    </span>
                    <p className="text-xl font-bold text-headings mt-1">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: ANALYTICS & CHARTS GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Line Chart (Main Revenue Graph - Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Revenue Velocity
              </h3>
              <p className="text-sm text-slate-400">
                Monthly trajectory overview
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-1 rounded border border-emerald-200">
              Target Trending Up
            </span>
          </div>
          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `৳${value}`} // Adds currency symbol to Y-Axis lines
                />
                <Tooltip
                  formatter={(value) => [formatBDT(value), "Platform Revenue"]}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  labelStyle={{ color: "#94A3B8", fontWeight: "bold" }}
                  itemStyle={{ color: "#FFF" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart (Order Distribution) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-headings">
              Order Allocation
            </h3>
            <p className="text-sm text-slate-400">
              Breakdown by transit fulfillment state
            </p>
          </div>
          <div className="h-50 my-auto flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 text-center border-t border-slate-100 pt-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name}>
                <span className="text-base font-medium text-descriptions tracking-tight block">
                  {d.name}
                </span>
                <span className="text-sm font-bold text-headings mt-0.5 block">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart (Platform Users/Delivered Ratio) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Ecosystem Distribution
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Comparative balance between vendors, clients, and conversions
            </p>
          </div>
          <div className="h-65">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#F8FAFC" }}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  itemStyle={{ color: "#FFF" }}
                />
                <Bar
                  dataKey="count"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOverview;
