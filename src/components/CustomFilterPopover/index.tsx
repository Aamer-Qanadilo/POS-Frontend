import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useFilterState } from "../../hooks/useFilters";

type Props = {
  headers: { label: string; path: string }[];
  open: (EventTarget & HTMLButtonElement) | null;
  filters: useFilterState;
  closeOptionsPopover: () => void;
  onFilterPathChange: (path: string) => void;
  onFilterValueChange: (value: number | string) => void;
};

const CustomFilterPopover = ({
  headers,
  open,
  filters,
  closeOptionsPopover,
  onFilterPathChange,
  onFilterValueChange,
}: Props) => {
  const handleFilterPathChange = (event: SelectChangeEvent<string>) => {
    onFilterPathChange(event.target.value);
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onFilterValueChange(event.target.value);
  };

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={closeOptionsPopover}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            p: 2,
            width: 250,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter By "
          value={filters?.customFilter.path}
          onChange={handleFilterPathChange}
        >
          <MenuItem value="">None</MenuItem>
          {headers.map((header, index) =>
            header.path !== "image" ? (
              <MenuItem value={header.path}>{header.label}</MenuItem>
            ) : (
              <></>
            ),
          )}
        </Select>
      </FormControl>

      <TextField
        margin="normal"
        required
        fullWidth
        id="filterValue"
        label="Filter Value"
        name="filterValue"
        autoComplete="filterValue"
        value={filters?.customFilter.value}
        onChange={handleFilterValueChange}
        autoFocus
      />
    </Popover>
  );
};

export default CustomFilterPopover;
