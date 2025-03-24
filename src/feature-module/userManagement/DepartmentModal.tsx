import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../core/data/redux/store";
import { DepartmentDataType } from "./type";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { closeModal } from "../../core/common/utils/closeModel";
import Loader from "../../core/common/loader";

const DepartmentModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName,
  userId
}: any) => {
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DepartmentDataType>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    Hod: null,
    Hod_list: [],
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const formFields = [
    { type: "input", fieldName: "name", label: "Name", required: true },
    { type: "input", fieldName: "mobile", label: "Mobile", required: false },
    { type: "input", fieldName: "email", label: "Email", required: false },
    { type: "input", fieldName: "address", label: "Address", required: false },
    {
      type: "select",
      fieldName: "Hod",
      label: "HOD",
      required: false,
      options: formData.Hod_list,
    },
  ];

  useEffect(() => {
    if(displayName === "Department"){
      sendResetForm(resetForm);
      loadHodHandler();
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode != 0 && displayName === "Department") {
      handleModify();
    }
  }, [modifyCode]);

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));

  const loadHodHandler = async () => {
    await loadDropdownOptions({
      url: `/api/GetMaster1?Mastertype=0`,
      setState: setFormData,
      setLoading,
      stateKey: `Hod_list`,
    });
  };
  const resetForm = async () => {
    setFormData({
      name: "",
      mobile: "",
      email: "",
      address: "",
      Hod: null,
    });
    setModifyCode(0);
    await loadHodHandler()
  };

  const handleFormSubmit = () => {
    const jsonData = {
      Mastertype: 101,
      Code: modifyCode || 0,
      Name: formData?.name || "",
      Mobile: formData?.mobile || "",
      Email: formData?.email || "",
      Address: formData?.address || "",
      Hod: formData?.Hod?.value || 0,
    };
    // console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveDepartMast?",
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
    const url = `/api/GetDepartMastList?Mastertype=101&Code=${modifyCode}`;

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response: any) => {
        // console.log("Data successfully modified:", response);
        const data = response[0];
        loadHodHandler()
        setFormData({
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          address: data.address,
          Hod: { value: data.hod, label: data.hodName },
          Hod_list: formData?.Hod_list,
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
      id="department_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } Department`}</h5>
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
                    type={field.fieldName === "email" ? "email" : "text"}
                    required={field.required}
                    value={formData[field.fieldName]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, field.fieldName)
                    }
                    dangerTag={field.required && "*"}
                  />
                ) : field.type === "select" ? (
                  <InputSelect
                    selectName={field.label}
                    star="*"
                    options={field.options || []}
                    value={formData[field.fieldName]}
                    onChange={(option: any) =>
                      selectHandler(option, field.fieldName)
                    }
                    // required={field.required}
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

export default DepartmentModal;
