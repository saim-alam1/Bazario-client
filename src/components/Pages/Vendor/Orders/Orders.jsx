import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const Lottie = LottiePlayer.default || LottiePlayer;

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`vendor-orders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          Your order is empty
        </h3>

        <p className="text-descriptions mt-2">
          Looks like you haven't received any orders yet.
        </p>
      </div>
    );
  }

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Orders | Bazario</title>
        <meta
          name="description"
          content="View and manage your which been ordered by customers. In this component you can track the orders you have received & send them to the customers by parcel or your own facilities if you have."
        />
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-headings">Manage Orders</h2>
        <p className="text-descriptions mt-2 max-w-10/12">
          View and manage your which been ordered by customers. In this
          component you can track the orders you have received & send them to
          the customers by parcel or your own facilities if you have.
        </p>
      </div>

      <OrdersTable orders={orders} />
    </section>
  );
};

export default Orders;
