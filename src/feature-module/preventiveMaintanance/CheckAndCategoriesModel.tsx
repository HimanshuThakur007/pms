import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { checkInput } from "./preventiveInput";
import Loader from "../../core/common/loader";

const CheckAndCategoriesModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName,
  content
}: any) => {
  const { handleSubmit } = useApiHandler();
  const [loading, setLoading] = useState(false);
  const formFields = checkInput;
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(displayName === "Check" || modifyCode != 0 &&displayName === "Categories"){
      sendResetForm(resetForm);
    }
  }, [displayName]);


  useEffect(() => {
    if (modifyCode != 0 && displayName === "Check" || modifyCode != 0 &&displayName === "Categories") {
      handleModify();
    }
  }, [modifyCode.code]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));

  const resetForm = async () => {
    setFormData({
      name: "",
      description: "",
    });
    setModifyCode(0)
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault()
    const jsonData:any = {
      MasterType: parseInt(content),
      Code: modifyCode.code || 0,
      Name: formData?.name||'',
    //   Description : formData?.description || ''
    };
    if (content === "107") {
        jsonData.Discription = formData?.description;
      }
      let baseurl = content === "107" ? `/api/SaveCheckMast?` : `/api/SaveCategoriesMast?`
      // console.log('url',url)
    // console.log(`${displayName}`, JSON.stringify(jsonData));
    handleSubmit({
      url:baseurl,
      method: "POST",
      data: jsonData,
      setLoading,
      refreshList: tableListHandler(url),
      //   navigateTo
      resetForm: resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        tableListHandler(url);
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
     let data = modifyCode;
    //  console.log('mod-data',data)
     setFormData({
        name:data?.name,
        description: data?.discription
     })
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="custom_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } ${displayName}`}</h5>
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
                {field.type === "input" ? (
                  <InputField
                    name={field.fieldName}
                    labelName={field.label}
                    type={field.inputType}
                    required={field.required}
                    value={formData[field.fieldName]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, field.fieldName)
                    }
                    dangerTag={field.required && "*"}
                    min={field.inputType === 'number' && 0}
                  />
                ) : field.type === "textarea" && displayName === "Check" ? (
                    <div className="mb-3">
                  <textarea
                    className="form-control"
                    name={field.fieldName}
                    value={formData[field.fieldName]}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e as any, field.fieldName)
                    }
                    placeholder={field.label}
                  />
                  </div>
                ) : null}
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
               {modifyCode.code === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckAndCategoriesModal;
