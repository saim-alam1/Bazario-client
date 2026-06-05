import LottiePlayer from "lottie-react";
import { formatDistanceToNow } from "date-fns";
import noData from "../../../../assets/noData.json";

const DiscountsTable = ({ products }) => {
  const Lottie = LottiePlayer.default || LottiePlayer;

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-72">
          <Lottie animationData={noData} loop />
        </div>

        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-100 text-headings text-[16px] w-full">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Discount</th>
            <th>Flash Discount</th>
            <th>Final Price</th>
            <th>Duration</th>
            <th className="whitespace-nowrap">Discount Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {products.map((product, index) => {
            const appliedDiscount =
              product.flashDiscount != null
                ? product.flashDiscount
                : product.discount;

            const finalPrice =
              appliedDiscount != null
                ? Math.ceil(
                    product.price - (product.price * appliedDiscount) / 100,
                  )
                : Math.ceil(product.price);

            return (
              <tr
                key={product._id || index}
                className={
                  product.stockQuantity < 5
                    ? "bg-red-500 hover:bg-red-600 text-white [&_a]:text-white [&_button]:text-white"
                    : "hover:bg-gray-50"
                }
              >
                <th>{index + 1}</th>
                <td>{product.productName}</td>
                <td>৳{product.price}</td>

                <td>
                  {product.discount != null
                    ? `${product.discount}%`
                    : "No Discount"}
                </td>

                <td>
                  {product.flashDiscount != null
                    ? `${product.flashDiscount}%`
                    : "No Discount"}
                </td>

                <td>৳{finalPrice}</td>

                <td>
                  {product.discountDuration
                    ? product.discountDuration
                    : "Not Available"}
                </td>

                <td className="whitespace-nowrap">
                  {product.discountUpdatedAt
                    ? formatDistanceToNow(new Date(product.discountUpdatedAt), {
                        addSuffix: true,
                      })
                    : "Not Updated"}
                </td>

                <td>
                  <div className="flex gap-3">
                    <button className="btn btn-success border-none shadow-none">
                      Edit Discount
                    </button>

                    <button className="btn btn-error border-none shadow-none">
                      Remove Discount
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountsTable;
