import LottiePlayer from "lottie-react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import page404 from "../../../assets/page404.json";

const ErrorComponent = () => {
  const navigate = useNavigate();
  const Lottie = LottiePlayer.default || LottiePlayer;

  return (
    <section className="bg-white">
      <div className="max-w-480 mx-auto min-h-screen px-6 py-12 flex items-center flex-col-reverse justify-center lg:flex-row lg:justify-around gap-12">
        {/* Left Content */}
        <div className="max-w-xl text-center lg:text-left">
          <p className="text-lg font-medium text-[#F59E0B]">404 Error</p>

          <h1 className="mt-3 text-3xl font-semibold text-headings">
            We can't find that page
          </h1>

          <p className="mt-4 text-descriptions font-medium text-base">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex items-center justify-center lg:justify-start mt-6 gap-x-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-base font-medium text-headings transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 cursor-pointer"
            >
              <FaLongArrowAltLeft size={25} />
              <span>Go back</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-1/2 px-5 py-2 text-base font-medium tracking-wide text-white transition-colors duration-200 bg-[#F59E0B] hover:bg-[#D97706] rounded-lg shrink-0 sm:w-auto cursor-pointer"
            >
              Take me home
            </button>
          </div>
        </div>

        {/* Right Lottie Animation */}
        <div className="w-full hidden md:flex justify-center lg:max-w-lg">
          <Lottie animationData={page404} loop />
        </div>
      </div>
    </section>
  );
};

export default ErrorComponent;
