import axios from "axios";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://bazario-server-ruby.vercel.app/",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            config.headers.authorization = `Bearer ${token}`;
          } catch (tokenError) {
            console.error("Error fetching token:", tokenError);
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401) {
          toast.error("Session expired. Please log in again.");
          await logOutUser();
        }

        if (status === 403) {
          toast.error("You don't have permission to access this resource.");
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
