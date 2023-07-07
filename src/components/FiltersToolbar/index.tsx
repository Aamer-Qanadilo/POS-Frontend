import {
  Box,
  Button,
  Container,
  InputAdornment,
  OutlinedInput,
  alpha,
  styled,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import React from "react";
import categories from "../../types/categories.types";
import filtersTypes from "../../types/filters.types";

type Props = {
  categoryFilters?: categories[] | null;
  filters: filtersTypes;
  onSearch: (query: string) => void;
  onToggleShowFilters: () => void;
};

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 350,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 450,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

const FilterToolbar = ({
  categoryFilters,
  filters,
  onSearch,
  onToggleShowFilters,
}: Props) => {
  return (
    <Container maxWidth="xl">
      <Box component="div" className="table-filters">
        <StyledSearch
          type="search"
          placeholder={
            categoryFilters ? "Search by Name or Code" : "Search by Name"
          }
          value={filters.searchQuery}
          onChange={(event) => onSearch(event?.target.value)}
          className="search-form table-filters__search-form"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />

        {categoryFilters && (
          <Button
            disableRipple
            color="inherit"
            endIcon={
              <FilterListIcon
                fontSize="large"
                className="table-filters__icon"
              />
            }
            onClick={onToggleShowFilters}
          >
            Filters&nbsp;
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FilterToolbar;
