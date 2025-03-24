export const InputField = ({labelName,dangerTag,type,value,onChange,required,name,min,disabled,placeholder}:any) => {
  return (
    <>
     <div className="mb-3">
      <label className="col-form-label">
      {labelName} <span className="text-danger">{dangerTag}</span>
      </label>
      <input type={type} name={name} className="form-control" value={value} onChange={onChange} required={required} min={typeof min === "number" ? min : undefined} disabled={disabled} placeholder={placeholder}/>
      </div>
    </>
  );
};
