import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeSettings } from "../core/data/redux/commonSlice";

import { Outlet } from "react-router";
import ThemeSettings from "../core/common/theme-settings/themeSettings";
import Header from "../core/common/header";
import Sidebar from "../core/common/sidebar";

const Feature = () => {
  const dispatch = useDispatch();
  const themeOpen = useSelector((state: any) => state?.CRMS.themeSettings);
  const headerCollapse = useSelector((state: any) => state?.CRMS.headerCollapse);
  const mobileSidebar = useSelector((state: any) => state?.CRMS.mobileSidebar);
  const miniSidebar = useSelector((state: any) => state?.CRMS.miniSidebar);
  const expandMenu = useSelector((state: any) => state?.CRMS.expandMenu);
 
  return (
    <div className={`
      ${miniSidebar ? "mini-sidebar" : ""}
      ${expandMenu ? "expand-menu" : ""}`}>
     
       <div
        className={`main-wrapper 
        ${headerCollapse ? "header-collapse" : ""} 
        ${mobileSidebar ? "slide-nav" : ""}`}
      >
        <Header />
        <Sidebar/>
        <Outlet />
        <ThemeSettings/>
      </div>
      <div className="sidebar-overlay"></div>
      <div
        className={`sidebar-themeoverlay ${themeOpen ? "open" : ""}`}
        onClick={() => dispatch(setThemeSettings(!themeOpen))}
      ></div>
    </div>
  );
};

export default Feature;
