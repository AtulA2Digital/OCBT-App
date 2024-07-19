import * as React from "react";
import Footer from "../Footer";
import Header from "../Header";

export default function LayoutTemplate({ children }) {
  

  return (
    <div>
      <Header />
      <section>{children}</section>
      <Footer />
    </div>
  );
}
