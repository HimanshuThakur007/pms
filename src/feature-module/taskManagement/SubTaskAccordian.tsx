import React from "react";
import { Trash2, PlusCircle } from "react-feather";
import InputSelect from "../../core/common/InputSelect";
import { Link } from "react-router-dom";

interface SubTask {
  type: string;
  value: string;
  label: string;
}

interface FormData {
  subtask: string;
  subtaskList: string[];
  checkedList: string[];
  customField: {
    checked: boolean;
    input: string;
  }[];
}

interface DropDownMaster {
  subTask: { label: string; value: string }[];
}

interface SubTaskAccordionProps {
  subTask: SubTask[];
  formData: FormData;
  dropDownMaster: DropDownMaster;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectHandler: (option: any, field: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    index: number
  ) => void;
  handleDeleteSubtask: (index: number) => void;
  handleAddSubtask: () => void;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    index: number
  ) => void;
  handleDeleteCustomField: (index: number) => void;
  handleAddCustomField: () => void;
}

const SubTaskAccordion: React.FC<SubTaskAccordionProps> = ({
  subTask,
  formData,
  dropDownMaster,
  handleRadioChange,
  selectHandler,
  handleChange,
  handleDeleteSubtask,
  handleAddSubtask,
  handleCheckboxChange,
  handleDeleteCustomField,
  handleAddCustomField,
}) => {
  return (
    <div className="accordion-item border-top rounded mb-3">
      <div className="accordion-header">
        <Link
          to="#"
          className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
          data-bs-toggle="collapse"
          data-bs-target="#social"
        >
          <span className="avatar avatar-md rounded text-dark border me-2">
            <i className="ti ti-social fs-20" />
          </span>
          Sub Task
        </Link>
      </div>
      <div
        className="accordion-collapse collapse"
        id="social"
        data-bs-parent="#main_accordion"
      >
        <div className="accordion-body border-top">
          <div className="row">
            {subTask.map((field, idx) => (
              <div
                className={field.type === "checkbox" ? "col-md-12" : "col-md-4"}
                key={idx}
              >
                {(() => {
                  switch (field.type) {
                    case "radio":
                      return (
                        <div className="mb-3 d-flex flex-wrap">
                          <div className="me-2">
                            <input
                              type="radio"
                              id={field.value}
                              name="subtask"
                              className="status-radio"
                              value={field.value??''}
                              checked={formData.subtask === field.value}
                              onChange={handleRadioChange}
                            />
                            <label htmlFor={field.value}>{field.label}</label>
                          </div>
                        </div>
                      );

                    default:
                      return null;
                  }
                })()}
              </div>
            ))}

            {formData.subtask === "subtask" && (
              <InputSelect
                selectName="Sub Task"
                options={dropDownMaster?.subTask}
                value={formData.subtaskList}
                onChange={(option: any) => selectHandler(option, "subtaskList")}
                isMulti
              />
            )}

            {/* =============Checked-List=============== */}
            {formData.subtask === "checklist" && (
              <>
                {formData.checkedList.map((subtask, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      value={subtask??''}
                      onChange={(e) => handleChange(e, "checklist", index)}
                      className="form-control me-2"
                    />
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteSubtask(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center"
                  onClick={handleAddSubtask}
                >
                  <PlusCircle size={16} className="me-2" />
                  Add Subtask
                </button>
              </>
            )}

            {/* =============Custom-Field=============== */}
            {formData.subtask === "customfield" && (
              <>
                <div>
                  {formData.customField.map((field, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <label className="d-flex me-2">
                        <input
                          type="checkbox"
                          checked={field.checked}
                          onChange={(e) =>
                            handleCheckboxChange(e, "customfield", index)
                          }
                          className="me-2"
                        />
                        Numeric
                      </label>
                      <input
                        type={field.checked ? "number" : "text"}
                        value={field.input}
                        onChange={(e) => handleChange(e, "customfield", index)}
                        className="form-control me-2"
                        placeholder={field.checked ? "123.." : "Abc.."}
                        min={field.checked ? 0 : undefined}
                      />
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => handleDeleteCustomField(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center"
                  onClick={handleAddCustomField}
                >
                  <PlusCircle size={16} className="me-2" />
                  Add Custom Field
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTaskAccordion;
