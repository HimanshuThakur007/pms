import React from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import { contactsaveHandler, depSaveHandler } from "./modifyForm";
import useFetch from "../../core/Hooks/useFetch";
import InputSelect from "../../core/common/InputSelect";
import InputDate from "../../core/common/InputDate";
const business_type_list = [
    {
      value: 1,
      label: "PREMIUM",
    },
    {
      value: 2,
      label: "NORMAL",
    },
    {
      value: 3,
      label: "SPECIAL",
    },
    {
      value: 4,
      label: "VIP",
    },
    {
      value: 5,
      label: "VVIP",
    },
  ];

const ContactModal = ({
  inputValue,
  handleInputField,
  setLoading,
  setInputValue,
  RecallFunctionHandler,
  handleSelectChange,
  selectedInput,
  setSelectedInput,
  dates,
  setDates,
  handleDateChange,
  contypeoftrade,
  contype,
  conlocation
 
}: any) => {
  const callFetch = useFetch();
  const [locationOption, setLocationOption] = React.useState([])
  const [typeoftradeOption, setTypeoftradeOption] = React.useState([])
 console.log(selectedInput,'selected')
  
  const loadAllMaster = async () => {
    const fetchApi = [
      { apiUrl: `/api/LoadMasterData?MasterType=15`, setter: setLocationOption },
      { apiUrl: `/api/LoadMasterData?MasterType=7`, setter: setTypeoftradeOption },
     
    ];
  
    try {
      setLoading(true);
      const promises = fetchApi.map(async (item) => {
        const { res, got } = await callFetch(item.apiUrl, "GET");
        if (res.status === 200) {
          return [
            { value: 0, label: 'N/A' },
            ...got.data.map((dataItem:any) => ({
              value: dataItem.code,
              label: dataItem.name,
            })),
          ];
        } else {
          throw new Error(`Failed to fetch data from ${item.apiUrl}`);
        }
      });
  
      const masterDataArray = await Promise.all(promises);
      
      masterDataArray.forEach((data:any, index) => {
        fetchApi[index].setter(data);
      });
  
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(()=>{
    loadAllMaster()
  },[])
  

  return (
    <>
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="contact_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New Contact</h5>
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
          <form
            onSubmit={(e) =>
                contactsaveHandler(
                e,
                inputValue,
                callFetch,
                setInputValue,
                setLoading,
                setSelectedInput,
                dates,
                setDates,
                contypeoftrade,
                contype,
                conlocation,
                RecallFunctionHandler
              )
            }
          >
            <div>
              {/* Basic Info */}
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <InputField
                      labelName="Name"
                      type="text"
                      name="contactname"
                      dangerTag="*"
                      value={inputValue.contactname}
                      onChange={handleInputField}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <InputField
                      labelName="Organisation"
                      type="text"
                      name="contactorg"
                      dangerTag="*"
                      value={inputValue.contactorg}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Mobile Number"
                      type="text"
                      name="contactmobile"
                      dangerTag="*"
                      value={inputValue.contactmobile}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Res. Address"
                      type="text"
                      name="contactrAdd"
                      dangerTag="*"
                      value={inputValue.contactrAdd}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Alternate Number"
                      type="text"
                      name="contactmobile2"
                      dangerTag="*"
                      value={inputValue.contactmobile2}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Office Address"
                      type="text"
                      name="contactoAdd"
                      dangerTag="*"
                      value={inputValue.contactoAdd}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      labelName="Email"
                      type="email"
                      name="contactemail"
                      dangerTag="*"
                      value={inputValue.contactemail}
                      onChange={handleInputField}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <InputField
                        labelName="Pincode"
                        type="text"
                        name="contactpincode"
                        dangerTag="*"
                        value={inputValue.contactpincode}
                        onChange={handleInputField}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                      <InputSelect
                        selectName="Type"
                        star="*"
                        options={business_type_list}
                        placeholder="Choose"
                        value={selectedInput.type}
                        onChange={(selectedOption:any) =>
                          handleSelectChange(
                            selectedOption,
                            "type",
                            setSelectedInput
                          )
                        }
                      />
                  </div>
                  <div className="col-md-6">
                      <InputSelect
                        selectName="Location"
                        star="*"
                        options={locationOption}
                        placeholder="Choose"
                        value={selectedInput.location}
                        onChange={(selectedOption:any) =>
                          handleSelectChange(
                            selectedOption,
                            "location",
                            setSelectedInput
                          )
                        }
                      />
                  </div>
                  <div className="col-md-6">
                      <InputSelect
                        selectName="Type Of Trade"
                        star="*"
                        options={typeoftradeOption}
                        placeholder="Choose"
                        value={selectedInput.typeoftrade}
                        onChange={(selectedOption:any) =>
                          handleSelectChange(
                            selectedOption,
                            "typeoftrade",
                            setSelectedInput
                          )
                        }
                      />
                  </div>
                  <div className="col-md-6">
                      <InputDate 
                      labelName="Dob"
                      selected={dates.dob}
                      onChange={(date:any) => handleDateChange("dob", date)}
                      />
                  </div>
                  <div className="col-md-6">
                      <InputDate 
                      labelName="Doa"
                      selected={dates.doa}
                      onChange={(date:any) => handleDateChange("doa", date)}
                      />
                  </div>

                </div>
              </div>
              {/* /Basic Info */}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
