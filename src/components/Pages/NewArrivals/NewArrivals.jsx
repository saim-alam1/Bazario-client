import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading/Loading";
import { Link } from "react-router";

const NewArrivals = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const axios = useAxios();

  const { data: newProducts = [], isLoading } = useQuery({
    queryKey: ["new-products"],
    queryFn: async () => {
      const res = await axios("new-arrivals");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section data-aos="fade-up-right" className="mb-24 px-3">
      <div className="text-center space-y-4 max-w-11/12 mx-auto">
        <h1 className="text-headings font-semibold text-5xl">
          Discover New Arrivals
        </h1>
        <p className="text-xl text-descriptions">
          Be the first to discover our newest arrivals, featuring fresh products
          from trusted vendors. Explore the latest additions and find exciting
          new favorites before everyone else.
        </p>
      </div>

      <div className="my-12 grid grid-cols-3 gap-3">
        {newProducts.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-lg">
            <figure className="px-10 pt-10">
              <img
                src={product?.productImage}
                alt={`${product?.productName} Image`}
                className="rounded-xl h-58.5 w-87.5 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product?.productName}</h2>
              <p className="line-clamp-4">{product?.productDescriptions}</p>
              <div className="card-actions">
                <Link
                  to={`/products-details/${product._id}`}
                  className="btn border-none bg-amber-500"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
