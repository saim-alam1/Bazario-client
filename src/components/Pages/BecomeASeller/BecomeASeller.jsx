import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useNotifications from "../../../Hooks/useNotifications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const BecomeASeller = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();

  const handleBecomeASeller = (data) => {
    const sellerInfo = {
      ...data,
      fullName: user?.displayName,
      email: user?.email,
    };
    becomeSeller(sellerInfo);
  };

  const { mutate: becomeSeller, isPending } = useMutation({
    mutationFn: async (sellerData) => {
      const res = await axiosSecure.patch(
        `become-a-seller/${user?.email}`,
        sellerData,
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Request sent to admin!");

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: `${data.message || "Request sent to admin!"}`,
      });

      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  return (
    <section className="my-12 px-3">
      <Helmet>
        <title>Become a Seller | Bazario</title>
        <meta
          name="description"
          content="Apply to become a seller on our platform. Submit your details, get approved by admin, and start selling your products easily."
        />
      </Helmet>
      <div className="text-center space-y-4 max-w-11/12 mx-auto">
        <h1 className="text-headings font-semibold text-3xl">
          Apply To Become A Seller
        </h1>
        <p className="text-xl text-descriptions">
          Want to start selling on our platform? You can apply for a seller
          account by submitting the required information below. Once your
          application is reviewed and approved by the admin, you’ll be able to
          add products, manage inventory, and grow your business with us.
        </p>
      </div>

      {/* Seller Form */}
      <div className="max-w-11/12 px-6 mx-auto bg-white rounded-md shadow-md my-14">
        <form
          onSubmit={handleSubmit(handleBecomeASeller)}
          className="font-medium"
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full px-4 py-3 text-base text-gray-700 bg-gray-100 opacity-80 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 cursor-not-allowed"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-3 text-base text-gray-700 bg-gray-100 opacity-80 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 cursor-not-allowed"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Country
              </label>
              <input
                type="text"
                {...register("country", {
                  required: true,
                })}
                placeholder="Which country are you from?"
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
              />

              {errors.country && (
                <span className="text-red-500 text-[16px] mt-1">
                  Country field is required
                </span>
              )}
            </div>

            {/* Contact Number */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Contact Number
              </label>
              <input
                type="number"
                {...register("contactNumber", {
                  required: true,
                })}
                placeholder="Contact Number"
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
              />

              {errors.contactNumber && (
                <span className="text-red-500 text-[16px] mt-1">
                  Contact Number field is required
                </span>
              )}
            </div>

            {/* Store Name */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Store Name
              </label>
              <input
                {...register("storeName", {
                  required: true,
                })}
                type="text"
                placeholder="Job Title"
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
              />

              {errors.storeName && (
                <span className="text-red-500 text-[16px] mt-1">
                  Store Name field is required
                </span>
              )}
            </div>

            {/* Business Type */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Business Type
              </label>
              <select
                defaultValue=""
                {...register("businessType", {
                  required: true,
                })}
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
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

              {errors.businessType && (
                <span className="text-red-500 text-[16px] mt-1">
                  Business Type field is required
                </span>
              )}
            </div>

            {/* Business Address */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Business Address
              </label>
              <input
                type="text"
                {...register("businessAddress", {
                  required: true,
                })}
                placeholder="Business Address"
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
              />

              {errors.businessAddress && (
                <span className="text-red-500 text-[16px] mt-1">
                  Business Address field is required
                </span>
              )}
            </div>

            {/* Delivery Capability */}
            <div className="flex flex-col">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Delivery Capability
              </label>
              <select
                defaultValue=""
                {...register("deliveryCapability", {
                  required: true,
                })}
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200"
              >
                <option value="" disabled className="text-gray-400">
                  Can you handle nationwide delivery?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partner Courier Only">
                  Partner Courier Only
                </option>
              </select>

              {errors.deliveryCapability && (
                <span className="text-red-500 text-[16px] mt-1">
                  Delivery Capability field is required
                </span>
              )}
            </div>

            {/* Store Descriptions */}
            <div className="flex flex-col col-span-1 md:col-span-2">
              <label className="mb-2 text-base font-semibold text-gray-700">
                Store Description
              </label>
              <textarea
                {...register("storeDescription", {
                  required: true,
                })}
                placeholder="Store Description..."
                className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none transition-all duration-200 min-h-30 resize-y"
              />

              {errors.storeDescription && (
                <span className="text-red-500 text-[16px] mt-1">
                  Store Description field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end py-9">
            <button
              type="submit"
              className=" text-white transition-colors duration-300 transform focus:outline-none text-[18px] font-medium bg-amber-600 hover:bg-amber-700 px-8 py-2.5 rounded-md cursor-pointer"
            >
              {isPending ? "Applying..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BecomeASeller;
