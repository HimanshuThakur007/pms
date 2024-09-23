
export const getMastersList = async (Url,setLoading,callFetch,setListData,setRowData,masterColumn) => {
    // let Url = `/api/LoadMasterData?MasterType=17`;
    // console.log("url", Url);
    try {
      setLoading(true);
      let { res, got } = await callFetch(Url, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setListData(list);
        setRowData(masterColumn);
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

  export const getBusinessNatureHandler = async (api, setBusinessNatureList, setLoading) => {
   
    let Url = `/api/LoadCustContactList?Code=0`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        console.log('businessNature', listData)
        setBusinessNatureList(listData);
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

  export const getBnCodeListHandler = async (index,api,setBnCodeList,businessNatureList,setLoading) => {
    console.log('running')
    let corrData=[]
    var code = businessNatureList[index]['bnCode']

    let Url = `/api/ArchMasterListAgainstBN?BNCode=${code}`;
   
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        listData.map((item)=>{
          // console.log(item)
          corrData.push({value:item.code,label:item.name,BNCode:item.bn,mob:item.ofcMobNo,bname:item.bnName})
        })
        setBnCodeList(corrData);
   
        // console.log('list from BnList',corrData)
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

  