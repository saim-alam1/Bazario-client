import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../UI/Loading/Loading";
import { Link } from "react-router";

const FeaturedProducts = () => {
  const axios = useAxios();

  const { data: topProducts = [], isLoading } = useQuery({
    queryKey: ["top=products"],
    queryFn: async () => {
      const res = await axios("top-products");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-24 px-3 overflow-hidden">
      <div className="text-center space-y-4 max-w-11/12 mx-auto">
        <h1 className="text-headings font-semibold text-5xl">
          Featured Products
        </h1>
        <p className="text-xl text-descriptions">
          Handpicked from our best sellers, these featured products are trending
          among shoppers for their exceptional quality, outstanding value, and
          customer satisfaction. Discover why they continue to be the top choice
          for thousands of happy buyers.
        </p>
      </div>

      <div className="my-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {topProducts.map((product) => (
          <div key={product._id} data-aos="fade-right" className="w-full">
            <div className="card bg-base-100 shadow-lg h-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
              <figure className="px-10 pt-10">
                <img
                  src={product?.productImage}
                  alt={`${product?.productName} Image`}
                  className="rounded-xl h-58.5 w-87.5 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product?.productName}</h2>
                <p>{product?.productDescriptions}</p>
                <div className="card-actions">
                  <Link
                    to={`/products-details/${product._id}`}
                    className="btn border-none bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
