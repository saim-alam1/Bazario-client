import LottiePlayer from "lottie-react";
import loginAnimation from "../../../assets/login.json";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading/Loading";

const Login = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });
  const { loading, loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const { email, password } = data;

    // Firebase Login
    loginUser(email, password)
      .then(async (result) => {
        const firebaseUser = result.user;
        await firebaseUser.getIdToken(true);

        toast.success("Login successful");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message || "Login failed");
      });
  };

  if (loading) return <Loading />;

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
              <form className="fieldset" onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-2">
                  <label className="block mb-2 text-[18px] text-descriptions">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="block placeholder:text-sm
      placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-[16px] mt-2">
                      Name field is required
                    </span>
                  )}
                </div>
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
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[16px] mt-3">
                      Email field is required
                    </span>
                  )}
                </div>
                {/* Password */}
                <div className="relative">
                  <label className="block text-[18px] text-descriptions">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="********"
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("password", {
                      required: "Password field is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 bottom-1 -translate-y-1/2 text-[20px] cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[16px]">
                    {errors.password.message}
                  </p>
                )}
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
