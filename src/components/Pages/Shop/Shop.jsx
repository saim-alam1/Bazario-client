import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import LottiePlayer from "lottie-react";
import noData from "../../../assets/noData.json";
import ShopProductCard from "./ShopProductCard";

const Shop = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosInstance = useAxios();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    flashDiscount: false,
    sort: "newest",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      return res.data;
    },
  });

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products", currentPage, debouncedFilters],

    queryFn: async () => {
      const res = await axiosInstance.get("/shop-products", {
        params: {
          page: currentPage,
          size: itemsPerPage,
          search: debouncedFilters.search,
          category: debouncedFilters.category,
          minPrice: debouncedFilters.minPrice,
          maxPrice: debouncedFilters.maxPrice,
          availability: debouncedFilters.availability,
          flashDiscount: debouncedFilters.flashDiscount,
          sort: debouncedFilters.sort,
        },
      });

      return res.data;
    },
  });

  const { data: countData = {} } = useQuery({
    queryKey: ["products-count", debouncedFilters],

    queryFn: async () => {
      const res = await axiosInstance.get("/products-count", {
        params: {
          search: debouncedFilters.search,
          category: debouncedFilters.category,
          minPrice: debouncedFilters.minPrice,
          maxPrice: debouncedFilters.maxPrice,
          availability: debouncedFilters.availability,
          flashDiscount: debouncedFilters.flashDiscount,
        },
      });

      return res.data;
    },
  });

  const totalProducts = countData?.count || 0;

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const pages = totalPages ? [...Array(totalPages).keys()] : [];

  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [debouncedFilters]);

  const updateFilter = (newFilters) => {
    setCurrentPage(0);
    setFilters(newFilters);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  if (isLoading && currentPage === 0) return <Loading />;

  return (
    <section className="my-16">
      <Helmet>
        <title>
          {currentPage > 0
            ? `Shop Page ${currentPage + 1} | Bazario`
            : "Shop | Bazario"}
        </title>

        <meta
          name="description"
          content="Browse products across multiple categories, compare prices, and discover great deals on Bazario."
        />
      </Helmet>

      <h1 className="text-3xl md:text-5xl font-bold text-headings capitalize text-center mb-14">
        Shop your desired Product
      </h1>

      <div className="px-3 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR (Filters) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-lg border border-gray-200 h-fit space-y-6">
          {/* Search */}
          <div>
            <label className="font-medium">Search Product</label>

            <input
              type="text"
              placeholder="Product Name"
              value={filters.search}
              onChange={(e) =>
                updateFilter({
                  ...filters,
                  search: e.target.value,
                })
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category</label>

            <select
              value={filters.category}
              onChange={(e) =>
                updateFilter({
                  ...filters,
                  category: e.target.value,
                })
              }
              className="select select-bordered w-full"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price Range</label>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) =>
                  updateFilter({
                    ...filters,
                    minPrice: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />

              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) =>
                  updateFilter({
                    ...filters,
                    maxPrice: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="font-medium">Availability</label>

            <select
              value={filters.availability}
              onChange={(e) =>
                updateFilter({
                  ...filters,
                  availability: e.target.value,
                })
              }
              className="select select-bordered w-full"
            >
              <option value="">All Products</option>

              <option value="in-stock">In Stock</option>

              <option value="out-of-stock">Out Of Stock</option>
            </select>
          </div>

          {/* Flash Deals */}
          <div>
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.flashDiscount}
                onChange={(e) =>
                  updateFilter({
                    ...filters,
                    flashDiscount: e.target.checked,
                  })
                }
                className="checkbox"
              />

              <span>Flash Deals Only</span>
            </label>
          </div>

          {/* Sort */}
          <div>
            <label className="font-medium">Sort By</label>

            <select
              value={filters.sort}
              onChange={(e) =>
                updateFilter({
                  ...filters,
                  sort: e.target.value,
                })
              }
              className="select select-bordered w-full"
            >
              <option value="newest">Newest First</option>

              <option value="oldest">Oldest First</option>

              <option value="price-low">Price Low → High</option>

              <option value="price-high">Price High → Low</option>

              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() =>
              updateFilter({
                search: "",
                category: "",
                minPrice: "",
                maxPrice: "",
                availability: "",
                flashDiscount: false,
                sort: "newest",
              })
            }
            className="btn btn-outline w-full"
          >
            Clear Filters
          </button>
        </div>

        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          {allProducts.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center py-20">
              <Lottie
                animationData={noData}
                loop={true}
                className="w-80 h-80"
              />

              <p className="text-descriptions font-semibold text-xl mt-4">
                No products found
              </p>
            </div>
          ) : (
            allProducts.map((product) => {
              const discountedPrice = product.flashDiscount
                ? Math.ceil(
                    product.price -
                      (product.price * product.flashDiscount) / 100,
                  )
                : Math.ceil(product.price);
              return (
                <ShopProductCard
                  key={product._id}
                  product={product}
                  discountedPrice={discountedPrice}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Pagination Menu Bar */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="btn btn-lg"
        >
          ← Prev
        </button>

        {/* Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-lg ${
              currentPage === page ? "btn bg-amber-500" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="btn btn-lg"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default Shop;
