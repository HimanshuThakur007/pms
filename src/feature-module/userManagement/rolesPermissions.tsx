import React from "react";
import Table from "../../core/common/dataTable/index";
import { rolesPermissionsData } from "../../core/data/json/rolesPermissions";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { TableData } from "../../core/data/interface";
import CollapseHeader from "../../core/common/collapse-header";
const route = all_routes;

const RolesPermissions = () => {
  const dataSource = rolesPermissionsData;
  const columns = [
    {
      title: "Role Name",
      dataIndex: "roleName",
      sorter: (a: TableData, b: TableData) =>
      a.roleName.length - b.roleName.length,
      key: "roleName",
      width: "235px",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      sorter: (a: TableData, b: TableData) =>
      a.createdAt.length - b.createdAt.length,
      key: "createdAt",
      width: "316px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "128px",
      render: () => (
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
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>
            <Link className="dropdown-item" to={route.permissions}>
              <i className="ti ti-shield text-success" /> Permission
            </Link>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
  {/* Page Wrapper */}
  <div className="page-wrapper">
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-8">
                <h4 className="page-title">Roles</h4>
              </div>
              <div className="col-4 text-end">
                <div className="head-icons">
                 <CollapseHeader/>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="card">
            <div className="card-header">
              {/* Search */}
              <div className="row align-items-center">
                <div className="col-sm-4">
                  <div className="icon-form mb-3 mb-sm-0">
                    <span className="form-icon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Roles"
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="text-sm-end">
                    <Link
                      to="#"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#add_role"
                    >
                      <i className="ti ti-square-rounded-plus me-2" />
                      Add New Roles
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Search */}
            </div>
            <div className="card-body">
              {/* Roles List */}
              <div className="table-responsive custom-table">
              <Table columns={columns} dataSource={dataSource} />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="datatable-length" />
                </div>
                <div className="col-md-6">
                  <div className="datatable-paginate" />
                </div>
              </div>
              {/* /Roles List */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  {/* Add Role */}
  <div className="modal fade" id="add_role" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Role</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                Role Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add Role */}
  {/* Edit Role */}
  <div className="modal fade" id="edit_role" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Role</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                Role Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Admin"
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Role */}
</>

  );
};

export default RolesPermissions;
