import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useNotifications from "../../../../Hooks/useNotifications";

const AddProducts = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();

  const handleAddProducts = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) =>
          value !== "" && value !== undefined && !Number.isNaN(value),
      ),
    );
    const modifiedProductData = {
      ...filteredData,
      vendorsName: user?.displayName,
      vendorsEmail: user?.email,
    };
    addProduct(modifiedProductData);
  };

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: async (productData) => {
      const res = await axiosSecure.post("add-product", productData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Product added successfully");

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: "Added product successfully!",
      });

      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  return (
    <section className="max-w-11/12 px-6 mx-auto bg-white rounded-md shadow-md my-14">
      {/* React Helmet */}
      <Helmet>
        <title>Add New Product | Dashboard</title>
        <meta
          name="description"
          content="List your product by adding clear details, images, and pricing so customers can easily discover and purchase it."
        />
      </Helmet>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-headings capitalize">
          Add Product
        </h2>

        <p className="text-lg text-descriptions mt-4 max-w-3xl mx-auto">
          List your product by adding clear details, images, and pricing so
          customers can easily discover and purchase it.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleAddProducts)} className="font-medium">
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div className="space-y-2">
            {/* Product Name */}
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Product Name
            </label>
            <input
              type="text"
              {...register("productName", {
                required: true,
              })}
              placeholder="Product Name"
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {errors.productName && (
              <span className="text-red-500 text-[16px] mt-1">
                Product Name field is required
              </span>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Category
            </label>
            <input
              type="text"
              {...register("category", {
                required: true,
              })}
              placeholder="Category"
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {errors.category && (
              <span className="text-red-500 text-[16px] mt-1">
                Category field is required
              </span>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Price
            </label>
            <input
              type="number"
              {...register("price", {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="Price"
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {errors.price && (
              <span className="text-red-500 text-[16px] mt-1">
                Price field is required
              </span>
            )}
          </div>
          {/* Discount (optional) */}
          <div className="space-y-2">
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Discount (optional)
            </label>
            <input
              type="number"
              {...register("discount", {
                valueAsNumber: true,
                validate: (value) => {
                  // If the field is empty, allow it to pass (optional)
                  if (value === "" || isNaN(value) || value === null)
                    return true;
                  // If there is a value, it must be strictly greater than 0
                  return value > 0 || "Discount must be greater than 0";
                },
              })}
              placeholder="Discount"
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {/* Display the error message if validation fails */}
            {errors?.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          {/* Stock Quantity */}
          <div className="space-y-2">
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Stock Quantity
            </label>
            <input
              type="number"
              {...register("stockQuantity", {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="Stock Quantity"
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {errors.stockQuantity && (
              <span className="text-red-500 text-[16px] mt-1">
                Stock Quantity field is required
              </span>
            )}
          </div>

          {/* Product Image */}
          <div className="space-y-2">
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Product Image
            </label>
            <input
              type="url"
              {...register("productImage", {
                required: true,
              })}
              placeholder="Product Image"
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {errors.productImage && (
              <span className="text-red-500 text-[16px] mt-1">
                Product Image field is required
              </span>
            )}
          </div>

          {/* Product Descriptions */}
          <div className="space-y-2 col-span-2">
            <label className="block mb-2 text-[18px] text-descriptions font-medium">
              Product Descriptions
            </label>

            <textarea
              {...register("productDescriptions", {
                required: true,
              })}
              placeholder="Enter detailed job description here..."
              className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40 min-h-37.5 resize-y"
            />

            {errors.productDescriptions && (
              <span className="text-red-500 text-[16px] mt-1">
                Product Descriptions field is required
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end py-6">
          <button
            type="submit"
            className=" text-white transition-colors duration-300 transform focus:outline-none text-[18px] font-medium bg-amber-600 hover:bg-amber-700 px-8 py-2.5 rounded-md cursor-pointer"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProducts;
