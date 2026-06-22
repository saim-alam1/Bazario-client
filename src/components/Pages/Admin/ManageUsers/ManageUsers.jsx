import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Manage Users | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage customer accounts across the platform. Review user activity, suspend accounts that violate platform policies, reactivate users when appropriate, or permanently remove accounts when necessary."
        />
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-headings sm:text-3xl">
            Manage Customer Accounts
          </h1>

          <p className="mt-1.5 text-sm text-descriptions">
            Monitor and manage customer accounts across the platform. Review
            user information, identify policy violations, suspend accounts for
            misconduct, reactivate eligible users, or permanently remove
            accounts when necessary to maintain a safe and trusted marketplace.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
