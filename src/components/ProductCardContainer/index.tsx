import React from "react";

import { Container, Grid } from "@mui/material";

import ProductCard from "../ProductCard";
import NotFoundData from "../NotFoundData";

import productType from "../../types/products.types";

type Props = {
  products: productType[];
};

const ProductCardContainer = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <Container maxWidth="lg">
        <NotFoundData></NotFoundData>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        justifyContent="start"
        sx={{ margin: "5px 0 30px", gridAutoRows: "1fr" }}
        gridAutoRows={"1fr"}
        alignItems={"stretch"}
      >
        {products.map((product, index) => {
          return <ProductCard product={product} index={index} />;
        })}
      </Grid>
    </Container>
  );
};

export default ProductCardContainer;
