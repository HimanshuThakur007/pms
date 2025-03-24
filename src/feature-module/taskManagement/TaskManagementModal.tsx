import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import InputSelect from "../../core/common/InputSelect";
import Loader from "../../core/common/loader";

const TaskManagementModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  displayName,
  content,
  url
}: any) => {
  const { handleSubmit, modifyDataHandler, loadDropdownOptions } = useApiHandler();
  
  const [category, setCategory] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    alias: "",
    description: "",
    // parentCategory: null,
    taskCategory: null,
    subTask: "",
    taskType: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const formFields = [
    {
        type: "select",
        fieldName: "taskCategory",
        label: "Task Category",
        required: true,
        options: category,
      },
    {
      type: "input",
      fieldName: "name",
      label: `${displayName} Name`,
      required: true,
    },
    {
      type: "textarea",
      fieldName: "description",
      label: "Description",
      required: false,
    },
   
    
   
  ];

  useEffect(() => {
    if(content === "103" || content === "108" || content === "110"){
      sendResetForm(resetForm);
      loadParentCategoryHandler();
    }
  }, [content]);

  useEffect(() => {
    if (modifyCode !== 0 && content === "103" || content === "108" || content === "110" ) {
      handleModify();
    }
  }, [modifyCode]);

  const loadParentCategoryHandler = () => {
    loadDropdownOptions({
      url: `/api/GetMaster1?Mastertype=108`,
      setState: setCategory,
      setLoading,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const selectHandler = (selectedOption: any, selectName: string) => {
    setFormData((prev: any) => ({ ...prev, [selectName]: selectedOption }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      taskCategory: null,
    });
    setModifyCode(0);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    const jsonData: any = {
      Code: modifyCode || 0,
      MasterType: parseInt(content),
      Name: formData.name,
    };

    if (content === "103") {
      url = `/api/SaveSubMast?`;
      jsonData.Category = formData?.taskCategory?.value;
    //   jsonData.SubTask = formData.subTask;
    } else if (content === "108") {
      url = `/api/SaveTaskCateMast?`;
      jsonData.Discription = formData?.description || "";
    } else if (content === "110") {
      url = `/api/SaveTaskTypeMast?`;
    //   jsonData.TaskType = formData.taskType;
    }

    handleSubmit({
      url,
      method: "POST",
      data: jsonData,
      setLoading,
      refreshList: tableListHandler(url),
      resetForm,
      onSuccess: (response) => {
        tableListHandler(url);
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
    let url = "";
    if (content === "103") {
      url = `/api/GetSubMastList?Mastertype=103&Code=${modifyCode}`;
    } else if (content === "108") {
      url = `/api/GetTaskCategoriesMastList?Mastertype=108&Code=${modifyCode}`;
    } else if (content === "110") {
      url = `/api/GetTaskTypeMastList?Mastertype=110&Code=${modifyCode}`;
    }

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response: any) => {
        const data = response[0];
        setFormData({
          name: data?.name,
          description: data?.discription,
          taskCategory: {value:data?.category, label: data?.categoryName},
        });
      },
      onError: (status: any, message: string) => {
        console.error("Error occurred:", message);
      },
    });
  };

  // Conditional field rendering based on content
  const filteredFormFields = formFields.filter((field) => {
    if (content === "103") {
      return field.fieldName === "taskCategory" || field.fieldName === "name";
    }
    if (content === "108") {
      return field.fieldName === "name" || field.fieldName === "description";
    }
    if (content === "110") {
      return field.fieldName === "name";
    }
    return true; // Show all fields for other content values
  });

  return (
    <div className="offcanvas offcanvas-end offcanvas-large" tabIndex={-1} id="taskmanagement_add" ref={modalRef}>
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${modifyCode === 0 ? "Add New" : "Edit"} ${displayName}`}</h5>
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
            {filteredFormFields.map((field, idx) => {
              if (field.type === "select") {
                return (
                  <div className="col-md-6" key={idx}>
                    <InputSelect
                      selectName={field.label}
                      options={field.options}
                      value={formData[field.fieldName]}
                      onChange={(option: any) => selectHandler(option, field.fieldName)}
                      required={field.required}
                      star={field.required && "*"}
                    />
                  </div>
                );
              } else if (field.type === "input") {
                return (
                  <div className="col-md-6" key={idx}>
                    <InputField
                      name={field.fieldName}
                      labelName={field.label}
                      dangerTag={field.required && "*"}
                      type="text"
                      required={field.required}
                      value={formData[field.fieldName]}
                      onChange={(e: any) => handleChange(e, field.fieldName)}
                    />
                  </div>
                );
              } else if (field.type === "textarea") {
                return (
                  <div className="col-md-6" key={idx}>
                    <textarea
                      className="form-control mb-3"
                      name={field.fieldName}
                      value={formData[field.fieldName]}
                      onChange={(e) => handleChange(e, field.fieldName)}
                      rows={4}
                      placeholder={field.label}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <Link to="#" className="btn btn-light me-2" data-bs-dismiss="offcanvas">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              {modifyCode === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskManagementModal;
