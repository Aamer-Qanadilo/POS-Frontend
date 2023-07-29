import React from "react";

import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItemButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ShoppingCartOptionsPopover from "../ShoppingCartOptionsPopover";
import CartProductCard from "../CartProductCard";
import CartsQuantity from "../CartsQuantity";
import EmptyCashier from "../EmptyCashier";
import CashierSummary from "../CashierSummary";
import CashierInputs from "../CashierInputs";

import { ShoppingCartContext } from "../../../../Contexts/ShoppingCartContext";

type Props = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: Props) => {
  const [optionOpen, setOptionsOpen] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const { closeCart, openedCart, cartsQuantity, isCartEmpty, handleCheckout } =
    React.useContext(ShoppingCartContext);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setOptionsOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOptionsOpen(null);
  };

  const renderCashierBody = () => {
    if (isCartEmpty) {
      return <EmptyCashier onOpenMenu={handleOpenMenu} />;
    }

    return (
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={2}
          justifyContent="start"
          sx={{ margin: "5px 0 30px" }}
        >
          {openedCart?.products.map((product, index) => (
            <CartProductCard product={product} index={index} />
          ))}
        </Grid>

        <CashierInputs />

        <CashierSummary />

        <ListItemButton sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            fullWidth
            color="info"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </ListItemButton>
      </Box>
    );
  };

  return (
    <Drawer
      anchor="right"
      transitionDuration={250}
      open={isOpen}
      onClose={closeCart}
    >
      <Box
        sx={{
          width: 500,
          height: "100%",
          display: "flex",
          paddingBottom: "50px",
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
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Cart
            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon fontSize="medium" />
              <CartsQuantity
                cartsQuantity={cartsQuantity}
                transform="translate(10%, 10%)"
              />
            </IconButton>
          </Typography>
          <IconButton onClick={closeCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider
          variant="fullWidth"
          sx={{
            margin: ` 0`,
          }}
          flexItem
        />

        <Box
          textAlign="center"
          display={"flex"}
          flexGrow={1}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ padding: "10px 40px", flexGrow: 1 }}
        >
          {renderCashierBody()}
        </Box>
      </Box>
      <ShoppingCartOptionsPopover
        open={optionOpen}
        closeOptionsPopover={handleCloseMenu}
      />
    </Drawer>
  );
};

export default ShoppingCart;
