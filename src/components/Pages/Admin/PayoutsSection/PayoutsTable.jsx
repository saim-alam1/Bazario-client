import useAuth from "../../../../Hooks/useAuth";
import LottiePlayer from "lottie-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { toast } from "react-toastify";
import useNotifications from "../../../../Hooks/useNotifications";
import noData from "../../../../assets/noData.json";

const PayoutsTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();
  const Lottie = LottiePlayer.default || LottiePlayer;

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

  const handleRejectReq = (id, vendorEmail) => {
    rejectVendorReq({ id, vendorEmail });
  };

  const { mutate: rejectVendorReq, isPending: rejecting } = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(`reject/${id}/withdrawal-request`);
      return res.data;
    },
    onSuccess: async (data, variable) => {
      toast.success(data?.message || "Withdraw request rejected successfully!");

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable?.vendorEmail,
        message:
          "Dear Vendor, your withdraw request won't be approved until you clear platform dues!",
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

  if (!withDrawReq?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          No Payout Requests
        </h3>

        <p className="text-descriptions mt-2">
          Looks like you haven't received any payout requests yet.
        </p>
      </div>
    );
  }

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

              <td className="text-headings">
                <p className="text-red-500 font-bold">
                  Unpaid {req.platformFeeDue}৳
                </p>
              </td>

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
                      Number(req.platformFeeDue),
                    )
                  }
                  className="btn btn-success border-none shadow-none whitespace-nowrap"
                >
                  {approvingReq ? "Approving..." : "Approve"}
                </button>
              </td>

              <td>
                <button
                  onClick={() => handleRejectReq(req._id, req.vendorEmail)}
                  className="btn btn-error border-none shadow-none"
                >
                  {rejecting ? "Rejecting" : "Reject"}
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
