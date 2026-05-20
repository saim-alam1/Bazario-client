import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole = "", isLoading: roleLoading } = useQuery({
    queryKey: ["account-type", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const res = await axiosSecure(`user-role/${user.email}`);
      return res.data;
    },
  });

  return { userRole, roleLoading };
};

export default useUserRole;
