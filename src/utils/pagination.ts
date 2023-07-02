import _ from "lodash";

import products from "../types/products.types.js";
import categories from "../types/categories.types.js";
import units from "../types/units.types.js";

const pagination = (
  data: (products | categories | units)[],
  pageNumber: number,
  pageSize: number,
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(data).slice(startIndex).take(pageSize).value();
};

export default pagination;
