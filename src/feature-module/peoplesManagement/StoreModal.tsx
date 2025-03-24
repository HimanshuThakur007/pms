import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { StoreDataType } from "./type";
import Loader from "../../core/common/loader";

const StoreModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName
}: any) => {
  const { handleSubmit, modifyDataHandler } = useApiHandler();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StoreDataType>({
    stateName: "",
    storeCode: "",
    description: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const formFields = [
    { type: "input", fieldName: "stateName", label: "State Name", required: true },
    { type: "input", fieldName: "storeCode", label: "Store Code", required: true },
    { type: "textarea", fieldName: "description", label: "Description", required: false },
  ];

  useEffect(() => {
    if(displayName === "Store"){

      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode !== 0 && displayName === "Store") {
      handleModify();
    }
  }, [modifyCode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));

  const resetForm = () => {
    setFormData({
      stateName: "",
      storeCode: "",
      description: "",
    });
    setModifyCode(0);
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    const jsonData = {
      Code: modifyCode || 0,
      MasterType: 11,
      Name: formData.stateName,
      Alias: formData.storeCode,
      Discription: formData.description,
    };

    handleSubmit({
      url: "/api/SaveStoreMast?",
      method: "POST",
      data: jsonData,
      setLoading,
      refreshList: tableListHandler(url),
      resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        tableListHandler(url);
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
    const url = `/api/GetStoreMastList?Mastertype=11&Code=${modifyCode}`;

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response: any) => {
        const data = response[0];
        // console.log('add',data)
        setFormData({
          stateName: data?.name,
          storeCode: data?.alias,
          description: data?.discription,
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
      id="store_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${modifyCode === 0 ? "Add New" : "Edit"} Store`}</h5>
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
        <form onSubmit={(e:any) => handleFormSubmit(e)}>
          <div className="row">
            {formFields.map((field, idx) => (
              <div className="col-md-6" key={idx}>
                {field.type === "input" && (
                  <InputField
                    name={field.fieldName}
                    labelName={field.label}
                    type="text"
                    dangerTag={field.required && "*"}
                    required={field.required}
                    value={formData[field.fieldName]}
                    onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, field.fieldName)}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    className="form-control"
                    name={field.fieldName}
                    value={formData[field.fieldName]}
                    onChange={(e) => handleChange(e, field.fieldName)}
                    rows={4}
                    placeholder={field.label}
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
              type="submit"
              className="btn btn-primary"
            //   onClick={handleFormSubmit}
            >
              {modifyCode === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreModal;