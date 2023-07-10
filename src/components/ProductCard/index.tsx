import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { formatCurrency } from "../../utils/formatCurrency";
import productType from "../../types/products.types";
import QuantityActions from "../QuantityActions";

type Props = {
  index: number;
  product: productType;
};

const ProductCard = ({ index, product }: Props) => {
  const { productImageBaseUrl } = React.useContext(ProductContext);
  const { getItemQuantity, increaseProductQuantity, removeFromCart } =
    React.useContext(ShoppingCartContext);

  const handleAddProduct = () => {
    increaseProductQuantity(product);
  };

  const handleRemoveProduct = () => {
    removeFromCart(product);
  };

  const {
    image,
    name,
    price,
    unitOfMeasure: { name: unitOfMeasureName },
  } = product;

  const productQuantity = getItemQuantity(product._id);

  const cardPadding = productQuantity ? "30px 20px 0" : "30px 20px";

  return (
    <Grid item lg={3} md={4} sm={6}>
      <Card
        key={index}
        sx={{
          transition: "0.3s",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          },
          padding: productQuantity ? "30px 20px 0" : "30px 20px",
          height: "max-content",
        }}
      >
        <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0",
            borderRadius: "5px",
          }}
        >
          <Avatar
            variant={"rounded"}
            alt="The image"
            src={productImageBaseUrl + image}
            style={{
              width: 120,
              height: 120,
            }}
          />
        </Box>

        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            padding: "10px 0px",
          }}
        >
          <Typography
            className={"MuiTypography--heading"}
            variant={"subtitle1"}
            gutterBottom
            sx={{
              maxWidth: "75%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontWeight: "bold",
              margin: "20px 0 10px",
            }}
          >
            {name}
          </Typography>
          <Typography
            className={"MuiTypography--heading"}
            variant={"subtitle2"}
            color="Highlight"
            sx={{ fontWeight: "bold" }}
          >
            {formatCurrency(price) + " / " + unitOfMeasureName}
          </Typography>
        </CardContent>
        <Divider
          variant="middle"
          sx={{
            margin: `20px 0`,
          }}
          light
          flexItem
        />
        <CardActions>
          {productQuantity ? (
            <QuantityActions product={product} />
          ) : (
            <Button fullWidth variant="contained" onClick={handleAddProduct}>
              Add to Cart
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
