export const taskDetails = (dropDownMaster:any) => [
    { type: "input", fieldName: "name", label: "Task Name", required: true },
    {
      type: "select",
      fieldName: "taskType",
      label: "Task Type",
      options: dropDownMaster?.master_110,
      isMulti: false,
      required: true,
    },
    {
      type: "select",
      fieldName: "category",
      label: "Category",
      options: dropDownMaster?.master_108,
      isMulti: false,
      required: true,
    },
    {
      type: "select",
      fieldName: "assignedTo",
      label: "AssignedTo",
      options: dropDownMaster?.master_0,
      isMulti: true,
      required: false,
    },
    {
      type: "select",
      fieldName: "site",
      label: "Site",
      options: dropDownMaster?.site,
      isMulti: true,
      required: false,
    },
    {
      type: "textarea",
      fieldName: "description",
      label: "Description",
      options: [],
      required: false,
    },
  ];

 export const additionalInfo = (dropDownMaster:any) => [
    {
      type: "date",
      fieldName: "startDate",
      label: "Start Date",
      required: true,
    },
    { type: "date", fieldName: "endDate", label: "End Date", required: true },
    {
      type: "time",
      fieldName: "taskStart",
      label: "Task Start On",
      required: true,
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
      fieldName: "status",
      label: "Status",
      options: dropDownMaster?.status,
      isMulti: false,
      required: false,
    },
    {
      type: "radio-inp",
      fieldName: "durationUnit",
      label: "Duration Type",
      options: [
        { label: "Hour", value: "hour" },
        { label: "Day", value: "day" },
        { label: "Minute", value: "minute" },
      ],
      required: false,
    },
    {
      type: "radio-inp",
      fieldName: "taskWeightage",
      label: "Task Weightage",
      options: [
        { label: "Number", value: "number" },
        { label: "Percentage", value: "percentage" },
      ],
      required: false,
    },
    {
      type: "checkbox",
      fieldName: "autoComp",
      label:
        "Auto complete task when all subtasks are completed (and vice versa)?",
      required: false,
    },
    {
      type: "checkbox",
      fieldName: "mandatorydoc",
      label: "Document Mandatory On Task",
      required: false,
    },
    {
      type: "checkbox",
      fieldName: "taskscheduled",
      label: "Task Scheduled",
      required: false,
    },
    {
      type: "numeric",
      fieldName: "taskRepetitionsDays",
      label: "Task Repetitions Days",
      required: true,
    },
  ];

 export const subTask = [
    { type: "radio", name: "subtask", label: "Sub Task", value: "subtask" },
    {
      type: "radio",
      name: "checklist",
      label: "Check list",
      value: "checklist",
    },
    {
      type: "radio",
      name: "customfield",
      label: "Custom Field",
      value: "customfield",
    },
  ];