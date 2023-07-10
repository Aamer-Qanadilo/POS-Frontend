import React from "react";

import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  Grid,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import ShoppingCartOptionsPopover from "../ShoppingCartOptionsPopover";
import CartProductCard from "../CartProductCard";
import CartsQuantity from "../CartQuantity";
import EmptyCashier from "../EmptyCashier";

type Props = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: Props) => {
  const [optionOpen, setOptionsOpen] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const {
    closeCart,
    openedCart,
    cartsQuantity,
    isCartEmpty,
    cartTotal,
    cartSubTotal,
  } = React.useContext(ShoppingCartContext);

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
      <>
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

        <ListItemButton sx={{ textAlign: "center" }}>
          <Button variant="contained" fullWidth color="info">
            Checkout
          </Button>
        </ListItemButton>
      </>
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
          display={isCartEmpty ? "flex" : "block"}
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
