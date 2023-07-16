import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

type Props = {
  children: React.ReactNode;
};

const LoadingTheme = ({ children }: Props) => {
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      {children}
    </SkeletonTheme>
  );
};

export default LoadingTheme;
