import React from "react";
import CustomTable from "../../components/Table";

type Props = {};

const Products = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Products Page";
  }, []);

  return <CustomTable></CustomTable>;
};

export default Products;
