import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";

const MyCart = () => {
  const { getItems } = useLocalStorage("cart-items");
  const axiosInstance = useAxios();

  const cartIds = getItems();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart-products", cartIds],
    queryFn: async () => {
      const res = await axiosInstance.post("/cart-products", {
        ids: cartIds,
      });

      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(cartData);

  return (
    <section>
      <h1>MyCart</h1>
    </section>
  );
};

export default MyCart;
