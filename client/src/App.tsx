import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <>
      <Header isLoggedIn={isAuthenticated} />
      <Outlet />
    </>
  );
}

export default App;
