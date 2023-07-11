import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={`/`} className="text-white">
              SpendStat
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to={`login`} className="text-white">
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to={`register`} className="text-white">
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
