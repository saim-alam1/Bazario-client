import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";

const Payouts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: currencyStats = {}, isLoading } = useQuery({
    queryKey: ["vendors-currency-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`vendors-currency-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const formattedStats = {
    monthly: `${currencyStats.monthlyRevenue?.toLocaleString() || 0} ৳`,
    net: `${currencyStats.netRevenue?.toLocaleString() || 0} ৳`,
    due: `${currencyStats.platformFeeDue?.toLocaleString() || 0} ৳`,
    paid: `${currencyStats.totalPlatformFeePaid?.toLocaleString() || 0} ৳`,
    total: `${currencyStats.totalRevenue?.toLocaleString() || 0} ৳`,
  };

  return (
    <section className="mx-auto max-w-7xl my-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800">
      <Helmet>
        <title>
          {user?.displayName
            ? `${user.displayName} - Payouts | Partner Central`
            : "Vendor Payouts | Partner Central"}
        </title>
        <meta
          name="description"
          content="Manage your marketplace earnings, settle outstanding commissions, and track platform distributions securely."
        />
        <meta name="robots" content="noindex, nofollow" />{" "}
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
            Payout & Financial Overview
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back,{" "}
            <span className="font-semibold text-gray-700">
              {user?.displayName}
            </span>
            . Manage your platform balances, commissions, and withdrawal
            requests.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm text-orange-800 max-w-xs">
          💡 <span className="font-semibold">Note:</span> Platform charges a
          standard 10% commission on finalized sales orders.
        </div>
      </div>

      {/* Main Financial Highlights */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-orange-500 to-amber-600 p-6 text-white shadow-sm transition hover:shadow-md md:col-span-1">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="140"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <p className="text-sm font-medium uppercase tracking-wider text-orange-100">
            Net Withdrawable Balance
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
            {formattedStats.net}
          </h2>
          <p className="mt-1 text-xs text-orange-100 opacity-90">
            Available for immediate settlement
          </p>
          <div className="mt-6">
            <button className="w-full sm:w-auto bg-white text-orange-600 font-semibold px-5 py-2.5 rounded-lg text-sm transition hover:bg-orange-50 active:scale-[0.98] shadow-sm">
              Request Withdrawal
            </button>
          </div>
        </div>

        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
          {/* Monthly Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                This Month's Revenue
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                Mtd
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {formattedStats.monthly}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Gross sales generated this month
            </p>
          </div>

          {/* Total Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Lifetime Gross Revenue
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                Total
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {formattedStats.total}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Cumulative sales platform-wide
            </p>
          </div>

          {/* Platform Fee Due */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Platform Commission Due
              </span>
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                Action Required
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-red-600">
              {formattedStats.due}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Pending fees to keep store active
            </p>
          </div>

          {/* Total Platform Fee Paid */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Total Commissions Paid
              </span>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                Settled
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {formattedStats.paid}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Cleared invoices historical data
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Fee Clearances */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <h2 className="font-semibold text-gray-900">
                Outstanding Commission Fees
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500">
              {user?.email}
            </span>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Clear your pending platform fees promptly to guarantee
              uninterrupted storefront visibility and avoid payout freezes.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
              <div>
                <span className="text-xs font-medium text-red-800 block uppercase tracking-wider">
                  Total Due Amount
                </span>
                <span className="text-xl font-bold text-red-700">
                  {formattedStats.due}
                </span>
              </div>
              <button
                disabled={currencyStats.platformFeeDue <= 0}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium text-sm py-2 px-5 rounded-lg shadow-sm transition active:scale-[0.99]"
              >
                Clear Outstanding Fees
              </button>
            </div>
          </div>
        </div>

        {/* Payout / Disbursements */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">💳</span>
              <h2 className="font-semibold text-gray-900">
                Disbursement Preferences
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500">
              Merchant Account
            </span>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Withdrawals are processed into your verified business bank account
              or local digital wallet within 2-3 enterprise banking days.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-emerald-50 border border-emerald-100">
              <div>
                <span className="text-xs font-medium text-emerald-800 block uppercase tracking-wider">
                  Withdrawable Sum
                </span>
                <span className="text-xl font-bold text-emerald-700">
                  {formattedStats.net}
                </span>
              </div>
              <button
                disabled={currencyStats.netRevenue <= 0}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium text-sm py-2 px-5 rounded-lg shadow-sm transition active:scale-[0.99]"
              >
                Trigger Payout Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payouts;
