import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../UI/Loading/Loading";

const TopVendors = () => {
  const axios = useAxios();

  const { data: topVendors = [], isLoading } = useQuery({
    queryKey: ["top-vendors"],
    queryFn: async () => {
      const res = await axios("top-vendors");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(topVendors);

  return (
    <section className="my-24 px-3">
      <div className="text-center space-y-4 max-w-9/12 mx-auto">
        <h1 className="text-headings font-semibold text-5xl">Top Vendors</h1>
        <p className="text-xl text-descriptions">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          qui adipisci dolore ratione cum maxime, suscipit exercitationem
          repudiandae provident blanditiis.
        </p>
      </div>
      <div className="my-12 grid grid-cols-3 gap-3">
        {topVendors.map((vendor) => (
          <div key={vendor._id} className="card bg-base-100 shadow-lg">
            <figure className="px-10 pt-10">
              <img
                src={vendor?.image}
                alt={`${vendor?.fullName} Image`}
                className="rounded-xl h-58.5 w-87.5 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <div className="text-center">
                <h2 className="card-title">{vendor?.fullName}</h2>
                <p className="text-base text-descriptions">
                  {vendor?.storeName}
                </p>
              </div>
              <p className="line-clamp-3 text-descriptions italic">
                {vendor?.storeDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
      ;
    </section>
  );
};

export default TopVendors;
