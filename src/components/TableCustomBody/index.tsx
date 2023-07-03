import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";
import { useNavigate } from "react-router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  items: (products | categories | units)[];
  headers: {
    canSort: boolean;
    label: string;
    path: string;
  }[];
  imagesBaseUrl?: string;
  onDelete: (_id: string) => void;
};

interface Object {
  hasOwnProperty<T>(this: T, v: any): v is keyof T;
}

const TableCustomBody = ({
  items,
  headers,
  imagesBaseUrl,
  onDelete,
}: Props) => {
  const [deleteAlert, setDeleteAlert] = React.useState(false);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      // <Container
      //   maxWidth="xl"

      // >
      // </Container>
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={headers.length}>
            <Typography variant="h6" color="red" sx={{ minHeight: "20vh" }}>
              There is no data to show
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const handleUpdate = (_id: string) => {
    navigate("update/" + _id);
  };

  const handleDelete = async (_id: string) => {
    handleToggleDelete();
    onDelete(_id);
  };

  const handleToggleDelete = () => {
    setDeleteAlert(!deleteAlert);
  };

  const renderCells = (item: Props["items"][0]) => {
    return headers.map((header) => {
      const key = header.path;
      const itemData = item[key as keyof typeof item];

      if ("image" in item && header.path === "image") {
        return (
          <TableCell
            align="center"
            sx={{ maxWidth: "75px", minHeight: "20vh" }}
          >
            <img
              src={imagesBaseUrl + itemData}
              alt={item.name}
              loading="lazy"
              style={{ maxWidth: "100%", objectFit: "contain" }}
            />
          </TableCell>
        );
      } else if (typeof itemData !== "object") {
        return (
          <TableCell align="center" sx={{ minHeight: "20vh" }}>
            {itemData}
          </TableCell>
        );
      } else if (typeof itemData === "object") {
        return (
          <TableCell align="center" sx={{ minHeight: "20vh" }}>
            {itemData["name"]}
          </TableCell>
        );
      }
    });
  };

  return (
    <>
      <TableBody sx={{ minHeight: "80vh" }}>
        {items.map((item) => (
          <TableRow
            key={item._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {renderCells(item)}
            <TableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  color: "#1976d2",
                  justifyContent: "center",
                }}
              >
                <Button onClick={() => handleUpdate(item._id)}>
                  <EditIcon color="action" sx={{ cursor: "pointer" }} />
                </Button>
                <Button onClick={handleToggleDelete}>
                  <DeleteIcon color="error" sx={{ cursor: "pointer" }} />
                </Button>
              </Box>
              <Dialog
                open={deleteAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleToggleDelete}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Delete this product?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this product?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleToggleDelete}>Disagree</Button>
                  <Button onClick={() => handleDelete(item._id)}>Agree</Button>
                </DialogActions>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableCustomBody;
