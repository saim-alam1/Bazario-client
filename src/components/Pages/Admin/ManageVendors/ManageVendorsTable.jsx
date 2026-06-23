import LottiePlayer from "lottie-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import useNotifications from "../../../../Hooks/useNotifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../UI/Loading/Loading";
import noData from "../../../../assets/noData.json";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageVendorsTable = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ["Load-vendors", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("manage-vendors");
      return res.data;
    },
  });

  const handleVendorSuspend = (customerId, customerName, customerEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Suspend ${customerName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, suspend it!",
    }).then((result) => {
      if (result.isConfirmed) {
        suspendVendor({
          customerId,
          customerName,
          customerEmail,
        });
      }
    });
  };

  const { mutate: suspendVendor, isPending: suspendingVendor } = useMutation({
    mutationFn: async ({ customerId }) => {
      const res = await axiosSecure.patch(`vendor/${customerId}/suspend`);
      return res.data;
    },
    onSuccess: async (data, variable) => {
      toast.success(
        data?.message || `${variable.customerName} suspended successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["Load-vendors", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable.customerEmail,
        message: `Dear ${variable.customerName}, your vendor account on Bazario platform has been temporarily suspended!`,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  const handleReactivate = (customerId, customerName, customerEmail) => {
    Swal.fire({
      title: "Reactivate account?",
      text: `Reactivate ${customerName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reactivate!",
    }).then((result) => {
      if (result.isConfirmed) {
        reactivateVendor({
          customerId,
          customerName,
          customerEmail,
        });
      }
    });
  };

  const { mutate: reactivateVendor, isPending: reactivating } = useMutation({
    mutationFn: async ({ customerId }) => {
      const res = await axiosSecure.patch(`vendor/${customerId}/reactivate`);
      return res.data;
    },
    onSuccess: (data, variable) => {
      toast.success(
        data?.message || `${variable.customerName} reactivated successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["Load-vendors", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable.customerEmail,
        message: `Dear ${variable.customerName}, your vendor account on Bazario platform has been reactivated successfully.`,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  const handleRemove = (customerId, customerName, customerEmail) => {
    Swal.fire({
      title: "Danger!",
      text: `This will permanently delete ${customerName}.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeVendor({
          customerId,
          customerName,
          customerEmail,
        });
      }
    });
  };

  const { mutate: removeVendor, isPending: removingVendor } = useMutation({
    mutationFn: async ({ customerId }) => {
      const res = await axiosSecure.delete(`vendor/${customerId}/remove`);
      return res.data;
    },
    onSuccess: (data, variable) => {
      toast.success(
        data?.message || `${variable.customerName} removed successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["Load-vendors", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable.customerEmail,
        message: `Dear ${variable.customerName}, your vendor account on Bazario platform has been deleted for violations of rules & regulations.`,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  if (isLoading) return <Loading />;

  if (!vendors?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          No Customers Found
        </h3>

        <p className="text-descriptions mt-2">
          There are currently no registered customers on the platform.
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
            <th>Vendor Since</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id} className="hover:bg-gray-50 transition">
              <td>
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <div className="text-headings">{vendor.fullName}</div>
                </div>
              </td>

              <td className="text-headings">{vendor.email}</td>

              <td className="text-headings">
                +{vendor.contactNumber || vendor.businessContactNumber}
              </td>

              <td className="text-headings">
                <span
                  className={`font-medium ${
                    vendor.status === "suspended"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {vendor.status === "suspended" ? "Suspended" : "Active"}
                </span>
              </td>

              <td className="text-headings">
                {new Date(vendor.approvedAt).toLocaleDateString("en-GB")}
              </td>
              <td>
                {vendor.status === "suspended" ? (
                  <button
                    disabled={reactivating}
                    className="btn btn-success border-none shadow-none"
                    onClick={() =>
                      handleReactivate(
                        vendor._id,
                        vendor.fullName,
                        vendor.email,
                      )
                    }
                  >
                    {reactivating ? "Reactivating..." : "Reactivate"}
                  </button>
                ) : (
                  <button
                    disabled={suspendingVendor}
                    className="btn btn-warning border-none shadow-none"
                    onClick={() =>
                      handleVendorSuspend(
                        vendor._id,
                        vendor.fullName,
                        vendor.email,
                      )
                    }
                  >
                    {suspendingVendor ? "Suspending..." : "Suspend"}
                  </button>
                )}
              </td>

              <td>
                <button
                  disabled={removingVendor}
                  onClick={() =>
                    handleRemove(vendor._id, vendor.fullName, vendor.email)
                  }
                  className="btn btn-error border-none shadow-none"
                >
                  {removingVendor ? "Removing..." : "Remove"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVendorsTable;
