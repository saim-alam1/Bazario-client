import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import DiscountsTable from "./DiscountsTable";

const Discounts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["my-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`my-products/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Manage Discounts | Bazario</title>
        <meta
          name="description"
          content="Track and manage all kinds of discounts, flash discounts on your products from your vendor discounts route."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">Manage Discounts</h1>
        <p className="text-descriptions mt-2">
          Monitor your all kinds of discounts, flash discounts on your products
          from your vendor discounts route.
        </p>
      </div>

      <DiscountsTable products={products} />
    </section>
  );
};

export default Discounts;
