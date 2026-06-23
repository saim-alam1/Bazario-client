import { Navigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../UI/Loading/Loading";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";

const DashboardRedirects = () => {
  const { user } = useAuth();
  const { userRole, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { data: accountStatus = [], isLoading } = useQuery({
    queryKey: ["account-status", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`check-account-status/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (accountStatus?.status === "suspended") {
      Swal.fire({
        icon: "warning",
        title: "Account Suspended",
        html: `
        <p>
          Dear <strong>${user?.displayName || "User"}</strong>,
          your <strong>${userRole}</strong> account on
          <strong>Bazario</strong> has been temporarily suspended.
        </p>
        <br/>
        <p>
          During this period, access to dashboard features is restricted.
          Please contact support or wait for further review from the
          administration team.
        </p>
      `,
        confirmButtonText: "Understood",
        allowOutsideClick: false,
      });
    }
  }, [accountStatus?.status, user?.displayName, userRole]);

  if (roleLoading || isLoading) return <Loading />;

  if (accountStatus?.status === "suspended") {
    return <Navigate to="/" replace />;
  }

  if (user && userRole === "customer") {
    return <Navigate to="customer-profile" />;
  }
  if (user && userRole === "vendor") {
    return <Navigate to="vendors-profile" replace />;
  }
  if (user && userRole === "admin") {
    return <Navigate to="admin-profile" />;
  }
};

export default DashboardRedirects;
