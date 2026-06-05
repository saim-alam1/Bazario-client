import { Link } from "react-router";

const ShopProductCard = ({ product, discountedPrice }) => {
  return (
    <Link
      to={`/products-details/${product._id}`}
      key={product._id}
      className="group relative bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.productImage}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[11px] px-2 py-1 rounded-full bg-white/80 backdrop-blur border text-gray-800 font-medium">
            {product.category}
          </span>

          {product.stockStatus === "paused" && (
            <span className="text-[11px] px-2 py-1 rounded-full bg-red-500 text-white font-semibold shadow">
              Paused
            </span>
          )}
        </div>

        {/* DISCOUNT */}
        {product.flashDiscount && (
          <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow">
            -{product.flashDiscount}%
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.productName}
        </h2>

        <p className="text-sm text-descriptions leading-relaxed">
          {product.productDescriptions}
        </p>

        <div className="flex items-center justify-between text-base font-medium text-descriptions">
          <span>
            Stock:{" "}
            <span className="font-semibold text-headings">
              {product.stockQuantity}
            </span>
          </span>

          {product.discountDuration && (
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                product.discountDuration === "paused"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              Discount Duration:{" "}
              {product.discountDuration.charAt(0).toUpperCase() +
                product.discountDuration.slice(1)}
            </span>
          )}
        </div>

        {/* PRICE */}
        <div className="flex items-end justify-between pt-2">
          <div>
            {product.flashDiscount ? (
              <>
                <p className="text-base line-through text-descriptions">
                  {product.price}৳
                </p>
                <p className="text-xl font-bold text-green-600">
                  {discountedPrice}৳
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-headings">
                {product.price}৳{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopProductCard;
