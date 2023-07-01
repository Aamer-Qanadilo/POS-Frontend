import React from "react";

type Props = {};

const Products = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Products Page";
  }, []);

  return <div>Products</div>;
};

export default Products;
