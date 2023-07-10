import React from "react";
import { isNumber } from "lodash";

import products from "../../types/products.types";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";
import NumberTextField from "../NumberTextField";
import { Box, CardActions, Typography } from "@mui/material";

type Props = {
  product: products;
};

const QuantityActions = ({ product }: Props) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeFromCart,
    getItemQuantity,
  } = React.useContext(ShoppingCartContext);

  const handleChange = (value: number) => {
    if (value === 0) {
      removeFromCart(product);
    } else if (value > 0) {
      increaseProductQuantity(product, value);
    }
  };

  const handleIncrease = () => {
    increaseProductQuantity(product);
  };

  const handleDecrease = () => {
    decreaseProductQuantity(product);
  };

  const handleRemoveProduct = () => {
    removeFromCart(product);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <NumberTextField
        onChange={handleChange}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        value={getItemQuantity(product._id)}
        text="Quantity"
      ></NumberTextField>

      <Typography
        variant="caption"
        color="error"
        sx={{
          fontSize: "12px",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={handleRemoveProduct}
      >
        Remove
      </Typography>
    </Box>
  );
};

export default QuantityActions;
