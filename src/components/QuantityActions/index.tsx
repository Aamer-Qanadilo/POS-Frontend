import React from "react";

import { Box, Typography } from "@mui/material";

import NumberTextField from "../NumberTextField";

import products from "../../types/products.types";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";

import "./styles.css";

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
        width: "100%",
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
        className="cashier-product-card__remove-btn"
        onClick={handleRemoveProduct}
      >
        Remove
      </Typography>
    </Box>
  );
};

export default QuantityActions;
