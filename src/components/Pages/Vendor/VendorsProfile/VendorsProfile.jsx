// import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserRole from "../../../../Hooks/useUserRole";
import { FaStoreAlt, FaLayerGroup } from "react-icons/fa";
import { MdVerifiedUser, MdDateRange, MdPermPhoneMsg } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";
import Loading from "../../../UI/Loading/Loading";
import { IoLocationSharp } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
// import useNotifications from "../../../../Hooks/useNotifications";

const VendorsProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userRole } = useUserRole();
  // const { register, handleSubmit, reset } = useForm();
  // const queryClient = useQueryClient();
  // const { addNotification } = useNotifications();

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
    country,
    deliveryCapability,
    approvedAt,
  } = vendorInfo;

  // const handleProfileUpdate = (data) => {
  //   const filteredData = Object.fromEntries(
  //     Object.entries(data).filter(([, value]) => value !== ""),
  //   );

  //   updateProfile(filteredData);
  // };

  // const { mutate: updateProfile, isPending } = useMutation({
  //   mutationFn: async (vendorsInfo) => {
  //     const res = await axiosSecure.patch(
  //       `update-vendor/${user?.email}`,
  //       vendorsInfo,
  //     );
  //     return res.data;
  //   },
  //   onSuccess: (data) => {
  //     const modal = document.getElementById("my_modal_5");
  //     if (modal) modal.close();

  //     // Posting Data In Notification Collection
  //     addNotification({
  //       receiverEmail: user?.email,
  //       message: "Profile updated successfully!",
  //     });

  //     toast.success(data?.message || "Profile updated successfully!");
  //     queryClient.invalidateQueries({
  //       queryKey: ["vendor-info", user?.email],
  //     });
  //     reset();
  //   },
  //   onError: (error) => {
  //     const modal = document.getElementById("my_modal_5");
  //     if (modal) modal.close();
  //     toast.error(
  //       error.response?.data?.message || "An unexpected error occurred",
  //     );
  //   },
  // });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Vendor Profile | Dashboard</title>
        <meta
          name="description"
          content="Manage and update your vendor profile, including business details, contact information, and account settings to improve visibility and opportunities."
        />
      </Helmet>

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
            {/* <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="absolute top-20 right-15 hover:text-amber-600 transition-colors duration-200"
            >
              <FaRegEdit size={25} className="cursor-pointer" />
            </button> */}
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

            {/* Country */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdVerifiedUser className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">Country</h4>
              </div>
              <p className="text-descriptions font-medium">
                {country || "Not Provided"}
              </p>
            </div>

            {/* Business Address */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <IoLocationSharp className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Business Address
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {businessAddress || "Not Provided"}
              </p>
            </div>

            {/* Delivery Capability */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <IoLocationSharp className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Delivery Capability
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                Are you Capable?{" "}
                <span
                  className={`font-semibold ${
                    deliveryCapability === "Yes"
                      ? "text-green-700"
                      : deliveryCapability === "No"
                        ? "text-red-500"
                        : deliveryCapability === "Partner Courier Only"
                          ? "text-yellow-500"
                          : ""
                  }`}
                >
                  {deliveryCapability || "Not Provided"}
                </span>
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

            {/* Vendor Since */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdDateRange className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Vendor Since
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {new Date(approvedAt).toLocaleDateString("en-GB") || "Unknown"}
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
      {/* <dialog
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
                  Store Name
                </label>
                <input
                  {...register("storeName")}
                  type="text"
                  placeholder="Job Title"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

              
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Business Type
                </label>
                <select
                  defaultValue=""
                  {...register("businessType")}
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Individual">Individual</option>
                  <option value="Company">Company</option>
                  <option value="Brand">Brand</option>
                  <option value="Small Business">Small Business</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Handmade Seller">Handmade Seller</option>
                  <option value="Dropshipper">Dropshipper</option>
                </select>
              </div>

             
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Business Address
                </label>
                <input
                  type="text"
                  {...register("businessAddress")}
                  placeholder="Business Address"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

             
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Contact Number
                </label>
                <input
                  type="number"
                  {...register("contactNumber")}
                  placeholder="Contact Number"
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
                />
              </div>

             
              <div className="flex flex-col col-span-1 md:col-span-2">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Store Description
                </label>
                <textarea
                  {...register("storeDescription")}
                  placeholder="Store Description..."
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
      </dialog> */}
    </section>
  );
};

export default VendorsProfile;
