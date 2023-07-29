import React from "react";

import { Box, Typography } from "@mui/material";

import { ShoppingCartContext } from "../../../../Contexts/ShoppingCartContext";

import { formatCurrency } from "../../../../utils/formatCurrency";

type Props = {};

const CashierSummary = (props: Props) => {
  const { cartTotal, cartSubTotal, cartItemsQuantity } =
    React.useContext(ShoppingCartContext);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 15px 10px",
        }}
      >
        <Typography variant="h6" component="div">
          Subtotal{" "}
          <span style={{ textDecoration: "line-through", opacity: "0.5" }}>
            {" "}
            <br />
            {formatCurrency(cartSubTotal)}
          </span>
        </Typography>
        <Typography variant="h6" component="div" color="Highlight">
          Total <br />
          <span style={{ fontWeight: "bold" }}>
            {formatCurrency(cartTotal)}
          </span>
        </Typography>
      </Box>

      <Typography>Total Items: {cartItemsQuantity()}</Typography>
    </React.Fragment>
  );
};

export default CashierSummary;
