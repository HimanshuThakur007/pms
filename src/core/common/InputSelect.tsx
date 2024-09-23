import React from "react";
import Select from "react-select";

const InputSelect = (props: any) => {

  return (
    <>
      {/* col-form-label */}
      <div className="mb-3">
        <label className='col-form-label'>
          {props.selectName} <span className="text-danger">{props.star}</span>
        </label>
          <Select
            className="select2"
            classNamePrefix="react-select"
            name={props.name}
            placeholder={props.placeholder}
            getOptionLabel={props.getOptionLabel}
            getOptionValue={props.getOptionValue}
            isOptionSelected={props.isOptionSelected}
            isSearchable={props.isSearchable}
            filterOption={props.filterOption}
            onMenuOpen={props.onMenuOpen}
            onMenuClose={props.onMenuClose}
            noOptionsMessage={props.noOptionsMessage}
            autoFocus={props.autoFocus}
            menuIsOpen={props.menuIsOpen}
            defaultValue={props.defaultValue}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            required={props.required}
            isMulti={props.isMulti}
            isClearable ={props.isClearable}
            // isClearable={true}
          />
        </div>
    </>
  );
};

export default InputSelect;
