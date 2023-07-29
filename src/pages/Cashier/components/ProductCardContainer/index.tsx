import React from "react";

import { Container, Grid } from "@mui/material";

import ProductCard from "../ProductCard";
import NotFoundData from "../../../../components/NotFoundData";

import productType from "../../../../types/products.types";
import CardSkeleton from "../CardSkeleton";

type Props = {
  products: productType[];
  isLoading: boolean;
  pageSize?: number;
};

const ProductCardContainer = ({ products, isLoading, pageSize }: Props) => {
  if (products.length === 0 && !isLoading) {
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
        {isLoading && <CardSkeleton cards={pageSize || 8} />}
        {products.map((product, index) => {
          return <ProductCard product={product} index={index} />;
        })}
      </Grid>
    </Container>
  );
};

export default ProductCardContainer;
