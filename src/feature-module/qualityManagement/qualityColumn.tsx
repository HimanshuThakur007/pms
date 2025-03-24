import { Link } from "react-router-dom";

export const qualityTaskColumn = (editHandler: any, deleteHandler: any) => [
  {
    title: "Task Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
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
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "316px",
    sorter: (a: any, b: any) => a.category.length - b.category.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "316px",
    sorter: (a: any, b: any) => a.status.length - b.status.length,
  },
 
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
            data-bs-target="#goal_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31019)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];
export const qualityCheckColumn = (editHandler: any, deleteHandler: any) => [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Quality",
    dataIndex: "quality",
    key: "quality",
    width: "316px",
    sorter: (a: any, b: any) => a.quality.length - b.quality.length,
  },
  {
    title: "UOM",
    dataIndex: "uom",
    key: "uom",
    width: "316px",
    sorter: (a: any, b: any) => a.uom.length - b.uom.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "316px",
    sorter: (a: any, b: any) => a.status.length - b.status.length,
  },
 
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
            data-bs-target="#goal_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31019)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];