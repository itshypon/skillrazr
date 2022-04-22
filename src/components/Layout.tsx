import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout(props: any) {
  return (
    <div className="App layout">
      <Navbar {...props} />

      <div className="main-content">
        <Outlet {...props} />
      </div>
      <Footer {...props} />
    </div>
  );
}

export default Layout;
