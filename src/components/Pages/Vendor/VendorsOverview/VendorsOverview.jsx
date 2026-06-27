import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router";
import {
  FaChevronRight,
  FaBox,
  FaCheckCircle,
  FaPauseCircle,
  FaWarehouse,
  FaTag,
  FaBolt,
  FaExclamationTriangle,
  FaShoppingBag,
  FaTruck,
  FaHandshake,
  FaCreditCard,
  FaReceipt,
} from "react-icons/fa";

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
    enabled: !!user?.email,
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
      icon: <FaBox className="text-blue-500" />,
    },
    {
      title: "Active Products",
      value: productsStats.activeProducts || 0,
      icon: <FaCheckCircle className="text-emerald-500" />,
    },
    {
      title: "Paused Products",
      value: productsStats.pausedProducts || 0,
      icon: <FaPauseCircle className="text-amber-500" />,
    },
    {
      title: "Total Stock Units",
      value: productsStats.totalStockUnits || 0,
      icon: <FaWarehouse className="text-indigo-500" />,
    },
    {
      title: "Products On Discount",
      value: productsStats.productsOnDiscount || 0,
      icon: <FaTag className="text-purple-500" />,
    },
    {
      title: "Products On Flash Discount",
      value: productsStats.productsOnFlashDiscount || 0,
      icon: <FaBolt className="text-fuchsia-500" />,
    },
    {
      title: "Low Stock Items",
      value: productsStats.lowStockProducts || 0,
      icon: <FaExclamationTriangle className="text-rose-500" />,
      isAlert: productsStats.lowStockProducts > 0,
    },
    {
      title: "Total Orders",
      value: productsStats.totalOrders || 0,
      icon: <FaShoppingBag className="text-sky-500" />,
    },
    {
      title: "Orders In Transit",
      value: productsStats.totalProductsInTransit || 0,
      icon: <FaTruck className="text-cyan-500" />,
    },
    {
      title: "Orders Delivered",
      value: productsStats.productsDelivered || 0,
      icon: <FaHandshake className="text-teal-500" />,
    },
    {
      title: "Platform Fee Due",
      value: `${productsStats.platformFeeDue || 0}৳`,
      icon: <FaCreditCard className="text-red-500" />,
      isAlert: productsStats.platformFeeDue > 0,
    },
    {
      title: "Platform Fee Paid",
      value: `${productsStats.totalPlatformFeePaid || 0}৳`,
      icon: <FaReceipt className="text-emerald-600" />,
    },
  ];

  const chartData = [
    {
      name: "Active",
      value: productsStats.activeProducts || 0,
      color: "#10B981",
    },
    {
      name: "Paused",
      value: productsStats.pausedProducts || 0,
      color: "#F59E0B",
    },
    {
      name: "Discounted",
      value: productsStats.productsOnDiscount || 0,
      color: "#3B82F6",
    },
    {
      name: "Flash Sales",
      value: productsStats.productsOnFlashDiscount || 0,
      color: "#8B5CF6",
    },
    {
      name: "Low Stock",
      value: productsStats.lowStockProducts || 0,
      color: "#EF4444",
    },
  ].filter((item) => item.value > 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Helmet>
        <title>Vendor Overview | Bazario</title>
        <meta
          name="description"
          content="Track products, stock levels, discounts, and inventory performance from your vendor dashboard."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="mb-10 border-b border-base-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-headings sm:text-4xl">
          Vendor Dashboard
        </h1>
        <p className="mt-2 text-sm text-descriptions">
          Real-time insights for your metrics, active stock distribution, and
          operation overheads.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              stat.isAlert
                ? "border-red-200 bg-red-50/40 shadow-sm"
                : "border-base-200 bg-base-100 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-descriptions">
                {stat.title}
              </span>
              <div className="text-xl p-2 bg-base-200/50 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-headings">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Split layout for Charts & Interactive Actions */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Pie Chart Card */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-headings">
              Product Distribution
            </h3>
            <p className="text-xs text-descriptions mb-4">
              Proportional split of stock states and promotion scopes.
            </p>
          </div>
          <div className="h-72 w-100">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#F9FAFB",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                    }}
                    itemStyle={{ color: "#1F2937", fontWeight: 500 }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-descriptions">
                No active inventory distribution data available.
              </div>
            )}
          </div>
        </div>

        {/* Flash Deals Mini Card */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔥</span>
              <h3 className="text-lg font-bold tracking-tight text-headings">
                Flash Deals Summary
              </h3>
            </div>
            <p className="text-xs text-descriptions mb-6">
              Current campaign promotional performances.
            </p>
          </div>

          <div className="divide-y divide-base-200 text-sm grow">
            <div className="flex justify-between py-3">
              <span className="text-descriptions">Total Campaign Items</span>
              <span className="font-semibold text-headings">
                {flashSummary.totalDiscountedProducts || 0}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-descriptions">Active Promotions</span>
              <span className="font-semibold text-emerald-600">
                {flashSummary.activeFlashDeals || 0}
              </span>
            </div>
            <div className="flex flex-col py-3 gap-1">
              <span className="text-descriptions">Peak Discount Placement</span>
              <span className="font-medium text-headings text-xs truncate max-w-xs">
                {flashSummary.highestDiscountProduct?.productName
                  ? `${flashSummary.highestDiscountProduct.productName} (${flashSummary.highestDiscountProduct.flashDiscount}%)`
                  : "None Active"}
              </span>
            </div>
            <div className="flex flex-col py-3 gap-1 border-b border-base-200">
              <span className="text-descriptions">
                Floor Discount Placement
              </span>
              <span className="font-medium text-headings text-xs truncate max-w-xs">
                {flashSummary.lowestDiscountProduct?.productName
                  ? `${flashSummary.lowestDiscountProduct.productName} (${flashSummary.lowestDiscountProduct.flashDiscount}%)`
                  : "None Active"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Status Row: Low Stock & Payments Due */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Low Stock Panel */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-headings flex items-center gap-2">
                <FaExclamationTriangle className="text-rose-500 text-sm" />{" "}
                Restock Indicators
              </h3>
              <p className="text-xs text-descriptions mt-0.5">
                Products falling behind your targeted baseline thresholds.
              </p>
            </div>
          </div>

          {lowStockProducts.length ? (
            <div className="max-h-77.5 overflow-y-auto space-y-3 pr-1">
              {lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between rounded-xl border border-base-200 p-3 hover:bg-base-200/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-11 w-11 rounded-lg bg-base-200 object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-headings">
                        {product.productName}
                      </h4>
                      <p className="text-xs font-medium text-rose-500 mt-0.5">
                        {product.stockQuantity} items left
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard-layout/inventory"
                    className="ml-4 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors shrink-0"
                  >
                    Restock
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-base-300 p-4 text-center">
              <p className="text-sm font-medium text-descriptions">
                All product inventories are stable.
              </p>
            </div>
          )}
        </div>

        {/* Financial Commissions Panel */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-headings flex items-center gap-2">
              <FaCreditCard className="text-red-500 text-sm" /> Platform
              Settlements
            </h3>
            <p className="text-xs text-descriptions mt-0.5">
              Review outstanding overheads and platform operating bills.
            </p>
          </div>

          <div className="my-auto py-6">
            <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/30 p-4">
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-headings">
                  Platform Commission Due
                </h4>
                <p className="text-2xl font-extrabold text-red-600 mt-1">
                  {currencyStats?.platformFeeDue || 0}৳
                </p>
              </div>
              <Link
                to="/dashboard-layout/payouts"
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                Settle Balance <FaChevronRight className="text-xs" />
              </Link>
            </div>
          </div>

          <div className="text-center bg-base-200/40 rounded-xl py-3 border border-base-200">
            <span className="text-xs text-descriptions">
              Need processing help? Visit our{" "}
              <Link
                to="/support"
                className="underline text-headings font-medium"
              >
                Billing Support
              </Link>{" "}
              clearings channel.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorsOverview;
