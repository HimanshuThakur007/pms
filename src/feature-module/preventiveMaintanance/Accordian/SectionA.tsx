import React from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../../core/common/InputField";
import InputSelect from "../../../core/common/InputSelect";

interface FieldOption {
  label: string;
  value: string | number;
}

interface FormData {
  [key: string]: any;
}

interface Field {
  fieldName: string;
  label: string;
  type: string;
  required?: boolean;
  options?: FieldOption[];
  isMulti?: boolean;
  inputType?: string;
  belowLabel?: string;
  disabled?: boolean;
}

interface SectionAProps {
  formField: Field[];
  formData: FormData;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
  modifyCode: any;
  selectHandler: (option: any, fieldName: string) => void;
}

const SectionA: React.FC<SectionAProps> = ({
  formField,
  handleChange,
  selectHandler,
  formData,
  modifyCode,
}) => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const yearRange = `${previousYear} - ${currentYear}`;

  const handleDownload = (
    e: React.MouseEvent<HTMLButtonElement>,
    fieldName: string
  ) => {
    e.preventDefault();
    const fileMap: Record<string, string> = {
      downloadSample1: "PDA Goal Setting Template(Workday).xlsx",
      downloadSample: "KRA & KPI Format.xlsx",
    };
    // const fileUrl =
    //   modifyCode?.code > 0
    //     ? formData?.url
    //     : `/assets/Excel/${fileMap[fieldName]}`;
    let fileUrl = `/assets/Excel/${fileMap[fieldName]}`;
    if (modifyCode?.code > 0) {
      fileUrl = fieldName === "downloadSample" ? formData?.url : formData?.url1;
    }
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileMap[fieldName];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    handleChange(e, fieldName);
  };

  const renderField = (field: Field, idx: number) => {
    const isDisabled = modifyCode?.code > 0 || field.disabled;

    switch (field.type) {
      case "input":
        return (
          <div key={field.fieldName} className="col-md-6">
            {field.inputType === "percentage" ? (
              <InputField
                labelName={field.label}
                type="text"
                value={
                  formData[field.fieldName] !== ""
                    ? `${formData[field.fieldName]}%`
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let value = e.target.value.replace(/\D/g, "");
                  let num = Math.min(100, Math.max(0, parseInt(value) || 0));

                  const syntheticEvent = {
                    target: {
                      name: field.fieldName,
                      value: num.toString(),
                    },
                  } as React.ChangeEvent<HTMLInputElement>;

                  handleChange(syntheticEvent, field.fieldName);
                }}
                placeholder="Enter percentage (0 - 100%)"
                disabled={isDisabled}
                dangerTag={field.required ? "*" : ""}
              />
            ) : field.fieldName.includes("excel") ||
              field.fieldName.includes("excel1") ? (
              <div className="custom-file-input">
                <label>
                  {field.label}{" "}
                  {field.required && <span className="text-danger">*</span>}
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, field.fieldName)}
                  required={field.required}
                />
              </div>
            ) : (
              <InputField
                name={field.fieldName}
                labelName={field.label}
                type={field.inputType}
                required={field.required}
                value={formData[field.fieldName] || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, field.fieldName)
                }
                dangerTag={field.required ? "*" : ""}
                min={field.inputType === "number" ? 0 : undefined}
                disabled={isDisabled}
              />
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.fieldName} className="col-md-6">
            <InputSelect
              selectName={field.label}
              star={field.required ? "*" : ""}
              options={field.options || []}
              value={formData[field.fieldName]}
              onChange={(option: any) => selectHandler(option, field.fieldName)}
              isMulti={field.isMulti}
              required={field.required}
              isDisabled={isDisabled}
            />
            {field.fieldName === "highestQualification" && (
              <label>{field.belowLabel}</label>
            )}
          </div>
        );

      case "button":
        return (
          <div key={field.fieldName} className="col-md-6">
            <button
              className="btn btn-secondary mb-3"
              onClick={(e) => handleDownload(e, field.fieldName)}
            >
              {modifyCode?.code > 0 ? "Download KRA / KPI" : field.label}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="accordion-item rounded mb-3">
      <div className="accordion-header">
        <Link
          to="#"
          className="accordion-button accordion-custom-button bg-blue rounded fw-medium text-dark"
          data-bs-toggle="collapse"
          data-bs-target="#basic"
          style={{ backgroundColor: "blue" }}
        >
          <span className="avatar avatar-md rounded text-dark border me-2">
            <i className="ti ti-user-plus fs-20" />
          </span>
          <span className="text-white">Employee Details</span>
        </Link>
      </div>
      <div
        className="accordion-collapse collapse show"
        id="basic"
        data-bs-parent="#main_accordion"
      >
        <div className="accordion-body border-top">
          <div className="row">
            {formField.slice(0, 9).map(renderField)}

            <div className="col-md-6">
              {formData?.highestQualification != null &&
                formData?.highestQualification?.value != "NA" && (
                  <>
                    <div className="col-md-12">
                      <InputField
                        name="higherEducationDetails"
                        labelName="Enter Updated Qualification"
                        type="text"
                        required
                        value={formData.higherEducationDetails || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, "higherEducationDetails")
                        }
                        dangerTag="*"
                        disabled={modifyCode?.code > 0}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="col-form-label">
                        Upload supporting document
                        {formData?.highestQualification != null &&
                          formData?.highestQualification?.value != "NA" && (
                            <span className="text-danger">*</span>
                          )}
                      </label>
                      <input
                        name="excel2"
                        // labelName="Upload Documents"
                        type="file"
                        required={
                          formData?.highestQualification != null &&
                          formData?.highestQualification?.value != "NA" &&
                          true
                        }
                        // value={formData.excel2 || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, "excel2")
                        }
                        // dangerTag="*"
                        disabled={modifyCode?.code > 0}
                      />
                    </div>
                  </>
                )}
            </div>
           
            {/* {formField.slice(9, 11).map(renderField)} */}
            {/* <hr
              className="hr-text1 gradient "
              data-content="Section A : Performance / Goal Review 2024"
              style={{ fontSize: "20px" }}
              // style={{background:"blue"}}
              // style={{background: "linear-gradient(blue)",
              //   height: "25px",
              //   border: "0"}}
            /> */}
            {formField.slice(9, 11).map(renderField)}
            <div className="accordion-header mb-3">
              <Link
                to="#"
                className="accordion-button bg-blue rounded fw-medium text-dark"
                onClick={(e)=> e.preventDefault()}
              >
                <span className="text-white ">
                  {" "}
                  Section A : Performance / Goal Review {previousYear} And Goal Setting {currentYear}
                </span>
              </Link>
            </div>
            {/* <hr className="border border-secondary border-1" /> */}
            {/* <hr
              className="hr-text2"
              data-content={`KRA / KPI Achievement Summary ${previousYear}`}
            /> */}
               <h5 className="mb-3" style={{color:'#000080'}}>KRA / KPI Achievement Summary {previousYear}</h5>
            {formField.slice(15, 20).map(renderField)}

            {/* <hr
              className="hr-text2"
              data-content="Upload your self-reviewed 2024 KRA / KPI File"
            /> */}
                <h5 className="mb-3" style={{color:'#000080'}}>Upload your self-reviewed {previousYear} KRA / KPI File</h5>
            {formField.slice(11, 13).map(renderField)}
            {/* <hr
              className="hr-text2"
              data-content="Annual Goal Setting (PDA) 2025 form"
            /> */}
            <h5 className="mb-3" style={{color:'#000080'}}>Annual Goal Setting (PDA) {currentYear} form</h5>
             <label className="col-form-label">Instruction:</label>
             <ul className="mb-2">
             <li>Step-1 Download The PDA Goal Setting Form</li>
             <li>Step-2 Set the Goals (all 3 Goals - Performance, Behavior and Learning Development)</li>
             <li>Step-3 Upload The Filled PDA Goal Setting Form</li>
             </ul>
            {formField.slice(13, 15).map(renderField)}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionA;
