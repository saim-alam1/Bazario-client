import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import CartTable from "./CartTable";
import { useState } from "react";

const MyCart = () => {
  const { getItems } = useLocalStorage("cart-items");
  const [cartIds, setCartIds] = useState(getItems());
  const axiosInstance = useAxios();

  const { data: cartData = [], isLoading } = useQuery({
    queryKey: ["cart-products", cartIds],
    queryFn: async () => {
      const res = await axiosInstance.post("/local-products", {
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
        <title>Cart Items | Bazario</title>
        <meta
          name="description"
          content="View and manage your shopping cart items. You can buy items also you can remove them from your cart items from here."
        />
      </Helmet>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-headings capitalize">
          Cart Items
        </h2>

        <p className="text-lg text-descriptions mt-4">
          In this section you can see the items, products details you have added
          to the cart. You can go for buy option or remove them from here
          easily.
        </p>
      </div>

      <CartTable cartData={cartData} setCartIds={setCartIds} />
    </section>
  );
};

export default MyCart;
