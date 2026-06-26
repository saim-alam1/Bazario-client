import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";

const PayoutsTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: withDrawReq, isLoading } = useQuery({
    queryKey: ["vendor-withdraw-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("load-withdrawal-requests");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(withDrawReq);

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="table w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Requested At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withDrawReq.map((req) => (
            <tr key={req._id} className="hover:bg-gray-50 transition">
              <td className="text-headings whitespace-nowrap">
                {req.vendorName}
              </td>

              <td className="text-headings">{req.vendorEmail}</td>

              <td className="text-headings">{req.amount}</td>

              <td className="text-headings">{req.paymentMethod}</td>

              <td className="text-headings">
                {new Date(req.requestedAt).toLocaleDateString("en-GB")}
              </td>

              <td className="text-headings">
                <span
                  className={`badge ${
                    req.status === "requested"
                      ? "badge-warning"
                      : req.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>

              <td>
                <button className="btn btn-success border-none shadow-none whitespace-nowrap">
                  Approve
                </button>
              </td>

              <td>
                <button className="btn btn-error border-none shadow-none">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutsTable;
