import { Navigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";
import Loading from "../../../UI/Loading/Loading";

const CustomerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userRole, roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading />;

  if (!user || userRole !== "customer")
    return <Navigate to="/forbidden-access" />;

  return children;
};

export default CustomerRoute;
