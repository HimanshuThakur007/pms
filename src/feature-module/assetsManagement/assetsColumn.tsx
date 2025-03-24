import { Link } from "react-router-dom";

export const assetsColumn = (
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
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    width: "316px",
    sorter: (a: any, b: any) => a.sku.length - b.sku.length,
  },
  {
    title: "Category",
    dataIndex: "parnetGrp",
    key: "parnetGrp",
    width: "316px",
    sorter: (a: any, b: any) => a.parnetGrp.length - b.parnetGrp.length,
  },
  {
    title: "Brand",
    dataIndex: "brandName",
    key: "brandName",
    width: "316px",
    sorter: (a: any, b: any) => a.brandName.length - b.brandName.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "316px",
    sorter: (a: any, b: any) => a.price.length - b.price.length,
  },
  {
    title: "Quantity",
    dataIndex: "minQty",
    key: "minQty",
    width: "316px",
    sorter: (a: any, b: any) => a.minQty.length - b.minQty.length,
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
                    data-bs-target="#assets_add"
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
export const brandColumn = (editHandler: any, deleteHandler: any, rights: any) => [
  {
    title: "Brand Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Brand Code",
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
            data-bs-target="#assetsmanagement_add"
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
]:[])
];
export const categoryColumn = (editHandler: any, deleteHandler: any, rights:any) => [
  {
    title: "Category Name",
    dataIndex: "name",
    key: "depName",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Category Code",
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
            data-bs-target="#assetsmanagement_add"
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
]:[])
];
export const subcategoryColumn = (editHandler: any, deleteHandler: any,rights:any) => [
  {
    title: "SubCategory Name",
    dataIndex: "name",
    key: "name",
    width: "316px",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "SubCategory Code",
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
            data-bs-target="#assetsmanagement_add"
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
]:[])
];
export const unitColumn = (editHandler: any, deleteHandler: any,rights:any) => [
  {
    title: "Unit Name",
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
            data-bs-target="#assetsmanagement_add"
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
    ]:[])
];
