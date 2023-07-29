import React from "react";

import { Avatar, Box, Button, Container, Typography } from "@mui/material";

import { ShoppingCartContext } from "../../../../Contexts/ShoppingCartContext";

type Props = {
  onOpenMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const EmptyCashier = ({ onOpenMenu }: Props) => {
  const { openedCart, closeCart } = React.useContext(ShoppingCartContext);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Avatar
          src="/assets/images/cashier.png"
          sx={{ width: "140px", height: "140px" }}
        ></Avatar>
        <Typography variant="h5">
          {openedCart
            ? "You have no items in your cart"
            : "You haven't choosen any cart"}
        </Typography>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={openedCart ? closeCart : onOpenMenu}
        >
          {openedCart ? "Add items now" : "Choose a cart"}
        </Button>
      </Box>
    </Container>
  );
};

export default EmptyCashier;
