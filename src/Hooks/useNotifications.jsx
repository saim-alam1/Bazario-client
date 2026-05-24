import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useNotifications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 1. Fetch Notifications (GET)
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      await user.getIdToken(true);
      const res = await axiosSecure.get(`notifications/${user?.email}`);
      return res.data;
    },
  });

  // 2. Post Notification In DB
  const { mutate: addNotification } = useMutation({
    mutationFn: async (notifyData) => {
      return await axiosSecure.post("notifications", notifyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?.email],
      });
    },
  });

  // 3. Mark as Read (PATCH)
  const { mutate: markAsRead } = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`notifications/read/${user?.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?.email],
      });
    },
  });

  return { notifications, addNotification, markAsRead, isLoading };
};

export default useNotifications;
