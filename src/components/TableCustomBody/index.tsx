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
import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";
import { useNavigate } from "react-router";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { toast } from "react-toastify";
import DialogPopup from "../DialogPopup/index";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type Props = {
  items: (products | categories | units)[];
  headers: {
    canSort: boolean;
    label: string;
    path: string;
  }[];
  imagesBaseUrl?: string;
  onDelete?: (_id: string) => void;
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
  const [deletePopupState, setDeletePopupState] = React.useState(false);
  const [productIndex, setProductIndex] = React.useState<number | null>(null);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      // <Container
      //   maxWidth="xl"

      // >
      // </Container>
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={headers.length + 1}>
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
    startLoader();
    if (typeof onDelete !== "undefined") onDelete(_id);
    else {
      toast.warning("Something went wrong, couldn't perform the delete action");
      stopLoader();
    }
  };

  const handleProductIndex = (index: number) => {
    if (deletePopupState) {
      setProductIndex(null);
    } else {
      setProductIndex(index);
    }
  };

  const handleToggleDelete = () => {
    setDeletePopupState(!deletePopupState);
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
        {items.map((item, index) => (
          <>
            <TableRow
              key={item._id + index + "row"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {renderCells(item)}
              <TableCell align="center" key={item._id}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    color: "#1976d2",
                    justifyContent: "center",
                  }}
                  key={item._id + index}
                >
                  <Button
                    key={index + item._id + "1"}
                    onClick={() => handleUpdate(item._id)}
                  >
                    <EditIcon color="action" />
                  </Button>
                  <Button
                    key={index + item._id + "2"}
                    onClick={() => {
                      handleToggleDelete();
                      handleProductIndex(index);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            <DialogPopup
              key={index + item._id + "popup"}
              deleteAlert={
                deletePopupState &&
                productIndex !== null &&
                index === productIndex
              }
              itemID={item._id}
              onDelete={handleDelete}
              onToggleDelete={handleToggleDelete}
              index={index}
            />
          </>
        ))}
      </TableBody>
    </>
  );
};

export default TableCustomBody;
