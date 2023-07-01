import React from "react";

type Props = {};

const Categories = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Categories Page";
  }, []);

  return <div>Categories</div>;
};

export default Categories;
