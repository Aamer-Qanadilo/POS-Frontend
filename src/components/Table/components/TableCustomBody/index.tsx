import React from "react";
import { useNavigate } from "react-router";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { toast } from "react-toastify";
import moment from "moment";

import DialogPopup from "../DialogPopup";
import TableCustomBodyPopover from "../TableCustomBodyPopover";
import NotFoundData from "../../../NotFoundData";

import products from "../../../../types/products.types.js";
import categories from "../../../../types/categories.types.js";
import units from "../../../../types/units.types.js";

import { LoaderContext } from "../../../../Contexts/LoaderContext";
import TableRowSkeleton from "../TableRowSkeleton";

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  minHeight: "12vh",
  maxWidth: "20ch",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td": {
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
  isLoading: boolean;
  pageSize?: number;
};

const TableCustomBody = ({
  items,
  headers,
  imagesBaseUrl,
  onDelete,
  isLoading,
  pageSize,
}: Props) => {
  const [deletePopupState, setDeletePopupState] = React.useState(false);
  const [actionsOpen, setActionsOpen] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [productId, setProductId] = React.useState<string | null>(null);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    handleCloseMenu();
  }, [deletePopupState]);

  if (items.length === 0 && !isLoading) {
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
    _id: string,
  ) => {
    setActionsOpen(event.currentTarget);
    setProductId(_id);
  };

  const handleCloseMenu = () => {
    setActionsOpen(null);
    if (!deletePopupState) {
      setProductId(null);
    }
  };

  const handleUpdate = (_id: string) => {
    if (productId !== null) {
      navigate(productId);
    } else {
      navigate("/not-found");
    }
  };

  const handleDelete = async () => {
    handleToggleDelete();
    startLoader();
    if (typeof onDelete !== "undefined" && productId !== null)
      onDelete(productId);
    else {
      toast.warning("Something went wrong, couldn't perform the delete action");
      stopLoader();
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
      if (key === "updatedAt" || key === "createdAt") {
        date = moment(itemData).format("l LTS");
      }

      if ("image" in item && header.path === "image") {
        return (
          <StyledTableCell
            align="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
          </StyledTableCell>
        );
      } else if (typeof itemData === "object") {
        return (
          <StyledTableCell align="center">{itemData["name"]}</StyledTableCell>
        );
      } else {
        return (
          <StyledTableCell align="center">
            {date ? date : itemData}
          </StyledTableCell>
        );
      }
    });
  };

  return (
    <>
      <TableBody sx={{ minHeight: "80vh" }}>
        {isLoading && (
          <TableRowSkeleton rows={pageSize || 5} headers={headers} />
        )}

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
                  onClick={(event) => handleOpenMenu(event, item._id)}
                >
                  <MoreVertIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>

            <TableCustomBodyPopover
              key={index + item._id + "popover"}
              open={actionsOpen}
              onToggleDelete={handleToggleDelete}
              closeActionsPopover={handleCloseMenu}
              onUpdate={() => handleUpdate(item._id)}
            />

            <DialogPopup
              key={index + item._id + "popup"}
              deleteAlert={
                deletePopupState && productId !== null && item._id === productId
              }
              onDelete={handleDelete}
              onToggleDelete={handleToggleDelete}
            />
          </>
        ))}
      </TableBody>
    </>
  );
};

export default TableCustomBody;
