import { Helmet } from "react-helmet-async";
import ReportsTable from "./ReportsTable";

const Reports = () => {
  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Manage Reports | Bazario</title>
        <meta
          name="description"
          content="Review and take action on reports submitted by customers and vendors regarding fake products, fraudulent reviews, and policy violations."
        />
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-headings">
          Administrative Reports Overview
        </h2>
        <p className="text-descriptions mt-2">
          Monitor and investigate platform disputes. Review flagged content,
          fake reviews, and reported products submitted by vendors or customers
          to maintain marketplace integrity.
        </p>
      </div>
      <ReportsTable />
    </section>
  );
};

export default Reports;
