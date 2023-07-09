import React from "react";

import { Container, Grid } from "@mui/material";

import ProductCard from "../ProductCard";
import productType from "../../types/products.types";
import NotFoundData from "../NotFoundData";

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
        sx={{ margin: "5px 0 30px" }}
      >
        {products.map((product, index) => {
          return <ProductCard product={product} index={index} />;
        })}
      </Grid>
    </Container>
  );
};

export default ProductCardContainer;
