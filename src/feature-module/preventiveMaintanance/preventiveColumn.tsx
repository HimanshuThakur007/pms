import { Link } from "react-router-dom";

export const workOrderColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Due Date",
    dataIndex: "eDate",
    key: "eDate",
    width: "316px",
    sorter: (a: any, b: any) => a.eDate.length - b.eDate.length,
  },
  {
    title: "Work Order No",
    dataIndex: "workNo",
    key: "workNo",
    width: "316px",
    sorter: (a: any, b: any) => a.workNo.length - b.workNo.length,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Category Name",
    dataIndex: "categoryName",
    key: "categoryName",
    width: "316px",
    sorter: (a: any, b: any) => a.categoryName.length - b.categoryName.length,
  },
  {
    title: "Priority",
    dataIndex: "priorityName",
    key: "priorityName",
    width: "316px",
    sorter: (a: any, b: any) => a.priorityName.length - b.priorityName.length,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    width: "316px",
    sorter: (a: any, b: any) => a.duration.length - b.duration.length,
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
            data-bs-target="#workorder_add"
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
export const pmColumn = (editHandler: any, deleteHandler: any, rights:any) => [
 
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "316px",
        sorter: (a: any, b: any) => a.name.length - b.name.length,
      },
      {
        title: "Type",
        dataIndex: "itype",
        key: "itype",
        width: "316px",
        sorter: (a: any, b: any) => a.itype.length - b.itype.length,
      },
      {
        title: "Trigger Name",
        dataIndex: "triggerName",
        key: "triggerName",
        width: "316px",
        sorter: (a: any, b: any) => a.triggerName.length - b.triggerName.length,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "316px",
        sorter: (a: any, b: any) => a.category.length - b.category.length,
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        width: "316px",
        sorter: (a: any, b: any) => a.duration.length - b.duration.length,
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
                data-bs-target="#pm_add"
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
export const checkColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "216px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Description",
    dataIndex: "discription",
    key: "discription",
    width: "300px",
    sorter: (a: any, b: any) => a.discription.length - b.discription.length,
    render: (text: string) => (
      <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {text}
      </span>
    ),
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
            data-bs-target="#custom_add"
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
export const catColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Categories",
    dataIndex: "name",
    key: "name",
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
            data-bs-target="#custom_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          )}
          {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
          )}
        </div>
      </div>
    ),
  }]:[]),
];