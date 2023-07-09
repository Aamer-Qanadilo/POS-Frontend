import React from "react";

import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: Props) => {
  const { closeCart, carts, getItemQuantity, openedCart, createCart } =
    React.useContext(ShoppingCartContext);

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
          <FormControl>
            <InputLabel id="demo-simple-select-label">Cart</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={openedCart?.id}
              label="Age"
            >
              {carts.map((cart, index) => (
                <MenuItem value={cart.id}>Cart #{index}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={closeCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box textAlign="center" sx={{ padding: "10px 40px" }}>
          <Box>
            <TextField
              id="standard-basic"
              label="Tax"
              variant="standard"
              type="number"
            />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label="Discount %"
              variant="standard"
              type="number"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 15px",
              gap: "5px",
            }}
          >
            <Typography variant="h6" component="div">
              Subtotal{" "}
              {formatCurrency(
                openedCart?.products.reduce((total, product) => {
                  return total + product.quantity * product.price;
                }, 0) || 0,
              )}
            </Typography>

            <Divider flexItem variant="middle" light sx={{ margin: "5px 0" }} />

            <Typography variant="h6" component="div" color="Highlight">
              Total{" "}
              {formatCurrency(
                openedCart?.products.reduce((total, product) => {
                  return total + product.quantity * product.price;
                }, 0) || 0,
              )}
            </Typography>
          </Box>

          <ListItemButton sx={{ textAlign: "center" }}>
            <Button variant="contained" fullWidth color="success">
              Checkout
            </Button>
          </ListItemButton>
        </Box>

        <Box
          sx={{
            padding: "10px 20px",

            display: "flex",
            flexDirection: "column",
            gap: "5px",
            // alignItems: "center",
          }}
        >
          <Button
            color="info"
            fullWidth
            variant="contained"
            onClick={createCart}
          >
            <AddIcon />
            <Typography>Create new Cart</Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ShoppingCart;
