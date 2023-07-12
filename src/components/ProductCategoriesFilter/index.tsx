import React from "react";

import { Avatar, Box, Button, Container, Typography } from "@mui/material";

import categories from "../../types/categories.types.js";

import { CategoryContext } from "../../Contexts/CategoryContext";

import "./styles.css";

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

const ProductCategoriesFilter = ({
  categoryFilters,
  selectedCategory,
  onCategorySelect,
  showFilters,
}: Props) => {
  const { categoryImageBaseUrl } = React.useContext(CategoryContext);

  return (
    <Container maxWidth="xl" sx={{ overflow: "hidden", position: "relative" }}>
      <Box component="div" className="categories-container">
        <Box
          component="div"
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
                <Avatar
                  variant={"rounded"}
                  alt="The image"
                  src={categoryImageBaseUrl + category.image}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Typography variant="button">{category.name}</Typography>
              </Button>
            );
          })}
        </Box>
        <Box
          component="div"
          className="categories-filter__mouse-icon"
          sx={{ display: showFilters ? "flex" : "none" }}
        >
          <Avatar
            variant={"rounded"}
            alt="The image"
            src={"/assets/images/mouse-scroll.png"}
            className="categories-filter__mouse-icon-image"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductCategoriesFilter;
