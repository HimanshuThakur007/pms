import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
const route = all_routes

export const department = (editHandler: any, deleteHandler: any) => [
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
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];

export const userColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    disabled: false
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "316px",
    sorter: (a: any, b: any) => a.email.length - b.email.length,
    disabled: true
  },
  {
    title: "Mobile No",
    dataIndex: "mobile",
    key: "mobile",
    width: "316px",
    sorter: (a: any, b: any) => a.mobile.length - b.mobile.length,
  },
{
    title: "Block",
    dataIndex: "block",
    render: (text: any) => (
      <div>
        {text === 1 && (
          <span className="badge badge-pill badge-status bg-success">
            Yes
          </span>
        )}

        {text === 0 && (
          <span className="badge badge-pill badge-status bg-danger">
            No
          </span>
        )}
      </div>
    ),
    sorter: true,
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   width: "128px",
  //   render: (record: any) => (
  //     <div className="dropdown table-action">
  //       <Link
  //         to="#"
  //         className="action-icon"
  //         data-bs-toggle="dropdown"
  //         aria-expanded="false"
  //       >
  //         <i className="fa fa-ellipsis-v" />
  //       </Link>
  //       <div className="dropdown-menu dropdown-menu-right">
  //         <Link
  //            to="#"
  //            className="dropdown-item edit-popup"
  //            data-bs-toggle="offcanvas"
  //            data-bs-target="#offcanvas_add"
  //           onClick={() => editHandler(record)}
  //         >
  //           <i className="ti ti-edit text-blue" /> Edit
  //         </Link>
  //         <Link
  //           className="dropdown-item"
  //           to="#"
  //           onClick={() => deleteHandler(record)}
  //         >
  //           <i className="ti ti-shield text-success" /> Delete
  //         </Link>
  //       </div>
  //     </div>
  //   ),
  // },
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
                    data-bs-target="#offcanvas_add"
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
        },
      ]
    : []),
];

export const departMentColumn = (editHandler: any, deleteHandler: any, rights:any) => [
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
    dataIndex: "mobile",
    key: "mobile",
    width: "316px",
    sorter: (a: any, b: any) => a.mobile.length - b.mobile.length,
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
             data-bs-target="#department_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>)}

          {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-shield text-success" /> Delete
          </Link>)}
        </div>
      </div>
    ),
  }]:[]),
];
export const desandsiteColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  // console.log("rrrrrrrr",rights),
  {
    title: "Name",
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
             data-bs-target="#designation_add"
            onClick={() => editHandler(record)}
          >
            <i className="ti ti-edit text-blue" /> Edit
          </Link>)}
          {rights?.mDelete === 1 && (
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => deleteHandler(record)}
          >
            <i className="ti ti-trash text-danger" /> Delete
          </Link>)}
         
        </div>
      </div>
    ),
  }]:[]),
];


export const RoleColumn = (editHandler: any, deleteHandler: any, content: any, rights: any) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    key: "action",
    width: "128px",
    render: (record: any) => {
      const showEdit = rights?.mEdit === 1;
      const showDelete = rights?.mDelete === 1;
      const showPermission = rights?.mEdit === 1 && content === "109";
      // console.log('desi-col',rights)

      if (!showEdit && !showDelete && !showPermission) return null; // Hide column if no actions available

      return (
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
            {showEdit && (
              <Link
                to="#"
                className="dropdown-item edit-popup"
                data-bs-toggle="offcanvas"
                data-bs-target="#designation_add"
                onClick={() => editHandler(record)}
              >
                <i className="ti ti-edit text-blue" /> Edit
              </Link>
            )}
            {showDelete && (
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => deleteHandler(record)}
              >
                <i className="ti ti-trash text-success" /> Delete
              </Link>
            )}
            {showPermission && (
              <Link
                className="dropdown-item"
                to={route.permissions}
                state={{ data: record, right: rights }}
              >
                <i className="ti ti-shield text-success" /> Permission
              </Link>
            )}
          </div>
        </div>
      );
    },
  },
];
