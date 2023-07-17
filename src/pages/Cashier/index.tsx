import React from "react";

import { Container } from "@mui/system";
import { SelectChangeEvent } from "@mui/material";

import FilterToolbar from "../../components/FiltersToolbar";
import ProductCategoriesFilter from "../../components/ProductCategoriesFilter";
import PaginationFilter from "../../components/PaginationFilter";
import ProductCardContainer from "../../components/ProductCardContainer";
import CartIcon from "../../components/CartIcon";

import { LoaderContext } from "../../Contexts/LoaderContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { UserContext } from "../../Contexts/UserContext";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { UnitContext } from "../../Contexts/UnitContext";

import filtersTypes from "../../types/filters.types";
import products from "../../types/products.types";

import useFilters from "../../hooks/useFilters";
import filterData from "../../utils/filterData";
import { dataHeader } from "../Products";

type Props = {};

const Cashier = (props: Props) => {
  const [filters, filtersDispatch] = useFilters({ pageSize: 8 });
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [isLoadingProduct, setIsLoadingProduct] = React.useState<boolean>(true);

  const { user } = React.useContext(UserContext);
  const { handleFetchProducts, products } = React.useContext(ProductContext);
  const { handleFetchCategories, categories } =
    React.useContext(CategoryContext);
  const { handleFetchUnits } = React.useContext(UnitContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleToggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    filtersDispatch({
      type: "change-size",
      pageSize: event.target.value as unknown as number,
    });
  };

  const handlePageChange = (page: number) => {
    filtersDispatch({ type: "change-page", page });
  };

  const handleCategorySelect = (category: filtersTypes["selectedCategory"]) => {
    filtersDispatch({ type: "select-category", category });
  };

  const handleSearch = (query: string) => {
    filtersDispatch({ type: "search-query", query });
  };

  const handleCustomFilterPath = (path: string) => {
    filtersDispatch({
      type: "custom-filter",
      filterInfo: { path, value: filters.customFilter.value },
    });
  };

  const handleCustomFilterValue = (value: number | string) => {
    filtersDispatch({
      type: "custom-filter",
      filterInfo: { path: filters.customFilter.path, value: value },
    });
  };

  const { filtered, finalData } = filterData({ filters, data: products });

  const handleFetchData = async () => {
    if (user) {
      if (typeof handleFetchProducts !== "undefined") {
        await handleFetchProducts();
        setIsLoadingProduct(false);
      }
      if (typeof handleFetchCategories !== "undefined") {
        await handleFetchCategories();
      }
      if (typeof handleFetchUnits !== "undefined") {
        await handleFetchUnits();
      }
    }

    stopLoader();
  };

  React.useEffect(() => {
    document.title = "POS-Foothill | Cashier Page";
    startLoader();
    setIsLoadingProduct(true);
    handleFetchData();
  }, []);

  return (
    <>
      <Container sx={{ marginTop: "25px" }} maxWidth="lg">
        <FilterToolbar
          filters={filters}
          onSearch={handleSearch}
          onToggleShowFilters={handleToggleShowFilters}
          categoryFilters={categories}
          headers={dataHeader}
          onFilterPathChange={handleCustomFilterPath}
          onFilterValueChange={handleCustomFilterValue}
        />

        <ProductCategoriesFilter
          onCategorySelect={handleCategorySelect}
          selectedCategory={filters.selectedCategory}
          categoryFilters={categories}
          showFilters={showFilters}
        />

        <ProductCardContainer
          products={finalData as unknown as products[]}
          isLoading={isLoadingProduct}
          pageSize={filters.pageSize}
        />

        <PaginationFilter
          filtered={filtered}
          filters={filters}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pageSize={filters.pageSize}
        />
      </Container>

      <CartIcon />
    </>
  );
};

export default Cashier;
