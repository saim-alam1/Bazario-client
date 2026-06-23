import { Helmet } from "react-helmet-async";
import ManageVendorsTable from "./ManageVendorsTable";

const ManageVendors = () => {
  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Manage Vendors | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage vendor accounts across the marketplace. Review vendor activity, verify sellers, suspend accounts that violate platform policies, reactivate approved vendors, or permanently remove accounts when necessary."
        />
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-headings sm:text-3xl">
            Manage Vendor Accounts
          </h1>

          <p className="mt-1.5 text-sm text-descriptions">
            Monitor and manage vendor accounts across the marketplace. Review
            seller information, verify business legitimacy, identify policy
            violations, suspend vendors involved in misconduct, reactivate
            eligible accounts, or permanently remove vendors when necessary to
            maintain a secure and trustworthy platform.
          </p>
        </div>
      </div>
      <ManageVendorsTable />
    </section>
  );
};

export default ManageVendors;
