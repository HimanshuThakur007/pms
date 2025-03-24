import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { GoalDetails, performanceDetails } from "./formField";
import moment from "moment";
import TimelinessAccordion from "./TimelinessAcordian";
import OrganizationAccordion from "./OrganizationAccordian";
import Loader from "../../core/common/loader";

const PerformanceModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url
}: any) => {
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();

  const [loading, setLoading] = useState(false);
  const [dropDownMaster, setDropDownMaster] = useState({
    goalType: [
      { label: "Department", value: 1 },
      { label: "Individual", value: 2 },
    //   { label: "Company", value: 3 },
    ],
    goalUnit: [
      { label: "Number", value: 1 },
      { label: "Percentage", value: 2 },
    ],
    assignedTo: [],
  });
  const formInput = GoalDetails(dropDownMaster);
    const [formData, setFormData] = useState<any>({
      Name: "",
      Start: 0,
      Target: 0,
      Discription: "",
      SDate: new Date(),
      EDate: new Date(),
      goalType:null,
      goalUnit:null,
      assignedTo:null
    });

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    sendResetForm(resetForm);
  }, []);


  useEffect(() => {
    if (modifyCode?.code != undefined) {
      handleModify();
    }
  }, [modifyCode]);

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev: any) => ({ ...prev, [selectName]: selectedOption }));
    if (selectName === "goalType"){
        let code = selectedOption.value === 1 ? 101 : selectedOption.value === 2 ? 0 : 0
        loadAssignedHandler(code)
    }
  };

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: date }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));

  const loadAssignedHandler = async (code:number) => {
    await loadDropdownOptions({
      url: `/api/GetMaster1?Mastertype=${code}`,
      setState: setDropDownMaster,
      setLoading,
      stateKey: `assignedTo`,
    });
  };
  const resetForm = async () => {
    setFormData({
      Name: "",
      Start: 0,
      Target: 0,
      Discription: "",
      SDate: new Date(),
      EDate: new Date(),
      goalType: null,
      goalUnit: null,
      assignedTo: null,
    });
    setModifyCode(0);
  };

  const handleFormSubmit = () => {
    const jsonData = {
        Code: modifyCode?.code || 0,
        Name: formData?.Name,
        Start: parseFloat(formData?.Start),
        Target: parseFloat(formData?.Target),
        Discription: formData?.Discription,
        GType: formData?.goalType?.value,
        GUnit: formData?.goalUnit?.value,
        tuser: formData?.assignedTo?.map((item:any)=>({code: item.value})),
        SDate: moment(formData?.SDate).format("DD/MMM/YYYY"),
        EDate: moment(formData?.EDate).format("DD/MMM/YYYY"),
    };
    // console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveGoalTracking?",
      method: "POST",
      data: jsonData,
      setLoading,
    //   refreshList: tableListHandler(),
      //   navigateTo
      resetForm: resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        tableListHandler(url);
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
   let data = modifyCode;
   setFormData({
    Name: data?.name,
    Start: data?.start,
    Target: data?.target,
    Discription: data?.discription,
    SDate: moment(data?.sDate, "DD-MM-YYYY").toDate(),
    EDate: moment(data?.eDate, "DD-MM-YYYY").toDate(),
    goalType: {value: data?.gType, label:data?.gTypeName},
    goalUnit: {value: data?.gUnit, label:data?.gUnitName},
    assignedTo: data?.tUser?.map((item:any)=>({value: item.code, label:item.name})),
   })
   await loadAssignedHandler(data?.gType)
  };
  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="performance_add"
      ref={modalRef}
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } Performance`}</h5>
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
        <div className="accordion" id="main_accordion">
            <TimelinessAccordion formData={formData} selectHandler={selectHandler} data={performanceDetails(dropDownMaster)}/>
            <OrganizationAccordion formData={formData} selectHandler={selectHandler} data={performanceDetails(dropDownMaster)}/>
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
            >
               {modifyCode === 0 ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerformanceModal;
