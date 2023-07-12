import React from "react";
import { alpha, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";

import CartsQuantity from "../CartsQuantity";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";

type Props = {};

const color = grey[500];

const transparent = alpha(color, 0.16);

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(19),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  color: theme.palette.text.primary,
  boxShadow: `0 20px 40px -4px ${transparent}`,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

const CartIcon = (props: Props) => {
  const { cartsQuantity, openCart } = React.useContext(ShoppingCartContext);

  return (
    <StyledRoot onClick={openCart}>
      <ShoppingCartIcon />
      <CartsQuantity cartsQuantity={cartsQuantity} />
    </StyledRoot>
  );
};

export default CartIcon;
