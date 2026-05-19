import { Navigate, useLocation } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../UI/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (user && user?.email) return children;

  return (
    <Navigate state={location.pathname} to={"/auth-layout/login"}></Navigate>
  );
};

export default PrivateRoute;
