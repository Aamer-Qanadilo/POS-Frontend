import { MenuItem, Popover } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

type Props = {
  open: (EventTarget & HTMLButtonElement) | null;
  closeActionsPopover: () => void;
  onUpdate: () => void;
  onToggleDelete: () => void;
  handleProductIndex: () => void;
};

const TableCustomBodyPopover = ({
  open,
  closeActionsPopover,
  onUpdate,
  onToggleDelete,
  handleProductIndex,
}: Props) => {
  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={closeActionsPopover}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => onUpdate()}>
        <EditIcon color="action" />
        Edit
      </MenuItem>

      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => {
          closeActionsPopover();
          onToggleDelete();
          handleProductIndex();
        }}
      >
        <DeleteIcon color="error" />
        Delete
      </MenuItem>
    </Popover>
  );
};

export default TableCustomBodyPopover;
