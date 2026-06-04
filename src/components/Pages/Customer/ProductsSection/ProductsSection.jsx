import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router";

const ProductsSection = () => {
  const axiosInstance = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["load-categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("categories");
      return res.data;
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["load-products", selectedCategory],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/products?category=${selectedCategory}`,
      );
      return res.data;
    },
  });

  if (catLoading || isLoading) return <Loading />;

  return (
    <section className="px-6 py-10 bg-linear-to-b from-gray-50 via-white to-gray-100 min-h-screen">
      <Helmet>
        <title>Products | Customer</title>
      </Helmet>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Discover Products
        </h1>
        <p className="text-gray-500 mt-2">
          Explore categories and find what you love
        </p>
      </div>

      {/* CATEGORY BAR */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-white border shadow-sm group">
        <div className="flex gap-3 whitespace-nowrap animate-ticker px-5 py-3 group-hover:[animation-play-state:paused]">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedCategory === "All"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() =>
                setSearchParams({
                  category: c.category,
                })
              }
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === c.category
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => {
          const discountedPrice = p.flashDiscount
            ? Math.ceil(p.price - (p.price * p.flashDiscount) / 100)
            : Math.ceil(p.price);

          return (
            <div
              key={p._id}
              className="group relative bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={p.productImage}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* BADGES */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[11px] px-2 py-1 rounded-full bg-white/80 backdrop-blur border text-gray-800 font-medium">
                    {p.category}
                  </span>

                  {p.stockStatus === "paused" && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-red-500 text-white font-semibold shadow">
                      Paused
                    </span>
                  )}
                </div>

                {/* DISCOUNT */}
                {p.flashDiscount && (
                  <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow">
                    -{p.flashDiscount}%
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {p.productName}
                </h2>

                <p className="text-sm text-descriptions line-clamp-2 leading-relaxed">
                  {p.productDescriptions}
                </p>

                <div className="flex items-center justify-between text-base font-medium text-descriptions">
                  <span>
                    Stock:{" "}
                    <span className="font-semibold text-headings">
                      {p.stockQuantity}
                    </span>
                  </span>

                  {p.discountDuration && (
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        p.discountDuration === "paused"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Discount Duration:{" "}
                      {p.discountDuration.charAt(0).toUpperCase() +
                        p.discountDuration.slice(1)}
                    </span>
                  )}
                </div>

                {/* PRICE */}
                <div className="flex items-end justify-between pt-2">
                  <div>
                    {p.flashDiscount ? (
                      <>
                        <p className="text-base line-through text-descriptions">
                          {p.price}৳
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          {discountedPrice}৳
                        </p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-headings">
                        {p.price}৳{" "}
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/products-details/${p._id}`}
                    className="px-4 py-2 text-sm rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition shadow-sm hover:shadow-md cursor-pointer"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsSection;
