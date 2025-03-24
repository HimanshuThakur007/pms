import React from "react";
import { all_routes } from "../../router/all_routes";
import { Link, useLocation } from "react-router-dom";
const route = all_routes;
const SiderNav = () => {
    const location = useLocation()
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="settings-sidebar">
            <h4 className="fw-semibold mb-3">General Settings</h4>
            <div className="list-group list-group-flush settings-sidebar">
              <Link
                to={route.busyIntegration}
                className={`fw-medium ${
                  location.pathname === route.busyIntegration ? "active" : ""
                }`}
                // onClick={(e)=>e.preventDefault()}
              >
                Busy Integration
              </Link>
              <Link
                to={route.whatsappSetting}
                className={`fw-medium ${
                  location.pathname === route.whatsappSetting ? "active" : ""
                }`}
                // onClick={(e)=>e.preventDefault()}
              >
                WhatsApp
              </Link>
              <Link
                to={route.emailSetting}
                className={`fw-medium ${
                  location.pathname === route.emailSetting ? "active" : ""
                }`}
                // onClick={(e)=>e.preventDefault()}
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiderNav;
