import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import ReviewsTable from "./ReviewsTable";

const Reviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`reviews/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      {/* Helmet */}
      <Helmet>
        <title>Vendors's products Reviews | Bazario</title>
        <meta
          name="description"
          content="View and manage your shopping wish list items. You can buy items also you can remove them from your wish list items from here."
        />
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-headings">
          {user?.displayName}'s products Reviews
        </h2>
        <p className="text-descriptions mt-2 max-w-9/12">
          In this section you can see reviews about the items, products you have
          delivered to the customers.
        </p>
      </div>
      <ReviewsTable reviews={reviews} />
    </section>
  );
};

export default Reviews;
