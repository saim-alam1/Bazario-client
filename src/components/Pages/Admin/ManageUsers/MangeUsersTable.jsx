import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../UI/Loading/Loading";
import { toast } from "react-toastify";
import useNotifications from "../../../../Hooks/useNotifications";
import Swal from "sweetalert2";

const MangeUsersTable = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["Load-customers", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("/manage-customers");
      return res.data;
    },
  });

  const handleSuspend = (customerId, customerName, customerEmail) => {
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
        suspendCustomer({
          customerId,
          customerName,
          customerEmail,
        });
      }
    });
  };

  const { mutate: suspendCustomer, isPending: suspendingCustomer } =
    useMutation({
      mutationFn: async ({ customerId }) => {
        const res = await axiosSecure.patch(`customers/${customerId}/suspend`);
        return res.data;
      },
      onSuccess: (data, variable) => {
        toast.success(
          data?.message || `${variable.customerName} suspended successfully`,
        );

        queryClient.invalidateQueries({
          queryKey: ["Load-customers", user?.email],
        });

        // Posting Data In Notification Collection
        addNotification({
          receiverEmail: variable.customerEmail,
          message: `Dear ${variable.customerName}, your customer account on Bazario platform has been temporarily suspended.`,
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
        reactivateCustomer({
          customerId,
          customerName,
          customerEmail,
        });
      }
    });
  };

  const { mutate: reactivateCustomer, isPending: reactivating } = useMutation({
    mutationFn: async ({ customerId }) => {
      const res = await axiosSecure.patch(`customers/${customerId}/reactivate`);
      return res.data;
    },
    onSuccess: (data, variable) => {
      toast.success(
        data?.message || `${variable.customerName} reactivated successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["Load-customers", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable.customerEmail,
        message: `Dear ${variable.customerName}, your customer account on Bazario platform has been reactivated successfully.`,
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
        removeCustomer({
          customerId,
          customerName,
          customerEmail,
        });
      }
    });
  };

  const { mutate: removeCustomer, isPending: removingCustomer } = useMutation({
    mutationFn: async ({ customerId }) => {
      const res = await axiosSecure.delete(`customers/${customerId}/delete`);
      return res.data;
    },
    onSuccess: (data, variable) => {
      toast.success(
        data?.message || `${variable.customerName} removed successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["Load-customers", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: variable.customerEmail,
        message: `Dear ${variable.customerName}, your customer account on Bazario platform has been deleted for violations of rules & regulations.`,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  if (isLoading) return <Loading />;

  if (!customers?.length) {
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
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-50 transition">
              <td>
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <div className="text-headings">{customer.fullName}</div>
                </div>
              </td>

              <td className="text-headings">{customer.email}</td>

              <td className="text-headings">+{customer.contactNumber}</td>

              <td className="text-headings">
                <span
                  className={`font-medium ${
                    customer.status === "suspended"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {customer.status === "suspended" ? "Suspended" : "Active"}
                </span>
              </td>

              <td className="text-headings">
                {new Date(customer.registeredAt).toLocaleDateString("en-GB")}
              </td>
              <td>
                {customer.status === "suspended" ? (
                  <button
                    disabled={reactivating}
                    className="btn btn-success border-none shadow-none"
                    onClick={() =>
                      handleReactivate(
                        customer._id,
                        customer.fullName,
                        customer.email,
                      )
                    }
                  >
                    {reactivating ? "Reactivating..." : "Reactivate"}
                  </button>
                ) : (
                  <button
                    disabled={suspendingCustomer}
                    className="btn btn-warning border-none shadow-none"
                    onClick={() =>
                      handleSuspend(
                        customer._id,
                        customer.fullName,
                        customer.email,
                      )
                    }
                  >
                    {suspendingCustomer ? "Suspending..." : "Suspend"}
                  </button>
                )}
              </td>

              <td>
                <button
                  disabled={removingCustomer}
                  onClick={() =>
                    handleRemove(
                      customer._id,
                      customer.fullName,
                      customer.email,
                    )
                  }
                  className="btn btn-error border-none shadow-none"
                >
                  {removingCustomer ? "Removing..." : "Remove"}
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
