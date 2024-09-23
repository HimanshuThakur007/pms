export const getTableDataList = async (endpoint,Department,api,userCode,departmentCode,sdate,edate,setData,setColumn,column,setLoading,paramId) => {
  
    let leadUrl = `/api/${endpoint}?User=${userCode||0}&${Department}=${departmentCode||0}&FDate=${sdate}&TDate=${edate}`;
    console.log("url", leadUrl)
    try {
      setLoading(true);
      let { res, got } = await api(leadUrl, "GET", "");
      if (res.status == 200) {
        let list
        if(paramId == "1"){
          list = got.data;
        }else if (paramId == '2'){
          list = got
        }
       
        console.log("tableData", list);
        setData(list)
        setColumn(column)
        // setTemplateList(currData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };