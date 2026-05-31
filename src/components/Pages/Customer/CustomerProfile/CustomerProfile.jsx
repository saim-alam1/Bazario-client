import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserRole from "../../../../Hooks/useUserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { MdDateRange, MdLocationCity, MdVerifiedUser } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import {
  FaBoxOpen,
  FaHeart,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaRegEdit,
  FaShoppingCart,
} from "react-icons/fa";
import useLocalStorage from "../../../../Hooks/useLocalStorage";

const CustomerProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userRole } = useUserRole();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { getItems } = useLocalStorage("cart-items");
  const cartItemsCount = getItems().length;

  const { data: customerInfo = {}, isLoading } = useQuery({
    queryKey: ["customer-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/customer-info/${user?.email}`);
      return res.data;
    },
  });

  const handleProfileUpdate = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ""),
    );

    updateProfile(filteredData);
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (customerInfo) => {
      const res = await axiosSecure.patch(
        `update-customer/${user?.email}`,
        customerInfo,
      );
      return res.data;
    },
    onSuccess: (res) => {
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();

      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["customer-info", user?.email],
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

  const { registeredAt, contactNumber, district, division, fullAddress } =
    customerInfo || {};

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>Customer Profile | Dashboard</title>
        <meta
          name="description"
          content="Manage and update your profile, including personal details, contact information, and account settings to improve visibility and opportunities."
        />
      </Helmet>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-headings capitalize">
          Customer Profile
        </h2>

        <p className="text-lg text-descriptions mt-4 max-w-3xl mx-auto">
          Manage and update your profile, including personal details, contact
          information, and account settings.
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
          {/* Name & Role */}
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
            {/* Division */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkedAlt className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Division
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {division || "Not Provided"}
              </p>
            </div>

            {/* District */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MdLocationCity className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  District
                </h4>
              </div>
              <p className="text-descriptions font-medium">
                {district || "Not Provided"}
              </p>
            </div>

            {/*  Full Address */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <IoLocationSharp className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Full Address
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {fullAddress || "Not Provided"}
              </p>
            </div>

            {/* Contract Number */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaPhoneAlt className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Contract Number
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                +{contactNumber || "Not Provided"}
              </p>
            </div>

            {/* Total Orders */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaBoxOpen className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Total Orders
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {/* {contactNumber || "Not Provided"} */} Not Provided
              </p>
            </div>

            {/* Wishlist Items */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaHeart className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Wishlist Items
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {/* {contactNumber || "Not Provided"} */} Not Provided
              </p>
            </div>

            {/* Cart Items */}
            <div className="bg-base-200/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FaShoppingCart className="text-amber-600 text-xl" />
                <h4 className="text-lg font-semibold text-headings">
                  Cart Items
                </h4>
              </div>
              <p className="text-descriptions font-medium break-all">
                {cartItemsCount
                  ? `${cartItemsCount} items in the cart`
                  : "Not Provided"}
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
          </div>
        </div>
      </div>

      {/* Modal */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-11/12 mx-auto">
          <h3 className="font-bold text-2xl text-center mb-10">
            Add your information
          </h3>

          <div className="modal-action">
            <form onSubmit={handleSubmit(handleProfileUpdate)}>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Division
                  </label>
                  <input
                    {...register("division")}
                    placeholder="Division"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    District
                  </label>
                  <input
                    type="text"
                    {...register("district")}
                    placeholder="District"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400  focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/*  Full Address */}
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions font-medium">
                    Full Address
                  </label>
                  <input
                    type="text"
                    {...register("fullAddress")}
                    placeholder=" Full Address"
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
              </div>

              <p className="text-descriptions my-6">
                <span className="font-bold">Note:</span> The information you
                provide here will be used to deliver your parcel into your
                address. So please be sure before submitting the info.
              </p>

              <div className="flex justify-end gap-5">
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn shadow-none text-white transition-colors duration-300 transform focus:outline-none text-base font-medium bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer"
                >
                  {isPending ? "Updating..." : "Update"}
                </button>

                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_5").close()}
                  className="btn shadow-none text-white transition-colors duration-300 transform focus:outline-none text-base font-medium bg-red-500 hover:bg-red-700 rounded-md cursor-pointer"
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

export default CustomerProfile;
