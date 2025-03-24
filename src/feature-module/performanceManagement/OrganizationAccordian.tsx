import React from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import InputDate from "../../core/common/InputDate";
import SwitchComponent from "../../core/common/Switch";

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
  data: Field[];
  formData: Record<string, any>;
  selectHandler: (option: any, fieldName: string) => void;
}

const OrganizationAccordion: React.FC<AdditionalAccordionProps> = ({
  data,
  formData,
  selectHandler,
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
            Organization
          </Link>
        </div>
        <div
          className="accordion-collapse collapse"
          id="address"
          data-bs-parent="#main_accordion"
        >
          <div className="accordion-body border-top">
            <div className="row">
              {data?.slice(7, 13).map((field, idx) => (
                <div className="col-md-6" key={idx}>
                  <InputSelect
                    selectName={field.label}
                    options={field.options || []}
                    value={formData[field.fieldName]}
                    onChange={(option: any) =>
                      selectHandler(option, field.fieldName)
                    }
                    required={field.required}
                    star={field.required && "*"}
                    isMulti={field.isMulti}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationAccordion;
