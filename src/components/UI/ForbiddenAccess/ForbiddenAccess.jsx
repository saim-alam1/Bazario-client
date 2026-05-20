import LottiePlayer from "lottie-react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import forbiddenAccessImg from "../../../assets/forbiddenAccess.json";
import { useNavigate } from "react-router";

const ForbiddenAccess = () => {
  const navigate = useNavigate();
  const Lottie = LottiePlayer.default || LottiePlayer;

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      {/* Lottie Animation */}
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mb-6">
        <Lottie animationData={forbiddenAccessImg} loop={true} />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">403</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Forbidden Access
      </h2>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
        <br />
        Please contact the administrator if you think this is a mistake.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-1/2 px-5 py-2 text-base font-medium text-headings transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 cursor-pointer"
      >
        <FaLongArrowAltLeft size={25} />
        <span>Go back</span>
      </button>
    </div>
  );
};

export default ForbiddenAccess;
