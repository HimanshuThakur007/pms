import { Link } from "react-router-dom";

export const customerColumn = (
  editHandler: any,
  deleteHandler: any,
  rights: any
) => [
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
                    data-bs-target="#customer_add"
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
export const storeColumn = (
  editHandler: any,
  deleteHandler: any,
  rights: any
) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Store Code",
    dataIndex: "alias",
    key: "alias",
    width: "316px",
    sorter: (a: any, b: any) => a.alias.length - b.alias.length,
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
                    data-bs-target="#store_add"
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
        },
      ]
    : []),
];
