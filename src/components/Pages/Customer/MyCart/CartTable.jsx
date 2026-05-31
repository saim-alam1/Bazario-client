const CartTable = ({ cartData }) => {
  const handleRemove = (id) => {
    console.log("Remove item:", id);
  };

  const handleBuyNow = (item) => {
    console.log("Buy now:", item);
  };

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
              <td className="p-4 flex items-center gap-3">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-14 h-14 rounded-md object-cover border"
                />
                <span className="font-medium">{item.productName}</span>
              </td>

              {/* Category */}
              <td className="p-4">{item.category}</td>

              {/* Price */}
              <td className="p-4 font-semibold text-green-600">
                ৳ {item.price}
              </td>

              {/* Discount */}
              <td className="p-4 text-orange-500">{item.discount}%</td>

              {/* Stock */}
              <td className="p-4">
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
              <td className="p-4 text-sm text-gray-500">
                {new Date(item.addedAt).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  {/* Buy Now */}
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
                  >
                    Buy Now
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
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
