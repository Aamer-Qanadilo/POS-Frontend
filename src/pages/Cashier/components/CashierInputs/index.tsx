import React from "react";

import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from "@mui/material";

import { ShoppingCartContext } from "../../../../Contexts/ShoppingCartContext";

import { isNumber } from "lodash";

type Props = {};

const CashierInputs = (props: Props) => {
  const { handleTax, handleDiscount, openedCart } =
    React.useContext(ShoppingCartContext);

  const handleTaxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget;

    const discountValue = Number(value);

    if (isNumber(discountValue)) {
      handleTax(discountValue);
    }
  };

  const handleDiscountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget;

    const discountValue = Number(value);

    if (isNumber(discountValue)) {
      handleDiscount(discountValue);
    }
  };

  return (
    <React.Fragment>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
        <Input
          type="number"
          id="tax-input"
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          aria-describedby="tax-input-helper-text"
          inputProps={{
            "aria-label": "tax",
            style: {
              textAlign: "center",
            },
          }}
          onChange={handleTaxChange}
          value={openedCart?.tax}
        />
        <FormHelperText id="tax-input-helper-text">Tax</FormHelperText>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
        <Input
          type="number"
          id="discount-input"
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="discount-input-helper-text"
          inputProps={{
            "aria-label": "discount",
            style: {
              textAlign: "center",
            },
          }}
          onChange={handleDiscountChange}
          value={openedCart?.discount}
        />
        <FormHelperText id="discount-input-helper-text">
          Discount
        </FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

export default CashierInputs;
