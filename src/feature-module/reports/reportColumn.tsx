import { Eye } from "react-feather";
import { Link } from "react-router-dom";

export const taskStatusColumn = [
  {
    title: "Task Name",
    dataIndex: "taskName",
    key: "taskName",
    // width: "316px",
    sorter: (a: any, b: any) => a.taskName.length - b.taskName.length,
  },
  {
    title: " Task Type",
    dataIndex: "taskType",
    // width: "200px",
    sorter: (a: any, b: any) => a.taskType.length - b.taskType.length,
  },
  {
    title: "Assign Name",
    dataIndex: "assignName",
    // width: "200px",
    sorter: (a: any, b: any) => a.assignName.length - b.assignName.length,
  },
  {
    title: "Date",
    dataIndex: "assignDate",
    // width: "150px",
    sorter: (a: any, b: any) => a.assignDate.length - b.assignDate.length,
  },
  {
    title: "My Task",
    dataIndex: "totTasK",
    // width: "150px",
    sorter: (a: any, b: any) => a.totTasK.length - b.totTasK.length,
  },
  {
    title: "Completed",
    dataIndex: "completeTasK",
    // width: "150px",
    sorter: (a: any, b: any) => a.completeTasK.length - b.completeTasK.length,
  },
  {
    title: "Pending",
    dataIndex: "pendingTasK",
    // width: "150px",
    sorter: (a: any, b: any) => a.pendingTasK.length - b.pendingTasK.length,
  },
  {
    title: "Priority",
    dataIndex: "priority",
    // width: "150px",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: "Status",
    dataIndex: "taskStatus",
    // width: "100px",
    sorter: (a: any, b: any) => a.taskStatus.length - b.taskStatus.length,
  },
];
export const qCColumn = [
  {
    title: "QC Date",
    dataIndex: "checkDate",
    // key: "checkDate",
    // width: "316px",
    sorter: (a: any, b: any) => a.checkDate.length - b.checkDate.length,
  },
  {
    title: "Party",
    dataIndex: "partyName",
    // key: "partyName",
    // width: "316px",
    sorter: (a: any, b: any) => a.partyName.length - b.partyName.length,
  },
  {
    title: "PO No.",
    dataIndex: "vchNo",
    width: "200px",
    sorter: (a: any, b: any) => a.vchNp.length - b.vchNp.length,
  },
  {
    title: " Item Name",
    dataIndex: "itemName",
    width: "250px",
    sorter: (a: any, b: any) => a.itemName.length - b.itemName.length,
  },
  {
    title: "Qty",
    dataIndex: "qty",
    width: "100px",
    sorter: (a: any, b: any) => a.qty.length - b.qty.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "200px",
    sorter: (a: any, b: any) => a.price.length - b.price.length,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "250px",

    sorter: (a: any, b: any) => a.amount.length - b.amount.length,
  },
  {
    title: "Remarks",
    dataIndex: "remark",
    width: "300px",
    sorter: (a: any, b: any) => a.remark.length - b.remark.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "100px",
    sorter: (a: any, b: any) => a.status.length - b.status.length,
  },
  {
    title: "User",
    dataIndex: "userName",
    width: "250px",
    sorter: (a: any, b: any) => a.userName.length - b.userName.length,
  },
];

export const pmColumn = [
  {
    title: "Task",
    dataIndex: "taskName",
    sorter: (a: any, b: any) => a.taskName.length - b.taskName.length,
  },
  {
    title: "Frequency",
    dataIndex: "assignName",
    sorter: (a: any, b: any) => a.assignName.length - b.assignName.length,
  },
  {
    title: "By",
    dataIndex: "assignDate",
    sorter: (a: any, b: any) => a.assignDate.length - b.assignDate.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Jan
      </span>
    ),
    dataIndex: "totTasK",
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Feb
      </span>
    ),
    dataIndex: "completeTasK",
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Mar
      </span>
    ),
    dataIndex: "pendingTasK",
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Apr
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        May
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Jun
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Jul
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Aug
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Sep
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: (
      <span style={{ fontSize: "15px", color: "#262A2A", fontWeight: "500" }}>
        Oct
      </span>
    ),
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: "Nov",
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
  {
    title: "Dec",
    dataIndex: "priority",
    sorter: (a: any, b: any) => a.priority.length - b.priority.length,
  },
];

