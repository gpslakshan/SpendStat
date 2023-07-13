import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const CheckAuth = ({ children }: Props) => {
  const auth = useSelector((state: any) => state.auth);
  return auth.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default CheckAuth;
