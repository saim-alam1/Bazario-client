import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";

const WithdrawalTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const Lottie = LottiePlayer.default || LottiePlayer;

  const { data: withdrawReq = [], isLoading } = useQuery({
    queryKey: ["withdraw-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`withdraw-requests/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!withdrawReq?.length) {
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
            <th>Account Number</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Requested At</th>
            <th>Reviewed At</th>
          </tr>
        </thead>
        <tbody>
          {withdrawReq.map((vendor) => (
            <tr key={vendor._id} className="hover:bg-gray-50 transition">
              <td className="text-headings">{vendor.vendorName}</td>

              <td className="text-headings">{vendor.accountNumber}</td>

              <td className="text-headings">{vendor.amount}৳</td>

              <td className="text-headings">{vendor.paymentMethod}</td>

              <td className="text-headings">
                <span
                  className={`badge ${
                    vendor.status === "approved"
                      ? "badge-success"
                      : vendor.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                  }`}
                >
                  {vendor.status.charAt(0).toUpperCase() +
                    vendor.status.slice(1)}
                </span>
              </td>

              <td className="text-headings">
                {new Date(vendor.requestedAt).toLocaleDateString("en-GB")}
              </td>

              <td className="text-headings">
                {new Date(
                  vendor.approvedAt || vendor.requestedAt,
                ).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalTable;
