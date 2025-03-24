import React, { useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import { whatsappField } from "./inputs";
import { InputField } from "../../../core/common/InputField";
import { useApiHandler } from "../../../core/common/utils/customfunctions";
import { Toast } from "../../../core/common/Toaster";
import SiderNav from "./SiderNav";
const route = all_routes;
interface Fields {
  baseURL: string;
  parameter1H: string;
  parameter1V: string;
  parameter2H: string;
  parameter2V: string;
  parameter3H: string;
  parameter3V: string;
  parameter4H: string;
  parameter4V: string;
  wAppBody: string;
  messageH: string;
  mobileH: string;
  loading: boolean;
}
const WhatsApp = () => {
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();
    const location = useLocation()
  const [formData, setFormData] = useState<Fields>({
    baseURL: "",
    parameter1H: "",
    parameter1V: "",
    parameter2H: "",
    parameter2V: "",
    parameter3H: "",
    parameter3V: "",
    parameter4H: "",
    parameter4V: "",
    wAppBody: "",
    messageH: "",
    mobileH: "",
    loading: false,
  });

  React.useEffect(()=>{
    handleModify()
  },[])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const jsonData = {
      Rectype: 1,
      BaseURL: formData.baseURL || "",
      Parameter1H: formData.parameter1H || "",
      Parameter1V: formData.parameter1V || "",
      Parameter2H: formData.parameter2H || "",
      Parameter2V: formData.parameter2V || "",
      Parameter3H: formData.parameter3H || "",
      Parameter3V: formData.parameter3V || "",
      parameter4H: formData.parameter4H || "",
      Parameter4V: formData.parameter4V || "",
      WAppBody: formData.wAppBody || "",
      MessageH: formData.messageH || "",
      MobileH: formData.mobileH || "",
    };
    console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveWhatsappConfig?",
      method: "POST",
      data: jsonData,
      setLoading: () => setFormData((prev) => ({ ...prev, loading: false })),
      // refreshList: tableListHandler(url),
      //   navigateTo
      // resetForm: resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        handleModify()
      },
      onError: (error) => console.error("Error:", error),
    });
  };

    const handleModify = async () => {
      const url = `/api/GetWhatsappConfig?RecType=1`;
  
      await modifyDataHandler({
        url,
        setLoading: () => setFormData((prev) => ({ ...prev, loading: false })),
        onSuccess: (response:any) => {
          console.log("Data successfully modified:", response);
          const data = response[0]
          setFormData(data)
        },
        onError: (status:any, message:string) => {
          console.error("Error occurred:", message);
        },
      });
    };
  return (
    <div className="page-wrapper">
      <Toast />
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-sm-4">
                  <h4 className="page-title">Settings</h4>
                </div>
                <div className="col-sm-8 text-sm-end">
                  <div className="head-icons">
                    <CollapseHeader />
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              {/* <div className="col-xl-3 col-lg-12 theiaStickySidebar">
              <SiderNav/>
              </div> */}
              <div className="col-xl-12 col-lg-12">
                {/* Settings Info */}
                <div className="card">
                  <div className="card-body">
                    <h4 className="fw-semibold mb-3">WhatsApp Settings</h4>
                    <form onSubmit={handleFormSubmit}>
                      <div className="border-bottom mb-3">
                        <div className="row">
                          {whatsappField.map((field, idx) => {
                            return (
                              <div
                                className={
                                  field.fieldName === "baseURL"
                                    ? "col-12"
                                    : "col-md-6"
                                }
                                key={idx}
                              >
                                {field.type === "input" ? (
                                  <InputField
                                    name={field.fieldName}
                                    labelName={field.label}
                                    type={field.inputType}
                                    required={field.required}
                                    value={
                                      formData[field.fieldName as keyof Fields]
                                    }
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                      handleChange(
                                        e,
                                        field.fieldName as keyof Fields
                                      )
                                    }
                                    dangerTag={field.required && "*"}
                                    min={
                                      field.inputType === "number"
                                        ? 0
                                        : undefined
                                    }
                                  />
                                ) : (
                                  field.type === "textarea" && (
                                    <div className="mb-3">
                                      <textarea
                                        className="form-control"
                                        name={field.fieldName}
                                        value={String(
                                          formData[
                                            field.fieldName as keyof Fields
                                          ]
                                        )}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLTextAreaElement>
                                        ) =>
                                          handleChange(
                                            e as any,
                                            field.fieldName
                                          )
                                        }
                                        placeholder={field.label}
                                        rows={4}
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <Link to="#" className="btn btn-light me-2">
                          Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* /Settings Info */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
