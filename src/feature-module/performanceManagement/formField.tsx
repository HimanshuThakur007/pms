export const GoalDetails = (dropDownMaster: any) => [
  {
    type: "input",
    inputType: "text",
    fieldName: "Name",
    label: "New Goal",
    required: true,
  },
  {
    type: "input",
    inputType: "number",
    fieldName: "Start",
    label: "Start",
    required: true,
  },
  {
    type: "input",
    inputType: "number",
    fieldName: "Target",
    label: "Target",
    required: true,
  },
  {
    type: "select",
    fieldName: "goalType",
    label: "Goal Type",
    options: dropDownMaster?.goalType,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "goalUnit",
    label: "Goal Unit",
    options: dropDownMaster?.goalUnit,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "assignedTo",
    label: "AssignedTo",
    options: dropDownMaster?.assignedTo,
    isMulti: true,
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
    type: "textarea",
    fieldName: "Discription",
    label: "Description",
    options: [],
    required: false,
  },
];

export const performanceDetails = (dropDownMaster: any) => [
 
 
  {
    type: "select",
    fieldName: "designation",
    label: "Designation",
    options: dropDownMaster?.Designation,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "cycleTime",
    label: "Cycle Time",
    options: dropDownMaster?.cycleTime,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "otcp",
    label: "On-Time Completion Percentage",
    options: dropDownMaster?.otcp,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "phts",
    label: "Planned Hours Vs. Time Spent",
    options: dropDownMaster?.phts,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "timeSpent",
    label: "Time Spent",
    options: dropDownMaster?.timeSpent,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "resourceCapacity",
    label: "Resource Capacity",
    options: dropDownMaster?.resourceCapacity,
    isMulti: false,
    required: false,
  },
  {
    type: "select",
    fieldName: "efficiency",
    label: "Efficiency",
    options: dropDownMaster?.efficiency,
    isMulti: false,
    required: true,
  },
//   =====================
  {
    type: "select",
    fieldName: "status",
    label: "Status",
    options: dropDownMaster?.status,
    isMulti: false,
    required: true,
  },
  {
    type: "select",
    fieldName: "integrity",
    label: "Integrity",
    options: dropDownMaster?.integrity,
    isMulti: false,
    required: true,
  },
  {
    type: "select",
    fieldName: "professionalism",
    label: "Professionalism",
    options: dropDownMaster?.professionalism,
    isMulti: false,
    required: true,
  },
  {
    type: "select",
    fieldName: "teamWork",
    label: "Team Work",
    options: dropDownMaster?.teamWork,
    isMulti: false,
    required: true,
  },
  {
    type: "select",
    fieldName: "complaints",
    label: "Complaints",
    options: dropDownMaster?.complaints,
    isMulti: false,
    required: true,
  },
  {
    type: "select",
    fieldName: "atmd",
    label: "Ability To Meet Deadline",
    options: dropDownMaster?.atmd,
    isMulti: false,
    required: true,
  },
];
