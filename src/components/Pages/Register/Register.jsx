import LottiePlayer from "lottie-react";
import loginAnimation from "../../../assets/login.json";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import userProfilePicture from "../../../assets/image-upload-icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../UI/Loading/Loading";
import imageCompression from "browser-image-compression";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const Lottie = LottiePlayer.default || LottiePlayer;
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });
  const { loading, registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      setUploading(true);

      const compressedImage = await imageCompression(image, options);

      const formData = new FormData();
      formData.append("image", compressedImage);

      const imageUpload = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`;
      const res = await axios.post(imageUpload, formData);
      const url = res.data?.data?.display_url;

      setProfilePic(url);

      setValue("image", url, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = (data) => {
    const { email, image, name, password } = data;

    // Register User
    registerUser(email, password)
      .then(async () => {
        // Update User Info In Firebase
        const userProfile = {
          displayName: name,
          photoURL: image,
        };

        await updateUserProfile(userProfile)
          .then(() => console.log("User profile updated"))
          .catch((error) => console.log(error));

        toast.success("Registration Successful");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  if (loading) return <Loading />;

  return (
    <section className="flex">
      <Helmet>
        <title>Register | Bazario</title>
        <meta
          name="description"
          content="Join Bazario today and create your account to explore products, manage your profile, and enjoy a smooth online shopping experience built for modern users."
        />
      </Helmet>

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

              {/* Upload Image Section */}
              <div className="mb-8 space-y-4 text-center">
                <h1 className="text-descriptions">
                  Upload your profile picture
                </h1>

                <label className="cursor-pointer flex flex-col items-center text-center">
                  {uploading ? (
                    <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full">
                      <span className="text-sm text-gray-500">
                        Uploading...
                      </span>
                    </div>
                  ) : profilePic ? (
                    <img
                      src={profilePic}
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
                    onChange={handleImageUpload}
                  />
                </label>

                <input
                  type="hidden"
                  {...register("image", {
                    required: "Profile image is required",
                  })}
                />

                {errors.image && (
                  <p className="text-[16px] text-red-500 mt-2.5">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Main Form Elements */}
              <form
                className="fieldset"
                onSubmit={handleSubmit(handleRegister)}
              >
                <div>
                  <label className="block mb-1.5 text-[18px] text-descriptions">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="block placeholder:text-sm placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                    className="block placeholder:text-sm placeholder:font-medium w-full px-3 py-3 text-black bg-white border border-gray-200 text-sm rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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

                {/* Link to Login */}
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

                <button
                  type="submit"
                  className="btn bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold mt-4"
                >
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
