import React from 'react'
import { Link } from 'react-router-dom';
import { InputField } from '../../core/common/InputField';
import InputSelect from '../../core/common/InputSelect';
import InputDate from '../../core/common/InputDate';
import SwitchComponent from '../../core/common/Switch';

interface FieldOption {
    label: string;
    value: string | number;
  }
  
  interface Field {
    fieldName: string;
    label: string;
    type: string;
    required?: boolean;
    options?: FieldOption[];
    isMulti?: boolean;
  }
  
  interface AdditionalAccordionProps {
    additionalInfo: Field[];
    formData: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
    selectHandler: (option: any, fieldName: string) => void;
    handleDateChange: (date: Date, fieldName: string) => void;
    handleTimeChange: (value: string, fieldName: string) => void;
    handleRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => void;
    setFormData?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  }

  const AdditionalAccordion: React.FC<AdditionalAccordionProps> = ({
    additionalInfo,
    formData,
    handleChange,
    selectHandler,
    handleDateChange,
    handleTimeChange,
    handleRadioChange,
    handleCheckboxChange,
    setFormData,
  }) => {
  return (
    <>
       <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#address"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-map-pin-cog fs-20" />
                  </span>
                  Additional Info
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="address"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    {additionalInfo.map((field: any, idx) => (
                      <div
                        className={
                          field.type === "checkbox" ? "col-md-12" : "col-md-6"
                        }
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
                                  type="text"
                                  required={field.required}
                                  value={formData[field.fieldName]??''}
                                  onChange={(e: any) =>
                                    handleChange(e, field.fieldName)
                                  }
                                />
                              );
                            case "textarea":
                              return (
                                <textarea
                                  className="form-control mb-3"
                                  name={field.fieldName}
                                  value={formData[field.fieldName]}
                                  onChange={(e) =>
                                    handleChange(e, field.fieldName)
                                  }
                                  rows={4}
                                  placeholder={field.label}
                                />
                              );
                            case "select":
                              return (
                                <InputSelect
                                  selectName={field.label}
                                  options={field.options}
                                  value={formData[field.fieldName]}
                                  onChange={(option: any) =>
                                    selectHandler(option, field.fieldName)
                                  }
                                  required={field.required}
                                  star={field.required && "*"}
                                  isMulti={field.isMulti}
                                />
                              );
                            case "date":
                              return (
                                <InputDate
                                  labelName={field.label}
                                  selected={formData[field.fieldName]}
                                  onChange={(date: any) =>
                                    handleDateChange(date, field.fieldName)
                                  }
                                  required={field.required}
                                  star={field.required && "*"}
                                />
                              );
                            case "time":
                              return (
                                <div className="mb-3">
                                  <label className="col-form-label">
                                    {field.label}
                                    {field.required && "*"}
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={formData[field.fieldName]??''}
                                    onChange={(e) =>
                                      handleTimeChange(
                                        e.target.value,
                                        field.fieldName
                                      )
                                    }
                                  />
                                </div>
                              );
                            case "radio-inp":
                              if (field.fieldName === "durationUnit") {
                                return (
                                  <div className="mb-3">
                                    {formData.durationUnit && (
                                      <div className="mb-3">
                                        <label className="col-form-label">
                                          Enter Duration (in{" "}
                                          {formData.durationUnit}s)
                                        </label>
                                        <input
                                          type="number"
                                          name='durationValue'
                                          className="form-control"
                                          value={formData.durationValue}
                                          onChange={(e)=>handleChange(e , "durationValue")}
                                          
                                        />
                                      </div>
                                    )}
                                    <div className="d-flex flex-wrap">
                                      {field.options.map(
                                        (option: any, optionIdx: number) => (
                                          <div className="me-2" key={optionIdx}>
                                            <input
                                              type="radio"
                                              id={option.value}
                                              name={field.fieldName}
                                              className="status-radio"
                                              value={option.value??''}
                                              checked={
                                                formData[field.fieldName] ===
                                                option.value
                                              }
                                              onChange={handleRadioChange}
                                            />
                                            <label htmlFor={option.value}>
                                              {option.label}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                );
                              } else if (field.fieldName === "taskWeightage") {
                                return (
                                  <div className="mb-3">
                                    {formData.taskWeightage && (
                                      <div className="mb-3">
                                        <label className="col-form-label">
                                          Task Weightage
                                        </label>
                                        <input
                                          type="number"
                                          name="taskWeightageValue"
                                          className="form-control"
                                          value={formData.taskWeightageValue??''}
                                          onChange={(e)=>handleChange(e , "taskWeightageValue")}
                                        />
                                      </div>
                                    )}
                                    <div className="d-flex flex-wrap">
                                      {field.options.map(
                                        (option: any, optionIdx: number) => (
                                          <div className="me-2" key={optionIdx}>
                                            <input
                                              type="radio"
                                              id={option.value}
                                              name={field.fieldName}
                                              className="status-radio"
                                              value={option.value??''}
                                              checked={
                                                formData[field.fieldName] ===
                                                option.value
                                              }
                                              onChange={handleRadioChange}
                                            />
                                            <label htmlFor={option.value}>
                                              {option.label}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              break;
                            case "checkbox":
                              return (
                                <SwitchComponent
                                  id={field.fieldName}
                                  label={field.label}
                                  checked={formData[field.fieldName]??''}
                                  onChange={(e) =>
                                    handleCheckboxChange?.(
                                      e,
                                      field.fieldName,
                                      idx
                                    )
                                  }
                                />
                              );
                            case "numeric":
                              return formData.taskscheduled ? (
                                <InputField
                                  name={field.fieldName}
                                  labelName={field.label}
                                  min={0}
                                  type="number"
                                  required={field.required}
                                  value={formData[field.fieldName]??''}
                                  onChange={(e: any) =>
                                    handleChange(e, field.fieldName)
                                  }
                                />
                              ) : null;
                            default:
                              return null;
                          }
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default AdditionalAccordion