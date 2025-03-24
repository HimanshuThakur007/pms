import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import Loader from "../../core/common/loader";


const DesignationModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  content,
  tableData,
  url,
  displayName
}: any) => {
  const { handleSubmit, modifyDataHandler } =
    useApiHandler();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const formFields = [
    { type: "input", fieldName: "name", label: "Name", required: true },
  ];

  useEffect(() => {
    if (displayName === "Unit" || displayName === "Designation" || displayName === "Site" || displayName === "Role") {
    sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode !== 0 && displayName === "Unit" || displayName === "Designation" || displayName === "Site" || displayName === "Role") {
      handleModify();
    }
  }, [modifyCode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));

  const resetForm = async () => {
    setFormData({
      name: "", // reset name field
    });
    setModifyCode(0);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const jsonData = {
      Mastertype: parseInt(content),
      Code: modifyCode || 0,
      Name: formData?.name || "",
    };
    // console.log(" Data", JSON.stringify(jsonData));
    let saveurl = "";
    if (content === "102") {
      saveurl = `/api/SaveTypeMast?`;
    } else if (content === "104") {
      saveurl = `/api/SaveSiteMast`;
    } else if (content === "109") {
      saveurl = `/api/SaveCategoriesMast?`;
    } else if (content === "8") {
      saveurl = `/api/SaveUnitMast?`;
    }
    handleSubmit({
      url: saveurl,
      method: "POST",
      data: jsonData,
      setLoading,
      refreshList: tableListHandler(url),
      resetForm: resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        tableListHandler(url);
        if (modifyCode !== 0) {
          setTimeout(() => {
            // closeModal(modalRef);
          }, 2000);
        }
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
    if (content === "109") {
      const getRole = tableData?.find((item: any) => item.code === modifyCode);
      setFormData({
        name: getRole.name,
      });
    } else {
      // GetUnitMastList
      let url = "";
      if (content === "8") {
        url = `/api/GetUnitMastList?Mastertype=${parseInt(
          content
        )}&Code=${modifyCode}`;
      } else {
        url = `/api/GetTypeMastList?Mastertype=${parseInt(
          content
        )}&Code=${modifyCode}`;
      }
      await modifyDataHandler({
        url,
        setLoading,
        onSuccess: (response: any) => {
          // console.log("Data successfully modified:", response);
          const data = response[0];
          setFormData({
            name: data.name,
          });
        },
        onError: (status: any, message: string) => {
          console.error("Error occurred:", message);
        },
      });
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="designation_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        }  ${
          content === "102"
            ? "Designation"
            : content === "104"
            ? "Site"
            : content === "109"
            ? "Role"
            : content === "8" ? "Unit" : ''
        }`}</h5>
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
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="row">
            {formFields.map((field, idx) => (
              <div className="col-md-6" key={idx}>
                {field.type === "input" ? (
                  <InputField
                    name={field.fieldName}
                    labelName={field.label}
                    type="text"
                    required={field.required}
                    value={formData[field.fieldName]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, field.fieldName)
                    }
                    dangerTag={field.required && "*"}
                  />
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
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignationModal;
