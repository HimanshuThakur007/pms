import React from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import useFetch from "../../core/Hooks/useFetch";
import { depSaveHandler } from "./modifyForm";

const DepartmentModal = ({
  inputValue,
  handleInputField,
  setLoading,
  setInputValue,
  RecallFunctionHandler,
}: any) => {
  const callFetch = useFetch();

  return (
    <>
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="department_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New Department</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form
            onSubmit={(e) =>
              depSaveHandler(
                e,
                inputValue,
                callFetch,
                setInputValue,
                setLoading,
                RecallFunctionHandler
              )
            }
          >
            <div>
              {/* Basic Info */}
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <InputField
                      labelName="Name"
                      type="text"
                      name="depname"
                      dangerTag="*"
                      value={inputValue.depname}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Mobile Number"
                      type="text"
                      name="depmobile"
                      dangerTag="*"
                      value={inputValue.depmobile}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Email"
                      type="email"
                      name="depemail"
                      dangerTag="*"
                      value={inputValue.depemail}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <InputField
                        labelName="Company Code"
                        type="text"
                        name="depcompcode"
                        dangerTag="*"
                        value={inputValue.depcompcode}
                        onChange={handleInputField}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        rows={5}
                        name="depaddress"
                        className="form-control"
                        value={inputValue.depaddress}
                        onChange={handleInputField}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DepartmentModal;
