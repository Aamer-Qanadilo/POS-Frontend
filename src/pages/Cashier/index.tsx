import React from "react";

type Props = {};

const Cashier = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Cashier Page";
  }, []);

  return <div>Cashier</div>;
};

export default Cashier;
