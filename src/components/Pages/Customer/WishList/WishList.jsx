import { Helmet } from "react-helmet-async";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import { useState } from "react";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import WishListTable from "./WishListTable";

const WishList = () => {
  const { getItems } = useLocalStorage("wishlist-items");
  const [wishIds, setWishIds] = useState(getItems());
  const axiosInstance = useAxios();

  const { data: wishList = [], isLoading } = useQuery({
    queryKey: ["wishlist-products", wishIds],
    queryFn: async () => {
      const res = await axiosInstance.post("/local-products", {
        ids: wishIds,
      });

      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      {/* Helmet */}
      <Helmet>
        <title>Wish List Items | Bazario</title>
        <meta
          name="description"
          content="View and manage your shopping wish list items. You can buy items also you can remove them from your wish list items from here."
        />
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-headings">Wish List Items</h2>
        <p className="text-descriptions mt-2 max-w-9/12">
          In this section you can see the items, products details you have added
          to the wish list. You can go for buy option or remove them from here
          easily.
        </p>
      </div>

      <WishListTable wishList={wishList} setWishIds={setWishIds} />
    </section>
  );
};

export default WishList;
