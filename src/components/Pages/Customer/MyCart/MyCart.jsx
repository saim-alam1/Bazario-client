import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import CartTable from "./CartTable";

const MyCart = () => {
  const { getItems } = useLocalStorage("cart-items");
  const axiosInstance = useAxios();

  const cartIds = getItems();

  const { data: cartData = [], isLoading } = useQuery({
    queryKey: ["cart-products", cartIds],
    queryFn: async () => {
      const res = await axiosInstance.post("/cart-products", {
        ids: cartIds,
      });

      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-11/12 mx-auto my-10">
      {/* Helmet */}
      <Helmet>
        <title>My Cart | Bazario</title>
        <meta
          name="description"
          content="View and manage your shopping cart items. You can buy items also you can remove them from your cart items from here."
        />
      </Helmet>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-headings capitalize">
          My Cart
        </h2>

        <p className="text-lg text-descriptions mt-4 max-w-3xl mx-auto">
          Manage and update your profile, including personal details, contact
          information, and account settings.
        </p>
      </div>

      <CartTable cartData={cartData} />
    </section>
  );
};

export default MyCart;
