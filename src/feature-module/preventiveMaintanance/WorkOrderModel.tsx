import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import InputDate from "../../core/common/InputDate";
import { preventiveCreateTask } from "./preventiveInput";
import moment from "moment";
import Loader from "../../core/common/loader";

const WorkOrderModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName,
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
    assets:[],
    master_107:[] // checked list
  });
  const formFields = preventiveCreateTask(dropDownMaster);
  const [formData, setFormData] = useState<any>({
    name: "",
    company: null,
    recurringSchedule: null,
    category: null,
    employee: null,
    SDate: new Date(),
    EDate: new Date(),
    priority: null,
    location: null,
    assets:null,
    clt:null,
    estimatedDuration: 0,
    description: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayName === "Work Order") {
      loadMultipleMasters();
      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode != 0 && displayName === "Work Order") {
      handleModify();
    }
  }, [modifyCode]);

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    if(selectName === 'employee'){
      let code = selectedOption
      handelSite(code)
    } else if (selectName === 'company'){
      let code = selectedOption.value
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
    fieldName: string
  ) => setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: date }));
  };
// console.log("dropDownMaster?.master_1",dropDownMaster?.master_1)
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
              : type === 1 ? `/api/GetCompany` 
              :`/api/GetMaster1?Mastertype=${type}`;
          await loadDropdownOptions({
            url,
            setState: setDropDownMaster,
            setLoading,
            valueKey: type === 1 ? "compCode" : 'code',
            labelKey: type === 1 ? "compName" : 'name',  
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
      company: null,
      recurringSchedule: null,
      category: null,
      employee: null,
      SDate: new Date(),
      EDate: new Date(),
      priority: null,
      location: null,
      assets:null,
      clt:null,
      estimatedDuration: 0,
      description: "",
    });
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault()
    const jsonData = {
      Rectype: 3,
      Code: modifyCode.code || 0,
      CompCode:formData?.company?.value || 0,
      Name: formData?.name || '',
      Description: formData?.description,
      Duration: parseInt(formData?.estimatedDuration) || 0,
      Schedule: formData?.recurringSchedule?.value || 0,
      Priority: formData?.priority?.value || 0,
      Category: formData?.category?.value || 0,
      ItemCode: formData?.assets?.value || 0,
      ImgName: '',
      SDate: moment(formData?.SDate).format('DD/MMM/YYYY'),
      EDate: moment(formData?.EDate).format('DD/MMM/YYYY'),
      WUser: formData?.employee?.map((item:any)=>({code: item.value})),
      WcheckList: formData?.clt?.map((item:any)=>({code: item.value})),
      WSite: formData?.location?.map((item:any)=>({code: item.value}))
    };
    // console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveWorkOrderMaster?",
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
     let data = modifyCode;
     console.log('data',data)
     setFormData({
      name: data?.name,
      company: {value:data?.compCode, label:data?.compName},
      recurringSchedule: { label: data?.scheduleName, value: data?.schedule },
      category: { label: data?.categoryName, value: data?.category },
      employee: data?.wUser.map((item:any)=>({value: item.code, label:item.name})),
      SDate:  moment(data?.sDate, 'DD-MM-YYYY').toDate(),
      EDate: moment(data?.eDate, 'DD-MM-YYYY').toDate(),
      priority: { label: data?.priorityName, value: data?.priority },
      location: data?.wnSite.map((item:any)=>({value: item.code, label:item.name})),
      assets:{ label: data?.itemName, value: data?.itemCode },
      clt: data?.wNcheckList.map((item:any)=>({value: item.code, label:item.name})),
      estimatedDuration: data?.duration,
      description: data?.discription,
    });
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="workorder_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } ${displayName}`}</h5>
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
                    min={field.inputType === 'number' && 0}
                  />
                ) : field.type === "select" ? (
                  <InputSelect
                    selectName={field.label}
                    star={field.required && "*"}
                    options={field.options || []}
                    value={formData[field.fieldName]}
                    onChange={(option: any) =>
                      selectHandler(option, field.fieldName)
                    }
                    isMulti = {field.isMulti}
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

          <div className="d-flex align-items-center justify-content-end">
            <Link
              to="#"
              className="btn btn-light me-2"
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={handleFormSubmit}
            >
               {modifyCode.code === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkOrderModal;
