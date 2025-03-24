// SwitchComponent.tsx
import React from "react";

type SwitchProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SwitchComponent = ({ id, label, checked, onChange }: SwitchProps) => {
  return (
    <div className="col-md-6">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default SwitchComponent;
