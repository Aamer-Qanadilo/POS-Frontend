import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";

import { UserContext } from "../../Contexts/UserContext";
import BurgerMenu from "../NavbarBurgerMenu/BurgerMenu";
import "./styles.css";

type Props = {};

const Navbar = (props: Props) => {
  const [menuState, setMenuState] = React.useState(false);
  const { user } = React.useContext(UserContext);

  const handleMenuToggle = () => {
    setMenuState(!menuState);
  };

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
                <NavLink
                  color="inherit"
                  to={"/login"}
                  className="navbar__button-anchor"
                >
                  Login
                </NavLink>
              </Button>
              <Button color="inherit" className="navbar__button">
                <NavLink
                  color="inherit"
                  to={"/register"}
                  className="navbar__button-anchor"
                >
                  Register
                </NavLink>
              </Button>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuToggle}
              >
                <MenuIcon />
              </IconButton>
              {menuState && (
                <BurgerMenu
                  menuState={menuState}
                  handleMenuToggle={handleMenuToggle}
                ></BurgerMenu>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
