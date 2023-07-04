import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import categories from "../../types/categories.types.js";
import "./styles.css";
import styles from "./styles.js";

type Props = {
  categoryFilters?: categories[] | null;
  selectedCategory: {
    _id: string;
    name: string;
    image: string;
  } | null;
  onCategorySelect: (category: Props["selectedCategory"]) => void;
  showFilters: boolean;
};

const TableCategories = ({
  categoryFilters,
  selectedCategory,
  onCategorySelect,
  showFilters,
}: Props) => {
  console.log(showFilters);
  return (
    <Container maxWidth="xl" sx={{ overflow: "hidden", position: "relative" }}>
      <Box
        component="div"
        sx={styles[".categories-filter"]}
        className={`categories-filter ${showFilters ? " active" : ""}`}
      >
        <Button
          variant="contained"
          color={!selectedCategory ? "primary" : "inherit"}
          onClick={() => onCategorySelect(null)}
          className="categories-filter__button"
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
              className="categories-filter__button"
            >
              <Box component="div" className="categories-filter__button-body">
                <img
                  src={
                    "http://localhost:3000/api/v1/uploads/categories/" +
                    category.image
                  }
                  alt={category.name}
                  loading="lazy"
                  className="categories-filter__image"
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
