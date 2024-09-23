import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";
import { TagsInput } from "react-tag-input-component";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import { Collapse } from "antd";
import { getBnCodeListHandler } from "./allListApiCalls";
import useFetch from "../../core/Hooks/useFetch";
import { customersaveHandler } from "./modifyForm";
const CustomerModal = ({
  businessNatureList,
  handlecontactSelectChange,
  selectedOptions,
  mobiledata,
  inputValue,
  setInputValue,
  handleInputField,
  setLoading,
}: any) => {
  let callFetch = useFetch();
  const { Panel }: any = Collapse;
  const [bnCodeList, setBnCodeList] = React.useState([]);

  // custreference: "",
  // custadd1: "",
  // custadd2: "",
  // custadd3: "",
  // custadd4: "",
  // custgst: "",
  return (
    <>
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="customer_add"
      >
        <div className="offcanvas-header border-bottom">
          <h4>Add New Customer</h4>
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
          <form onSubmit={(e)=>{customersaveHandler(e,callFetch,selectedOptions,inputValue,setInputValue,setLoading)}}>
            <div>
              <div className="row">
                <div className="col-md-6">
                  <InputField
                    labelName="Name"
                    type="text"
                    name="custname"
                    dangerTag="*"
                    value={inputValue.custname}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName="Mobile No"
                    type="text"
                    name="custmobile"
                    dangerTag="*"
                    value={inputValue.custmobile}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName="Email"
                    type="text"
                    name="custemail"
                    dangerTag="*"
                    value={inputValue.custemail}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName="Address"
                    type="text"
                    name="custadd1"
                    dangerTag="*"
                    value={inputValue.custadd1}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName=""
                    type="text"
                    name="custadd2"
                    value={inputValue.custadd2}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName=""
                    type="text"
                    name="custadd3"
                    value={inputValue.custadd3}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName=""
                    type="text"
                    name="custadd4"
                    value={inputValue.custadd4}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputSelect selectName="Customer Group" />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName="GST"
                    type="text"
                    name="custgst"
                    dangerTag="*"
                    value={inputValue.custgst}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    labelName="Reffered By"
                    type="text"
                    name="custreference"
                    dangerTag="*"
                    value={inputValue.custreference}
                    onChange={handleInputField}
                  />
                </div>
                <div className="col-md-6">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#contactadd_project"
                  >
                    <i className="ti ti-square-rounded-plus me-2" />
                    Contact master
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                // data-bs-toggle="modal"
                // data-bs-target="#create_success"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* --add contact modal */}
      {/* <Link
                    to="#"
                    className="label-add "
                    data-bs-toggle="modal"
                    data-bs-target="#contactadd_project"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link> */}
      <div
        className="modal custom-modal fade"
        id="contactadd_project"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact Master</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form action="#">
                <div className="mb-3">
                  {businessNatureList.map((item: any, index: any) => {
                    return (
                      <Collapse
                        accordion
                        expandIconPosition="right"
                        className="mb-2"
                      >
                        <Panel
                          header={item.bnName}
                          key={index}
                          id={index}
                          onClick={() => {
                            getBnCodeListHandler(
                              index,
                              callFetch,
                              setBnCodeList,
                              businessNatureList,
                              setLoading
                            );
                          }}
                        >
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="border-0">Name</td>
                                <td className="border-0">
                                  <Select
                                    value={selectedOptions.find(
                                      (opn: any) => opn.BNCode == item.bnCode
                                    )}
                                    onChange={(selectedOption) =>
                                      handlecontactSelectChange(
                                        index,
                                        selectedOption
                                      )
                                    }
                                    options={bnCodeList}
                                    maxMenuHeight={170}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Mobile No.</td>
                                <td id={index}>
                                  {mobiledata &&
                                  mobiledata.length > 0 &&
                                  mobiledata[index]
                                    ? mobiledata[index]
                                    : selectedOptions.find(
                                        (opn: any) => opn.BNCode == item.bnCode
                                      )
                                    ? selectedOptions.find(
                                        (opn: any) => opn.BNCode == item.bnCode
                                      ).MobNo
                                    : ""}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </Link>
                  {/* <button type="submit" className="btn btn-danger">
                    Save
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerModal;
