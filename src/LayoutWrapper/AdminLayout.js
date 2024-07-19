import React from "react";
import LayoutTemplate from "./LayoutPages/LayoutTemplate";

const Layout = ({ children }) => {
  return <LayoutTemplate>{children}</LayoutTemplate>;
};

export default Layout;
