import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AnalyticsStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: analyticsStats = {}, isLoading } = useQuery({
    queryKey: ["admin-analytics-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("admin-analytics");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    totalPlatformFeeGenerated = 0,
    totalRevenueReceived = 0,
    totalRevenueDue = 0,
    thisMonthRevenue = 0,
    thisYearRevenue = 0,
    totalCustomers = 0,
    totalVendors = 0,
    categoryPerformance = [],
    orderStatus = {},
    last7DaysSales = [],
    topVendors = [],
  } = analyticsStats;

  const {
    totalOrdersPlaced = 0,
    totalOrdersInTransit = 0,
    totalOrdersDelivered = 0,
  } = orderStatus;

  // English numbers with BDT formatting (e.g., 32,320৳)
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Upper Top Navbar / Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            E-Commerce Management Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-slate-700">
              {user?.displayName || "Admin"}
            </span>
            . Here's your platform summary.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-xs font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Platform Overview (BDT)
        </div>
      </div>

      {/* KPI Highlight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
        {/* Card 1: Platform Fee */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-descriptions mb-2">
            <span className="text-sm font-semibold tracking-wider">
              Platform Fee Generated
            </span>
          </div>
          <div className="text-2xl font-bold text-headings">
            {formatCurrency(totalPlatformFeeGenerated)}
          </div>
          <div className="text-sm text-emerald-600 font-medium mt-1">
            ↑ Direct revenue share
          </div>
        </div>

        {/* Card 2: Received Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-descriptions mb-2">
            <span className="text-sm font-semibold tracking-wider">
              Revenue Received
            </span>
          </div>
          <div className="text-2xl font-bold text-headings">
            {formatCurrency(totalRevenueReceived)}
          </div>
          <div className="text-sm text-descriptions mt-1">
            Deposited into bank accounts
          </div>
        </div>

        {/* Card 3: Due Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-descriptions mb-2">
            <span className="text-sm font-semibold tracking-wider">
              Revenue Outstanding
            </span>
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {formatCurrency(totalRevenueDue)}
          </div>
          <div className="text-sm text-descriptions mt-1">
            In processing queue
          </div>
        </div>

        {/* Card 4: Periodic Targets */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-descriptions mb-2">
            <p className="text-sm font-semibold tracking-wider">
              Revenue This Month:
            </p>
            <div className="text-xl font-bold text-headings">
              {formatCurrency(thisMonthRevenue)}
            </div>
          </div>

          <div className="text-descriptions">
            <p className="text-sm font-semibold tracking-wider">
              Revenue This Year:
            </p>
            <div className="text-xl font-bold text-headings">
              {formatCurrency(thisYearRevenue)}
            </div>
          </div>
        </div>

        {/* Card 5: Core Ecosystem */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-descriptions mb-2">
            <span className="text-sm font-semibold tracking-wider">
              Ecosystem Size
            </span>
          </div>
          <div className="text-xl font-bold text-headings">
            {totalCustomers}{" "}
            <span className="text-xs font-normal text-descriptions">
              Buyers
            </span>
          </div>
          <div className="text-xl font-bold text-headings mt-1">
            {totalVendors}{" "}
            <span className="text-xs font-normal text-descriptions">
              Verified Merchants
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
        {/* Line Chart: Last 7 Days Sales Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm xl:col-span-7">
          <div className="mb-4">
            <h3 className="text-base font-bold text-headings">
              Recent Sales Trend
            </h3>
            <p className="text-xs text-slate-400">
              Daily revenue insights for the last rolling week timeframe
            </p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={last7DaysSales}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="_id"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                  itemStyle={{ color: "#38bdf8" }}
                  formatter={(value) => [
                    `${value.toLocaleString("en-BD")}৳`,
                    "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Market Vertical Split */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm xl:col-span-5">
          <div className="mb-4">
            <h3 className="text-base font-bold text-headings">
              Category Performance
            </h3>
            <p className="text-xs text-slate-400">
              Revenue generation compared to corresponding platform cuts
            </p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryPerformance}
                margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="_id"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f7f1e3",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  itemStyle={{ fontSize: "12px" }}
                  // Passing 'name' directly ensures it respects the Bar components' name props
                  formatter={(value, name) => [
                    `${value.toLocaleString("en-BD")}৳`,
                    name,
                  ]}
                />
                <Legend
                  iconSize={10}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
                <Bar
                  dataKey="categoryRevenue"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                  name="Category Gross"
                />
                <Bar
                  dataKey="platformRevenue"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  name="Platform Share"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Operational Breakdown Matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Fulfillment Pipeline Progression */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Fulfillment Engine
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Real-time status tracking of all current transactional orders
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Processing / Placed</span>
                  <span className="text-slate-900">
                    {totalOrdersPlaced} orders
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{
                      width: `${(totalOrdersPlaced / (totalOrdersPlaced + totalOrdersInTransit + totalOrdersDelivered || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">In Transit</span>
                  <span className="text-slate-900">
                    {totalOrdersInTransit} orders
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{
                      width: `${(totalOrdersInTransit / (totalOrdersPlaced + totalOrdersInTransit + totalOrdersDelivered || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Delivered Successfully</span>
                  <span className="text-slate-900">
                    {totalOrdersDelivered} orders
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{
                      width: `${(totalOrdersDelivered / (totalOrdersPlaced + totalOrdersInTransit + totalOrdersDelivered || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>Total Logged Operations</span>
            <span className="font-bold text-slate-800">
              {totalOrdersPlaced + totalOrdersInTransit + totalOrdersDelivered}{" "}
              Units
            </span>
          </div>
        </div>

        {/* Top Vendors Leaderboard Grid */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-base font-bold text-headings">
              Top Performing Merchants
            </h3>
            <p className="text-xs text-descriptions">
              Highest grossing vendors sorted by total earnings generated
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-2">Store / Merchant</th>
                  <th className="py-3 px-2 text-center whitespace-nowrap">
                    Units Sold
                  </th>
                  <th className="py-3 px-2 text-right whitespace-nowrap">
                    Total Gross
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {topVendors.map((vendor, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-2 space-y-1">
                      <div className="font-bold text-headings">
                        {vendor.storeName}
                      </div>
                      <div className="text-descriptions text-sm font-normal">
                        {vendor.vendorName} • {vendor.vendorEmail}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center text-descriptions">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-descriptions font-semibold">
                        {vendor.totalUnitSold}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-emerald-600 font-bold">
                      {formatCurrency(vendor.totalEarning)}
                    </td>
                  </tr>
                ))}
                {topVendors.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-6 text-slate-400 font-normal"
                    >
                      No vendor analytics recorded for this cycle.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsStats;
