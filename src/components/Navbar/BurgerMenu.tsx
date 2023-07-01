import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";

import "./styles.css";
import { UserContext } from "../../UserContext";

interface props {
  menuState: boolean;
  handleMenuToggle: () => void;
}

const BurgerMenu = ({ menuState, handleMenuToggle, ...props }: props) => {
  const { handleUser } = React.useContext(UserContext);

  const handleLogoutClick = () => {
    if (typeof handleUser !== "undefined") {
      handleUser("");
    }
  };

  return (
    <div>
      <Drawer anchor="right" open={menuState} onClose={handleMenuToggle}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
          }}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box textAlign="end">
            <IconButton onClick={handleMenuToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box textAlign="center">
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink
                color="inherit"
                to={"/"}
                className="navbar__burger-anchor"
              >
                Cashier Page
              </NavLink>
            </ListItemButton>

            <Divider sx={{ margin: "10px 0" }} />

            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink
                color="inherit"
                to={"/products"}
                className="navbar__burger-anchor"
              >
                Products Page
              </NavLink>
            </ListItemButton>

            <Divider sx={{ margin: "10px 0" }} />

            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink
                color="inherit"
                to={"/categories"}
                className="navbar__burger-anchor"
              >
                Categories Page
              </NavLink>
            </ListItemButton>

            <Divider sx={{ margin: "10px 0" }} />

            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink
                color="inherit"
                to={"/units"}
                className="navbar__burger-anchor"
              >
                Units Page
              </NavLink>
            </ListItemButton>
          </Box>
          <Box textAlign="center">
            <Button
              variant="text"
              sx={{ mb: 3, fontWeight: "bold" }}
              onClick={handleLogoutClick}
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
