import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";

const Reviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const { data: reviews = [], isLoading } = useQuery({
  //   queryKey: ["reviews", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure(`reviews/${user?.email}`);
  //     return res.data;
  //   },
  // });

  // if (isLoading) return <Loading />;

  // console.log(reviews);

  return (
    <section>
      <h1>Reviews</h1>
    </section>
  );
};

export default Reviews;
