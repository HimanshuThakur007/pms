import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { CustomerDataType } from "./type";
import Loader from "../../core/common/loader";

const CustomerModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName
}: any) => {
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerDataType>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pan: "",
    gst: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const formFields = [
    { type: "input", fieldName: "name", label: "Name", required: true },
    { type: "input", fieldName: "mobile", label: "Mobile", required: true },
    { type: "input", fieldName: "email", label: "Email", required: true },
    { type: "input", fieldName: "address", label: "Address", required: false },
    { type: "input", fieldName: "pan", label: "Pan No.", required: false },
    { type: "input", fieldName: "gst", label: "GST No.", required: false },
    
  ];
  useEffect(() => {
    if(displayName === "Customer"){
      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode != 0 && displayName === "Customer") {
      handleModify();
    }
  }, [modifyCode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));


  const resetForm = async () => {
    setFormData({
        name: "",
        mobile: "",
        email: "",
        address: "",
        pan: "",
        gst: "",
    });
    setModifyCode(0);
  };

  const handleFormSubmit = () => {
    const jsonData = {
    //   Mastertype: 101,
      Code: modifyCode || 0,
      Name: formData?.name || "",
      Mobile: formData?.mobile || "",
      Email: formData?.email || "",
      Address: formData?.address || "",
      PanNo: formData?.pan || '',
      GSTNO: formData?.gst || '',
      ParentGrp: 116,
    };
    // console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveAccountMaster?",
      method: "POST",
      data: jsonData,
      setLoading,
      refreshList: tableListHandler(url),
      //   navigateTo
      resetForm: resetForm,
      onSuccess: (response) => {console.log("Success:", response)
        tableListHandler(url)
        if(modifyCode != 0){
         setTimeout(() => {
          
          //  closeModal(modalRef)
         }, 2000);
        }
      },
      onError: (error) => console.error("Error:", error),
    });
  };  

  const handleModify = async () => {
    const url = `/api/GetAccMastList?Mastertype=2&Code=${modifyCode}`;

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response: any) => {
        // console.log("Data successfully modified:", response);
        const data = response[0];
        setFormData({
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          address: data.address,
          gst: data.gstNo,
          pan: data.panNo
        });
       
      },
      onError: (status: any, message: string) => {
        console.error("Error occurred:", message);
      },
    });
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="customer_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } Customer`}</h5>
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
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            {formFields.map((field, idx) => (
              <div className="col-md-6" key={idx}>
                {field.type === "input" && (
                  <InputField
                    name={field.fieldName}
                    labelName={field.label}
                    type={field.fieldName === "email" ? "email" : "text"}
                    required={field.required}
                    value={formData[field.fieldName]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, field.fieldName)
                    }
                    dangerTag={field.required && "*"}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="d-flex align-items-center justify-content-end">
            <Link
              to="#"
              className="btn btn-light me-2"
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFormSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
