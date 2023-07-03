import React from "react";

import { LoaderContext, LoaderProvider } from "../../Contexts/LoaderContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { UserContext } from "../../Contexts/UserContext";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { UnitContext } from "../../Contexts/UnitContext";

type Props = {};

const Cashier = (props: Props) => {
  const { user } = React.useContext(UserContext);
  const { handleFetchProducts, products } = React.useContext(ProductContext);
  const { handleFetchCategories, categories } =
    React.useContext(CategoryContext);
  const { handleFetchUnits, units } = React.useContext(UnitContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleFetchData = async () => {
    if (user) {
      if (typeof handleFetchProducts !== "undefined") {
        await handleFetchProducts();
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
    handleFetchData();
  }, []);

  return <div>Cashier</div>;
};

export default Cashier;
