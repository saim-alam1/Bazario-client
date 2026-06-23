import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useNotifications from "../../../../Hooks/useNotifications";
import { toast } from "react-toastify";
import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";

const VendorApprovalTable = ({ vendorApplicants }) => {
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();
  const Lottie = LottiePlayer.default || LottiePlayer;

  // Handle Approve
  const handleApprove = (email) => {
    approveVendor(email);
  };

  const { mutate: approveVendor, isPending: isApproving } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`approve-vendor/${email}`);
      return res.data;
    },
    onSuccess: async (data, email) => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-applicants"],
      });
      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: email,
        message: "Your vendor application has been approved",
      });

      toast.success(data?.message || "User appointed as vendor");
    },
  });

  // Handle Reject
  const handleReject = (email) => {
    rejectVendor(email);
  };

  const { mutate: rejectVendor, isPending: isRejecting } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`reject-vendor/${email}`);
      return res.data;
    },
    onSuccess: async (data, email) => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-applicants"],
      });
      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: email,
        message: "Your seller application has been rejected",
      });

      toast.success(data?.message || "User appointed has been rejected");
    },
  });

  if (!vendorApplicants?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          No Applicant Found
        </h3>

        <p className="text-descriptions mt-2">
          There are currently no pending applicant on the platform.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Applicant</th>
            <th>Store Name</th>
            <th>Business Type</th>
            <th>Contact</th>
            <th>Country</th>
            <th>Delivery</th>
            <th>Applied On</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendorApplicants.map((applicant) => (
            <tr key={applicant._id}>
              {/* Applicant */}
              <td>
                <div>
                  <h3 className="font-semibold text-base">
                    {applicant.fullName}
                  </h3>

                  <p className="text-base">{applicant.email}</p>
                </div>
              </td>

              {/* Store */}
              <td className="font-medium text-base whitespace-nowrap">
                {applicant.storeName}
              </td>

              {/* Business Type */}
              <td className="font-medium text-base">
                {applicant.businessType}
              </td>

              {/* Contact */}
              <td className="font-medium text-base">
                +{applicant.businessContactNumber}
              </td>

              {/* Country */}
              <td className="font-medium text-base">{applicant.country}</td>

              {/* Delivery */}
              <td className="font-medium text-base whitespace-nowrap">
                {applicant.deliveryCapability}
              </td>

              {/* Date */}
              <td className="font-medium text-base">
                {new Date(applicant.requestedAt).toLocaleDateString("en-GB")}
              </td>

              {/* Status */}
              <td>
                <span
                  className={`badge ${
                    applicant.status === "approved"
                      ? "badge-success"
                      : applicant.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                  }`}
                >
                  {applicant.status}
                </span>
              </td>

              {/* Actions */}
              <td>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleApprove(applicant.email)}
                    className="btn btn-success"
                  >
                    {isApproving ? "Approving..." : "Approve"}
                  </button>

                  <button
                    onClick={() => handleReject(applicant.email)}
                    className="btn btn-error"
                  >
                    {isRejecting ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorApprovalTable;
