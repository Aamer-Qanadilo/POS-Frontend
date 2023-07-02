import { TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";

type Props = {
  items: (products | categories | units)[];
  headers: {
    canSort: boolean;
    label: string;
    path: string;
  }[];
};

interface Object {
  hasOwnProperty<T>(this: T, v: any): v is keyof T;
}

const TableCustomBody = ({ items, headers }: Props) => {
  const renderCells2 = (item: Props["items"][0]) => {
    return headers.map((header) => {
      const key = header.path;
      const itemData = item[key as keyof typeof item];

      if ("image" in item && header.path === "image") {
        return (
          <TableCell align="center" sx={{ maxWidth: "75px" }}>
            <img
              src={"http://localhost:3000/api/v1/uploads/products/" + itemData}
              alt={item.name}
              loading="lazy"
              style={{ maxWidth: "100%", objectFit: "contain" }}
            />
          </TableCell>
        );
      } else if (typeof itemData !== "object") {
        return <TableCell align="center">{itemData}</TableCell>;
      } else if (typeof itemData === "object") {
        return <TableCell align="center">{itemData["name"]}</TableCell>;
      }
    });
  };

  return (
    <TableBody>
      {items.map((item) => (
        <TableRow
          key={item._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {/* {renderCells(item)} */}
          {renderCells2(item)}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableCustomBody;
