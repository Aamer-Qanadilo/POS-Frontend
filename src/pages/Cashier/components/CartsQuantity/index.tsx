import React from "react";

import { Box } from "@mui/system";

import "./styles.css";

type Props = {
  cartsQuantity: number;
  transform?: string;
};

const CartsQuantity = ({ cartsQuantity, transform }: Props) => {
  return (
    <Box
      component="div"
      className="cart-icon__length"
      sx={{ transform: transform }}
    >
      {cartsQuantity}
    </Box>
  );
};

export default CartsQuantity;
