import {
  convertToIST,
  convertToISTDateObject,
} from "../../core/common/InputDate";

const getValueKey = (id) => {
  switch (id) {
    case "10":
      return { valueKey: "userType", fields: {} };
    case "9":
      return { valueKey: "source", fields: {} };
    case "4":
      return { valueKey: "purpose", fields: {} };
    case "6":
      return { valueKey: "typeTrade", fields: {} };
    case "8":
      return { valueKey: "location", fields: {} };
    case "3":
      return {
        valueKey: "",
        fields: {
          depname: "",
          depaddress: "",
          depemail: "",
          depcompcode: "",
          depmobile: "",
        },
      };
    default:
      return { valueKey: "", fields: {} };
  }
};

var mycode = 0;
export const getModifyHandler = async (
  code,
  api,
  setData,
  setLoading,
  paramId,
  endpoint = "LoadMasterDetails"
) => {
  mycode = code;
  let modifyUrl = `/api/${endpoint}?Code=${code}`;

  try {
    setLoading(true);
    let { res, got } = await api(modifyUrl, "GET", "");

    if (res.status === 200) {
      let listData = got.data[0];
      let { valueKey, fields } = getValueKey(paramId);

      if (paramId === "3") {
        setData({
          depname: listData.name || "",
          depaddress: listData.address || "",
          depemail: listData.email || "",
          depcompcode: listData.compCode || "",
          depmobile: listData.monNo || "",
        });
      } else if (valueKey) {
        setData({
          [valueKey]: listData.name || "",
        });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    // showToastError(err);
  }
};
export const getContactModifyHandler = async (
  code,
  api,
  setData,
  setLoading,
  setDates,
  setSelect,
  conlocation,
  contype,
  contypeoftrade,
  endpoint = "ArchMasterDetails"
) => {
  mycode = code;
  let modifyUrl = `/api/${endpoint}?Code=${code}`;

  try {
    setLoading(true);
    let { res, got } = await api(modifyUrl, "GET", "");

    if (res.status === 200) {
      let listData = got.data[0];
      console.log("listData", listData);
      // let d = convertToIST(listData.dob);
      // let f = convertToIST(listData.doa);
      let d = convertToISTDateObject(listData.dob);
      let f = convertToISTDateObject(listData.doa);

      let type = `${
        listData.type == 1
          ? "Premium"
          : listData.type == 2
          ? "Normal"
          : listData.type == 3
          ? "Special"
          : listData.type == 4
          ? "Vip"
          : listData.type == 5
          ? "Vvip"
          : null
      }`;
      // console.log('dddd',type)
      setData({
        contactname: listData.name,
        contactmobile: listData.perMobNo,
        contactmobile2: listData.ofcMobNo,
        contactemail: listData.email,
        contactorg: listData.orgName,
        contactrAdd: listData.resAdd,
        contactoAdd: listData.ofcAdd,
        contactpincode: listData.pinCode,
        // location: listData.location,
      });

      setSelect({
        location: { label: listData.locationName, value: listData.location },
        type: { label: type, value: listData.type },
        typeoftrade: { label: listData.bnName, value: listData.bn },
      });
      conlocation = listData.location;
      contype = listData.type;
      contypeoftrade = listData.bn;
      setDates({
        dob: new Date(d),
        doa: new Date(f),
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    // showToastError(err);
  }
};

export const saveHandler = async (
  e,
  fieldName,
  fieldValue,
  masterType,
  api,
  setLoading,
  setInputValue,
  loadData,
  paramId
) => {
  e.preventDefault();

  const url = `/api/SaveMasterData`;
  const body = {
    Code: mycode || 0,
    Name: fieldValue,
    MasterType: masterType,
  };
  console.log(JSON.stringify(body));

  try {
    setLoading(true);
    let { res, got } = await api(url, "POST", body);

    if (res.status === 200) {
      // showToastMessage(got.msg);
      setLoading(false);

      setInputValue((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      mycode = 0;
      loadData();
    } else {
      setLoading(false);
      // showToastError(got.msg);
    }
  } catch (error) {
    setLoading(false);
    // showToastError(error);
  }
};

export const depSaveHandler = async (
  e,
  inputValue,
  callFetch,
  setInputValue,
  setLoading,
  RecallFunctionHandler
) => {
  e.preventDefault();
  const urlSaveDep = "/api/SaveDepMaster";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(inputValue.depemail)) {
    alert("Please enter a valid email address");
    return;
  }

  console.log("urlSaveDep", urlSaveDep);
  var body = {
    Code: mycode || 0,
    Name: inputValue.depname,
    CompCode: inputValue.depcompcode,
    Email: inputValue.depemail,
    MonNo: inputValue.depmobile,
    Address: inputValue.depaddress,
    UserName: inputValue.depname,
    Segment: "",
  };
  console.log("body", JSON.stringify(body));
  try {
    setLoading(true);
    let { res, got } = await callFetch(urlSaveDep, "POST", body);
    if (res.status == 200) {
      // console.log("maindata", body);
      // showToastMessage(got.msg);
      RecallFunctionHandler();
      setLoading(false);
      setInputValue({
        depname: "",
        depaddress: "",
        depemail: "",
        depcompcode: "",
        depmobile: "",
      });
      mycode = 0;
      // if(code !== 0 && code != undefined){
      //   history.push('/list/3')
      // }
    } else {
      setLoading(false);
      // showToastError(got.msg);
    }
  } catch (error) {
    setLoading(false);
    //   showToastError(error);
  }
};

export const contactsaveHandler = async (
  e,
  inputValue,
  api,
  setInputValue,
  setLoading,
  setSelectInput,
  dates,
  setDates,
  contypeoftrade,
  contype,
  conlocation,
  RecallFunctionHandler
) => {
  e.preventDefault();

  const urlBusinesspurpose = "/api/ArchMasterSave?MasterType=8";
  // console.log('codeUsers', code)
  var body = {
    Code: mycode || 0,
    Name: inputValue.contactname,
    UserName: inputValue.contactname,
    PerMobNo: inputValue.contactmobile,
    OfcMobNo: inputValue.contactmobile2,
    Email: inputValue.contactemail,
    Type: contype,
    OrgName: inputValue.contactorg,
    ResAdd: inputValue.contactrAdd,
    OfcAdd: inputValue.contactoAdd,
    PinCode: inputValue.contactpincode,
    Location: conlocation,
    DOB: dates.dob,
    DOA: dates.doa,
    BN: contypeoftrade,
  };
  console.log("body-contact", JSON.stringify(body));
  try {
    // console.log("url", urlBusinesspurpose);
    // console.log("body", body);
    setLoading(true);
    let { res, got } = await api(urlBusinesspurpose, "POST", body);
    if (res.status == 200) {
      // console.log("maindata", body);
      alert(got.msg);
      setLoading(false);
      RecallFunctionHandler();
      mycode = 0;
      setInputValue({
        contactname: "",
        contactmobile: "",
        contactmobile2: "",
        contactemail: "",
        contactorg: "",
        contactrAdd: "",
        contactoAdd: "",
        contactpincode: "",
        contactlocation: "",
      });

      setSelectInput({
        type: null,
        location: null,
        typeoftrade: null,
      });
      contypeoftrade = 0;
      contype = 0;
      conlocation = 0;
      // setSelectType(null);
      // setselectBusinessNature(null);
      setDates({
        dob: new Date(),
        doa: new Date(),
      });
      // console.log(code,'at modify Time arch')
      // if(code !== 0 && code != undefined){

      //   history.push('/list/5')
      //   //  console.log('hello from contractor')
      // }
    } else {
      setLoading(false);
      alert(got.msg);
    }
  } catch (error) {
    setLoading(false);
    alert(error);
  }
};

export const resetHandler = (setInputValue) => {
  setInputValue({
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
  });
  mycode = 0;
};
export const contactresetHandler = (
  setInputValue,
  setSelectedInput,
  setDates,
  contypeoftrade,
  contype,
  conlocation
) => {
  setInputValue({
    contactname: "",
    contactmobile: "",
    contactmobile2: "",
    contactemail: "",
    contactorg: "",
    contactrAdd: "",
    contactoAdd: "",
    contactpincode: "",
    contactlocation: "",
  });
  setSelectedInput({
    type: null,
    location: null,
    typeoftrade: null,
  });
  contypeoftrade = 0;
  contype = 0;
  conlocation = 0;
  setDates({
    dob: new Date(),
    doa: new Date(),
  });
  mycode = 0;
};

export  const getcustomerModifyHandler = async (code,api,setInputValue,setSelectedOptions,setLoading) => {
 
  // setLoader(true);
  let modifyUrl = `/api/LoadCustomerMasterDetails?Code=${code}&MobNo=""`;
  try {
    setLoading(true);
    let { res, got } = await api(modifyUrl, "GET", "");
    if (res.status == 200) {
      console.log("data", got.data);
      let listData = got.data[0];
      let custMaster = listData.customerMasterData[0]
      let CustContact = listData.custContactList
      let custDataset=[]
      console.log("ModifyData",custMaster)
      console.log("ContactMasterData",CustContact)
      // setModifiedValue(listData);
      setInputValue({
        custname: custMaster.name,
        custmobile: custMaster.mobNo,
        custemail: custMaster.email,
        custreference: custMaster.ref,
        custadd1: custMaster.add1,
        custadd2: custMaster.add2,
        custadd3: custMaster.add3,
        custadd4: custMaster.add4,
        custarchname: custMaster.archName,
        custname: custMaster.name,
        custarchmobile: custMaster.archMobNo,
        custgst: custMaster.gstNo,
      });
      // setMasterGroupSelect({ label: custMaster.masterGrp });
      // setMasterGroupLabel(custMaster.masterGrp);
      CustContact.map((item)=>{
        // console.log('iiiiiiiiii',item)
        custDataset.push({Code : item.code, BNCode:item.bnCode ,label:item.archName 
          ,value:item.archCode,MobNo :item.mobNo,BNName :item.bnName})
      })
      console.log('kjsgkteir', custDataset);
      setSelectedOptions([...custDataset])
      console.log('custDataset',custDataset)
      setLoading(false);
    } else {
      setLoading(false);
      // showToastError("Something Went Wrong in List loading");
    }
  } catch (err) {
    setLoading(false);
    // showToastError(err);
  }
};

export const customersaveHandler = async (e,api,selectedOptions,inputValue,setInputValue,setLoading) => {
  e.preventDefault();
 

  const urlCustomer = "/api/SaveCustomerMaster1";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}$/;

  if (!emailPattern.test(inputValue.custemail)) {
    alert("Please enter a valid email address");
    return;
  }
  let currData=[]
  selectedOptions.forEach((item)=>{
   console.log('item',item)
    currData.push({Code : mycode||0, BNCode:item.BNCode ,ArchName:item.label ,ArchCode:item.value,MobNo :item.mob,BNName :item.bname})
  },[])
  console.log('currData---',currData)
 
  var body = {
    CustomerMasterData: [
      {
        Code: mycode || 0,
        Name: inputValue.custname,
        MobNo: inputValue.custmobile,
        Email: inputValue.custemail,
        Ref: inputValue.custreference,
        ArchName: inputValue.custarchname,
        Add1: inputValue.custadd1,
        Add2: inputValue.custadd2,
        Add3: inputValue.custadd3,
        Add4: inputValue.custadd4,
        ArchMobNo: inputValue.custarchmobile,
        GSTNo: inputValue.custgst,
        MasterGrp: "",
        UserName: inputValue.custname,
      },
    ],
    CustContactList:[...currData],
  };
  console.log("bodyjson", JSON.stringify(body));
  try {
    setLoading(true);
    let { res, got } = await api(urlCustomer, "POST", body);
    if (res.status == 200) {
      // console.log("maindata", body);
      alert(got.msg);
      setInputValue({
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