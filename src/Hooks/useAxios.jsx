import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: "https://bazario-server-ruby.vercel.app/",
  });

  return axiosInstance;
};

export default useAxios;
