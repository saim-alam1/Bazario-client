import { Navigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";
import Loading from "../../../UI/Loading/Loading";

const VendorsRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userRole, roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading />;

  if (!user || userRole !== "vendor")
    return <Navigate to="/forbidden-access" />;

  return children;
};

export default VendorsRoute;
