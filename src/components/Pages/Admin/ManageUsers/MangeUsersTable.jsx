import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../UI/Loading/Loading";

const MangeUsersTable = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["Load-customers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/manage-customers");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!customers?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          Your Cart Is Empty
        </h3>

        <p className="text-descriptions mt-2">
          Looks like you haven't added any products to your cart yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="table w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Status</th>
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-50 transition">
              <td>
                <div className="flex items-center gap-3">
                  <div className="text-headings">{customer.fullName}</div>
                </div>
              </td>

              <td className="text-headings">{customer.email}</td>

              <td className="text-headings">+{customer.contactNumber}</td>

              <td className="text-headings">{customer.stockQuantity}</td>

              <td className="text-headings">
                {new Date(customer.registeredAt).toLocaleDateString("en-GB")}
              </td>

              <td>
                <button className="btn btn-warning border-none shadow-none">
                  Suspend
                </button>
              </td>

              <td>
                <button className="btn btn-error border-none shadow-none">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MangeUsersTable;
