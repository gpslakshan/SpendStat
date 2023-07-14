import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/auth-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(signOut());
    navigate("/login", { replace: true });
    // window.location.reload(); //Axios Header not updated. User needs to manually reload page in React
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={`/`} className="text-white">
              SpendStat
            </Link>
          </Typography>
          {!auth.isAuthenticated && (
            <Button color="inherit">
              <Link to={`login`} className="text-white">
                Login
              </Link>
            </Button>
          )}
          {auth.isAuthenticated && (
            <Button color="inherit">
              <Link to={`/categories`} className="text-white">
                Categories
              </Link>
            </Button>
          )}
          {auth.isAuthenticated && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
          {!auth.isAuthenticated && (
            <Button color="inherit">
              <Link to={`register`} className="text-white">
                Register
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
