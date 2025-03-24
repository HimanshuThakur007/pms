import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { qualityTask } from "./qualityInput";
import InputDate from "../../core/common/InputDate";
import Loader from "../../core/common/loader";

const QualityTaskModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName,
}: any) => {
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();
  const [loading, setLoading] = useState(false);
  const [dropDownMaster, setDropDownMaster] = useState({
    company: [],
    assignedTo: [],
    category: [],
    site: [],
    priority: [],
    status: [],
  });
  const formFields = qualityTask(dropDownMaster);
  const [formData, setFormData] = useState<any>({
    name: "",
    company: null,
    assignedTo: null,
    category: null,
    site: null,
    SDate: new Date(),
    EDate: new Date(),
    priority: null,
    status: null,
    description: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (displayName === "Quality Task") {
      loadHodHandler();
      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode != 0 && displayName === "Quality Task") {
      handleModify();
    }
  }, [modifyCode]);

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev: any) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: date }));
  };

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
      company: null,
      assignedTo: null,
      category: null,
      site: null,
      SDate: new Date(),
      EDate: new Date(),
      priority: null,
      status: null,
      description: "",
    });
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
      onSuccess: (response) => {
        console.log("Success:", response);
        tableListHandler(url);
        if (modifyCode != 0) {
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
        loadHodHandler();
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
      id="qualityTask_add"
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
                  />
                ) : field.type === "select" ? (
                  <InputSelect
                    selectName={field.label}
                    star={field.required && "*"}
                    options={field.options || []}
                    value={formData[field.fieldName]}
                    onChange={(option: any) =>
                      selectHandler(option, field.fieldName)
                    }
                    required={field.required}
                  />
                ) : field.type === "date" ? (
                  <InputDate
                    labelName={field.label}
                    selected={formData[field.fieldName]}
                    onChange={(date: any) =>
                      handleDateChange(date, field.fieldName)
                    }
                    required={field.required}
                    star={field.required && "*"}
                  />
                ) : field.type === "textarea" ? (
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

export default QualityTaskModal;
