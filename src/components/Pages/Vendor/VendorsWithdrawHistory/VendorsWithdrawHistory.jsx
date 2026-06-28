import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import WithdrawalTable from "./WithdrawalTable";

const VendorsWithdrawHistory = () => {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl my-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-headings">
      <Helmet>
        <title>Withdrawal History | Vendor Dashboard</title>
        <meta
          name="description"
          content="Review your complete withdrawal history, including requested amounts, payment methods, approval status, request dates, and payout records. Track every withdrawal request made from your vendor account and stay informed about completed, pending, or rejected payouts."
        />
        <meta
          name="keywords"
          content="Vendor withdrawal history, payout history, withdrawal records, vendor earnings, payment history, approved withdrawals, pending payouts, rejected withdrawals, vendor dashboard, e-commerce vendor"
        />
      </Helmet>
      <div className="mb-9">
        <h2 className="text-3xl font-bold text-headings">
          {user?.displayName}'s Withdrawal History
        </h2>
        <p className="text-descriptions mt-2">
          Keep track of every withdrawal request you've submitted. View
          requested amounts, payment methods, request dates, and the current
          status of each payout, whether it's pending, approved, or rejected—all
          in one place.
        </p>
      </div>
      <WithdrawalTable />
    </section>
  );
};

export default VendorsWithdrawHistory;
