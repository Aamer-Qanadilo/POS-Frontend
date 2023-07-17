import React from "react";

import { MenuItem, Popover } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  open: (EventTarget & HTMLButtonElement) | null;
  closeActionsPopover: () => void;
  onUpdate: () => void;
  onToggleDelete: () => void;
};

const TableCustomBodyPopover = ({
  open,
  closeActionsPopover,
  onUpdate,
  onToggleDelete,
}: Props) => {
  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={closeActionsPopover}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        },
      }}
    >
      <MenuItem onClick={() => onUpdate()}>
        <EditIcon color="action" /> Edit
      </MenuItem>

      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => {
          onToggleDelete();
        }}
      >
        <DeleteIcon color="error" /> Delete
      </MenuItem>
    </Popover>
  );
};

export default TableCustomBodyPopover;
