import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import "./styles.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" to={"/"} className="navbar__button-anchor">
              FTS-Foothill
            </Link>
          </Typography>
          <Button color="inherit" className="navbar__button">
            <Link
              color="inherit"
              to={"/login"}
              className="navbar__button-anchor"
            >
              Login
            </Link>
          </Button>
          <Button color="inherit" className="navbar__button">
            <Link
              color="inherit"
              to={"/register"}
              className="navbar__button-anchor"
            >
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
