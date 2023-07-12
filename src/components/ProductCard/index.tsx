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

import QuantityActions from "../QuantityActions";

import productType from "../../types/products.types";

import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";
import { ProductContext } from "../../Contexts/ProductContext";

import { formatCurrency } from "../../utils/formatCurrency";

import "./styles.css";

type Props = {
  index: number;
  product: productType;
};

const ProductCard = ({ index, product }: Props) => {
  const { productImageBaseUrl } = React.useContext(ProductContext);
  const { getItemQuantity, increaseProductQuantity } =
    React.useContext(ShoppingCartContext);

  const handleAddProduct = () => {
    increaseProductQuantity(product);
  };

  const {
    image,
    name,
    price,
    unitOfMeasure: { name: unitOfMeasureName },
  } = product;

  const productQuantity = getItemQuantity(product._id);

  return (
    <Grid item lg={3} md={4} sm={6}>
      <Card
        key={index}
        className="cashier-product-card"
        sx={{
          padding: productQuantity ? "30px 20px 0" : "30px 20px",
        }}
      >
        <Box
          component={"div"}
          className="cashier-product-card__image-container"
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

        <CardContent className="cashier-product-card__content">
          <Typography
            className={"MuiTypography--heading cashier-product-card__title"}
            variant={"subtitle1"}
          >
            {name}
          </Typography>

          <Typography
            className={
              "MuiTypography--heading cashier-product-card__price-info"
            }
            variant={"subtitle2"}
            color="Highlight"
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
