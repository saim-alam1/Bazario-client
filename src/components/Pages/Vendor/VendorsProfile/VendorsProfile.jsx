import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserRole from "../../../../Hooks/useUserRole";
import { FaRegEdit, FaStoreAlt, FaLayerGroup } from "react-icons/fa";
import { MdVerifiedUser, MdDateRange, MdPermPhoneMsg } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading/Loading";
import { IoLocationSharp } from "react-icons/io5";

const VendorsProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userRole } = useUserRole();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: vendorInfo = {}, isLoading } = useQuery({
    queryKey: ["vendor-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`vendor-info/${user?.email}`);
      return res.data;
    },
  });

  const {
    storeName,
    storeDescription,
    registeredAt,
    contactNumber,
    businessType,
    businessAddress,
    role,
  } = vendorInfo;

  const handleProfileUpdate = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ""),
    );

    updateProfile(filteredData);
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (vendorsInfo) => {
      const res = await axiosSecure.patch(
        `update-vendor/${user?.email}`,
        vendorsInfo,
      );
      return res.data;
    },
    onSuccess: () => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      toast.success("Invitation sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["vendor-info", user?.email],
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

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-headings capitalize">
          Vendors Profile
        </h2>

        <p className="text-lg text-descriptions mt-4 max-w-3xl mx-auto">
          Manage your professional identity and showcase your company details to
          attract top talent.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
        {/* Top Banner */}
        <div className="h-36 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 relative">
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

            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium capitalize">
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
            {/* Store Name */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaStoreAlt className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Store Name
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {storeName || "Not Provided"}
              </p>
            </div>

            {/* Business Type */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaLayerGroup className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Business Type
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {businessType || "Not Provided"}
              </p>
            </div>

            {/* Role */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdVerifiedUser className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">Role</h4>
              </div>
              <p className="text-descriptions font-medium">
                {role || "Not Provided"}
              </p>
            </div>

            {/* Address */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <IoLocationSharp className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">Address</h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {businessAddress || "Not Provided"}
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
                {contactNumber || "Not Provided"}
              </p>
            </div>

            {/* Joined Date */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdDateRange className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Member Since
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {new Date(registeredAt).toLocaleDateString("en-GB") ||
                  "Unknown"}
              </p>
            </div>

            {/* Store Description */}
            <div className="bg-base-200/50 rounded-2xl p-5 md:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <MdDateRange className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Store Description
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {storeDescription || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-11/12 mx-auto">
          <h3 className="font-bold text-2xl text-center mb-10">
            Add your business information
          </h3>

          <div className="modal-action">
            <form onSubmit={handleSubmit(handleProfileUpdate)}>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Store Name
                  </label>
                  <input
                    {...register("storeName")}
                    placeholder="Job Title"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Business Type */}
                <div className="space-y-2">
                  <label className="block mb-2 text-lg text-descriptions font-medium">
                    Business Type{" "}
                    <span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    defaultValue=""
                    {...register("businessType")}
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                    <option value="Brand">Brand</option>
                  </select>
                </div>

                {/* Business Address */}
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Business Address
                  </label>
                  <input
                    type="text"
                    {...register("businessAddress")}
                    placeholder="Business Address"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Contract Number */}
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    {...register("contactNumber")}
                    placeholder="Contact Number"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Store Descriptions */}
                <div className="space-y-2 col-span-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Store Description
                  </label>
                  <textarea
                    {...register("storeDescription")}
                    placeholder="Store Description..."
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40 min-h-37.5 resize-y"
                  />
                </div>
              </div>

              <p className="text-descriptions my-6">
                <span className="font-bold">Note:</span> The information you
                provide here will be used to match you with relevant job
                opportunities based on your skills, preferences, and career
                goals. Employers can review your profile and, if they find you
                suitable, may contact you or invite you for an interview.
              </p>

              <div className="flex justify-end gap-5">
                <button
                  type="submit"
                  disabled={isPending}
                  className="text-white transition-colors duration-300 transform focus:outline-none text-[18px] font-medium bg-amber-600 hover:bg-amber-700 px-8 py-2.5 rounded-md cursor-pointer"
                >
                  {isPending ? "Updating..." : "Update"}
                </button>

                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_5").close()}
                  className="text-white transition-colors duration-300 transform focus:outline-none text-[18px] font-medium bg-red-500 hover:bg-red-700 px-8 py-2.5 rounded-md cursor-pointer"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default VendorsProfile;
