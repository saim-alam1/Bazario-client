import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";
import useNotifications from "../../../../Hooks/useNotifications";

const InventoryTable = ({ productsData }) => {
  const axiosSecure = useAxiosSecure();
  const [restockValues, setRestockValues] = useState({});
  const [discountValues, setDiscountValues] = useState({});
  const [discountDuration, setDiscountDuration] = useState({});
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Increase Quantity
  const handleIncrease = (id) => {
    setRestockValues((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Decrease Quantity
  const handleDecrease = (id) => {
    setRestockValues((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // Quick Discount
  const handleDiscountChange = (id, value) => {
    setDiscountValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Discount Duration
  const handleDurationChange = (id, value) => {
    setDiscountDuration((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Mark Product Paused
  const handlePause = (id, product) => {
    pauseProduct({
      id,
      productName: product.productName,
    });
  };

  const { mutate: pauseProduct, isPending: isPausing } = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(`pause-product/${id}`);
      return res.data;
    },

    onSuccess: (data, variables) => {
      toast.success(data.message || "Product paused");

      queryClient.invalidateQueries({
        queryKey: ["my-products", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: `${variables.productName} paused successfully!`,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  // Mark Product Active
  const handleActive = (id, product) => {
    activateProduct({
      id,
      productName: product.productName,
    });
  };

  const { mutate: activateProduct, isPending: isActivating } = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(`activate-product/${id}`);
      return res.data;
    },

    onSuccess: (data, variables) => {
      toast.success(data.message || "Product activated");

      queryClient.invalidateQueries({
        queryKey: ["my-products", user?.email],
      });

      // Posting Data In Notification Collection
      addNotification({
        receiverEmail: user?.email,
        message: `${variables.productName} activated successfully!`,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to activate product",
      );
    },
  });

  // Restock Product
  const handleRestock = (id, product) => {
    const quantity = restockValues[id] || 0;

    if (quantity <= 0) return;

    restock({
      id,
      quantity,
      productName: product.productName,
    });
  };

  const { mutate: restock, isPending } = useMutation({
    mutationFn: async ({ id, quantity }) => {
      const res = await axiosSecure.patch(`restock/${id}`, {
        quantity,
      });

      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || "Product added successfully");

      const id = variables.id;

      addNotification({
        receiverEmail: user?.email,
        message: `${variables.productName} restocked successfully`,
      });

      setRestockValues((prev) => ({
        ...prev,
        [id]: 0,
      }));

      queryClient.invalidateQueries({
        queryKey: ["my-products", user?.email],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  // Apply Discount
  const handleApplyDiscount = (id, product) => {
    const flashDiscount = Number(discountValues[id]);
    const duration = discountDuration[id];

    if (!flashDiscount || !duration) return;

    applyFlashDiscount({
      id,
      flashDiscount,
      duration,
      productName: product.productName,
    });
  };

  const { mutate: applyFlashDiscount, isPending: isApplyingDiscount } =
    useMutation({
      mutationFn: async ({ id, flashDiscount, duration }) => {
        const res = await axiosSecure.patch(`flash-discount/${id}`, {
          flashDiscount,
          duration,
        });

        return res.data;
      },

      onSuccess: (data, variables) => {
        toast.success(data.message || "Discount applied successfully");

        const id = variables.id;

        addNotification({
          receiverEmail: user?.email,
          message: `${variables.productName} discount updated successfully`,
        });

        setDiscountValues((prev) => ({
          ...prev,
          [id]: "",
        }));

        setDiscountDuration((prev) => ({
          ...prev,
          [id]: "",
        }));

        queryClient.invalidateQueries({
          queryKey: ["my-products", user?.email],
        });
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to apply discount",
        );
      },
    });

  return (
    <section>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-100 text-headings text-[16px]">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Discount (Normal)</th>
              <th>Discount (Flash Offer)</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Flash Discount</th>
              <th>Restock</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {productsData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              productsData.map((product, index) => (
                <tr
                  key={product._id || index}
                  className={
                    product.stockQuantity < 10
                      ? "bg-red-500 hover:bg-red-600 text-white [&_a]:text-white [&_button]:text-white"
                      : "hover:bg-gray-50"
                  }
                >
                  <th>{index + 1}</th>

                  {/* Product */}
                  <td className="font-medium whitespace-nowrap">
                    {product.productName}
                  </td>

                  {/* Discount */}
                  <td className="font-medium">
                    {product.discount ? `${product.discount}%` : "No Discount"}
                  </td>

                  {/* Flash Discount */}
                  <td className="font-medium">
                    {product.flashDiscount
                      ? `${product.flashDiscount}%`
                      : "No Discount"}
                  </td>

                  {/* Stock Quantity */}
                  <td>{product.stockQuantity}</td>

                  {/* Status */}
                  <td>
                    {(product.stockStatus || "active").charAt(0).toUpperCase() +
                      (product.stockStatus || "active").slice(1)}
                  </td>

                  {/* Flash Discount */}
                  <td>
                    <div className="flex flex-col gap-2 min-w-45">
                      <input
                        type="number"
                        min="1"
                        max="90"
                        placeholder="Discount %"
                        value={discountValues[product._id] || ""}
                        onChange={(e) =>
                          handleDiscountChange(product._id, e.target.value)
                        }
                        className="input input-bordered input-sm text-black"
                      />

                      <select
                        value={discountDuration[product._id] || ""}
                        onChange={(e) =>
                          handleDurationChange(product._id, e.target.value)
                        }
                        className="select select-bordered select-sm text-black"
                      >
                        <option value="">Duration</option>
                        <option value="24h">24 Hours</option>
                        <option value="48h">48 Hours</option>
                        <option value="72h">72 Hours</option>
                        <option value="7d">7 Days</option>
                      </select>

                      <button
                        onClick={() =>
                          handleApplyDiscount(product._id, product)
                        }
                        className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1 rounded-md cursor-pointer"
                        disabled={
                          !discountValues[product._id] ||
                          !discountDuration[product._id]
                        }
                      >
                        {isApplyingDiscount ? "Applying..." : "Apply"}
                      </button>
                    </div>
                  </td>

                  {/* Restock */}
                  <td>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecrease(product._id)}
                        className={`w-8 h-8 rounded-md text-lg cursor-pointer flex items-center justify-center transition-colors ${
                          product.stockQuantity < 5
                            ? "bg-transparent border border-white hover:bg-white/20 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-black"
                        }`}
                      >
                        -
                      </button>

                      <span className="font-semibold min-w-5 text-center">
                        {restockValues[product._id] || 0}
                      </span>

                      <button
                        onClick={() => handleIncrease(product._id)}
                        className={`w-8 h-8 rounded-md text-lg cursor-pointer flex items-center justify-center transition-colors ${
                          product.stockQuantity < 5
                            ? "bg-transparent border border-white hover:bg-white/20 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-black"
                        }`}
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRestock(product._id, product)}
                        className="btn border-none shadow-none bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isPending ? "Restocking..." : "Restock"}
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex items-center gap-4">
                      {product.stockStatus === "paused" ? (
                        <button
                          onClick={() => handleActive(product._id, product)}
                          className="btn shadow-none bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                        >
                          {isActivating ? "Activating..." : "Activate"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePause(product._id, product)}
                          className="btn shadow-none bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          {isPausing ? "Pausing..." : "Pause"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InventoryTable;
