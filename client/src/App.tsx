import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "./store/auth-slice";
import userService from "./services/user-service";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await userService.fetchUser();
      const user = res.data.user;
      console.log("User is fetched succesfully", user);
      dispatch(getUser(user));
    } catch (error) {
      console.log("An error occured while fetching the user: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
