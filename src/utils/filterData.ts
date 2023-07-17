import products from "../types/products.types";
import categories from "../types/categories.types";
import units from "../types/units.types";

import paginate from "../utils/pagination";
import { useFilterState } from "../hooks/useFilters";
import _ from "lodash";

interface props {
  filters: useFilterState;
  data: (products | categories | units)[];
}

const filterData = ({ filters, data }: props) => {
  let filtered = data;
  if (filters.searchQuery)
    filtered = data.filter(
      (d) =>
        d.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        ("code" in d &&
          d.code.toLowerCase().includes(filters.searchQuery.toLowerCase())),
    );
  else if (filters.selectedCategory && filters.selectedCategory)
    filtered = data.filter(
      (d) =>
        "category" in d && d.category._id === filters.selectedCategory?._id,
    );

  if (filters.customFilter.path) {
    filtered = filtered.filter((d) => {
      const { path, value } = filters.customFilter;
      const item = d[path as keyof typeof d];
      if (typeof item === "object") {
        return item["name"] === value;
      }
      return item == value;
    });
  }

  const sorted = _.orderBy(
    filtered,
    [filters.sortColumn.path],
    [filters.sortColumn.order],
  );

  const finalData = paginate(sorted, filters.currentPage, filters.pageSize);

  return { filtered, finalData };
};

export default filterData;
