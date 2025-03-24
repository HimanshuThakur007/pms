import SubMenu from "antd/es/menu/SubMenu";
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

const yearRange = `${previousYear} - ${currentYear}`;

export const preventiveCreateTask = (dropDownMaster: any) => [
    {
      type: "select",
      fieldName: "company",
      label: "Company",
      options: dropDownMaster?.master_1,
      isMulti: false,
      required: true,
    },
    {
      type: "input",
      inputType: "text",
      fieldName: "name",
      label: "Title",
      required: true,
    },
    {
        type: "date",
        fieldName: "SDate",
        label: "Start Date",
        required: true,
      },
      { type: "date", fieldName: "EDate", label: "Due Date", required: true },
      {
        type: "select",
        fieldName: "recurringSchedule",
        label: "Recurring Schedule",
        options: dropDownMaster?.recurringSchedule,
        isMulti: false,
        required: true,
      },
    {
      type: "select",
      fieldName: "employee",
      label: "Employee",
      options: dropDownMaster?.master_0,
      isMulti: true,
      required: false,
    },
    {
        type: "select",
        fieldName: "priority",
        label: "Priority",
        options: dropDownMaster?.priority,
        isMulti: false,
        required: false,
      },
    {
      type: "select",
      fieldName: "category",
      label: "Category",
      options: dropDownMaster?.master_106,
      isMulti: false,
      required: false,
    },
    {
      type: "select",
      fieldName: "location",
      label: "Location",
      options: dropDownMaster?.location,
      isMulti: true,
      required: true,
    },

    {
      type: "select",
      fieldName: "assets",
      label: "Assets",
      options: dropDownMaster?.assets,
      isMulti: false,
      required: true,
    },
    {
      type: "select",
      fieldName: "clt",
      label: "Check List & Task",
      options: dropDownMaster?.master_107,
      isMulti: true,
      required: false,
    },
    {
        type: "input",
        inputType: "number",
        fieldName: "estimatedDuration",
        label: "Estimated Duration",
        required: false,
      },
    {
      type: "textarea",
      fieldName: "description",
      label: "Description",
      required: false,
    },
  ];

  export const checkInput = [
    {
        type: "input",
        inputType: "text",
        fieldName: "name",
        label: "Name",
        required: false,
      },
    {
      type: "textarea",
      fieldName: "description",
      label: "Description",
      required: false,
    },
  ]

  export const CreatePm = (dropDownMaster: any,value:number) => [
    {
      type: "select",
      fieldName: "company",
      label: "Company",
      options: dropDownMaster?.master_1,
      isMulti: false,
      required: true,
    },
    {
      type: "input",
      inputType: "text",
      fieldName: "triggerName",
      label: "Name",
      required: true,
    },
    {
      type: "input",
      inputType: "text",
      fieldName: "name",
      label: "Title",
      required: true,
    },
    // {
    //     type: "date",
    //     fieldName: "SDate",
    //     label: "Start Date",
    //     required: true,
    //   },
    //   { type: "date", fieldName: "EDate", label: "Due Date", required: true },
      // {
      //   type: "select",
      //   fieldName: "recurringSchedule",
      //   label: "Recurring Schedule",
      //   options: dropDownMaster?.recurringSchedule,
      //   isMulti: false,
      //   required: true,
      // },
    {
      type: "select",
      fieldName: "employee",
      label: "Employee",
      options: dropDownMaster?.master_0,
      isMulti: true,
      required: false,
    },
    {
        type: "select",
        fieldName: "priority",
        label: "Priority",
        options: dropDownMaster?.priority,
        isMulti: false,
        required: false,
      },
    {
      type: "select",
      fieldName: "category",
      label: "Category",
      options: dropDownMaster?.master_106,
      isMulti: false,
      required: false,
    },
    {
      type: "select",
      fieldName: "location",
      label: "Location",
      options: dropDownMaster?.location,
      isMulti: true,
      required: true,
    },

    {
      type: "select",
      fieldName: "assets",
      label: "Assets",
      options: dropDownMaster?.assets,
      isMulti: value === 1 ? false : true,
      required: true,
    },
    {
      type: "input",
      inputType: "number",
      fieldName: "estimatedDuration",
      label: "Estimated Duration",
      required: false,
    },
    {
      type: "textarea",
      fieldName: "description",
      label: "Description",
      required: false,
    },
    {
      type: "select",
      fieldName: "clt",
      label: "Check List & Task",
      options: dropDownMaster?.master_107,
      isMulti: true,
      required: false,
    },
  //  ===============schedular=========

  // {
  //   type: "inp & sel",
  //   label: "Work Order Due Every",
  //   SubMenu:[
  //     {
  //       type: "input",
  //       inputType: "number",
  //       fieldName: "title",
  //       label: "",
  //       required: true,
  //     },
  //     {
  //       type: "select",
  //       fieldName: "clt",
  //       label: "",
  //       options: dropDownMaster?.master_107,
  //       isMulti: true,
  //       required: false,
  //     },
  //   ]
  // }
   
  ];

  export const schedularInp = (dropDownMaster:any)=>[
    {
      type: "select",
      fieldName: "calander",
      label: "Calander",
      options: dropDownMaster?.calander,
      isMulti: false,
      required: true,
      SubMenu:[]
    },
  {
    type: "inp & sel",
    label: "Work Order Due Every",
    SubMenu:[
      {
        type: "input",
        inputType: "number",
        fieldName: "wode",
        label: "",
        required: false,
      },
      {
        type: "select",
        fieldName: "wodeSelect",
        label: "",
        options: dropDownMaster?.wode,
        isMulti: false,
        required: false,
      },
    ]
  },
 
  {
    type: "inp & sel",
    label: "Create Work Order Before Due Date",
    SubMenu:[
      {
        type: "radio",
        fieldName: "cwobd", //1
        required: false,
      },
      {
        type: "input",
        inputType: "number",
        fieldName: "cwobdInp",
        label: "",
        required: false,
        disabled:true
      },
      {
        type: "select",
        fieldName: "cwobdSelect",
        label: "",
        options: dropDownMaster?.cwobd,
        isMulti: false,
        required: false,
      },
    ]
  },
  {
    type: "inp & sel",
    label: "Create Work Order Before Due Date",
    SubMenu:[
      {
        type: "radio",
        fieldName: "cwobdt", //2
        required: false,
      },
      
      {
      label: "On The"
      },
      {
        type: "select",
        fieldName: "cwobdtSelect",
        label: "",
        options: dropDownMaster?.cwobdt,
        isMulti: false,
        required: false,
      },
    ]
  },
  {
    type: "inp & sel",
    label: "Create WOs Units",
    SubMenu:[
      {
        type: "input",
        inputType: "number",
        fieldName: "cwu",
        label: "",
        required: false,
      },
      {
        type: "select",
        fieldName: "cwuSelect",
        label: "",
        options: dropDownMaster?.cwu,
        isMulti: false,
        required: false,
      },
    ]
  },
  {
    type: "inp & sel",
    label: "WOs Due after creation",
    SubMenu:[
      {
        type: "input",
        inputType: "number",
        fieldName: "wdac",
        label: "",
        required: false,
      },
      {
        type: "select",
        fieldName: "wdacSelect",
        label: "",
        options: dropDownMaster?.wdac,
        isMulti: false,
        required: false,
      },
    ]
  },
  {
    type: "checkbox",
    fieldName: "cfwon",
    label:
      "Create first work order now",
    required: false,
    SubMenu:[]
  },
  {
    type: "checkbox",
    fieldName: "autoClose",
    label: "Auto Close",
    required: false,
    SubMenu:[]
  },

   {
        type: "date",
        fieldName: "SDate",
        label: "Start Date",
        required: true,
        SubMenu:[]
      },
      { type: "date", fieldName: "EDate", label: "Due Date", required: true,SubMenu:[] },

  ] 
  
  export const sectionAInput = (dropDownMaster: any) => [
    {
      type: "select",
      fieldName: "name",
      label: "Employee Name",
      options: dropDownMaster?.user,
      required: true,
      disabled:true
    },
    // {
    //   type: "input",
    //   inputType: "text",
    //   fieldName: "employeeCode",
    //   label: "Employee Code",
    //   required: true,
    //   disabled:true
    // },
   
    {
      type: "select",
      fieldName: "designationSelect",
      label: "Designation",
      options: dropDownMaster?.designation,
      isMulti: false,
      required: true,
      disabled: true,
    },
    {
      type: "select",
      fieldName: "departmentSelect",
      label: "Department",
      options: dropDownMaster?.department,
      isMulti: false,
      required: true,
      disabled: true,
    },
    {
      type: "select",
      fieldName: "subdepartmentSelect",
      label: "Sub Department",
      options: dropDownMaster?.subdepartment,
      isMulti: false,
      required: true,
      disabled: true,
    },
    {
      type: "select",
      fieldName: "locationSelect",
      label: "Location",
      options: dropDownMaster?.location,
      isMulti: true,
      required: true,
      disabled: true,
    },
   
    // {
    //   type: "select",
    //   fieldName: "grade",
    //   label: "Grade",
    //   options: [
    //     {label:"A", value:1},
    //     {label:"B", value:2},
    //     {label:"C", value:3},
    //   ],
    //   isMulti: false,
    //   required: true,
    //   disabled: true,
    // },
    {
      type: "input",
      inputType: "text",
      fieldName: "uhighestQualification",
      label: "Highest Qualification (As per HR Records)",
      required: true,
      disabled:true
    },
    {
      type: "input",
      inputType: "text",
      fieldName: "grade",
      label: "Grade",
      required: true,
      disabled:true
    },
    {
      type: "input",
      inputType: "text",
      fieldName: "functional",
      label: "Function",
      required: true,
      disabled:true
    },
    {
      type: "select",
      inputType: "text",
      fieldName: "highestQualification",
      label: "Update Your Qualification (if any change)",
      options: [
        {value:"NA", label:"NA"},
        {value:"Bachelor Degree / Graduation", label:"Bachelor Degree / Graduation"},
        {value:"Master Degree / Post Graduation", label:"Master Degree / Post Graduation"},
        {value:"Diploma", label:"Diploma"},
        {value:"Others", label:"Others"},
      ],
      required: true,
      belowLabel:"Mention change (if any). In case there is no change select NA else select appropriate option.",
      disabled:false
    },
    {
      type: "select",
      fieldName: "reportingManager",
      label: "Reporting Manager/Appraiser's Name",
      required: true,
      options: dropDownMaster?.reportingManager,
      isMulti: true,
      disabled:true
    },
    {
      type: "input",
      inputType: "text",
      fieldName: "hodName",
      label: "Reviewing Manager / HOD ",
      required: true,
      disabled:true
    },
    {
      type: "input",
      inputType: "file",
      fieldName: "excel",
      label: "Upload KRA / KPI File in Excel Format.",
      required: true,
    },
    {
      type: "button",
      inputType: "btn",
      fieldName: "downloadSample",
      label: "Download KRA / KPI Sample File",
      required: false,
      disabled:false
    },
    {
      type: "input",
      inputType: "file",
      fieldName: "excel1",
      label: "Upload Annual Goal PDA in Excel Format.",
      required: true,
    },
    {
      type: "button",
      inputType: "btn",
      fieldName: "downloadSample1",
      label: "Download PDA Goal Setting Template",
      required: false,
      disabled:false
    },
    {
      type: "input",
      inputType: "percentage",
      fieldName: "q1",
      // label: `KRA / KPI Achievement (April-June ${previousYear}/Q2 CY${previousYear})`,
      label: `Q2 (April-June ${previousYear})`,
      required: true,
      disabled:false
    },
    {
      type: "input",
      inputType: "percentage",
      fieldName: "annualAchievement",
      label: "Consolidated Annual Goal Achievement(%)",
      required: true,
      disabled:true
    },
    {
      type: "input",
      inputType: "percentage",
      fieldName: "q2",
      label: `Q3 (July-Sep ${previousYear})`,
      required: true,
      disabled:false
    },
    {
      type: "input",
      inputType: "percentage",
      fieldName: "sectionAtotal",
      // label: `Section A Achievement Percentage Weighted Out Of 85(%)`,
      label: `Section A Achievement Percentage Weighted Out Of 85(%)`,
      required: true,
      disabled:true
    },
    {
      type: "input",
      inputType: "percentage",
      fieldName: "q3",
      label: `Q4 (Oct-Dec ${previousYear})`,
      required: true,
      disabled:false
    },
   
    // {
    //     type: "date",
    //     fieldName: "SDate",
    //     label: "Start Date",
    //     required: true,
    //   },
    //   { type: "date", fieldName: "EDate", label: "Due Date", required: true },
      
    // {
    //   type: "textarea",
    //   fieldName: "description",
    //   label: "Description",
    //   required: false,
    // },
  ];