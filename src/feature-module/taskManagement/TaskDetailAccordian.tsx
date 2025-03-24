import React from 'react'
import { Link } from 'react-router-dom';
import { InputField } from '../../core/common/InputField';
import SwitchComponent from '../../core/common/Switch';
import InputSelect from '../../core/common/InputSelect';

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
    taskDetails: Field[];
    formData: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
    selectHandler: (option: any, fieldName: string) => void;
    handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => void;
  }
const TaskDetailAccordian: React.FC<AdditionalAccordionProps> = ({
    taskDetails,
    formData,
    handleChange,
    selectHandler,
    handleCheckboxChange,
}) => {
  return (
   <>
    <div className="accordion-item rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#basic"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-user-plus fs-20" />
                  </span>
                  Task Details
                </Link>
              </div>
              <div
                className="accordion-collapse collapse show"
                id="basic"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    {taskDetails.map((field, idx) => (
                      <div className="col-md-6" key={idx}>
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
                                  onChange={(e: any) =>
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
                            case "checkbox":
                              return (
                                <SwitchComponent
                                  id={field.fieldName}
                                  label={field.label}
                                  checked={formData[field.fieldName]}
                                  onChange={(e) =>
                                    handleCheckboxChange?.(
                                      e,
                                      field.fieldName,
                                      idx
                                    )
                                  }
                                
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
              </div>
            </div>
   </>
  )
}

export default TaskDetailAccordian