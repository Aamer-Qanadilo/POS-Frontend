import React from "react";

type Props = {};

const Units = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Units Page";
  }, []);

  return <div>Units</div>;
};

export default Units;
