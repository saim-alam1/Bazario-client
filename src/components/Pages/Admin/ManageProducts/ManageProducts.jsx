import { Helmet } from "react-helmet-async";
import ManageProductsTable from "./ManageProductsTable";

const ManageProducts = () => {
  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Manage Products | Admin Dashboard</title>
        <meta
          name="description"
          content="Review and manage products submitted by vendors. Approve products for marketplace visibility, reject items that violate platform policies, and maintain quality standards across the Bazario platform."
        />
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-headings sm:text-3xl">
            Manage Marketplace Products
          </h1>

          <p className="mt-1.5 text-sm text-descriptions">
            Review products submitted by vendors and determine whether they meet
            Bazario's quality standards and marketplace policies. Approve
            products for public listing, reject inappropriate or non-compliant
            items, and help maintain a safe, reliable, and trustworthy shopping
            experience for customers.
          </p>
        </div>
      </div>
      <ManageProductsTable />
    </section>
  );
};

export default ManageProducts;
