import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: productsData = [], isLoading } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`my-products/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>My Products | Vendor Dashboard</title>
        <meta
          name="description"
          content="Manage all your uploaded products in your vendor dashboard. View, edit, and delete items, track stock levels, and keep your store updated easily."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">My Products</h1>
        <p className="text-descriptions mt-2 max-w-10/12">
          Manage all your uploaded products in your vendor dashboard. View,
          edit, and delete items, track stock levels, and keep your store
          updated easily.
        </p>
      </div>

      {/* Products Table */}
      <ProductsTable productsData={productsData} />
    </section>
  );
};

export default Products;
