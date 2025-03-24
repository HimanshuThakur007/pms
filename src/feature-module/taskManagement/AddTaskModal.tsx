import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TaskDataType } from "./type";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import AdditionalAccordion from "./AdditionalAccordian";
import TaskDetailAccordian from "./TaskDetailAccordian";
import SubTaskAccordion from "./SubTaskAccordian";
import { additionalInfo, subTask, taskDetails } from "./taskInput";
import moment from "moment";
import Loader from "../../core/common/loader";

const AddTaskModal = ({
  modifyCode,
  userId,
  setModifyCode,
  tableListHandler,
  url,
  displayName,
  sendResetForm
}: any) => {
  const { handleSubmit, modifyDataHandler, loadDropdownOptions } =
    useApiHandler();
  const [dropDownMaster, setDropDownMaster] = useState<any>({
    master_110: [],
    master_108: [],
    site: [],
    master_0: [],
    priority: [
      { label: "Low", value: 1 },
      { label: "Medium", value: 2 },
      { label: "High", value: 3 },
    ],
    status: [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 2 },
    ],
    subTask: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TaskDataType>({
    name: "",
    taskType: null,
    category: null,
    assignedTo: null,
    site: null,
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    taskStart: null,
    durationUnit: "hour",
    durationValue: "",
    taskWeightage: "number",
    taskWeightageValue: "",
    taskRepetitionsDays: 0,
    autoComp: false,
    mandatorydoc: false,
    taskscheduled: false,
    subtaskList: null,
    checkedList: [],
    customField: [],
    subtask: "",
    status: null,
    priority: null,
  });

  useEffect(() => {
    if(displayName === "Task"){
      loadMultipleMasters(0);
      sendResetForm(resetForm)
    }   
  }, [displayName]);

  useEffect(()=>{
    if(displayName=== "Task" && modifyCode.code != 0 && modifyCode.code > 0){
      handleModify()
    }
  },[modifyCode?.code])

  const loadMultipleMasters = async (categoryCode: number) => {
    // GetSubTask?Mastertype=103&Category=` + tCCode == subtask
    const masterTypes = [110, 108, 0];
    setLoading(true);
    try {
      await Promise.all(
        masterTypes.map(async (type) => {
          const url =
            categoryCode === 0
              ? `/api/GetMaster1?Mastertype=${type}`
              : `/api/GetSubTask?Mastertype=103&Category=${categoryCode}`;
          await loadDropdownOptions({
            url,
            setState: setDropDownMaster,
            setLoading,
            stateKey: `${categoryCode === 0 ? `master_${type}` : `subTask`}`,
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
          site: correctFormat,
        }));
        console.log("Success:", response);
      },
      onError: (error) => console.error("Error:", error),
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string,
    index?: number
  ) => {
    if (fieldName === "customfield" && index !== undefined) {
      const updatedCustomField = [...formData.customField];
      updatedCustomField[index].input = e.target.value;
      setFormData((prev) => ({
        ...prev,
        customField: updatedCustomField,
      }));
    } else if (fieldName === "checklist" && index !== undefined) {
      const updatedCheckedList = [...formData.checkedList];
      updatedCheckedList[index] = e.target.value;
      setFormData((prev) => ({
        ...prev,
        checkedList: updatedCheckedList,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
    }
  };

  const selectHandler = (selectedOption: any, selectName: string) => {
    setFormData((prev) => ({ ...prev, [selectName]: selectedOption }));

    if (selectName === "category") {
      let code = selectedOption?.value || 0;
      loadMultipleMasters(code);
    } else if (selectName === "assignedTo") {
      let code = selectedOption;
      handelSite(code);
    }
  };

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: date }));
  };

  const handleTimeChange = (time: string, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: time }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log("Selected radio button value:", name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddSubtask = () => {
    setFormData((prev) => ({
      ...prev,
      checkedList: [...prev.checkedList, ""],
    }));
  };

  const handleAddCustomField = () => {
    setFormData((prev) => ({
      ...prev,
      customField: [...prev.customField, { input: "", checked: false }],
    }));
  };

  const handleDeleteCustomField = (index: number) => {
    const updatedCustomField = formData.customField.filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      customField: updatedCustomField,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    index: number
  ) => {
    if (fieldName === "customfield" && index !== undefined) {
      const updatedCustomField = [...formData.customField];
      updatedCustomField[index].checked = !updatedCustomField[index].checked;
      setFormData((prev) => ({
        ...prev,
        customField: updatedCustomField,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.checked }));
    }
  };

  const handleDeleteSubtask = (index: number) => {
    const updatedCheckedList = formData.checkedList.filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      checkedList: updatedCheckedList,
    }));
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assigned = formData?.assignedTo?.map((item: any) => ({
      code: item.value,
    }));

    const subTask = formData?.subtaskList?.map((item: any) => ({
      code: item.value,
    }));

    const formJSON = {
      Code: modifyCode.code || 0,
      Rectype: 1,
      Name: formData?.name || "",
      Site: 0,
      timePlanningValue: parseInt(formData?.durationValue) || 0,
      TaskWeightageValue: parseInt(formData?.taskWeightageValue),
      Status: formData?.status?.value || 0,
      Priority: formData?.priority?.value || 0,
      Discription: formData?.description || "",
      RepetitionsDays: parseInt(formData?.taskRepetitionsDays || 0),
      SDate: moment(formData?.startDate).format("DD/MMM/YYYY"),
      EDate: moment(formData?.endDate).format("DD/MMM/YYYY"),
      Deadline: formData?.taskStart || "",
      TimePlanning:
        formData?.durationUnit === "hour"
          ? 2
          : formData?.durationUnit === "day"
          ? 1
          : formData?.durationUnit === "minute"
          ? 3
          : 0,
      TaskWeightage:
        formData?.taskWeightage === "number"
          ? 1
          : formData?.taskWeightage === "percentage"
          ? 2
          : 0,
      AutoClose: formData?.autoComp ? 1 : 0,
      SkipWeekend: formData?.mandatorydoc ? 1 :0,
      Category: formData?.category?.value || 0,
      TaskType: formData?.taskType?.value || 0,
      UserCode: userId,
      tranType:
        formData?.subtask === "subtask"
          ? 1
          : formData?.subtask === "checklist"
          ? 2
          : formData?.subtask === "customfield"
          ? 3
          : 0,
      taskShe: formData?.taskscheduled ? 1 : 0,
      tuser: assigned || [],
      checkList:
        formData.checkedList.map((item: any) => ({
          Name: item,
        })) || [],
      ReleatedData: subTask || [],
      customFields:
        formData?.customField.map((item: any) => ({
          inputValue: item.input,
          checked1: item.checked,
        })) || [],
      tSite: formData?.site?.map((item: any) => ({ code: item.value })),
    };
    handleSubmit({
      url: `/api/SaveTaskMaster?`,
      method: "POST",
      data: formJSON,
      setLoading,
      // refreshList: tableListHandler(),
      resetForm: resetForm,
      onSuccess: (response) => {
        tableListHandler(url);
        console.log("sucess task Response", response);
      },
      onError: (error) => console.error("Error:", error),
    });
    // console.log("Final JSON:", JSON.stringify(formJSON));
  };

    const handleModify = async () => {
      // console.log('modifyCode', modifyCode)
      const assignCode = modifyCode?.tUser?.map((item:any)=>({value:item.code}))
      setFormData({
        name: modifyCode?.name,
        taskType: {value:modifyCode?.taskType, label: modifyCode?.taskTypeName},
        category: {value:modifyCode?.category, label: modifyCode?.categoryName},
        assignedTo: modifyCode?.tUser?.map((item:any)=>({value:item.code, label: item.name})),
        site:  modifyCode?.sUser?.map((item:any)=>({value:item.code, label: item.name})) ,
        description: modifyCode?.discription,
        startDate: moment(modifyCode?.sDate, "DD-MM-YYYY").toDate(),
        endDate: moment(modifyCode?.eDate, "DD-MM-YYYY").toDate(),
        // startDate: "",
        // endDate: "",
        
        taskStart: modifyCode?.deadline,
        durationUnit: modifyCode?.timePlanning === 1 ? "day" : modifyCode?.timePlanning === 2 ? "hour" : modifyCode?.timePlanning === 3 ? "minute":'' ,
        durationValue: modifyCode?.timePlanningValue,
        taskWeightage: modifyCode?.taskWeightage === 1 ? "number" : modifyCode?.taskWeightage === 2 ? "percentage" :'',
        taskWeightageValue: modifyCode?.taskWeightageValue,
        taskRepetitionsDays: modifyCode?.repetitionsDays,
        autoComp: modifyCode?.autoClose === 1 ? true : false,
        mandatorydoc: modifyCode?.skipWeekend === 1 ? true : false,
        taskscheduled: modifyCode?.taskShe === 1 ? true : false,
        subtaskList: modifyCode?.tReleatedData?.map((item:any)=>({value:item.code,label:item.name})),
        checkedList: modifyCode?.checkList1?.map((item:any)=>(item)),
        customField: modifyCode?.customfields1?.map((item:any)=>({input:item.inputValue, checked:item.checked1})),
        subtask: modifyCode?.tranType === 1 ? "subtask" : modifyCode?.tranType === 2 ? "checklist" : modifyCode?.tranType === 3 ? "customfield" : "",
        status: {value:modifyCode?.status, label: modifyCode?.statusName},
        priority: {value:modifyCode?.priority, label: modifyCode?.priorityName},
      })
      handelSite(assignCode)
      loadMultipleMasters(modifyCode?.category)
      // customFields:
      //   formData?.customField.map((item: any) => ({
      //     inputValue: item.input,
      //     checked1: item.checked,
      //   })) || [],
    };

  const resetForm = () => {
    setFormData({
      name: "",
      taskType: null,
      category: null,
      assignedTo: null,
      site: null,
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      taskStart: null,
      durationUnit: "hour",
      durationValue: "",
      taskWeightage: "number",
      taskWeightageValue: "",
      taskRepetitionsDays: 0,
      autoComp: false,
      mandatorydoc: false,
      taskscheduled: false,
      subtaskList: null,
      checkedList: [],
      customField: [],
      subtask: "",
      status: null,
      priority: null,
    });
    setModifyCode(0);
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="task_add"
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Add New Task</h5>
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
        <form onSubmit={handleformSubmit}>
          <div className="accordion" id="main_accordion">
            {/* Task Detail */}
            <TaskDetailAccordian
              taskDetails={taskDetails(dropDownMaster)}
              formData={formData}
              handleChange={handleChange}
              selectHandler={selectHandler}
              handleCheckboxChange={handleCheckboxChange}
            />
            {/* /Task Detail */}
            {/* Additional Info */}
            <AdditionalAccordion
              additionalInfo={additionalInfo(dropDownMaster)}
              formData={formData}
              handleChange={handleChange}
              selectHandler={selectHandler}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              handleRadioChange={handleRadioChange}
              handleCheckboxChange={handleCheckboxChange}
            />
            {/* /Additional Info */}
            <SubTaskAccordion
              subTask={subTask}
              formData={formData}
              dropDownMaster={dropDownMaster}
              handleRadioChange={handleRadioChange}
              selectHandler={selectHandler}
              handleChange={handleChange}
              handleDeleteSubtask={handleDeleteSubtask}
              handleAddSubtask={handleAddSubtask}
              handleCheckboxChange={handleCheckboxChange}
              handleDeleteCustomField={handleDeleteCustomField}
              handleAddCustomField={handleAddCustomField}
            />
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

export default AddTaskModal;
