import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../UI/Loading/Loading";
import { Link } from "react-router";

const CategoriesSection = () => {
  const axiosInstance = useAxios();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["load-categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("categories");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-12 px-3">
      <div className="text-center space-y-4 max-w-9/12 mx-auto">
        <h1 className="text-headings font-semibold text-5xl">
          Categories Section
        </h1>
        <p className="text-xl text-descriptions">
          Here you can see just a glimpse of all the trending categories we
          currently have. Also if you want you can see all the other categories
          which we have on our collections.
        </p>
      </div>

      <div className="my-12 grid grid-cols-3 gap-4">
        {categories.slice(0, 6).map((data, index) => (
          <div
            key={index}
            className="card bg-base-100 h-75 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <figure className="w-full">
              <img
                src={data?.image}
                alt="Shoes"
                className="w-full object-center"
              />
            </figure>
            <div className="card-body text-center flex flex-col items-center">
              <h2 className="text-2xl font-semibold">{data?.category}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          to="categories"
          className="btn bg-amber-500 border-none hover:bg-amber-600 text-base font-semibold"
        >
          See More...
        </Link>
      </div>
    </section>
  );
};

export default CategoriesSection;
