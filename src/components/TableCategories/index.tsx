import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
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
          <Typography variant="button">All</Typography>
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
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexShrink: "0",
              }}
            >
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    "http://localhost:3000/api/v1/uploads/categories/" +
                    category.image
                  }
                  alt={category.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    // mixBlendMode: "color-burn",
                  }}
                />
              </Box>
              <Typography variant="button">{category.name}</Typography>
            </Button>
          );
        })}
      </Box>
    </Container>
  );
};

export default TableCategories;
