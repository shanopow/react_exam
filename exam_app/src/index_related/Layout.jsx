import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import '@picocss/pico'

const Layout = () => {
  return (
    <> 
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;