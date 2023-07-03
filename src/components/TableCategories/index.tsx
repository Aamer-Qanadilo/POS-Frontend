import React from "react";
import { Box, Button, Container } from "@mui/material";
import categories from "../../types/categories.types.js";

type Props = {
  categoryFilters?: categories[] | null;
  selectedCategory: {
    _id: string;
    name: string;
    image: string;
  } | null;
  onCategorySelect: (category: Props["selectedCategory"]) => void;
};

const TableCategories = ({
  categoryFilters,
  selectedCategory,
  onCategorySelect,
}: Props) => {
  return (
    <Container maxWidth="xl" sx={{ overflow: "hidden", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          top: "15px",
          padding: "0 0 20px 0",
          gap: "15px",
          overflowX: "scroll",
          boxSizing: "border-box",
        }}
      >
        <Button
          variant="contained"
          color={!selectedCategory ? "primary" : "inherit"}
          onClick={() => onCategorySelect(null)}
        >
          All
        </Button>
        {categoryFilters?.map((category) => {
          return (
            <Button
              variant="contained"
              color={
                selectedCategory && selectedCategory._id === category._id
                  ? "primary"
                  : "inherit"
              }
              onClick={() => onCategorySelect(category)}
            >
              {category.name}
            </Button>
          );
        })}
      </Box>
    </Container>
  );
};

export default TableCategories;
