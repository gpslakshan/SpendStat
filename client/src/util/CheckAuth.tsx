import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const CheckAuth = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace={true} />;
};

export default CheckAuth;
