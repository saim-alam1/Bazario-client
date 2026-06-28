import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useNotifications from "../../../Hooks/useNotifications";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading/Loading";

const SocialLogin = () => {
  const { loading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { addNotification } = useNotifications();

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      const user = res.user;

      addNotification({
        receiverEmail: user.email,
        message: "Login successful! Welcome to NextHire.",
      });

      const alreadyUser = await axiosSecure(`users/${user.email}`);

      if (alreadyUser.data) {
        toast.success("Login successful");
        navigate(location.state?.from?.pathname || "/");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.success(
          "Authentication successful! Let's finish setting up your profile.",
        );
        navigate("/dashboard-layout/customer-profile");
      } else {
        console.error("Login process error:", error);
        toast.error(
          "An error occurred during authentication. Please try again.",
        );
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn bg-white text-headings border-[#e5e5e5] w-full mt-4"
    >
      <FcGoogle className="text-2xl" />
      Login with Google
    </button>
  );
};

export default SocialLogin;
