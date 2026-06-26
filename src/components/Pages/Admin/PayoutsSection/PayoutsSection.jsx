import { Helmet } from "react-helmet-async";
import PayoutsTable from "./PayoutsTable";

const PayoutsSection = () => {
  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Admin Payouts | Admin Dashboard</title>
        <meta
          name="description"
          content="Review and manage vendor withdrawal requests. Approve or reject payout requests to ensure secure and transparent fund disbursement."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
          Vendor Payout Requests
        </h1>

        <p className="mt-2 max-w-3xl text-descriptions">
          Review vendors' withdrawal requests, verify payout details, and
          approve or reject requests to maintain secure and transparent payment
          processing across the marketplace.
        </p>
      </div>
      <PayoutsTable />
    </section>
  );
};

export default PayoutsSection;
