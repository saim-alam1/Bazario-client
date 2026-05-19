import LottiePlayer from "lottie-react";
import loginAnimation from "../../../assets/login.json";
import { Link } from "react-router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const [show, setShow] = useState(false);

  return (
    <section className="flex">
      {/* Animation */}
      <div className="w-full hidden md:flex justify-center lg:max-w-lg">
        <Lottie animationData={loginAnimation} loop />
      </div>
      {/* Login Form */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card bg-base-100 w-full max-w-md shrink-0">
            <div className="card-body">
              <div className="text-center my-4">
                <h1 className="text-3xl font-semibold tracking-wider text-headings">
                  Login to your account
                </h1>
              </div>
              <form className="fieldset">
                {/* Email */}
                <div className="my-2">
                  <label className="block mb-1.5 text-[18px] text-descriptions">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="block placeholder:text-sm
      placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Password */}
                <div className="relative">
                  <label className="block text-[18px] text-descriptions">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="********"
                    className="block w-full px-5 py-3 text-black bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 bottom-1 -translate-y-1/2 text-[20px] cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {/* Link to Register */}
                <div className="my-3">
                  <p className="text-sm">
                    Don't have any account?{" "}
                    <Link
                      to="/auth-layout/register"
                      className="text-blue-500 font-semibold underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>
                <button className="btn bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold mt-4">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
