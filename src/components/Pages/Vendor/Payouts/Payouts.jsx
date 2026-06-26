import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import useUserRole from "../../../../Hooks/useUserRole";
import PayCommission from "../PayCommission/PayCommission";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useNotifications from "../../../../Hooks/useNotifications";

const Payouts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userRole, roleLoading } = useUserRole();
  const [hideCommissionForm, setHideCommissionForm] = useState(false);
  const [showAmountField, setShowAmountField] = useState(false);
  const { addNotification } = useNotifications();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  const { data: currencyStats = {}, isLoading } = useQuery({
    queryKey: ["vendors-currency-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`vendors-currency-stats/${user?.email}`);
      return res.data;
    },
  });

  // Loading Withdrawal Request Status
  const { data: withdrawalReqStatus = {} } = useQuery({
    queryKey: ["withdrawal-request-status", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`withdrawal-request-status/${user?.email}`);
      return res.data;
    },
  });

  const formattedStats = {
    monthly: `${currencyStats.monthlyRevenue?.toLocaleString() || 0} ৳`,
    net: `${currencyStats.vendorsEarnings?.toLocaleString() || 0} ৳`,
    due: `${currencyStats.platformFeeDue?.toLocaleString() || 0} ৳`,
    paid: `${currencyStats.totalPlatformFeePaid?.toLocaleString() || 0} ৳`,
    total: `${currencyStats.totalRevenue?.toLocaleString() || 0} ৳`,
    withdrawn: `${withdrawalReqStatus?.totalWithdrawn?.toLocaleString() || 0} ৳`,
  };

  const handleWithdrawRequest = (data) => {
    const withdrawalReq = {
      vendorName: user?.displayName,
      vendorEmail: user?.email,
      amount: data.amount,
      ...data,
    };

    requestWithdrawal(withdrawalReq);
  };

  const { mutate: requestWithdrawal, isPending } = useMutation({
    mutationFn: async (requestInfo) => {
      const res = await axiosSecure.post(
        `vendor-earning-withdraw-request/${user?.email}`,
        requestInfo,
      );
      return res.data;
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["withdrawal-request-status", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: `Request sent to admin for ${variables.amount}৳ withdrawal`,
      });

      toast.success(
        data?.message ||
          `Request sent to admin for ${variables.amount}৳ withdrawal`,
      );
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  if (isLoading || roleLoading) return <Loading />;

  return (
    <section className="mx-auto max-w-7xl my-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-headings">
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
          <h1 className="text-2xl font-bold text-headings tracking-tight sm:text-3xl">
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
        <div className="h-fit relative overflow-hidden rounded-xl bg-linear-to-br from-orange-500 to-amber-600 p-6 text-white shadow-sm transition hover:shadow-md">
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
        </div>

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
          <h3 className="mt-2 text-2xl font-bold text-headings">
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
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-headings">
              Total
            </span>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-headings">
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
          <h3 className="mt-2 text-2xl font-bold text-headings">
            {formattedStats.paid}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Cleared invoices historical data
          </p>
        </div>

        {/* Total Withdrew Money */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Total Withdrawn Amount
            </span>
            <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
              Disbursed
            </span>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-headings">
            {formattedStats.withdrawn}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Successfully transferred to your accounts
          </p>
        </div>
      </div>

      {/* <div className="grid gap-6 lg:grid-cols-2"> */}
      <div className="flex flex-col gap-6  items-start lg:flex-row">
        {/* Platform Fee Clearances */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <h2 className="font-semibold text-headings">
                Outstanding Commission Fees
              </h2>
            </div>
            <span className="text-sm font-mono text-descriptions">
              {user?.email}
            </span>
          </div>
          <div className="p-6">
            <p className="text-sm text-descriptions mb-4">
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
                onClick={() => setHideCommissionForm(!hideCommissionForm)}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium text-sm py-2 px-5 rounded-lg shadow-sm transition active:scale-[0.99] cursor-pointer"
              >
                Clear Platform Fees
              </button>
            </div>
            <div
              className={`${hideCommissionForm ? "flex items-center justify-center" : "hidden"} w-full`}
            >
              <PayCommission />
            </div>
          </div>
        </div>

        {/* Payout / Disbursements */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">💳</span>
              <h2 className="font-semibold text-headings">
                Disbursement Preferences
              </h2>
            </div>
            <span className="text-sm font-mono text-gray-500">
              {userRole} Account
            </span>
          </div>
          <div className="p-6">
            <p className="text-sm text-headings mb-4">
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
                disabled={
                  currencyStats.netRevenue <= 0 ||
                  withdrawalReqStatus?.status === "requested"
                }
                onClick={() => setShowAmountField(!showAmountField)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium text-sm py-2 px-5 rounded-lg shadow-sm transition active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
              >
                {withdrawalReqStatus?.status === "requested"
                  ? `Requested ${withdrawalReqStatus?.amount}৳`
                  : "Request Withdrawal"}
              </button>
            </div>
          </div>

          <div
            className={`${showAmountField ? "flex items-center justify-center w-full" : "hidden"} p-6`}
          >
            <form
              className="fieldset w-full"
              onSubmit={handleSubmit(handleWithdrawRequest)}
            >
              {/* Amount */}
              <div className="space-y-2">
                <label className="block mb-1 text-[18px] text-descriptions">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="Withdraw Amount"
                  className="block placeholder:text-sm
      placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("amount", {
                    required: "Amount is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Amount must be at least 1৳",
                    },
                  })}
                />
                {errors.amount && (
                  <span className="text-red-500 text-[16px] mt-2">
                    {errors.amount.message}
                  </span>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="block mb-1 text-[18px] text-descriptions">
                  Payment Method
                </label>
                <select
                  defaultValue=""
                  {...register("paymentMethod", {
                    required: "Payment Method is required",
                  })}
                  className="w-full px-4 py-3 text-sm text-headings bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>
                    Select Method
                  </option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Upay">Upay</option>
                </select>
                {errors.paymentMethod && (
                  <span className="text-red-500 text-[16px] mt-1">
                    Payment Method field is required
                  </span>
                )}
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="block mb-1 text-[18px] text-descriptions">
                  Account Number
                </label>
                <input
                  type="number"
                  placeholder="Account Number"
                  className="block placeholder:text-sm
      placeholder:font-medium w-full px-3 py-3 text-headings bg-white border border-gray-200 text-sm rounded-lg focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("accountNumber", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />

                {errors.accountNumber && (
                  <span className="text-red-500 text-[16px] mt-1">
                    Account Number field is required
                  </span>
                )}
              </div>
              <button
                disabled={isPending}
                className="btn bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold mt-4"
              >
                {isPending ? "Sending Request..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payouts;
