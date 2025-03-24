import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserManagementList from "./usermanagementList";
import { userColumn } from "./userColumn";
import AddUserModal from "./AddUserModal";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { Toast } from "../../core/common/Toaster";
import DepartmentModal from "./DepartmentModal";
import DesignationModal from "./DesignationModal";
import CustomerModal from "../peoplesManagement/CustomerModal";
import StoreModal from "../peoplesManagement/StoreModal";
import AssetsManagementModal from "../assetsManagement/AssetsManagementModal";
import AddTaskModal from "../taskManagement/AddTaskModal";
import TaskManagementModal from "../taskManagement/TaskManagementModal";
import moment from "moment";
import GoalModal from "../performanceManagement/GoalModal";
import PerformanceModal from "../performanceManagement/PerformanceModal";
import QualityTaskModal from "../qualityManagement/QualityTaskModal";
import WorkOrderModal from "../preventiveMaintanance/WorkOrderModel";
import CheckAndCategoriesModal from "../preventiveMaintanance/CheckAndCategoriesModel";
import DetailModal from "../reports/detailModal";
import CreatePmModal from "../preventiveMaintanance/CreatePmModal";
import ReviewAndAppresalModal from "../preventiveMaintanance/ReviewAndAppresalModal";
import { getConfig, typeValues } from "./type";
import { useAuthContext } from "../../core/common/AuthContext";
interface Params {
  id: any;
  [key: string]: any;
}
interface State {
  tableData: any[];
  loading: boolean;
  resetFormFunction: any | null;
  modifyCode: number;
  columns: any[];
  displayName: string;
  user: [];
  site: [];
  userSelect: any;
  siteSelect: any;
  dateRange: any;
  tabledetailData:[];
  approval:any;
  approvalSelect:any;
  passValue: number;
}

