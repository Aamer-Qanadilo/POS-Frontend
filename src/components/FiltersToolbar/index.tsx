import React from "react";

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

import categories from "../../types/categories.types";

import "./styles.css";
import CustomFilterPopover from "../CustomFilterPopover";
import { useFilterState } from "../../hooks/useFilters";

type Props = {
  headers: { label: string; path: string }[];
  categoryFilters?: categories[] | null;
  filters: useFilterState;
  onSearch: (query: string) => void;
  onToggleShowFilters: () => void;
  onFilterPathChange: (path: string) => void;
  onFilterValueChange: (value: number | string) => void;
};

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 350,
  backgroundColor: "rgba(243, 240, 240, 0.35)",
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
  headers,
  categoryFilters,
  filters,
  onSearch,
  onToggleShowFilters,
  onFilterPathChange,
  onFilterValueChange,
}: Props) => {
  const [customFilterOpen, setCustomFilterOpen] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setCustomFilterOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setCustomFilterOpen(null);
  };

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

        <Box component="div" sx={{ display: "flex", gap: "20px" }}>
          <Button
            disableRipple
            color="inherit"
            endIcon={
              <FilterListIcon
                fontSize="large"
                className="table-filters__icon"
              />
            }
            onClick={handleOpenMenu}
          >
            Custom Filters&nbsp;
          </Button>

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
      </Box>

      <CustomFilterPopover
        headers={headers}
        open={customFilterOpen}
        closeOptionsPopover={handleCloseMenu}
        onFilterPathChange={onFilterPathChange}
        onFilterValueChange={onFilterValueChange}
        filters={filters}
      />
    </Container>
  );
};

export default FilterToolbar;
