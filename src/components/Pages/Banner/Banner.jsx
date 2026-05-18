import { Link } from "react-router";
import dashWave from "../../../assets/dash-wave.svg";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
      title: "Summer Collection",
      descriptions:
        "Designed for hot, humid days, the Summer Collection features breathable, lightweight fabrics like cotton, linen, and chiffon.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      title: "New Sneakers",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      title: "Fashion Trends",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      title: "Premium Jackets",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      title: "Luxury Style",
    },
  ];

  return (
    <section className="">
      <div
        className="relative w-full h-[800px] md:h-[1050px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dashWave})` }}
      >
        <div className="absolute inset-0 z-20 bg-linear-to-br from-black/30 via-black/80 to-[#EA580C90] grid lg:grid-cols-2 items-center justify-around">
          {/* Contents */}

          <div className="w-11/12 mx-auto">
            <button className="btn border-none shadow-none bg-[#EA580C90] rounded-full text-[#F59E0B] text-sm font-semibold">
              <AiOutlineThunderbolt size={25} /> New Collection 2026
            </button>

            <div className="my-12 space-y-5">
              <h1 className="text-4xl font-black text-white">
                Summer Collection
              </h1>
              <p className="text-lg text-gray-500 font-semibold">
                Designed for hot, humid days, the Summer Collection features
                breathable, lightweight fabrics like cotton, linen, and chiffon.
                breathable, lightweight fabrics like cotton, linen, and chiffon.
                These easy-to-wear pieces—including flowy dresses, crisp
                button-downs, and vibrant 3-piece suits—are tailored to keep you
                cool and stylish.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                to="/shop"
                className="btn border-none shadow-none bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base rounded-full"
              >
                Shop Now <LuShoppingBag size={25} />
              </Link>
              <Link
                to="/categories"
                className="btn shadow-none bg-transparent border border-amber-600 hover:text-amber-500 text-white font-semibold text-base rounded-full"
              >
                Browse Categories <FaChevronRight size={25} />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <img
                className="md:h-[400px] object-cover -rotate-8 rounded-xs"
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
                alt="Image"
              />

              {/* badge 1 */}
              <div
                className="absolute top-25 -left-18 flex items-center gap-3 px-4 py-3
    bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
              >
                <CiDeliveryTruck size={35} color="#22c55e" />

                <div>
                  <h3 className="text-xl text-white font-semibold">
                    Free Shipping
                  </h3>
                  <p className="text-base text-gray-300 font-semibold">
                    For Orders Upto 50$
                  </p>
                </div>
              </div>

              {/* badge 2 */}
              <div
                className="absolute bottom-25 -right-18 flex items-center gap-3 px-4 py-3
    bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
              >
                <GrUpdate size={25} color="#22c55e" />

                <div>
                  <h3 className="text-xl text-white font-semibold">
                    Easy Returns
                  </h3>
                  <p className="text-base text-gray-300 font-semibold">
                    60-day guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
