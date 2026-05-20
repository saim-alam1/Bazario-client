import { Navigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../UI/Loading/Loading";

const DashboardRedirects = () => {
  const { user } = useAuth();
  const { userRole, roleLoading } = useUserRole();

  if (roleLoading) return <Loading />;

  if (user && userRole === "customer") {
    return <Navigate to="customer-profile" />;
  }
  if (user && userRole === "vendor") {
    return <Navigate to="vendor-profile" replace />;
  }
  if (user && userRole === "admin") {
    return <Navigate to="admin-profile" />;
  }
};

export default DashboardRedirects;
