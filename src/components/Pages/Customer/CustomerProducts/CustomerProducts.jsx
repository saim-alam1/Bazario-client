import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../UI/Loading/Loading";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const CustomerProducts = () => {
  const axiosInstance = useAxios();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["load-categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("categories");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(categories);

  return (
    <section className="px-4">
      {/* Helmet */}
      <Helmet>
        <title>Products | Customer</title>
        <meta name="description" content="Browse all products by category" />
      </Helmet>

      {/* Category Ticker */}
      <div className="overflow-hidden bg-gray-100 py-3 rounded-md group">
        <div className="flex items-center gap-3 whitespace-nowrap animate-ticker group-hover:pause-animation">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-1 rounded-full border transition cursor-pointer ${
              selectedCategory === "All"
                ? "bg-amber-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-1 rounded-full border transition cursor-pointer ${
                selectedCategory === cat.category
                  ? "bg-amber-500 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold">Selected: {selectedCategory}</h1>
      </div>
    </section>
  );
};

export default CustomerProducts;
