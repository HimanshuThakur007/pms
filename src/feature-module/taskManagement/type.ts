export interface TaskDataType {
    [key: string]: any;
    name: any;
    taskType: any;
    category: any;
    assignedTo: any;
    site: any;
    description:'';
    startDate: any;
    endDate:any;
    taskStart:any;
    durationUnit:any;
    durationValue:any;
    autoComp:any;
    mandatorydoc:any;
    taskscheduled:any;
    subtask:any;
    subtaskList:any;
    checkedList:any;
    customField:any;
  }
export interface optionsDataType {
    [key: string]: any;
    duration?: { label: string; value: number | string }[]
    // duration?: { label: string; value: number | string }[]
   
  }