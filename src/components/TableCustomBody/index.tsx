import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import moment from "moment";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";
import { useNavigate } from "react-router";
import { LoaderContext } from "../../Contexts/LoaderContext";
import DialogPopup from "../DialogPopup/index";
import TableCustomBodyPopover from "../TableCustomBodyPopover";

import NotFoundData from "../NotFoundData/index";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(odd)": {
  // },
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
  const [actionsOpen, setActionsOpen] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [productIndex, setProductIndex] = React.useState<number | null>(null);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <TableBody>
        <StyledTableRow>
          <StyledTableCell align="center" colSpan={headers.length + 1}>
            <NotFoundData />
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    );
  }

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setActionsOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setActionsOpen(null);
  };

  const handleUpdate = (_id: string) => {
    navigate(_id);
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

      let date = null;
      if (key === "updatedAt") {
        date = moment(itemData).format("l LTS");
      }

      if ("image" in item && header.path === "image") {
        return (
          <StyledTableCell
            align="center"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              variant={"rounded"}
              alt="The image"
              src={imagesBaseUrl + itemData}
              style={{
                width: 90,
                height: 90,
              }}
            />
            {/* <img
              src={imagesBaseUrl + itemData}
              alt={item.name}
              loading="lazy"
              style={{ width: "100%", objectFit: "cover" }}
            /> */}
          </StyledTableCell>
        );
      } else if (typeof itemData !== "object") {
        return (
          <StyledTableCell align="center" sx={{ minHeight: "20vh" }}>
            {date ? date : itemData}
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
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleOpenMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>

            <TableCustomBodyPopover
              handleProductIndex={() => handleProductIndex(index)}
              open={actionsOpen}
              onToggleDelete={handleToggleDelete}
              closeActionsPopover={handleCloseMenu}
              onUpdate={() => handleUpdate(item._id)}
            />

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
