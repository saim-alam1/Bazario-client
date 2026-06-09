import { useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import LottiePlayer from "lottie-react";
import Swal from "sweetalert2";
import noData from "../../../../assets/noData.json";
import { Link } from "react-router";

const WishListTable = ({ wishList, setWishIds }) => {
  const { getItems, removeItem } = useLocalStorage("wishlist-items");
  const Lottie = LottiePlayer.default || LottiePlayer;
  const queryClient = useQueryClient();

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

      setWishIds(getItems());
      queryClient.invalidateQueries({
        queryKey: ["wishlist-products"],
      });

      Swal.fire({
        title: "Removed!",
        text: "The item has been removed from your cart.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  if (!wishList?.length) {
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
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="table w-full">
        <thead className="bg-gray-50">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Added At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishList.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50 transition">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squirrel w-12 h-12">
                      <img src={item.productImage} alt="product" />
                    </div>
                  </div>
                  <div className="font-bold">{item.productName}</div>
                </div>
              </td>

              <td className="text-headings">{item.price}</td>

              <td className="text-headings">{item.discount}%</td>

              <td className="text-headings">{item.stockQuantity}</td>

              <td className="text-headings">
                {new Date(item.addedAt).toLocaleDateString("en-GB")}
              </td>

              <td>
                <Link
                  to={`/buy-product/${item._id}`}
                  className="btn btn-success border-none shadow-none"
                >
                  Buy now
                </Link>
              </td>

              <td>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-error border-none shadow-none"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishListTable;