export const notificationColumn = [
  {
    title: "Name",
    dataIndex: "uName",
    width: "150px",
    sorter: (a: any, b: any) => a.uName.length - b.uName.length,
  },
  {
    title: "Site",
    dataIndex: "site",
    width: "100px",
    sorter: (a: any, b: any) => a.taskType.length - b.taskType.length,
  },

  {
    title: "Task Name",
    dataIndex: "taskName",
    width: "150px",
    sorter: (a: any, b: any) => a.completeTasK.length - b.completeTasK.length,
  },
  {
    title: "Message",
    dataIndex: "msg",
    width: "200px",
    sorter: (a: any, b: any) => a.msg.length - b.msg.length,
  },
];

export const taskdetailListColumn = (detailHandler:any) =>[
  {
    title: "Task Name",
    dataIndex: "taskName",
    width: "300px",
    sorter: (a:any, b:any) => a.taskName.length - b.taskName.length,
  },
  {
    title: "Assign Name",
    dataIndex: "assignName",
    width: "250px",
    sorter: (a:any, b:any) => a.assignName.length - b.assignName.length,
  },
  {
    title: "Site Name",
    dataIndex: "siteName",
    width: "200px",
    sorter: (a:any, b:any) => a.siteName.length - b.siteName.length,
  },
  {
    title: "Date",
    dataIndex: "assignDate",
    width: "150px",
    sorter: (a:any, b:any) => a.assignDate.length - b.assignDate.length,
  },
  {
    title: "My Task",
    dataIndex: "totTasK",
    width: "140px",
    sorter: (a:any, b:any) => a.totTasK.length - b.totTasK.length,
  },
  {
    title: "Completed",
    dataIndex: "completeTasK",
    width: "150px",
    sorter: (a:any, b:any) => a.completeTasK.length - b.completeTasK.length,
  },
  {
    title: "Pending",
    dataIndex: "pendingTasK",
    width: "140px",
    sorter: (a:any, b:any) => a.pendingTasK.length - b.pendingTasK.length,
  },
  {
    title: "Priority",
    dataIndex: "priority",
    width: "150px",
    sorter: (a:any, b:any) => a.priority.length - b.priority.length,
  },
  {
    title: "Status",
    dataIndex: "taskStatus",
    width: "150px",
    sorter: (a:any, b:any) => a.taskStatus.length - b.taskStatus.length,
  },
  {
    title: "Action",
    className: "text-end",
    dataIndex: "",
    width: "100px",
    render: (text:string, record:any) => (
      // <div className="text-end">
         <Link
             to="#"
             className="dropdown-item edit-popup"
             data-bs-toggle="offcanvas"
             data-bs-target="#detail_add"
            onClick={() => detailHandler(record)}
          >
            {/* <i className="ti ti-edit text-blue" /> Edit */}
            <Eye className="feather-edit-3 me-1" />
          </Link>
      // </div>
    ),
  },
] 

export const detailColumn = [
  {
    title: "Sub Task",
    dataIndex: "subTaskName",
    // key: "checkDate",
    // width: "316px",
    sorter: (a: any, b: any) => a.subTaskName.length - b.subTaskName.length,
  },
  {
    title: "Remark",
    dataIndex: "remark",
    // key: "partyName",
    // width: "316px",
    sorter: (a: any, b: any) => a.remark.length - b.remark.length,
  },
  {
    title: "Status",
    dataIndex: "taskStatus",
    // key: "partyName",
    // width: "316px",
    sorter: (a: any, b: any) => a.taskStatus.length - b.taskStatus.length,
  }
]
