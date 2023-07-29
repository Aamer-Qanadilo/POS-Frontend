import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import QuantityActions from "../../../../components/QuantityActions";

import { ShoppingCartContext } from "../../../../Contexts/ShoppingCartContext";
import { ProductContext } from "../../../../Contexts/ProductContext";

import productType from "../../../../types/products.types";

import { formatCurrency } from "../../../../utils/formatCurrency";

type Props = {
  index: number;
  product: productType;
};

const CartProductCard = ({ index, product }: Props) => {
  const { productImageBaseUrl } = React.useContext(ProductContext);

  const { getItemQuantity } = React.useContext(ShoppingCartContext);

  const {
    image,
    name,
    price,
    unitOfMeasure: { name: unitOfMeasureName },
  } = product;

  const productQuantity = getItemQuantity(product._id);

  return (
    <Grid item sm={12}>
      <Card
        key={index}
        sx={{
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          alignItems: "center",
          boxShadow: 0,
          //   boxShadow:
          //     "0 2px 15px -3px rgba(0, 0, 0, 0.2), 0 10px 20px -2px rgba(0, 0, 0, 0.2)",
          //   "&:hover": {
          //     boxShadow: 4,
          //   },
          padding: "10px 20px",
          gap: "20px",
        }}
      >
        <Avatar
          variant={"rounded"}
          alt="The image"
          src={productImageBaseUrl + image}
          style={{
            width: 100,
            height: 100,
          }}
        />

        <Box sx={{ width: "100%" }}>
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 6px",
            }}
          >
            <Typography
              className={"MuiTypography--heading"}
              variant={"subtitle1"}
              gutterBottom
              sx={{
                maxWidth: "50%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontWeight: "bold",
              }}
            >
              {name}
            </Typography>

            <Typography
              className={"MuiTypography--heading"}
              variant={"subtitle2"}
              color="Highlight"
              sx={{
                fontWeight: "bold",
                maxWidth: "45%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {`${formatCurrency(
                productQuantity * price,
              )} / ${productQuantity} * ${unitOfMeasureName}`}
            </Typography>
          </CardContent>

          <QuantityActions product={product} />
        </Box>
      </Card>

      <Divider
        variant="middle"
        sx={{
          margin: `5px 0`,
        }}
        flexItem
      />
    </Grid>
  );
};

export default CartProductCard;
