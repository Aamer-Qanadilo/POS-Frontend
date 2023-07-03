import React from "react";

import { LoaderContext, LoaderProvider } from "../../Contexts/LoaderContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { UserContext } from "../../Contexts/UserContext";

type Props = {};

const Cashier = (props: Props) => {
  const { user } = React.useContext(UserContext);
  const { handleGettingProducts } = React.useContext(ProductContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleFetchData = async () => {
    if (user) {
      if (typeof handleGettingProducts !== "undefined") {
        await handleGettingProducts();
      }
    }
    stopLoader();
  };

  React.useEffect(() => {
    startLoader();
    handleFetchData();
  }, [user]);
  React.useEffect(() => {
    document.title = "POS-Foothill | Cashier Page";
  }, []);

  return <div>Cashier</div>;
};

export default Cashier;
