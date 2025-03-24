import { Link } from "react-router-dom";

export const subTaskColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Task Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Task Category",
    dataIndex: "categoryName",
    key: "categoryName",
    width: "316px",
    sorter: (a: any, b: any) => a.categoryName.length - b.categoryName.length,
  },
  ...(rights?.mEdit || rights?.mDelete
    ? [
  {
    title: "Action",
    key: "action",
    width: "128px",
    render: (record: any) => (
      <div className="dropdown table-action">
        <Link
          to="#"
          className="action-icon"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </Link>
        <div className="dropdown-menu dropdown-menu-right">
          {rights?.mEdit === 1 && (
          <Link
            to="#"
            className="dropdown-item edit-popup"
            data-bs-toggle="offcanvas"
            data-bs-target="#taskmanagement_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>)}

          {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31019)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>)}
        </div>
      </div>
    ),
  }]:[]),
];
export const taskCategoryColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Task Category",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  ...(rights?.mEdit || rights?.mDelete
    ? [
  {
    title: "Action",
    key: "action",
    width: "128px",
    render: (record: any) => (
      <div className="dropdown table-action">
        <Link
          to="#"
          className="action-icon"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </Link>
        <div className="dropdown-menu dropdown-menu-right">
          {rights?.mEdit === 1 && (
          <Link
            to="#"
            className="dropdown-item edit-popup"
            data-bs-toggle="offcanvas"
            data-bs-target="#taskmanagement_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>)}
          {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31019)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>)}
        </div>
      </div>
    ),
  }]:[]),
];
export const taskListColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Task Name",
    dataIndex: "taskName",
    key: "taskName",
    width: "316px",
    sorter: (a: any, b: any) => a.taskName.length - b.taskName.length,
    disabled: false,
  },
  {
    title: "Task Type",
    dataIndex: "taskType",
    key: "taskType",
    width: "316px",
    sorter: (a: any, b: any) => a.taskType.length - b.taskType.length,
    disabled: true,
  },
  {
    title: "Assign Name",
    dataIndex: "assignName",
    key: "assignName",
    // width: "316px",
    sorter: (a: any, b: any) => a.assignName.length - b.assignName.length,
  },
  {
    title: "Date",
    dataIndex: "assignDate",
    key: "assignDate",
    // width: "316px",
    sorter: (a: any, b: any) => a.assignDate.length - b.assignDate.length,
  },
  {
    title: "My Task",
    dataIndex: "totTasK",
    render: (text: string, index: number) => (
      <div key={index}>
        <span className="badge badge-pill badge-status bg-warning">{text}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.totTasK.length - b.totTasK.length,
  },
  {
    title: "Completed",
    dataIndex: "completeTasK",
    render: (text: string, index: number) => (
      <div key={index}>
        <span className="badge badge-pill badge-status bg-success">{text}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.completeTasK.length - b.completeTasK.length,
  },
  {
    title: "Pending",
    dataIndex: "pendingTasK",
    render: (text: string, index: number) => (
      <div key={index}>
        <span className="badge badge-pill badge-status bg-danger">{text}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.pendingTasK.length - b.pendingTasK.length,
  },
 
//   {
//     title: "Priority",
//     dataIndex: "priority",
//     render: (text: any) => (
//       <>
//         {text === "Medium" && (
//           <span className="badge badge-tag badge-warning-light">{text}</span>
//         )}
//         {text === "Low" && (
//           <span className="badge badge-tag badge-purple-light">{text}</span>
//         )}
//         {text === "High" && (
//           <span className="badge badge-tag badge-danger-light">{text}</span>
//         )}
//       </>
//     ),
//   },
 {
      title: "Priority",
      dataIndex: "priority",
      render: (text: any) => (
        <div>
          {text === "High" && (
            <span className="priority badge badge-tag badge-danger-light">
              <i className="ti ti-square-rounded-filled" />
              {text}
            </span>
          )}
          {text === "Medium" && (
            <span className="priority badge badge-tag badge-warning-light">
              <i className="ti ti-square-rounded-filled" />
              {text}
            </span>
          )}
          {text === "Low" && (
            <span className="priority badge badge-tag badge-success-light">
              <i className="ti ti-square-rounded-filled" />
              {text}
            </span>
          )}
        </div>
      ),
      sorter: (a: any, b: any) =>
        a.priority.length - b.priority.length,
    },
  {
    title: "Status",
    dataIndex: "taskStatus",
    key: "taskStatus",
    // width: "316px",
    sorter: (a: any, b: any) => a.taskStatus.length - b.taskStatus.length,
  },
  
];
export const taskApprovalColumn = (editHandler: any, deleteHandler: any, value: number, rights:any) => {
  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      sorter: (a: any, b: any) => a.taskName.length - b.taskName.length,
    },
    {
      title: "User Name",
      dataIndex: "uName",
      sorter: (a: any, b: any) => a.uName.length - b.uName.length,
    },
    {
      title: "Site",
      dataIndex: "site",
      sorter: (a: any, b: any) => a.site.length - b.site.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.status.length - b.status.length,
    },
    ...(rights?.mEdit || rights?.mDelete
      ? [
    {
      title: "Action",
      key: "action",
      width: "128px",
      render: (record: any) => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              to="#"
              className="dropdown-item edit-popup"
              data-bs-toggle="offcanvas"
              data-bs-target="#taskmanagement_add"
              onClick={() => editHandler(record)}
            >
              <i className="ti ti-edit text-blue" /> Approve
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => deleteHandler(record)}
            >
              <i className="ti ti-shield text-success" /> Reject
            </Link>
          </div>
        </div>
      ),
    }]:[]),
  ];

  if (value !== 2) {
    columns.splice(2, 0, {
      title: "User To",
      dataIndex: "toUName",
      sorter: (a: any, b: any) => a.toUName.length - b.toUName.length,
    });
  }

  return columns;
};

