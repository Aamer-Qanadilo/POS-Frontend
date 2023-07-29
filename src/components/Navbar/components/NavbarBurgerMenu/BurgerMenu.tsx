import * as React from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Typography,
  ListItemButton,
  Button,
  Divider,
  Drawer,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../../../../Contexts/UserContext";

import "./styles.css";

interface props {
  menuState: boolean;
  handleMenuToggle: () => void;
}

const BurgerMenu = ({ menuState, handleMenuToggle, ...props }: props) => {
  const { handleUserToken } = React.useContext(UserContext);

  const handleLogoutClick = () => {
    if (typeof handleUserToken !== "undefined") {
      handleUserToken("");
    }
  };

  return (
    <div>
      <Drawer
        anchor="right"
        transitionDuration={250}
        open={menuState}
        onClose={handleMenuToggle}
      >
        <Box
          sx={{
            width: 350,
            height: "100%",
            display: "flex",
          }}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
            }}
          >
            <Typography variant="h6" component="div" onClick={handleMenuToggle}>
              <Link to={"/"} className=" navbar__burger-logo">
                POS-Foothill
              </Link>
            </Typography>
            <IconButton onClick={handleMenuToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box textAlign="center">
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={"/"} className="navbar__burger-anchor">
                Cashier Page
              </NavLink>
            </ListItemButton>

            <Divider variant="middle" flexItem></Divider>

            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={"/products"} className="navbar__burger-anchor">
                Products Page
              </NavLink>
            </ListItemButton>

            <Divider variant="middle" flexItem></Divider>

            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={"/categories"} className="navbar__burger-anchor">
                Categories Page
              </NavLink>
            </ListItemButton>

            <Divider variant="middle" flexItem></Divider>

            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={"/units"} className="navbar__burger-anchor">
                Units Page
              </NavLink>
            </ListItemButton>
          </Box>
          <Box textAlign="center">
            <Button
              variant="text"
              sx={{ fontWeight: "bold", padding: "15px 0 35px" }}
              onClick={handleLogoutClick}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default BurgerMenu;
