import useLocalStorage from "../../../../Hooks/useLocalStorage";
import Swal from "sweetalert2";
import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";

const CartTable = ({ cartData, setCartIds }) => {
  const { getItems, removeItem } = useLocalStorage("cart-items");
  const Lottie = LottiePlayer.default || LottiePlayer;

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Remove Item?",
      text: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Remove It",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      removeItem(id);

      setCartIds(getItems());

      Swal.fire({
        title: "Removed!",
        text: "The item has been removed from your cart.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleBuyNow = (item) => {
    console.log("Buy now:", item);
  };

  if (!cartData?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

        <h3 className="text-3xl font-semibold text-headings">
          Your Cart Is Empty
        </h3>

        <p className="text-descriptions mt-2">
          Looks like you haven't added any products to your cart yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead className="bg-gray-100 text-left text-sm uppercase">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Discount</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Added At</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {cartData?.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50 transition">
              {/* Product */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-14 h-14 rounded-md object-cover border shrink-0"
                  />

                  <div>
                    <h4 className="font-medium truncate">{item.productName}</h4>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="p-4 whitespace-nowrap">{item.category}</td>

              {/* Price */}
              <td className="p-4 font-semibold text-green-600 whitespace-nowrap">
                ৳ {item.price}
              </td>

              {/* Discount */}
              <td className="p-4 text-orange-500 whitespace-nowrap">
                {item.discount}%
              </td>

              {/* Stock */}
              <td className="p-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.stockQuantity < 10
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.stockQuantity}
                </span>
              </td>

              {/* Added At */}
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                {new Date(item.addedAt).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-center gap-2 whitespace-nowrap">
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="btn border-none shadow-none bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn border-none shadow-none bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
