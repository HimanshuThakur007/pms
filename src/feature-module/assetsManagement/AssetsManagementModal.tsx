import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { AssetsManagementDataType, CategoryDataType } from "./type";
import InputSelect from "../../core/common/InputSelect";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import Loader from "../../core/common/loader";

const AssetsManagementModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  displayName,
  content,
  url
}: any) => {
  const { handleSubmit, modifyDataHandler, loadDropdownOptions } =
    useApiHandler();
  const [category, setCategory] = useState<CategoryDataType>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AssetsManagementDataType>({
    name: "",
    alias: "",
    description: "",
    parentCategory: null,

    // imageBase64: "".
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const formFields = [
    {
      type: "select",
      fieldName: "parentCategory",
      label: "Parent Category",
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
      type: "input",
      fieldName: "alias",
      label: `${displayName} Code`,
      required: false,
    },
    {
      type: "textarea",
      fieldName: "description",
      label: "Description",
      required: false,
    },
  ];
  // console.log('form==>',formData?.parentCategoryList)
  useEffect(() => {
    if (content === "7" || content === "5" || content === "4") {
    sendResetForm(resetForm);
    }
  }, [content]);

  useEffect(()=>{
    loadParentCategoryHandler()
  },[])
  const loadParentCategoryHandler = () => {
    loadDropdownOptions({
      url: `/api/GetMasterList?Mastertype=5`,
      setState: setCategory,
      setLoading,
      // stateKey: "parentCategoryList",
    });
  };
  useEffect(() => {
    if (modifyCode !== 0 && content === "7" || content === "5" || content === "4") {
      handleModify();
    }
  }, [modifyCode]);
  // console.log("ffttyyss",formData?.imageBase64)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageBase64: reader.result as string, 
        }));
      };
      reader.readAsDataURL(file); 
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      alias: "",
      description: "",
      parentCategory:null
      // imageBase64: ""
    });
    setModifyCode(0);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    const jsonData:any = {
      Code: modifyCode || 0,
      MasterType: parseInt(content),
      Name: formData.name,
      Alias: formData.alias,
      Discription: formData.description,
      // Image: formData.imageBase64
    };

    if (content === "7") {
      url = `/api/SaveBrandMast?`;
    } else if (content === "5") {
      url = `/api/SaveCateMast?`;
    } else if (content === "4") {
      url = `/api/SaveSubCateMast?`;
      jsonData.CateCode = formData?.parentCategory?.value || "";
    }

    handleSubmit({
      url,
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
    // GetBrandMastList?Mastertype=7&Code=
    // const url = `/api/GetStoreMastList?Mastertype=11&Code=${modifyCode}`;
    let url = "";
    if (content === "7") {
      url = `/api/GetBrandMastList?Mastertype=7&Code=${modifyCode}`;
    } else if (content === "5") {
      url = `/api/GetCateMastList?Mastertype=5&Code=${modifyCode}`;
    } else if (content === "4") {
      url = `/api/GetSubCateMastList?Mastertype=4&Code=${modifyCode}`
    }

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response: any) => {
        const data = response[0];
        setFormData({
          name: data?.name,
          alias: data?.alias,
          description: data?.discription,
          parentCategory: {value:data?.cateCode, label:data?.cateName}
          // imageBase64: data?.image || ""
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
      id="assetsmanagement_add"
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
            {formFields.map(
              (field, idx) =>
                (field.type !== "select" || content === "4") && (
                  <div className="col-md-6" key={idx}>
                    {field.type === "input" && (
                      <InputField
                        name={field.fieldName}
                        labelName={field.label}
                        dangerTag={field.required && "*"}
                        type="text"
                        required={field.required}
                        value={formData[field.fieldName]}
                        onChange={(e: any) => handleChange(e, field.fieldName)}
                      />
                    )}
                    {field.type === "textarea" && (
                      <textarea
                        className="form-control mb-3"
                        name={field.fieldName}
                        value={formData[field.fieldName]}
                        onChange={(e) => handleChange(e, field.fieldName)}
                        rows={4}
                        placeholder={field.label}
                      />
                    )}
                    {field.type === "select" && content === "4" && (
                      <InputSelect
                        selectName={field.label}
                        options={field.options}
                        value={formData[field.fieldName]}
                        onChange={(option: any) =>
                          selectHandler(option, field.fieldName)
                        }
                        required={field.required}
                        star={field.required && '*'}
                      />
                    )}
                  </div>
                )
            )}
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
              {modifyCode === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetsManagementModal;
