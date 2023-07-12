import React from "react";

import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";

type Props = {
  open: (EventTarget & HTMLButtonElement) | null;
  closeOptionsPopover: () => void;
};

const ShoppingCartOptionsPopover = ({ open, closeOptionsPopover }: Props) => {
  const { carts, openedCart, createCart, handleOpenedCart } =
    React.useContext(ShoppingCartContext);

  const handleCreateNewCart = () => {
    createCart();
    closeOptionsPopover();
  };

  const handleChangeCart = (e: SelectChangeEvent<string>) => {
    handleOpenedCart(e.target.value);
    closeOptionsPopover();
  };

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={closeOptionsPopover}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            p: 2,
            width: 250,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Available Carts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={openedCart?.id}
          label="Available Carts "
          onChange={handleChangeCart}
        >
          {carts.map((cart, index) => (
            <MenuItem value={cart.id}>Cart #{index}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider variant="middle" sx={{ margin: "5px 0" }}>
        Or
      </Divider>

      <Button
        color="info"
        fullWidth
        variant="contained"
        onClick={handleCreateNewCart}
      >
        <AddIcon />
        <Typography>Create new Cart</Typography>
      </Button>
    </Popover>
  );
};

export default ShoppingCartOptionsPopover;
