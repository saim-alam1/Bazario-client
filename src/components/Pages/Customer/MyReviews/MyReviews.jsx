import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import MyReviewsTable from "./MyReviewsTable";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["ordered-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`received-products/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>{`${user?.displayName} Review's | Dashboard`}</title>
        <meta
          name="description"
          content="Give your products vendor your reviews about the product you have purchased from him."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">
          {user?.displayName} Review's
        </h1>
        <p className="text-descriptions mt-2">
          Give your products vendor your reviews about the product you have
          purchased from him.
        </p>
      </div>

      <MyReviewsTable products={products} />
    </section>
  );
};

export default MyReviews;
