import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";

const Loader = ({ isSaving }:any) => {
  const route = all_routes;
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const isPathWithLoader =
      location.pathname === route.dealsDashboard ||
      location.pathname === route.leadsDashboard ||
      location.pathname === route.projectDashboard;

    if (isPathWithLoader || isSaving) {
      // Show the loader when navigating to a new route or saving
      setShowLoader(true);

      // Hide the loader after 2 seconds if it's not saving
      const timeoutId = setTimeout(() => {
        if (!isSaving) {
          setShowLoader(false);
        }
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setShowLoader(false);
    }
  }, [location.pathname, isSaving]);

  return (
    <>
      {showLoader && <Preloader isSaving={isSaving}/>}
      <div></div>
    </>
  );
};

const Preloader = ({ isSaving }: { isSaving: boolean }) => {
  return (
    <div className="preloader">
      <div className="preloader">
        <div className="loader"></div>
        {isSaving && <p className="saving-text">Saving...</p>}
      </div>
    </div>
  );
};

export default Loader;
