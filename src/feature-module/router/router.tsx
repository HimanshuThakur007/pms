import React, { useEffect,useState } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router";
import { authRoutes, publicRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import Login from "../auth/login";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ALLRoutes: React.FC = () => {
  const location = useLocation();
  const sideData= location?.state?.sidebarData
  // console.log(location,'form allRoutes')
  // console.log(location.pathname,'form pathname')

  // Find the current route in either public or auth routes
  const currentRoute = publicRoutes.find(route => route.path === location.pathname) || 
                       authRoutes.find(route => route.path === location.pathname)||
                       publicRoutes.find(route => matchPath(route.path, location.pathname))
                       

  // Construct the full title
  const fullTitle = sideData?.label || currentRoute?.title
    ? `${sideData?.label || currentRoute?.title} | ZECO - Annual PMS 2024 and Goal Setting 2025`
    : "ZECO - Annual PMS 2024 and Goal Setting 2025";
    
  // useEffect(() => {
  //   document.title = fullTitle;
  // }, [fullTitle]);


  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Feature />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx}/>
          ))}
        </Route>
        <Route element={<AuthFeature />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