const UserManagementComp: React.FC = () => {
  const { userType, id } = useParams<Params>();
  const location= useLocation()
  if (location && location.state !== undefined){
    var rights = location?.state?.sidebarData
  }
    const { state } = useAuthContext();
    const { UserID, Name } = state.decryptedData;
    let userId = UserID;
  const { loadDropdownOptions, loadTableData, handleSubmit, handleDelete } = useApiHandler();
  const [stateData, setStateData] = useState<State>({
    tableData: [],
    loading: false,
    resetFormFunction: null,
    modifyCode: 0,
    columns: [],
    displayName: "",
    user: [],
    site: [],
    userSelect: null,
    siteSelect: null,
    dateRange: { startDate: new Date(), endDate: new Date() },
    tabledetailData:[],
    approval:[
    { label: "Reassign/Shift", value: 1 },
    { label: "Reject/Hold", value: 2 },
    ],
    approvalSelect:null,
    passValue:0
  });
  const typeValue= typeValues;
  const config:any = getConfig(userId, stateData);
  const content:any = typeValue[id];
  // console.log("userData from list",config, content,"===>",config[content])

  const defaultConfig = {
    url: "/api/GetUserList?UserCode=0",
    columns: userColumn,
    displayName: "User",
  };

  const handleReceiveResetForm = (resetFunc: any) => {
    setStateData((prevState) => ({ ...prevState, resetFormFunction: resetFunc }));
  };

  const validateDateRange = (selectedRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    if (selectedRange.startDate > selectedRange.endDate) {
      alert("Start date cannot be after end date!");
      return false;
    }
    return true;
  };

  const handleDateChange = (selectedRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    if (validateDateRange(selectedRange)) {
      setStateData((prevState) => ({ ...prevState, dateRange: selectedRange }));
      // console.log("Selected Date Range: ", selectedRange);
    }
  };
  useEffect(() => {
    const selectedConfig: any =
      typeof config[content] === "function"
        ? config[content](userId)
        : config[content] || defaultConfig;
        // const rights = { mEdit: 1, mDelete: 1 };

        setStateData((prevState) => ({
      ...prevState,
      columns:
        typeof selectedConfig.columns === "function"
          ? content === "1224"
            ? selectedConfig.columns(onRowClick, onDeleteRow, stateData?.approvalSelect?.value || 1, rights) 
            :content === "109" ?  selectedConfig.columns(onRowClick, onDeleteRow, content,rights):selectedConfig.columns(onRowClick, onDeleteRow, rights)
          : selectedConfig.columns,
      // columns:
      //   typeof selectedConfig.columns === "function"
      //     ? content === "1224"
      //       ? selectedConfig.columns(onRowClick, onDeleteRow, state?.approvalSelect?.value || 1) 
      //       : selectedConfig.columns(onRowClick, onDeleteRow)
      //     : selectedConfig.columns,
      displayName: selectedConfig.displayName,
    }));

    tableListHandler(selectedConfig.url);
    loadUserHandler();
  }, [content, userId,stateData?.approvalSelect?.value,rights]);

  const tableListHandler = (url: string) => {
    // console.log('url==>>',url)
    setStateData((prevState) => ({ ...prevState, tableData: [] }));
    loadTableData({
      url,
      setState: (data: any) =>{
        setStateData((prevState) => ({ ...prevState, tableData: data }))
        console.log("data",data)
      },
      setLoading: (loading: boolean) =>
        setStateData((prevState) => ({ ...prevState, loading })),
    });
  };

  const loadUserHandler = async () => {
    let url= content === "1235" ? `/api/GetUUserMaster?Code=${userId}` 
    : content === "1237" ? `/api/GetMaster1?Mastertype=0` :`/api/GetMaster1?Mastertype=0`
    await loadDropdownOptions({
      url,
      setState: setStateData,
      stateKey: `user`,
      setLoading: (loading: any) =>
        setStateData((prevState) => ({ ...prevState, loading })),
    });
  };

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("selected-options",selectedOption,selectName)
    // setState((prev) => ({ ...prev, [selectName]: selectedOption }));
    setStateData((prev) => ({
      ...prev,
      [selectName]: selectedOption,
      ...(selectName === "userSelect" && content === "1236" && { siteSelect: null })
    }));

      const userCode = stateData?.userSelect?.value || userId;
      const siteCode = stateData?.siteSelect?.value || 0
    if (selectName === "userSelect") {
      // console.log('select', selectedOption?.value)
      loadDropdownOptions({
        url: `/api/GetUserWiseSite1?UCode=${selectedOption?.value || userId}`,
        setState: setStateData,
        stateKey: `site`,
        setLoading: (loading: any) =>
          setStateData((prevState) => ({ ...prevState, loading })),
      });
      updateModifiedUrls(selectedOption, stateData?.dateRange, siteCode);
    } else if (selectName === "siteSelect"){
      updateModifiedUrls(stateData?.userSelect, stateData?.dateRange, selectedOption?.value);
    } else if (selectName === "approvalSelect"){
      updateModifiedUrls(stateData?.userSelect, stateData?.dateRange, selectedOption?.value);
    }
  };

  const updateModifiedUrls = (selectedOption: any, dateRange: any, siteCode: any) => {
    const userCode = selectedOption?.value || userId;
  
    // Update the first URL
    if (content === '1235'){
    const selectedConfig = config["1235"](userCode);
    const { url } = selectedConfig;
    const urlParams = new URLSearchParams(url.split("?")[1]);
  
    urlParams.set("Status", selectedOption?.value ? "1" : "0");
    urlParams.set("UCode", userCode);
    urlParams.set("sDate", moment(dateRange.startDate).format("DD/MMM/YYYY"));
    urlParams.set("eDate", moment(dateRange.endDate).format("DD/MMM/YYYY"));


    const modifiedUrl = `${url.split("?")[0]}?${urlParams.toString()}`;
    // console.log("url-config", modifiedUrl);
    tableListHandler(modifiedUrl);
    }else if (content === "1237"){
    // Update the second URL
    const selectedConfig1237 = config["1237"](userCode);
    const { url: url1237 } = selectedConfig1237;
    const urlParams1237 = new URLSearchParams(url1237.split("?")[1]);
  
    urlParams1237.set("UCode", userCode);
    const modifiedUrl1237 = `${url1237.split("?")[0]}?${urlParams1237.toString()}`;
    // console.log("modifiedurl-1237", modifiedUrl1237);
    tableListHandler(modifiedUrl1237);
    }else if (content === '1238'){
      const selectedConfig1238 = config["1238"](userCode);
    const { url: url1238 } = selectedConfig1238;
    const urlParams1238 = new URLSearchParams(url1238.split("?")[1]);
  
    urlParams1238.set("Code", userCode);
    const modifiedUrl1238 = `${url1238.split("?")[0]}?${urlParams1238.toString()}`;
    // console.log("modifiedurl-1238", modifiedUrl1238);
    tableListHandler(modifiedUrl1238);
    }else if (content === "1236"){
      const selectedConfig1236 = config["1236"](userCode);
    const { url: url1236 } = selectedConfig1236;
    const urlParams1236 = new URLSearchParams(url1236.split("?")[1]);

    urlParams1236.set("Status", selectedOption?.value ? "1" : "0")
    urlParams1236.set("UCode", userCode);
    urlParams1236.set("SCode", siteCode || 0); 
    urlParams1236.set("sDate", moment(dateRange.startDate).format("DD/MMM/YYYY"));
    urlParams1236.set("eDate", moment(dateRange.endDate).format("DD/MMM/YYYY"));

    const modifiedUrl1236 = `${url1236.split("?")[0]}?${urlParams1236.toString()}`;
    // console.log("modifiedurl-1236", modifiedUrl1236);
    tableListHandler(modifiedUrl1236);
    }else if(content === "1224"){
      const selectedConfig1224 = config["1224"](userCode);
      const { url: url1224 } = selectedConfig1224;
      const urlParams1224 = new URLSearchParams(url1224.split("?")[1]);
      // UserCode=${userId}&SDate=${moment(new Date()).format("DD/MMM/YYYY")}&IType=1
      urlParams1224.set("UserCode", userCode);
      urlParams1224.set("SDate", moment(new Date()).format("DD/MMM/YYYY"));
      urlParams1224.set("IType", siteCode || 1); 
  
      const modifiedUrl1224 = `${url1224.split("?")[0]}?${urlParams1224.toString()}`;
      // console.log("modifiedurl-1224", modifiedUrl1224);
      tableListHandler(modifiedUrl1224);
    }
  };

  const deleteConfig: Record<string, (code: string) => string> = {
    "19": (code) => `/api/DeleteUserMast?Code=${code}`,
    "1": (code) => `/api/DeleteTask?Code=${code}`,
    "33": (code) => `/api/DeleteTask?Code=${code}`,
    ...Object.fromEntries(
      ["101", "102", "103", "104", "2", "11", "8", "7", "6", "5", "4", "21", "108", "110", "34", "106","109"].map((key) => [
        key,
        (code: string) => `/api/DeleteMast?Code=${code}`,
      ])
    ),
  };

  const onDeleteRow = (record:any) => {
    const selectedConfig: any =
    typeof config[content] === "function"
      ? config[content](userId)
      : config[content] || defaultConfig;
    if (content === "1224"){
      const jsonData = {
        Id: record.id,
        Rectype: 1,
        UserCode: record.toUCode,
        MUserCode: record.uCode,
        TaskCode: record.taskCode,
        Status: 0,
      }
      handleSubmit({
        url: `/api/SendToApproval?`,
        method: "POST",
        data: jsonData,
        setLoading: (loading: any) =>
          setStateData((prevState) => ({ ...prevState, loading })),
        // refreshList: tableListHandler(url),
      //   navigateTo
        // resetForm: resetForm,
        onSuccess: (response) => {
          tableListHandler(selectedConfig.url)
          console.log("Success:", response)},
        onError: (error) => console.error("Error:", error),
      });
    }
  const urlGenerator = deleteConfig[content];

  if (!urlGenerator) {
    console.error("Invalid API key:", content);
    return;
  }


  const url = urlGenerator(record.code);
  // console.log("delete-url",url)
    handleDelete({
      url,
      data: { id: record.code }, 
      setLoading: (loading: any) =>
        setStateData((prevState) => ({ ...prevState, loading })),
      refreshList: () => tableListHandler(selectedConfig.url),
    });
  };

  const onRowClick = (record: any) => {
    // console.log("code-from list", record.code);
    if (content === "1" || content === "21" || content === "33" || content === "106" || content === "107" || content === "1111") {
      setStateData((prevState) => ({ ...prevState, modifyCode: record }));
    } else {
      setStateData((prevState) => ({ ...prevState, modifyCode: record.code }));
    }
    if(content === "1236"){
      loadTableData({
        url:`/api/GetUserSiteStatusRpt?Code=${record.tCode}`,
        setState: (data: any) =>{
          // console.log('response',data)
          setStateData((prevState) => ({ ...prevState, tabledetailData: data }))
        },
        setLoading: (loading: boolean) =>
          setStateData((prevState) => ({ ...prevState, loading })),
      });
    }else if (content === "1224"){
      let jsonData = {}
      let url = ''
      if (record.status == "Shift" || record.status == "Reassign"){
      jsonData={
        Id: record.id,
        Rectype: 1,
        UserCode: record.toUCode,
        MUserCode: record.uCode,
        TaskCode: record.taskCode,
        Status: stateData?.approvalSelect?.value === 1 ? 4 : 5,
      }
      url = `/api/TaskReAssign?Itype=${stateData?.approvalSelect?.value || 1}`
    }else if (record.status == "Reject"){
      jsonData={
        TaskCode: record.taskCode,
        Status: stateData?.approvalSelect?.value === 1 ? 2 : 3,
        Remarks: ""
      }
      url = `/api/RejectTask?Itype=${stateData?.approvalSelect?.value || 1}`
    }
      handleSubmit({
        url,
        method: "POST",
        data: jsonData,
        setLoading: (loading: any) =>
          setStateData((prevState) => ({ ...prevState, loading })),
        // refreshList: tableListHandler(url),
      //   navigateTo
        // resetForm: resetForm,
        onSuccess: (response) => {
          // tableListHandler(url)
          console.log("Success:", response)},
        onError: (error) => console.error("Error:", error),
      });
    }
  };

  const handelPassValue = (value:number)=>{
    setStateData((prev)=>({
      ...prev,
      passValue: value
    }))
  }

  return (
    <>
      <Toast />
      <UserManagementList
        columns={stateData.columns}
        tableData={stateData.tableData}
        resetFormFunction={stateData.resetFormFunction}
        displayName={stateData.displayName}
        selectHandler={selectHandler}
        allData={stateData}
        dateRange={stateData.dateRange}
        handleDateChange={handleDateChange}
        validateDateRange={validateDateRange}
        loading={stateData?.loading}
        handelPassValue={handelPassValue}
        rights={rights}
      />

      <AddUserModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
        displayName={stateData.displayName}
      />
      <DepartmentModal
        userId={userId}
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
        displayName={stateData.displayName}
      />
      <DesignationModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        content={content}
        tableData={stateData.tableData}
        url={config[content]?.url}
        displayName={stateData.displayName}
      />
      <CustomerModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
        displayName={stateData.displayName}
      />
      <StoreModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
        displayName={stateData.displayName}
      />
      <AssetsManagementModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        displayName={stateData.displayName}
        content={content}
        url={config[content]?.url}
      />
      <AddTaskModal
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: any) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        userId={userId}
        tableListHandler={tableListHandler}
        url={config[content]?.url}
        displayName={stateData.displayName}
        sendResetForm={handleReceiveResetForm}
      />
      <TaskManagementModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        displayName={stateData.displayName}
        content={content}
        url={config[content]?.url}
      />
      <GoalModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
        displayName={stateData.displayName}
      />
      <PerformanceModal
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
      />
      <QualityTaskModal
        displayName={stateData.displayName}
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
      />

      <WorkOrderModal
        displayName={stateData.displayName}
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
      />

      <CheckAndCategoriesModal
       displayName={stateData.displayName}
       tableListHandler={tableListHandler}
       modifyCode={stateData.modifyCode}
       setModifyCode={(code: number) =>
        setStateData((prevState) => ({ ...prevState, modifyCode: code }))
       }
       sendResetForm={handleReceiveResetForm}
       url={config[content]?.url}
       content={content}
      />

      <DetailModal data={stateData?.tabledetailData}/>

      <CreatePmModal
        displayName={stateData.displayName}
        tableListHandler={tableListHandler}
        modifyCode={stateData.modifyCode}
        setModifyCode={(code: number) =>
          setStateData((prevState) => ({ ...prevState, modifyCode: code }))
        }
        sendResetForm={handleReceiveResetForm}
        url={config[content]?.url}
        content={content}
        passValue={stateData?.passValue}
      />
      <ReviewAndAppresalModal 
       userId={userId}
       displayName={stateData.displayName}
       tableListHandler={tableListHandler}
       modifyCode={stateData.modifyCode}
       setModifyCode={(code: number) =>
        setStateData((prevState) => ({ ...prevState, modifyCode: code }))
       }
       sendResetForm={handleReceiveResetForm}
       url={config[content]?.url}
       content={content}
       passValue={stateData?.passValue}
      />
    </>
  );
};

export default UserManagementComp;
