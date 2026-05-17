import LottiePlayer from "lottie-react";
import loginAnimation from "../../../assets/login.json";

const Login = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;

  return (
    <section className="flex">
      {/* Animation */}
      <div className="w-full hidden md:flex justify-center lg:max-w-lg">
        <Lottie animationData={loginAnimation} loop />
      </div>
      {/* Login Form */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-lg">
            <div className="card-body">
              <div className="text-center my-4">
                <h1 className="text-2xl font-semibold tracking-wider text-headings">
                  Login to your account
                </h1>
              </div>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover text-blue-500 text-sm">
                    Forgot password?
                  </a>
                </div>
                <button className="btn bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold mt-4">
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
