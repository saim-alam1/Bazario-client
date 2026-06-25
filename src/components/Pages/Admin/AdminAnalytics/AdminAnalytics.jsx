import { Helmet } from "react-helmet-async";
import AnalyticsStats from "./AnalyticsStats";

const AdminAnalytics = () => {
  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Platform Analytics & Insights | Admin Dashboard</title>
        <meta
          name="description"
          content="Track business metrics and platform performance on Bazario. Monitor monthly and annual earnings, identify top-selling products and leading vendors, track order fulfillment states, and review category metrics or inventory alerts."
        />
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-headings sm:text-3xl">
            Platform Analytics & Insights
          </h1>

          <p className="mt-1.5 text-sm text-descriptions max-w-4xl">
            Review live performance data across the marketplace. Monitor
            platform revenue streams for this month and year, keep tabs on
            top-performing vendors and high-demand products, track full order
            lifecycle (pending, in-transit, delivered), and act on critical
            operational alerts such as low stock counts and performance drops by
            category.
          </p>
        </div>
      </div>
      <AnalyticsStats />
    </section>
  );
};

export default AdminAnalytics;
