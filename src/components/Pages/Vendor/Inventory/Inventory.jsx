import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import InventoryTable from "./InventoryTable";

const Inventory = () => {
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
    <section className="my-16 px-3 w-full">
      {/* React Helmet */}
      <Helmet>
        <title>My Inventory | Vendor Dashboard</title>

        <meta
          name="description"
          content="Manage your inventory, restock products, apply quick discounts, and monitor low stock items from your vendor dashboard."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-headings">My Inventory's</h1>
        <p className="text-descriptions mt-2 max-w-10/12">
          Manage your inventory, restock products, apply quick discounts, and
          monitor low stock items from your vendor dashboard.
        </p>
      </div>

      {/* Products Table */}
      <InventoryTable productsData={productsData} />
    </section>
  );
};

export default Inventory;
