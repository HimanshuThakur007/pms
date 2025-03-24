import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import InputDate from "../../core/common/InputDate";
import { CreatePm, schedularInp } from "./preventiveInput";
import moment from "moment";
import SwitchComponent from "../../core/common/Switch";
import Loader from "../../core/common/loader";

const days = [
  { label: "Day(s)", value: 1 },
  { label: "Week(s)", value: 2 },
  { label: "Month(s)", value: 3 },
  { label: "Year(s)", value: 4 },
];

const CreatePmModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName,
  content,
  passValue,
}: any) => {
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();

  const [loading, setLoading] = useState(false);
  const [dropDownMaster, setDropDownMaster] = useState({
    master_1: [], //==for company
    recurringSchedule: [
      { label: "Weekly", value: 1 },
      { label: "Monthly", value: 2 },
      { label: "Yearly", value: 3 },
    ],
    master_106: [], // gor category
    master_0: [], //==for user
    priority: [
      { label: "Low", value: 1 },
      { label: "Medium", value: 2 },
      { label: "High", value: 3 },
    ],
    location: [],
    assets: [],
    master_107: [],
    wode: days,
    cwobd: days,
    cwobdt: [
      { label: "Mon", value: 1 },
      { label: "Tue", value: 2 },
      { label: "Wed", value: 3 },
      { label: "Thu", value: 4 },
      { label: "Fri", value: 5 },
      { label: "Sat", value: 6 },
      { label: "Sun", value: 7 },
    ],
    cwu: [
      { label: "is exactly", value: 1 },
      { label: "is Less Than", value: 2 },
      { label: "is Grater Than", value: 3 },
      { label: "Reaches Every", value: 4 },
    ],
    calander: [
      { label: "Regularly", value: 1 },
      { label: "After Completion", value: 2 },
    ],
    wdac: days,
  });
  const formFields = CreatePm(dropDownMaster, passValue);
  const schInp = schedularInp(dropDownMaster);
  const [formData, setFormData] = useState<any>({
    name: "",
    triggerName: "",
    company: null,
    recurringSchedule: null,
    category: null,
    employee: null,
    SDate: new Date(),
    EDate: new Date(),
    priority: null,
    location: null,
    assets: null,
    clt: null,
    estimatedDuration: 0,
    description: "",
    wode: 0,
    wodeSelect: null,
    cwobd: "",
    cwobdInp: 0,
    cwobdSelect: null,
    cwobdt: "",
    cwobdtSelect: null,
    cwu: 0,
    cwuSelect: null,
    wdac: 0,
    wdacSelect: null,
    cfwon: false,
    autoClose: false,
    autoCloseInp: 0,
    workOrder: "",
    calander: null,
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayName === "Preventive Maintenance") {
      loadMultipleMasters();
      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode != 0 && displayName === "Preventive Maintenance") {
        handleModify();
    }
  }, [modifyCode]);

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    if (selectName === "employee") {
      let code = selectedOption;
      handelSite(code);
    } else if (selectName === "company") {
      let code = selectedOption.value;
      loadDropdownOptions({
        url: `/api/GetBusyAssetMaster?CompCode=${code}`,
        setState: setDropDownMaster,
        setLoading,
        stateKey: `assets`,
      });
    }
    setFormData((prev: any) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: any
  ) => setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: date }));
  };

  
  const loadMultipleMasters = async () => {
    // ==== i pass 1 for company===
    const masterTypes = [106, 107, 0, 1];
    setLoading(true);
    try {
      await Promise.all(
        masterTypes.map(async (type) => {
          const url =
            type === 0
              ? `/api/GetMaster1?Mastertype=${type}`
              : type === 1
              ? `/api/GetCompany`
              : `/api/GetMaster1?Mastertype=${type}`;
          await loadDropdownOptions({
            url,
            setState: setDropDownMaster,
            setLoading,
            valueKey: type === 1 ? "compCode" : "code",
            labelKey: type === 1 ? "compName" : "name",
            stateKey: `master_${type}`,
          });
        })
      );
    } catch (error) {
      console.error("Error loading master data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelSite = (code: []) => {
    const assigned = code?.map((item: any) => ({
      code: item.value,
    }));
    // console.log("ass", assigned);
    const jsonData = {
      TUser: assigned,
    };
    handleSubmit({
      url: "/api/GetUserWiseSite",
      method: "POST",
      data: jsonData,
      setLoading,
      onSuccess: (response) => {
        const correctFormat = response?.data?.map((item: any) => ({
          value: item.code,
          label: item.name,
        }));
        setDropDownMaster((prev: any) => ({
          ...prev,
          location: correctFormat,
        }));
        console.log("Success:", response);
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const resetForm = async () => {
    setFormData({
        name: "",
    triggerName: "",
    company: null,
    recurringSchedule: null,
    category: null,
    employee: null,
    SDate: new Date(),
    EDate: new Date(),
    priority: null,
    location: null,
    assets: null,
    clt: null,
    estimatedDuration: 0,
    description: "",
    wode: 0,
    wodeSelect: null,
    cwobd: "",
    cwobdInp: 0,
    cwobdSelect: null,
    cwobdt: "",
    cwobdtSelect: null,
    cwu: 0,
    cwuSelect: null,
    wdac: 0,
    wdacSelect: null,
    cfwon: false,
    autoClose: false,
    autoCloseInp: 0,
    workOrder: "",
    calander: null,
    });
    setModifyCode(0)
  };


  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const jsonData = {
      Rectype: passValue === 1 ? 4 : 5,
      Code: modifyCode.code || 0,
      CompCode: formData?.company?.value || 0,
      Name: formData?.name || "",
      Description: formData?.description,
      TriggerName: formData?.triggerName,
      Duration: parseInt(formData?.estimatedDuration) || 0,
      SRepeat: formData?.calander?.value || 0,
      Schedule: formData?.wodeSelect?.value || 0,
      EveryDay: parseInt(formData?.wode) || 0,
      RadioB: formData?.workOrder === "cwobd" ? 1 : 2,
      WorkDaySchecdule:
        formData?.workOrder === "cwobd" ? parseFloat(formData?.cwobdInp) : 0,
      DayList:
        formData?.workOrder === "cwobd"
          ? formData?.cwobdSelect?.value || 0
          : formData?.cwobdtSelect?.value || 0,
      Unit: parseFloat(formData?.cwu) || 0,
      Wos: formData?.cwuSelect?.value || 0,
      WosDue: parseFloat(formData?.wdac) || 0,
      WOSDue1: formData?.wdacSelect?.value || 0,
      AutoChk: formData?.autoClose ? 1 : 0,
      AutoClose: formData?.autoClose ? parseFloat(formData?.autoCloseInp) : 0,
      CreatNow: formData?.cfwon ? 1 : 0,
      Priority: formData?.priority?.value || 0,
      Category: formData?.category?.value || 0,
      ...(passValue === 1
        ? { ItemCode: formData?.assets?.value || 0 }
        : { MItem: formData?.assets?.map((item:any)=>({code:item.value})) }),
      ImgName: "",
      SDate: moment(formData?.SDate).format("DD/MMM/YYYY"),
      EDate: moment(formData?.EDate).format("DD/MMM/YYYY"),
      WUser: formData?.employee?.map((item: any) => ({ code: item.value })),
      WcheckList: formData?.clt?.map((item: any) => ({ code: item.value })),
      WSite: formData?.location?.map((item: any) => ({ code: item.value })),
    };
    // console.log("user Data===>", JSON.stringify(jsonData));
    const url = passValue === 1 ? `/api/SaveSinglePrimitiveMaster?`: `/api/SaveMultiePrimitiveMaster?`
    handleSubmit({
      url,
      method: "POST",
      data: jsonData,
      setLoading,
      refreshList: tableListHandler(url),
      //   navigateTo
      resetForm: resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        tableListHandler(url);
        if (modifyCode != 0) {
          setTimeout(() => {
            //  closeModal(modalRef)
          }, 2000);
        }
      },
      onError: (error) => console.error("Error:", error),
    });
  };

 const handleModify = async () => {
    const url = passValue === 1 ? `/api/GetSingleModifyList?Code=${modifyCode}` : `/api/GetSingleModifyList?Code=${modifyCode}`
    // const url = `/api/GetSingleModifyList?Code=${modifyCode}`;

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response:any) => {
        // console.log("Data successfully modified:", response);
        const data = response[0]
        // priority: { label: data?.priorityName, value: data?.priority },
        // location: data?.wnSite.map((item:any)=>({value: item.code, label:item.name})),
        // assets:{ label: data?.itemName, value: data?.itemCode },
        // clt: data?.wNcheckList.map((item:any)=>({value: item.code, label:item.name})),
        // category: { label: data?.categoryName, value: data?.category },
        // employee: data?.wUser.map((item:any)=>({value: item.code, label:item.name})),
        // setFormData({
        //     name: data.name,
        //     mobile: data.mobile,
        //     email: data.email,
        //     password: data.password,
        //     repeatPassword: data.password,
        //     site: site,
        //     role: null,
        //     reporting: data?.reportingTo === 1 ? true : false ,
        //     manager: manager,
        //     block_list: {value: data?.block, label:blockLabel},
        //     master_101:{value:data?.department, label: data?.departmentName},
        //     master_102: {value:data?.designation, label: data?.designationName},
        //     master_104: null,
        //     master_109: {value:data?.role, label: data?.roleName},
        //     master_0: null,
        // })
      },
      onError: (status:any, message:string) => {
        console.error("Error occurred:", message);
      },
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    index: number
  ) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.checked }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Selected radio button value:", name);
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="pm_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } ${passValue === 1 ? "Single PM" : "Multiple PM"}`}</h5>
        <button
          type="button"
          className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="ti ti-x" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            {formFields.map((field, idx) => (
              <div className="col-md-6" key={idx}>
                {field.type === "input" ? (
                    <>
                  <InputField
                    name={field.fieldName}
                    labelName={field.label}
                    type={field.inputType}
                    required={field.required}
                    value={formData[field.fieldName]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, field.fieldName)
                    }
                    dangerTag={field.required && "*"}
                    min={field.inputType === "number" && 0}
                  />
                  </>
                ) : field.type === "select" ? (
                  <InputSelect
                    selectName={field.label}
                    star={field.required && "*"}
                    options={field.options || []}
                    value={formData[field.fieldName]}
                    onChange={(option: any) =>
                      selectHandler(option, field.fieldName)
                    }
                    isMulti={field.isMulti}
                    required={field.required}
                  />
                ) : field.type === "date" ? (
                  <InputDate
                    labelName={field.label}
                    selected={formData[field.fieldName]}
                    onChange={(date: any) =>
                      handleDateChange(date, field.fieldName)
                    }
                    required={field.required}
                    star={field.required && "*"}
                  />
                ) : field.type === "textarea" ? (
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name={field.fieldName}
                      value={formData[field.fieldName]}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleChange(e as any, field.fieldName)
                      }
                      placeholder={field.label}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <h5 className="mb-4">Schedular</h5>
          <div className="row">
            {schInp.map((field, idx) => (
              <div
                className={
                  field.type === "checkbox" || field.type === "select"
                    ? "col-md-12 mb-3"
                    : "col-md-6 mb-3"
                }
                key={idx}
              >
                {field.type === "inp & sel" && (
                  <div>
                    <label>{field.label}</label>
                    <div className="d-flex align-items-center">
                      {field.SubMenu?.map((subField: any, subIdx: number) => (
                        <div key={subIdx} className="me-2">
                          {subField.type === "input" && (
                            <InputField
                              name={subField.fieldName}
                              type={subField.inputType}
                              required={subField.required}
                              value={formData[subField.fieldName]}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, subField.fieldName)}
                              dangerTag={subField.required && "*"}
                              min={subField.inputType === "number" && 0}
                            />
                          )}

                          {subField.type === "select" && (
                            <InputSelect
                              selectName={subField.label}
                              options={subField.options || []}
                              onChange={(option: any) =>
                                selectHandler(option, subField.fieldName)
                              }
                              isMulti={subField.isMulti}
                            />
                          )}

                          {subField.type === "radio" && (
                            <input
                              type="radio"
                              name="workOrder" // Unique name to avoid conflicts
                              value={subField.fieldName}
                              checked={
                                formData.workOrder === subField.fieldName
                              }
                              onChange={handleRadioChange}
                            />
                          )}

                          {/* Handling static label */}
                          {subField.label && <span>{subField.label}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {field.type === "checkbox" && (
                  <div>
                    <SwitchComponent
                      id={field.fieldName ?? ""}
                      label={field.label}
                      checked={formData[field.fieldName ?? ""]}
                      onChange={(e) =>
                        handleCheckboxChange?.(e, field.fieldName ?? "", idx)
                      }
                    />

                    {/* Show autoCloseInp only when autoClose is true */}
                    {field.fieldName === "autoClose" && formData.autoClose && (
                      <InputField
                        name="autoCloseInp"
                        type="number"
                        value={formData.autoCloseInp}
                        onChange={(e: any) => handleChange(e, "autoCloseInp")}
                        placeholder="Enter auto-close value"
                        min={0}
                      />
                    )}
                  </div>
                )}

                {field.type === "date" && (
                  <InputDate
                    labelName={field.label}
                    selected={formData[field.fieldName ?? ""]}
                    onChange={(date: any) =>
                      handleDateChange(date, field.fieldName ?? "")
                    }
                    required={field.required}
                    star={field.required && "*"}
                  />
                )}
                {field.type === "select" && (
                  <InputSelect
                    selectName={field.label}
                    star={field.required && "*"}
                    options={field.options || []}
                    value={formData[field.fieldName ?? ""]}
                    onChange={(option: any) =>
                      selectHandler(option, field.fieldName ?? "")
                    }
                    isMulti={field.isMulti}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="d-flex align-items-center justify-content-end">
            <Link
              to="#"
              className="btn btn-light me-2"
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              {modifyCode === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePmModal;
