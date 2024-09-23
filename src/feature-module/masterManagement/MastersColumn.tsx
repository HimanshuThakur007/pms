import { Link } from "react-router-dom";

export const usertype = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    width: "216px",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "userTypeName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
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
            className="dropdown-item edit-popup"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#edit_role"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];

export const Source = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    width: "216px",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Source",
    dataIndex: "name",
    key: "userTypeName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
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
            className="dropdown-item edit-popup"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#edit_role"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record,0)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];

export const Purpose = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    width: "216px",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Purpose",
    dataIndex: "name",
    key: "userTypeName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
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
            className="dropdown-item edit-popup"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#edit_role"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31010)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];

export const TypeofTrade = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    width: "216px",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "userTypeName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
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
            className="dropdown-item edit-popup"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#edit_role"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record, 31013)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];

export const Location = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    width: "216px",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "userTypeName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
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
            className="dropdown-item edit-popup"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#edit_role"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];

export const department = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "316px",
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: "Mobile No",
    dataIndex: "monNo",
    key: "monNo",
    width: "316px",
    sorter: (a: any, b: any) => a.monNo.length - b.monNo.length,
  },
  {
    title: "Company Code",
    dataIndex: "compCode",
    key: "compCode",
    width: "316px",
    sorter: (a: any, b: any) => a.compCode.length - b.compCode.length,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: "316px",
    sorter: (a: any, b: any) => a.address.length - b.address.length,
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
             data-bs-target="#department_add"
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
export const contact = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "316px",
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: "Mobile No",
    dataIndex: "perMobNo",
    key: "perMobNo",
    width: "316px",
    sorter: (a: any, b: any) => a.perMobNo.length - b.perMobNo.length,
  },
  {
    title: "Alternate No",
    dataIndex: "ofcMobNo",
    key: "ofcMobNo",
    width: "316px",
    sorter: (a: any, b: any) => a.ofcMobNo.length - b.ofcMobNo.length,
  },
  // {
  //   title: "Type",
  //   dataIndex: "type",
  //   render: (record) =>(

  //   ),
  //   key: "type",
  //   width: "316px",
  //   sorter: (a: any, b: any) => a.type.length - b.type.length,
  // },
  {
    title: "Type",
    dataIndex: "type",
    render: (text: any, index: number) => (
      <div key={index}>
        {text === 1 && (
          <span className="badge badge-tag badge-success-light">Premium</span>
        )}
        {text === 2 && (
          <span className="badge badge-tag badge-purple-light">Normal</span>
        )}
        {text === 3 && (
          <span className="badge badge-tag badge-warning-light">Special</span>
        )}
        {text === 4 && (
          <span className="badge badge-pill badge-status bg-info">
            Vip
          </span>
        )}
        {text === 5 && (
          <span className="badge badge-pill badge-status bg-green">
            VVip
          </span>
        )}
      </div>
    ),
    sorter: true,
  },
  {
    title: "Res. Address",
    dataIndex: "resAdd",
    key: "resAdd",
    width: "316px",
    sorter: (a: any, b: any) => a.resAdd.length - b.resAdd.length,
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
             data-bs-target="#contact_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];
export const customer = (editHandler: any, deleteHandler: any) => [
  {
    title: "SrNo",
    key: "index",
    render: (text: any, record: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
    width: "316px",
    sorter: (a: any, b: any) => a.userName.length - b.userName.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "316px",
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: "Mobile No",
    dataIndex: "mobNo",
    key: "mobNo",
    width: "316px",
    sorter: (a: any, b: any) => a.mobNo.length - b.mobNo.length,
  },
  {
    title: "Reference",
    dataIndex: "ref",
    key: "ref",
    width: "316px",
    sorter: (a: any, b: any) => a.ref.length - b.ref.length,
  },
  {
    title: "Architect Name",
    dataIndex: "archName",
    sorter: (a:any, b:any) => a.archName.length - b.archName.length,
  },
  {
    title: "Architect MobileNo",
    dataIndex: "archMobNo",
    sorter: (a:any, b:any) => a.archMobNo.length - b.archMobNo.length,
  },
  {
    title: "GST No",
    dataIndex: "gstNo",
    sorter: (a:any, b:any) => a.gstNo.length - b.gstNo.length,
  },
  {
    title: "Location",
    dataIndex: "location",
    sorter: (a:any, b:any) => a.location.length - b.location.length,
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
             data-bs-target="#customer_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record,51003)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];
