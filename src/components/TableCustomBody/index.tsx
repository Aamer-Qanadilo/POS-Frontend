import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TableBody, TableCell, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";
import { useNavigate } from "react-router";
import { LoaderContext } from "../../Contexts/LoaderContext";
import DialogPopup from "../DialogPopup/index";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
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
      <TableBody>
        <StyledTableRow>
          <StyledTableCell align="center" colSpan={headers.length + 1}>
            <img
              src="/assets/images/no-match.png"
              alt="No matching data found"
              style={{ width: "50%" }}
            />
          </StyledTableCell>
        </StyledTableRow>
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
          <StyledTableCell
            align="center"
            sx={{ maxWidth: "75px", minHeight: "20vh" }}
          >
            <img
              src={imagesBaseUrl + itemData}
              alt={item.name}
              loading="lazy"
              style={{ maxWidth: "100%", objectFit: "contain" }}
            />
          </StyledTableCell>
        );
      } else if (typeof itemData !== "object") {
        return (
          <StyledTableCell align="center" sx={{ minHeight: "20vh" }}>
            {itemData}
          </StyledTableCell>
        );
      } else if (typeof itemData === "object") {
        return (
          <StyledTableCell align="center" sx={{ minHeight: "20vh" }}>
            {itemData["name"]}
          </StyledTableCell>
        );
      }
    });
  };

  return (
    <>
      <TableBody sx={{ minHeight: "80vh" }}>
        {items.map((item, index) => (
          <>
            <StyledTableRow
              key={item._id + index + "row"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {renderCells(item)}
              <StyledTableCell align="center" key={item._id}>
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
              </StyledTableCell>
            </StyledTableRow>
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
