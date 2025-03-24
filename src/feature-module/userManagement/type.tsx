import moment from "moment";
import { assetsColumn, brandColumn, categoryColumn, subcategoryColumn } from "../assetsManagement/assetsColumn";
import { customerColumn, storeColumn } from "../peoplesManagement/peopleColumns";
import { appraisalColumn, goalColumn } from "../performanceManagement/performanceColumn";
import { catColumn, checkColumn, workOrderColumn } from "../preventiveMaintanance/preventiveColumn";
import { qualityCheckColumn, qualityTaskColumn } from "../qualityManagement/qualityColumn";
import { notificationColumn, pmColumn, qCColumn, taskdetailListColumn, taskStatusColumn } from "../reports/reportColumn";
import { subTaskColumn, taskApprovalColumn, taskCategoryColumn, taskListColumn } from "../taskManagement/taskColumn";
import { departMentColumn, desandsiteColumn, RoleColumn, userColumn } from "./userColumn";

export interface MasterDataType {
    master_101?: { label: string; value: number | string }[];
    master_102?: { label: string; value: number | string }[];
    master_104?: { label: string; value: number | string }[];
    master_109?: { label: string; value: number | string }[];
    master_0?: { label: string; value: number | string }[];
    block_list?: { label: string; value: number | string }[];
    
  }
  export interface FormDataType {
    [key: string]: any;
    name: string;
    mobile: string;
    email: string;
    password: string;
    repeatPassword: string;
    site: [];
    role: any;
    reporting: boolean;
    manager: [];
    block_list: any;
    master_101: any;
    master_102: any;
    master_104: any;
    master_109: any;
    master_0: any;
  }

  export interface DepartmentDataType {
    [key: string]: any;
    name: string;
    mobile: string;
    email: string;
    address: string;
    Hod: any;
    Hod_list?: { label: string; value: number | string }[]
  }

  export const typeValues: { [key: string]: string } = {
    "manage-user": "19",
    "manage-department": "101",
    "manage-designation": "102",
    "manage-site": "104",
    "manage-role&permission": "109",
    "customer": "2",
    "store": "11",
    "manage-asset": "6",
    "brand": "7",
    "category": "5",
    "sub-category": "4",
    "unit": "8",
    "manage-tasks": "1",
    "manage-subtasks": "103",
    "manage-taskcategory": "108",
    "manage-tasktype": "110",
    "manage-performance": "3",
    "manage-review-appraisal": "1111",
    "manage-goal": "21",
    "manage-quality-task": "31",
    "manage-quality-check": "32",
    "manage-work-order": "33",
    "manage-pm": "34",
    "manage-check-list": "107",
    "manage-pm-categories": "106",
    "manage-tasklist": "1234",
    "manage-taskapproval": "1224",
    // ===========reports=========
    "task_status": "1235",
    "manage-task-list":"1236",
    "quality-check":"1237",
    "notification":"1238"
  };

   export const getConfig = (userId: number, state: any) => ({
    "19":{
      url: "/api/GetUserList?UserCode=0",
      columns: userColumn,
      displayName: "User",
    },
     "101": {
           url: "/api/GetDepartMastList?Mastertype=101&Code=0",
           columns: departMentColumn,
           displayName: "Department",
         },
         "102": {
           url: "/api/GetTypeMastList?Mastertype=102&Code=0",
           columns: desandsiteColumn,
           displayName: "Designation",
         },
         "8": {
           url: "/api/GetTypeMastList?Mastertype=8&Code=0",
           columns: desandsiteColumn,
           displayName: "Unit",
         },
         "104": {
           url: "/api/GetSiteMastList?Mastertype=104&Code=0",
           columns: desandsiteColumn,
           displayName: "Site",
         },
         "109": {
           url: "/api/GetSiteMastList?Mastertype=109&Code=0",
           columns: RoleColumn,
           displayName: "Role",
         },
         "2": {
           url: "/api/GetAccList?Mastertype=2&Code=0",
           columns: customerColumn,
           displayName: "Customer",
         },
         "11": {
           url: "/api/GetSiteMastList?Mastertype=11&Code=0",
           columns: storeColumn,
           displayName: "Store",
         },
         "6": {
           url: "/api/GetSiteMastList?Mastertype=6&Code=0",
           columns: assetsColumn,
           displayName: "Assets",
         },
         "7": {
           url: "/api/GetBrandMastList?Mastertype=7&Code=0",
           columns: brandColumn,
           displayName: "Brand",
         },
         "5": {
           url: "/api/GetCateMastList?Mastertype=5&Code=0",
           columns: categoryColumn,
           displayName: "Category",
         },
         "4": {
           url: "/api/GetSubCateMastList?Mastertype=4&Code=0",
           columns: subcategoryColumn,
           displayName: "SubCategory",
         },
         "1": (userId: number) => ({
           url: `/api/GetWebTaskModifyList?Rectype=1&Code=0&UCode=${userId}`,
           columns: (onRowClick: any, onDeleteRow: any) => [onRowClick, onDeleteRow],
           displayName: "Task",
         }),
         "103": {
           url: "/api/GetSubMastList?Mastertype=103&Code=0",
           columns: subTaskColumn,
           displayName: "Sub Task",
         },
         "108": {
           url: "/api/GetTaskCategoriesMastList?Mastertype=108&Code=0",
           columns: taskCategoryColumn,
           displayName: "Task Category",
         },
         "110": {
           url: "/api/GetTaskTypeMastList?Mastertype=110&Code=0",
           columns: taskCategoryColumn,
           displayName: "Task Type",
         },
         "21": {
           url: "/api/GetGoalTrackingList",
           columns: goalColumn,
           displayName: "Goal",
         },
         "3": {
           url: "/api/",
           columns: [],
           displayName: "Performance",
         },
         "31": {
           url: "/api/",
           columns: qualityTaskColumn,
           displayName: "Quality Task",
         },
         "32": {
           url: "/api/",
           columns: qualityCheckColumn,
           displayName: "Quality Check",
         },
         "33": {
           url: "/api/GetWorkModifyList?Rectype=3&Code=0",
           columns: workOrderColumn,
           displayName: "Work Order",
         },
         "34": {
           url: "/api/GetPMList?",
           columns: pmColumn,
           displayName: "Preventive Maintenance",
         },
         "107": {
           url: "/api/GetCheckMastList?Mastertype=107",
           columns: checkColumn,
           displayName: "Check",
         },
         "106": {
           url: "/api/GetCategoriesMastList?Mastertype=106",
           columns: catColumn,
           displayName: "Categories",
         },
         "1234": (userId: number) => ({
           url: `/api/GetUserWiseReport1?UCode=${userId}`,
           columns: taskListColumn,
           displayName: "Task List",
         }),
         "1224": (userId: number) => ({
           url: `/api/GetAppovalList?UserCode=${userId}&SDate=${moment(new Date()).format("DD/MMM/YYYY")}&IType=${state?.approvalSelect?.value||1}`,
           columns: taskApprovalColumn,
           displayName: "Task Approval",
         }),
         "1235": (userId: number) => ({
           url: `/api/GetUserWiseReport?Status=0&UCode=${userId}`,
           columns: taskStatusColumn,
           displayName: "Task Status",
         }),
         "1236": (userId: number) => ({
           url: `/api/GetUserSiteWiseReport?Status=0&UCode=${userId}`,
           columns: taskdetailListColumn,
           displayName: "Task Details",
         }),
         "1237": (userId: number) => ({
           url: `/api/GetQCReport?UCode=${userId}`,
           columns: qCColumn,
           displayName: "Quality Check",
         }),
         "1238": (userId: number) => ({
           // url: `/api/GetNotificationDetails?Code=${userId}`,
           url: `/api/GetNotificationDetails?Code=${userId}`,
           columns: notificationColumn,
           displayName: "Notification",
         }),
         // =======aprrerasal======
         "1111": {
           url: "/api/Getreviewlist?UserCode=0",
           columns: appraisalColumn,
           displayName: "Annual Performance Review/Appraisal",
         },
    });

    