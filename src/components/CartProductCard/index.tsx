import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartContext";
import productType from "../../types/products.types";
import { ProductContext } from "../../Contexts/ProductContext";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  index: number;
  product: productType;
};

const CartProductCard = ({ index, product }: Props) => {
  const { productImageBaseUrl } = React.useContext(ProductContext);

  const { openedCart } = React.useContext(ShoppingCartContext);

  const {
    image,
    name,
    price,
    unitOfMeasure: { name: unitOfMeasureName },
  } = product;

  return (
    <Grid item sm={12}>
      <Card
        key={index}
        sx={{
          display: "flex",
          transition: "0.3s",
          //   boxShadow:
          //     "0 2px 15px -3px rgba(0, 0, 0, 0.2), 0 10px 20px -2px rgba(0, 0, 0, 0.2)",
          //   "&:hover": {
          //     boxShadow: 4,
          //   },
          padding: "30px 20px",
        }}
      >
        <Avatar
          variant={"rounded"}
          alt="The image"
          src={productImageBaseUrl + image}
          style={{
            width: 80,
            height: 80,
          }}
        />

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

        <IconButton
          sx={{ color: "error.main" }}
          onClick={() => {
            //   closeActionsPopover();
            //   onToggleDelete();
            //   handleProductIndex();
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Card>
    </Grid>
  );
};

export default CartProductCard;
