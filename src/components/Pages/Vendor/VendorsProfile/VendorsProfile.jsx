import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserRole from "../../../../Hooks/useUserRole";
import { FaRegEdit, FaBuilding, FaBriefcase, FaEnvelope } from "react-icons/fa";
import { MdVerifiedUser, MdDateRange } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const VendorsProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userRole } = useUserRole();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleProfileUpdate = (data) => {
    console.log(data);
    updateProfile(data);
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (vendorsInfo) => {
      const res = await axiosSecure.post(
        `update-vendor/${user?.email}`,
        vendorsInfo,
      );
      return res.data;
    },
    onSuccess: () => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      toast.success("Invitation sent successfully");
      // queryClient.invalidateQueries(["applicants"]);
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
            {/* Company */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaBuilding className="text-blue-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">Company</h4>
              </div>
              <p className="text-descriptions font-medium">{"company"}</p>
            </div>

            {/* Position */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaBriefcase className="text-blue-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Position
                </h4>
              </div>
              <p className="text-descriptions font-medium">{"position"}</p>
            </div>

            {/* Email */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaEnvelope className="text-blue-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">Email</h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {user?.email}
              </p>
            </div>

            {/* Joined Date */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdDateRange className="text-blue-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Member Since
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {/* {createdAt || "Unknown"} */}
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
                    {...register("storeName", { required: true })}
                    placeholder="Job Title"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.storeName && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>

                {/* Business Type */}
                <div className="space-y-2">
                  <label className="block mb-2 text-lg text-descriptions font-medium">
                    Business Type{" "}
                    <span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    defaultValue=""
                    {...register("businessType", {
                      required: "Please select your business type",
                    })}
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                    <option value="Brand">Brand</option>
                  </select>

                  {errors.businessType && (
                    <span className="text-red-500 text-[16px] mt-1">
                      {errors.businessType.message}
                    </span>
                  )}
                </div>

                {/* Business Address */}
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Business Address
                  </label>
                  <input
                    type="text"
                    {...register("businessAddress", { required: true })}
                    placeholder="Business Address"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.businessName && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>

                {/* Contract Number */}
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    {...register("contactNumber", { required: true })}
                    placeholder="Contact Number"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.contactNumber && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>

                {/* Store Descriptions */}
                <div className="space-y-2 col-span-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Store Description
                  </label>
                  <textarea
                    {...register("storeDescription", { required: true })}
                    placeholder="Store Description..."
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40 min-h-37.5 resize-y"
                  />
                  {errors.storeDescription && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
              </div>

              <p className="text-descriptions my-6">
                <span className="font-bold">Note:</span> The information you
                provide here will be used to match you with relevant job
                opportunities based on your skills, preferences, and career
                goals. Employers can review your profile and, if they find you
                suitable, may contact you or invite you for an interview.
              </p>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="text-white transition-colors duration-300 transform focus:outline-none text-[18px] font-medium bg-blue-600 hover:bg-blue-700 px-8 py-2.5 rounded-md cursor-pointer"
                >
                  {isPending ? "Updating..." : "Update"}
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
