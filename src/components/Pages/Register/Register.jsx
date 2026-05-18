import LottiePlayer from "lottie-react";
import loginAnimation from "../../../assets/login.json";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import userProfilePicture from "../../../assets/image-upload-icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageUpload = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`;

      const res = await axios.post(imageUpload, formData);

      const url = res.data?.data?.display_url;

      setProfilePic(url);

      // IMPORTANT: sync with form if needed
      setValue("image", url);
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    }
  };

  // Monitoring the Icon Image Field
  const liveImage = watch("image");

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
                  Register to{" "}
                  <span className="text-[#F59E0B] italic">Bazario</span>
                </h1>
              </div>

              {/* Upload Image */}
              <div className="mb-8 space-y-4 text-center">
                <h1 className="text-descriptions">
                  Upload your profile picture
                </h1>

                <label className="cursor-pointer flex flex-col items-center text-center">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  ) : liveImage?.length > 0 ? (
                    <img
                      src={URL.createObjectURL(liveImage[0])}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  ) : (
                    <>
                      <img
                        src={userProfilePicture}
                        alt="Upload"
                        className="w-32 h-32 mb-2"
                      />
                      <p className="text-sm text-gray-500 mt-4">
                        Click or drag & drop to upload
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", {
                      required: true,
                      onChange: handleImageUpload,
                    })}
                  />
                </label>
              </div>

              <form className="fieldset">
                <div>
                  <label className="block mb-1.5 text-[18px] text-descriptions">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="block placeholder:text-sm
      placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
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
                    className="block w-full px-5 py-3 mt-2 text-black bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                    Already have account?{" "}
                    <Link
                      to="/auth-layout/login"
                      className="text-blue-500 font-semibold underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
                <button className="btn bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold mt-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
