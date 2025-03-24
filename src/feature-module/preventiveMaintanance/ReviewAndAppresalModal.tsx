import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionA from "./Accordian/SectionA";
import SectionB from "./Accordian/SectionB";
import { sectionAInput } from "./preventiveInput";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import Loader from "../../core/common/loader";
import './hrstyle.css'
interface Attribute {
  key: string;
  label: string;
  description: string;
  checked: boolean;
  rating?: number;
  comments?: string;
}
const attributes: Attribute[] = [
  {
    key: "1",
    label: "Job Knowledge & Functional Skills",
    description:
      "Demonstrates expertise in their area of work, effectively applying technical and functional knowledge to achieve results.",
    checked: true,
  },
  {
    key: "2",
    label: "Innovation & Continuous Improvement",
    description:
      "Thinks creatively, challenges the status quo, and actively seeks better solutions to enhance processes, products, or performance.",
    checked: true,
  },
  {
    key: "3",
    label: "Results Orientation",
    description:
      "Drives performance by setting goals, staying focused, and consistently delivering high-quality outcomes efficiently.",
    checked: true,
  },
  {
    key: "4",
    label: "Process & Quality Orientation",
    description:
      "Follows structured processes, maintains attention to detail, and emphasizes quality to ensure consistent and accurate outputs.",
    checked: true,
  },
  {
    key: "5",
    label: "Teamwork & Collaboration",
    description:
      "Works effectively with others, values diverse perspectives, builds positive relationships, and contributes to achieving collective goals.",
    checked: true,
  },
  {
    key: "6",
    label: "Problem-Solving & Critical Thinking",
    description:
      "Analyses situations objectively, evaluates alternatives, and makes sound decisions to resolve issues efficiently.",
    checked: true,
  },
  {
    key: "7",
    label: "Adaptability & Flexibility",
    description:
      "Adjusts quickly to changing demands, remains effective under pressure, and thrives in dynamic environments.",
    checked: true,
  },
  {
    key: "8",
    label: "Time Management & Prioritization",
    description:
      "Efficiently organizes tasks, balances multiple responsibilities, and meets deadlines without compromising quality.",
    checked: true,
  },
  {
    key: "9",
    label: "Professionalism, Ethical Conduct & Respect for Others",
    description:
      "Demonstrates integrity, accountability, and professionalism; consistently treats colleagues, peers, and teams with respect and dignity.",
    checked: true,
  },
  {
    key: "10",
    label: "Dependability, Reliability & Discipline",
    description:
      "Upholds a disciplined approach to tasks, meeting work commitments, ensuring reliability and accountability in all responsibilities.",
    checked: true,
  },
];
const ReviewAndAppresalModal = ({
  modifyCode,
  // userId,
  setModifyCode,
  tableListHandler,
  url,
  displayName,
  sendResetForm,
  userId
}: any) => {
  const {
    modifyDataHandler,
    loadDropdownOptions,
    loadTableData,
    handleSubmit,
    handleDelete,
  } = useApiHandler();
  const [dropDownMaster, setDropDownMaster] = useState({
    user: [],
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    userData:[],
    name: null,
    grade: '',
    functional:'',
    highestQualification: {value:"NA", label:"NA"},
    higherEducationDetails:'',
    uhighestQualification:'',
    excel: "",
    excel1: "",
    excel2: "",
    excel3: "",
    q1: "",
    q2: "",
    q3: "",
    annualAchievement: "",
    sectionAtotal: 0,
    sectionBtotal: 0,
    totalScore: 0,
    remark: "",
    appraiser: 0,
    reportingData: [],
    expandedKeys:[],
    loading: false,
    // ===================
    designationSelect: null,
    departmentSelect: null,
    subdepartmentSelect:null,
    locationSelect: [],
    reportingManager: [],
    hodName: "",
    url:'',
    url1:'',
    resetTrigger:''
  });
    const [data, setData] = useState<Attribute[]>(attributes);
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // console.log("formData", formData.excel);
  useEffect(() => {
    if (
      modifyCode.code !== 0 &&
      displayName === "Annual Performance Review/Appraisal"
    ) {
      handleModify();
    }
  }, [modifyCode]);
  useEffect(() => {
    if (displayName === "Annual Performance Review/Appraisal") {
      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (displayName === "Annual Performance Review/Appraisal") {
      // console.log('url',`/api/GetUserList?UserCode=${userId}`)
    if(modifyCode == null || modifyCode === undefined){

      loaduserFormData()
    }
      const totalAchievement =
        parseFloat(formData.q1?.toString() || "0") +
        parseFloat(formData.q2?.toString() || "0") +
        parseFloat(formData.q3?.toString() || "0");
      let annualPercentage:any = (Number(totalAchievement / 300) * 100).toFixed(2);
      let totalPercentage = (Number(annualPercentage/100) * 85).toFixed(2);
      setFormData((prev: any) => ({
         ...prev, 
         annualAchievement:annualPercentage,
        sectionAtotal: totalPercentage 
      }));
    }
  }, [
    formData.q1,
    formData.q2,
    formData.q3,
    // formData.annualAchievement,
    displayName,
    modifyCode
    
  ]);
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const loaduserFormData = ()=>{
    loadTableData({
      url:`/api/GetUserList?UserCode=${userId}`,
      setState: (data: any) =>{
        // console.log("loadData",data)
        setFormData((prevState:any) => ({ ...prevState, 
          name: {
            value: data[0].code,
            label: data[0].name,
          },
          designationSelect: {
            value: data[0].designation,
            label: data[0].designationName,
          },
          departmentSelect: {
            value: data[0].department,
            label: data[0].departmentName,
          },
          subdepartmentSelect:{label: data[0]?.subDepartment},
          locationSelect: data[0]?.sUser?.map((item: any) => ({
            value: item.code,
            label: item.name,
          })),
          reportingManager: data[0]?.tUser?.map((item: any) => ({
            value: item.code,
            label: item.name,
          })),
          hodName: data[0]?.hod,
          grade: data[0]?.grade,
          functional: data[0]?.functional,
          uhighestQualification: data[0].uhighestQualification
        }))},
      setLoading: (loading: boolean) =>
        setFormData((prevState:any) => ({ ...prevState, loading })),
    });
  }
  const formField = sectionAInput(dropDownMaster);
  const handelOpenReporting = () => {
    setShowModal(true);
  };
  const handelClose = () => {
    setShowModal(false);
  };

  const resetForm = async () => {
    setFormData({
      name: null,
      grade: null,
      highestQualification: { value: "NA", label: "NA" },
      excel: "",
      excel1: "",
      excel2: "",
      q1: 0,
      q2: 0,
      q3: 0,
      annualAchievement: 0,
      sectionAtotal: 0,
      sectionBtotal: 0,
      totalScore: 0,
      remark: "",
      appraiser: 0,
      reportingData: [],
      loading: false,
      // ===================
      designationSelect: null,
      departmentSelect: null,
      locationSelect: [],
      reportingManager: [],
      hodName: "",
    });
    setModifyCode(0);
    loaduserFormData()
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    if (fieldName === "excel"||fieldName === "excel1"||fieldName === "excel2" || fieldName === "excel3") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          setFormData((prev: any) => ({
            ...prev,
            excel: event.target?.result,
            excel1: event.target?.result,
            excel2: event.target?.result,
            excel3: event.target?.result,
          }));
        };

        reader.onerror = (error) => {
          console.error("Error converting file to Base64:", error);
        };

        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev: any) => ({ ...prev, [fieldName]: e.target.value }));
    }
  };

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev: any) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handelSave = (e: any) => {
    e.preventDefault();
    const Json = {
      Code: formData?.name?.value || 0,
      // grade: formData?.grade ||"",
      highestQualification: formData?.highestQualification?.value || "",
      excel: formData?.excel || "",
      excel1: formData?.excel1 || "",
      excel2: formData?.excel2 || '',
      excel3: formData?.excel3 || '',
      q1: formData?.q1 || "",
      q2: formData?.q2 || "",
      q3: formData?.q3 || "",
      annualAchievement: formData?.annualAchievement || "",
      sectionAtotal: parseFloat(formData?.sectionAtotal) || 0,
      sectionBtotal: parseFloat(formData?.sectionBtotal) || 0,
      totalScore: parseFloat(formData?.totalScore) || 0,
      remark: formData?.remark || "",
      // appraiser: formData?.appraiser,
      graduation: formData?.higherEducationDetails,
      appraiser: formData?.appraiser,
      reportingData: formData?.reportingData,
    };
    console.log("apprData", JSON.stringify(Json));

    handleSubmit({
      url: "/api/SaveReveiw?",
      method: "POST",
      data: Json,
      setLoading:()=> setFormData((prev:any)=>({...prev, loading:false})),
      // refreshList: tableListHandler(url),
    //   navigateTo
      // resetForm: resetForm,
      onSuccess: (response) => {
        tableListHandler(url)
        console.log("Success:", response)},
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
    const data = modifyCode
    console.log("modifyData", data)
    let dataQualification = [
      {value:"NA", label:"NA"},
      {value:"Bachelor Degree / Graduation", label:"Bachelor Degree / Graduation"},
      {value:"Master Degree / Post Graduation", label:"Master Degree / Post Graduation"},
      {value:"Diploma", label:"Diploma"},
      {value:"Others", label:"Others"},
    ]
    // console.log('modifyCode', data)
    setFormData({
      name: {value:data?.code, label:data?.name},
      // grade: {value:data?.grade, label:data?.gradeName},
      // highestQualification: {value:data?.highestQualification, label: dataQualification.find((item:any)=>) },
      highestQualification: dataQualification.find((item:any)=>item.value === data?.highestQualification),
      uhighestQualification: data?.uhighestQualification||'',
      excel: "",
      excel1: "",
      excel2: "",
      q1: data?.q1 || 0,
      q2: data?.q2 || 0,
      q3: data?.q3 || 0,
      annualAchievement: data?.annualAchievement || 0,
      sectionAtotal: data?.sectionAtotal,
      sectionBtotal: data?.sectionBAtotal,
      totalScore: data?.totalScore,
      remark: data?.remark,
      appraiser: data?.appraiser,
      reportingData: data?.reportingData?.map((item:any)=>({
        label:item.label,
        description:item.description,
        rating:item.rating,
        comments:item.comments,
        checked: item.rating ? true : false
      })),
      loading: false,
      // ===================
      designationSelect: {value:data?.designation, label: data?.designationName},
      departmentSelect: {value:data?.department, label:data?.departmentName},
      subdepartmentSelect:{label: data?.subDepartment},
      locationSelect: data?.sUser?.map((item: any) => ({
        value: item.code,
        label: item.name,
      })),
      reportingManager: data?.tUser?.map((item: any) => ({
        value: item.code,
        label: item.name,
      })),
      hodName: data?.hod,
      higherEducationDetails: data?.graduation,
      functional: data?.functional,
      grade:data?.grade,
      url: data?.url,
      url1: data?.url1,
      url2: data?.url3,
      url3: data?.url3
    });

    const reportingDataMap = new Map(
      (data?.reportingData || []).map((item: any) => [item.label, item])
    );
  
    const updatedAttributes = attributes.map((attr) => {
      const matchingItem = reportingDataMap.get(attr.label) as any;
      return {
        ...attr,
        rating: matchingItem?.rating ?? 0, 
        comments: matchingItem?.comments ?? "", 
        checked: matchingItem?.rating > 0 ? true : false, 
      };
    });
    
  
    setData(updatedAttributes);
    const newExpandedKeys = (updatedAttributes || [])
      .filter((attr:any) => attr.checked)
      .map((attr:any) => attr.key);
    // console.log('newExpandedKeys',newExpandedKeys)
    setExpandedKeys(newExpandedKeys);
    
  };
  return (
    <>
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="review_add"
      >
        { formData?.loading && <Loader isSaving={formData?.loading} />}
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold" style={{color:'#000080'}}>
          Annual Performance / Goal Review {previousYear} And Goal Setting {currentYear}
          </h5>
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
          <form onSubmit={handelSave}>
            <div className="accordion" id="main_accordion">
              <SectionA
                modifyCode={modifyCode}
                formField={formField}
                formData={formData}
                handleChange={handleChange}
                selectHandler={selectHandler}
              />
               {modifyCode !== 0 && (
                  <SectionB
                    modifyCode={modifyCode}
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    data={data}
                    setData={setData}
                    expandedKeys={expandedKeys}
                    setExpandedKeys={setExpandedKeys}
                  />
              )}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary me-2">
                {modifyCode === 0 ? "Save" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <ReportingModal showModal={showModal} handelClose={handelClose}/> */}
    </>
  );
};

export default ReviewAndAppresalModal;
