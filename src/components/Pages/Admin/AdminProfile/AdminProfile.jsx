import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import {
  MdDateRange,
  MdLocationOn,
  MdPermPhoneMsg,
  MdUpdate,
  MdVerifiedUser,
} from "react-icons/md";
import useUserRole from "../../../../Hooks/useUserRole";
import Loading from "../../../UI/Loading/Loading";
import { FaCity, FaRegEdit, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useNotifications from "../../../../Hooks/useNotifications";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const { user } = useAuth();
  const { userRole, roleLoading } = useUserRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: adminInfo = {}, isLoading } = useQuery({
    queryKey: ["admin-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`admin-info/${user?.email}`);
      return res.data;
    },
  });

  const {
    contactNumber,
    district,
    divisionName,
    gender,
    registeredAt,
    updatedAt,
  } = adminInfo;

  const handleProfileUpdate = (data) => {
    updateProfile(data);
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (updatedInfo) => {
      const res = await axiosSecure.patch(
        `update-admin-info/${user?.email}`,
        updatedInfo,
      );
      return res.data;
    },
    onSuccess: async (data) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: "Profile updated successfully!",
      });

      toast.success(data?.message || "Profile updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["admin-info", user?.email],
      });

      reset();
    },
    onError: (error) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  if (isLoading || roleLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Admin Profile | Dashboard</title>
        <meta
          name="description"
          content="View and manage your Bazario administrator profile, personal information, account details, and platform-related settings from a single dashboard."
        />
      </Helmet>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-headings capitalize">
          Admin Profile
        </h2>

        <p className="text-lg text-descriptions mt-4 max-w-3xl mx-auto">
          Manage your administrator account information, keep your profile
          details up to date, and maintain your presence across the Bazario
          platform.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
        {/* Top Banner */}
        <div className="h-36 bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 relative">
          {/* Avatar */}
          <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
            <img
              referrerPolicy="no-referrer"
              src={
                user?.photoURL ||
                "https://i.ibb.co/4pDNDk1/avatar-placeholder.png"
              }
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative pt-20 pb-10 px-6 md:px-10">
          {/* Name & Position */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-headings capitalize">
              {user?.displayName}
            </h3>

            <p className="text-descriptions my-1.5 font-medium break-all">
              {user?.email}
            </p>

            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-amber-100 text-amber-600 rounded-full text-sm font-medium capitalize">
              <MdVerifiedUser className="text-lg" />
              {userRole}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="absolute top-20 right-15 hover:text-amber-600 transition-colors duration-200"
            >
              <FaRegEdit size={25} className="cursor-pointer" />
            </button>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Division Name */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdLocationOn className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Division Name
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {divisionName || "Not Provided"}
              </p>
            </div>

            {/* District Name */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaCity className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  District Name
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {district || "Not Provided"}
              </p>
            </div>

            {/* Gender */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">Gender</h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {gender || "Not Provided"}
              </p>
            </div>

            {/* Contract Number */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdPermPhoneMsg className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Contract Number
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                +{contactNumber || "Not Provided"}
              </p>
            </div>

            {/* Admin Since Date */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdDateRange className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Admin Since
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {new Date(registeredAt).toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Last Update Date */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdUpdate className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Last Update Date
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {new Date(updatedAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle backdrop-blur-xs"
      >
        <div className="modal-box mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-50 max-w-11/12">
          <h3 className="font-bold text-2xl md:text-3xl text-gray-800 text-center mb-8 tracking-tight">
            Add your business information
          </h3>

          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Division Name
                </label>
                <input
                  {...register("divisionName", { required: true })}
                  type="text"
                  placeholder="Division Name"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
                {errors.divisionName && (
                  <span className="text-red-500 text-[16px] mt-2">
                    Division field is required
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <select
                  defaultValue=""
                  {...register("gender")}
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  City / District
                </label>
                <input
                  type="text"
                  {...register("district", { required: true })}
                  placeholder="City / District"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
                {errors.district && (
                  <span className="text-red-500 text-[16px] mt-2">
                    District field is required
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Contact Number
                </label>
                <input
                  type="number"
                  {...register("contactNumber", { required: true })}
                  placeholder="Contact Number"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
                {errors.contactNumber && (
                  <span className="text-red-500 text-[16px] mt-2">
                    Contact field is required
                  </span>
                )}
              </div>

              <div className="flex flex-col col-span-1 md:col-span-2">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Bio (Optional)
                </label>
                <textarea
                  {...register("bio")}
                  placeholder="Your Bio..."
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
                />
              </div>
            </div>

            <div className="modal-action pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2.5 rounded-xl text-white font-medium text-sm bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-amber-600/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isPending ? "Updating..." : "Update Details"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default AdminProfile;
