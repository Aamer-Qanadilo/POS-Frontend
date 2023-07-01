import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import "./styles.css";
import { UserContext } from "../../UserContext";

type Props = {};

const Navbar = (props: Props) => {
  const { user } = React.useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" to={"/"} className="navbar__button-anchor">
              POS-Foothill
            </Link>
          </Typography>
          {!user ? (
            <>
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
            </>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
