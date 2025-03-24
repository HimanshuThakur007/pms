import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import SiderNav from "./SiderNav";
import SwitchComponent from "../../../core/common/Switch";
import { InputField } from "../../../core/common/InputField";
import { emailField } from "./inputs";
import { useApiHandler } from "../../../core/common/utils/customfunctions";
import { Toast } from "../../../core/common/Toaster";
const route = all_routes;
interface Fields {
  smtpServer: string;
  smtpPort: string;
  senderID: string;
  pwd: string;
  eMailS: string;
  eMailB: string;
  emailSSL: boolean;
  loading: boolean;
}
const EmailSetting = () => {
      const { handleSubmit, modifyDataHandler } =
        useApiHandler();
  const [formData, setFormData] = useState<Fields>({
    smtpServer: "",
    smtpPort: "",
    senderID: "",
    pwd: "",
    eMailS: "",
    eMailB: "",
    emailSSL: false,
    loading: false
  });
useEffect(()=>{
    handleModify()
},[])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string,
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.checked }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const jsonData = {
        RecType: 1,
        SMTPServer: formData?.smtpServer || '' ,
        SMTPPort: parseInt(formData?.smtpPort) || 0,
        SenderID: formData?.senderID,
        PWD: formData?.pwd,
        EMailS: "1",
        EMailB: formData?.eMailB,
        EmailSSL: formData?.emailSSL ? 1 : 0,
    };
    console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveEMailConfig?",
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
    const url = `/api/GetEMailConfig?RecType=1`;

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
        <Toast/>
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
                <SiderNav />
              </div> */}
              <div className="col-xl-12 col-lg-12">
                {/* Settings Info */}
                <div className="card">
                  <div className="card-body">
                    <h4 className="fw-semibold mb-3">Email Settings</h4>
                    <form onSubmit={handleFormSubmit}>
                      <div className="border-bottom mb-3">
                        <div className="row">
                          {emailField.map((field: any, idx) => (
                            <div
                              className="col-md-6"
                              key={idx}
                            >
                              {(() => {
                                switch (field.type) {
                                  case "input":
                                    return (
                                      <InputField
                                        name={field.fieldName}
                                        labelName={field.label}
                                        dangerTag={field.required && "*"}
                                        type={field.inputType}
                                        required={field.required}
                                        value={
                                          formData[
                                            field.fieldName as keyof Fields
                                          ]
                                        }
                                        onChange={(e: any) =>
                                          handleChange(e, field.fieldName)
                                        }
                                        min={
                                            field.inputType === "number"
                                              ? 0
                                              : undefined
                                          }
                                      />
                                    );
                                  case "textarea":
                                    return (
                                      <textarea
                                        className="form-control mb-3"
                                        name={field.fieldName}
                                        value={String(
                                          formData[
                                            field.fieldName as keyof Fields
                                          ]
                                        )}
                                        onChange={(e) =>
                                          handleChange(e, field.fieldName)
                                        }
                                        rows={4}
                                        placeholder={field.label}
                                      />
                                    );

                                  case "checkbox":
                                    return (
                                      <SwitchComponent
                                        id={field.fieldName}
                                        label={field.label}
                                        checked={Boolean(formData[field.fieldName as keyof Fields])}
                                        onChange={(e) => handleCheckboxChange(e, field.fieldName)}
                                      />
                                    );
                                  default:
                                    return null;
                                }
                              })()}
                            </div>
                          ))}
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

export default EmailSetting;
