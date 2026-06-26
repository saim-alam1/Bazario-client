import useAuth from "../../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { toast } from "react-toastify";
import useNotifications from "../../../../Hooks/useNotifications";

const PayoutsTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: withDrawReq, isLoading } = useQuery({
    queryKey: ["vendor-withdraw-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("load-withdrawal-requests");
      return res.data;
    },
  });
  const handleApproveReq = (id, vendorEmail, amount, platformFeeDue) => {
    if (platformFeeDue > 0) {
      toast.error(
        "This vendor must clear their platform fee before this withdrawal can be approved.",
      );

      addNotification({
        receiverEmail: vendorEmail,
        message:
          "Dear Vendor, please clear your outstanding platform fee before requesting a withdrawal.",
      });

      return;
    }

    approveReq({ id, vendorEmail });
  };

  const { mutate: approveReq, isPending: approvingReq } = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(`approve-withdrawal/${id}`);
      return res.data;
    },
    onSuccess: async (data, variable) => {
      toast.success(data?.message || "Withdraw request approved successfully!");

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable?.vendorEmail,
        message: data?.message || "Withdraw request approved successfully!",
      });

      queryClient.invalidateQueries({
        queryKey: ["vendor-withdraw-requests", user?.email],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="table w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Platform Fee Due</th>
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

              <td className="text-headings">{req.amount}৳</td>

              <td className="text-headings">{req.platformFeeDue}৳</td>

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
                <button
                  disabled={req.platformFeeDue > 0}
                  onClick={() =>
                    handleApproveReq(
                      req._id,
                      req.vendorEmail,
                      req.amount,
                      req.platformFeeDue,
                    )
                  }
                  className="btn btn-success border-none shadow-none whitespace-nowrap"
                >
                  {approvingReq ? "Approving..." : "Approve"}
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
