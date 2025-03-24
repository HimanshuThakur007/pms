import React from "react";
import { Link } from "react-router-dom";

const CenteredButton = ({buttonLabel,handelPassValue,resetForm}:any) => {
  return (
    <>
      <div className="dropdown-center">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownCenterBtn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {buttonLabel}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownCenterBtn">
          <li>
            <Link
              to="#"
              className="dropdown-item edit-popup"
              data-bs-toggle="offcanvas"
              data-bs-target="#pm_add"
              onClick={()=>{handelPassValue(1);
                resetForm()}
              }
            >
              None or One Assets
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="dropdown-item edit-popup"
              data-bs-toggle="offcanvas"
              data-bs-target="#pm_add"
              onClick={()=>{handelPassValue(2);
                resetForm();
              }}
            >
              Multiple Assets
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CenteredButton;
