import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const Guest = ({ children }: Props) => {
  const auth = useSelector((state: any) => state.auth);
  return !auth.isAuthenticated ? children : <Navigate to="/" replace={true} />;
};

export default Guest;
