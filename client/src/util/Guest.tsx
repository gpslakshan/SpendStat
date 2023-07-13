import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const Guest = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/" replace={true} />;
};

export default Guest;
