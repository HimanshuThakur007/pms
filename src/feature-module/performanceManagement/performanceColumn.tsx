import { Link } from "react-router-dom";

export const goalColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Goal",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Goal Type",
    dataIndex: "gTypeName",
    key: "gTypeName",
    width: "316px",
    sorter: (a: any, b: any) => a.gTypeName.length - b.gTypeName.length,
  },
  {
    title: "Target Achivement",
    dataIndex: "target",
    key: "target",
    width: "316px",
    sorter: (a: any, b: any) => a.target.length - b.target.length,
  },
  {
    title: "Start Date",
    dataIndex: "sDate",
    key: "sDate",
    width: "316px",
    sorter: (a: any, b: any) => a.sDate.length - b.sDate.length,
  },
  {
    title: "End Date",
    dataIndex: "eDate",
    key: "eDate",
    width: "316px",
    sorter: (a: any, b: any) => a.eDate.length - b.eDate.length,
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
            data-bs-target="#goal_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          )}
          {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31019)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
          )}
        </div>
      </div>
    ),
  }]:[]),
];

export const appraisalColumn = (editHandler: any, deleteHandler: any, rights:any)=>[
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
    width: "316px",
    sorter: (a: any, b: any) => a.mobile.length - b.mobile.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "316px",
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: "Department",
    dataIndex: "departmentName",
    key: "departmentName",
    width: "316px",
    sorter: (a: any, b: any) => a.departmentName.length - b.departmentName.length,
  },
  {
    title: "Designation",
    dataIndex: "designationName",
    key: "designationName",
    width: "316px",
    sorter: (a: any, b: any) => a.designationName.length - b.designationName.length,
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
            data-bs-target="#review_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> View
          </Link>
          )}
           {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31019)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
           )}
        </div>
      </div>
    ),
  }]:[]),
]