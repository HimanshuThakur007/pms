import React from "react";
import MastersList from "./MastersList";
import { useParams } from "react-router";
import useFetch from "../../core/Hooks/useFetch";
import {
  contact,
  customer,
  department,
  Location,
  Purpose,
  Source,
  TypeofTrade,
  usertype,
} from "./MastersColumn";
import { getContactModifyHandler, getcustomerModifyHandler, getModifyHandler } from "./modifyForm";
import { getBusinessNatureHandler, getMastersList } from "./allListApiCalls";
var conlocation: number;
var contype: number;
var contypeoftrade: number;
const MasterListComp = () => {
  const [listData, setListData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [businessNatureList, setBusinessNatureList] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [mobiledata, setMobileData] = React.useState([]);
  const [loading, setLoading]: any = React.useState(false);
  const [masterType, setMasterType] = React.useState(0);
  const [inputValue, setInputValue] = React.useState({
    userType: "",
    source: "",
    purpose: "",
    typeTrade: "",
    location: "",
    depname: "",
    depaddress: "",
    depemail: "",
    depcompcode: "",
    depmobile: "",
    contactname: "",
    contactmobile: "",
    contactmobile2: "",
    contactemail: "",
    contactorg: "",
    contactrAdd: "",
    contactoAdd: "",
    contactpincode: "",
    contactlocation: "",
    // =======customer=======
    custname: "",
    custarchname: "",
    custemail: "",
    custmobile: "",
    custreference: "",
    custadd1: "",
    custadd2: "",
    custadd3: "",
    custadd4: "",
    custarchmobile: "",
    custgst: "",
  });

  const [dates, setDates] = React.useState({
    dob: new Date(),
    doa: new Date(),
  });
  const [selectedInput, setSelectedInput] = React.useState({
    type: null,
    location: null,
    typeoftrade: null,
  });



  const routeParams: any = useParams();
  const callFetch = useFetch();
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId;
  }

  const handleInputField = (e: any) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (dateFieldName: any, dateValue: any) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };
  const handleSelectChange = (
    selectedOption: any,
    selectName: any,
    setSelectedInput: any
  ) => {
    if (selectName === "type") {
      contype = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "location") {
      conlocation = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "typeoftrade") {
      contypeoftrade = selectedOption !== null ? selectedOption.value : 0;
    }

    setSelectedInput((prevSelectedValues: any) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  const handlecontactSelectChange = (index:any , slObj:any) => {
    console.log('slObj342',slObj)
    let prevMobData : any = [...mobiledata];
    prevMobData[index] = slObj.mob;
   
    let prevSelectedOptions:any = [...selectedOptions, slObj];
    console.log(prevSelectedOptions)
    setMobileData(prevMobData);
    setSelectedOptions(prevSelectedOptions);
       setMobileData(prevMobData)
     };

  const onRowClick = (record: any) => {
    console.log("code", record.code);
    switch (routeParams.id) {
      case "1":
        // history.push({
        //   pathname: "/ursecreation",
        //   state: { code: record.code },
        // });
        break;
      case "3":
        getModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          routeParams.id,
          "LoadDepMasterDetails"
        );
        // history.push({ pathname: "/department", state: { code: record.code } });
        break;
      case "2":
        getcustomerModifyHandler(record.code,callFetch,setInputValue,setSelectedOptions,setLoading)
        // history.push({ pathname: "/customer", state: { code: record.code } });
        break;
      case "4":
        getModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          routeParams.id
        );
        break;
      case "5":
        getContactModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          setDates,
          setSelectedInput,
          conlocation,
          contype,
          contypeoftrade
        );
        // history.push({ pathname: "/architect", state: { code: record.code } });
        break;
      case "6":
        getModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          routeParams.id
        );
        break;
      case "7":
        // history.push({ pathname: "/billsundry", state: { code: record.code } });
        break;
      case "8":
        getModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          routeParams.id
        );
        break;
      case "9":
        getModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          routeParams.id
        );
        break;
      case "10":
        getModifyHandler(
          record.code,
          callFetch,
          setInputValue,
          setLoading,
          routeParams.id
        );
        break;
      default:
    }
  };

  const onDeleteRow = async (record: any, mt:number) => {
    // setMasterType()
    console.log("deleteCode", record.code);
    // e.preventDefault();
    let dataCode = record.code;
    const urlfollow = `/api/DeleteMasterTransaction?UCode=${userId}&MT=${mt}&Code=${dataCode}`;
    console.log("deleteUrl", urlfollow);
    var body = {};
    // console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await callFetch(urlfollow, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        alert(got.msg);
        RecallFunctionHandler();

        setLoading(false);
      } else {
        setLoading(false);
        alert(got.msg);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const RecallFunctionHandler = () => {
    switch (routeParams.id) {
      case "1":
        // console.log('call')
        // getuserCreationList();
        break;
      case "2":
        // getList();
        getMastersList(
          `/api/LoadCustomerMasterList`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          customerColumn
        );
        getBusinessNatureHandler(callFetch,setBusinessNatureList,setLoading)
        break;
      case "3":
        // getDepartmentList();
        getMastersList(
          `/api/LoadDepMasterList`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          departmentColumn
        );
        break;
      case "4":
        getMastersList(
          `/api/LoadMasterData?MasterType=6`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          purposeColumn
        );
        break;
      case "5":
        // getContractorList();
        getMastersList(
          `/api/ArchMasterList`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          contactColumn
        );
        break;
      case "6":
        // getBusinessNatureList();
        getMastersList(
          `/api/LoadMasterData?MasterType=7`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          tradeColumn
        );
        break;
      case "7":
        // getBillSundryList();
        break;
      case "8":
        getMastersList(
          `/api/LoadMasterData?MasterType=15`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          locationColumn
        );
        break;
      case "9":
        getMastersList(
          `/api/LoadMasterData?MasterType=16`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          sourceColumn
        );
        break;
      case "10":
        getMastersList(
          `/api/LoadMasterData?MasterType=17`,
          setLoading,
          callFetch,
          setListData,
          setRowData,
          userTypeColumn
        );
        break;
      default:
    }
  };

  React.useEffect(() => {
    RecallFunctionHandler();
  }, [routeParams.id, masterType]);

  const userTypeColumn: any = usertype(onRowClick, onDeleteRow);
  const sourceColumn: any = Source(onRowClick, onDeleteRow);
  const purposeColumn: any = Purpose(onRowClick, onDeleteRow);
  const tradeColumn: any = TypeofTrade(onRowClick, onDeleteRow);
  const departmentColumn: any = department(onRowClick, onDeleteRow);
  const contactColumn: any = contact(onRowClick, onDeleteRow);
  const locationColumn: any = Location(onRowClick, onDeleteRow);
  const customerColumn: any = customer(onRowClick, onDeleteRow);

  return (
    <>
      <MastersList
        loading={loading}
        columns={rowData}
        data={listData}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputField={handleInputField}
        RecallFunctionHandler={RecallFunctionHandler}
        selectedInput={selectedInput}
        setSelectedInput={setSelectedInput}
        handleSelectChange={handleSelectChange}
        setLoading={setLoading}
        setDates={setDates}
        paramId={routeParams.id}
        Header={`${
          routeParams.id == 1
            ? "User"
            : routeParams.id == 2
            ? "Customer"
            : routeParams.id == 3
            ? "Department"
            : routeParams.id == 4
            ? "Purpose"
            : routeParams.id == 5
            ? "Contact"
            : routeParams.id == 6
            ? "Trade Type"
            : routeParams.id == 7
            ? "BillSundry"
            : routeParams.id == 8
            ? "Location"
            : routeParams.id == 9
            ? "Source"
            : routeParams.id == 10
            ? "User Type"
            : "List"
        }`}
        dates={dates}
        handleDateChange={handleDateChange}
        conlocation={conlocation}
        contype={contype}
        contypeoftrade={contypeoftrade}
        businessNatureList={businessNatureList}
        handlecontactSelectChange={handlecontactSelectChange}
        mobiledata={mobiledata}
        selectedOptions={selectedOptions}
        
      />
    </>
  );
};

export default MasterListComp;
