import React, { useReducer } from "react";

import filtersTypes from "../types/filters.types";

export type useFilterState = filtersTypes & {
  pageSize: number;
  customFilter: { path: string; value: string | number };
};

// Actions
type Actions =
  | { type: "change-page"; page: useFilterState["currentPage"] }
  | { type: "change-size"; pageSize: useFilterState["pageSize"] }
  | { type: "search-query"; query: useFilterState["searchQuery"] }
  | { type: "select-category"; category: useFilterState["selectedCategory"] }
  | { type: "sort-by"; sortInfo: useFilterState["sortColumn"] }
  | { type: "custom-filter"; filterInfo: useFilterState["customFilter"] };

// Reducer
function filterReducer(state: useFilterState, action: Actions) {
  switch (action.type) {
    case "change-page":
      return { ...state, currentPage: action.page };
    case "change-size":
      return { ...state, currentPage: 1, pageSize: action.pageSize };
    case "search-query":
      return {
        ...state,
        currentPage: 1,
        searchQuery: action.query,
      };
    case "select-category":
      return {
        ...state,
        currentPage: 1,
        selectedCategory: action.category,
      };
    case "sort-by":
      return { ...state, currentPage: 1, sortColumn: action.sortInfo };

    case "custom-filter":
      return { ...state, customFilter: action.filterInfo };

    default:
      return state;
  }
}

// Root Component
export default function useFilters(
  initialState?: Partial<useFilterState>,
): [useFilterState, React.Dispatch<Actions>] {
  const [state, dispatch] = useReducer(filterReducer, {
    pageSize: initialState?.pageSize || 5,
    currentPage: initialState?.currentPage || 1,
    searchQuery: initialState?.searchQuery || "",
    selectedCategory: initialState?.selectedCategory || null,
    sortColumn: initialState?.sortColumn || { path: "name", order: "asc" },
    customFilter: initialState?.customFilter || {
      path: "",
      value: "",
    },
  });

  return [state, dispatch];
}
