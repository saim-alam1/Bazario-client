import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../UI/Loading/Loading";

const Categories = () => {
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
        <h1 className="text-headings font-semibold text-5xl">Categories</h1>
        <p className="text-xl text-descriptions">
          Here you can see just all the trending categories we currently have.
          We have a vast amount of category collection in the whole Bangladesh.
          You can your desired item here.
        </p>
      </div>

      <div className="my-12 grid grid-cols-3 gap-4">
        {categories.map((data, index) => (
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
    </section>
  );
};

export default Categories;
