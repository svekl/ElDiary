import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Loading from "../components/blocks/Loading";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
