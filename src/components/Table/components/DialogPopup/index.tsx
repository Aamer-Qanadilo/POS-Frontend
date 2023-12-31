import React from "react";

import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

type Props = {
  deleteAlert: boolean;
  onToggleDelete: () => void;
  onDelete: () => Promise<void>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogPopup = ({ deleteAlert, onToggleDelete, onDelete }: Props) => {
  return (
    <Dialog
      open={deleteAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={onToggleDelete}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete this item?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onToggleDelete()}>Disagree</Button>
        <Button onClick={() => onDelete()}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPopup;
