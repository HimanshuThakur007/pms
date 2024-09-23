import React from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import Select from "react-select";
import { options1 } from "../../../core/common/selectoption/selectoption";
import { pipelineData } from "../../../core/data/json/pipelineData";
import Table from "../../../core/common/dataTable/index";
import { TableData } from "../../../core/data/interface";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import CollapseHeader from "../../../core/common/collapse-header";
import { all_routes } from "../../router/all_routes";
const route = all_routes;
const Pipeline = () => {
  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const data = pipelineData;
  const columns = [
    {
      title: "Pipeline Name",
      dataIndex: "name",
      sorter: (a: TableData, b: TableData) => a.name.length - b.name.length,
    },
    {
      title: "Total Deal Value",
      dataIndex: "deal_value",
      sorter: (a: TableData, b: TableData) =>
        a.deal_value.length - b.deal_value.length,
    },
    {
      title: "No of Deals",
      dataIndex: "no_deal",
      sorter: (a: TableData, b: TableData) =>
        a.no_deal.length - b.no_deal.length,
    },

    {
      title: "Stages",
      dataIndex: "stage",
      render: (text: any, record: any) => (
        <div className="pipeline-progress d-flex align-items-center">
          <div className="progress">
            {text === "In Pipeline" && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {text === "Win" && (
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
              ></div>
            )}
            {text === "Follow Up" && (
              <div
                className="progress-bar progress-bar-warning"
                role="progressbar"
              ></div>
            )}
            {text === "In PipeLine" && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {text === "Schedule Service" && (
              <div
                className="progress-bar progress-bar-pink"
                role="progressbar"
              ></div>
            )}
            {text === "Lost" && (
              <div
                className="progress-bar progress-bar-danger"
                role="progressbar"
              ></div>
            )}
            {text === "Conversation" && (
              <div
                className="progress-bar progress-bar-green"
                role="progressbar"
              ></div>
            )}
          </div>
          <span>{text}</span>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.stage.length - b.stage.length,
    },
    {
      title: "Created Date",
      dataIndex: "createdat",
      sorter: (a: TableData, b: TableData) =>
        a.createdat.length - b.createdat.length,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text: any) => (
        <div>
          {text === "Active" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}
          {text === "Inactive" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i className="fa fa-ellipsis-v"></i>
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: "translate3d(-99.3333px, 35.3333px, 0px)",
            }}
            data-popper-placement="bottom-start"
          >
           <Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit" to="#"><i className="ti ti-edit text-blue"></i> Edit</Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_pipeline"
            >
              <i className="ti ti-trash text-danger"></i> Delete
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
                  <div className="col-4">
                    <h4 className="page-title">
                      Pipeline<span className="count-title">123</span>
                    </h4>
                  </div>
                  <div className="col-8 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
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
          placeholder="Search Pipeline"
        />
      </div>
    </div>
  </div>
  {/* /Search */}
</div>

                <div className="card-body">
                
                <>
  {/* Filter */}
  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
    <div className="d-flex align-items-center flex-wrap row-gap-2">
      <div className="dropdown me-2">
        <Link
          to="#"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i className="ti ti-sort-ascending-2 me-2" />
          Sort
        </Link>
        <div className="dropdown-menu  dropdown-menu-start">
          <ul>
            <li>
              <Link to="#" className="dropdown-item">
                <i className="ti ti-circle-chevron-right me-1" />
                Ascending
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                <i className="ti ti-circle-chevron-right me-1" />
                Descending
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                <i className="ti ti-circle-chevron-right me-1" />
                Recently Viewed
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                <i className="ti ti-circle-chevron-right me-1" />
                Recently Added
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="dropdown">
        <Link
          to="#"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i className="ti ti-package-export me-2" />
          Export
        </Link>
        <div className="dropdown-menu  dropdown-menu-end">
          <ul>
            <li>
              <Link to="#" className="dropdown-item">
                <i className="ti ti-file-type-pdf text-danger me-1" />
                Export as PDF
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                <i className="ti ti-file-type-xls text-green me-1" />
                Export as Excel{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center flex-wrap row-gap-2">
      <div className="dropdown me-2">
        <Link
          to="#"
          className="btn bg-soft-purple text-purple"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          <i className="ti ti-columns-3 me-2" />
          Manage Columns
        </Link>
        <div className="dropdown-menu  dropdown-menu-md-end dropdown-md p-3">
          <h4 className="mb-2 fw-semibold">Want to manage datatables?</h4>
          <p className="mb-3">
            Please drag and drop your column to reorder your table and enable
            see option as you want.
          </p>
          <div className="border-top pt-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Pipeline Name
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-name" className="check" />
                <label htmlFor="col-name" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Deal Value
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-phone" className="check" />
                <label htmlFor="col-phone" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                No of Deals
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-email" className="check" />
                <label htmlFor="col-email" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Stages
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-tag" className="check" />
                <label htmlFor="col-tag" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Created Dates
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-loc" className="check" />
                <label htmlFor="col-loc" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Action
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-rate" className="check" />
                <label htmlFor="col-rate" className="checktoggle" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-sorts dropdown me-2">
        <Link
          to="#"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          <i className="ti ti-filter-share" />
          Filter
        </Link>
        <div className="filter-dropdown-menu dropdown-menu dropdown-menu-md-end p-3">
          <div className="filter-set-view">
            <div className="filter-set-head">
              <h4>
                <i className="ti ti-filter-share" />
                Filter
              </h4>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="filter-set-content">
                <div className="filter-set-content-head">
                  <Link
                    to="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    Pipeline Name
                  </Link>
                </div>
                <div
                  className="filter-set-contents accordion-collapse collapse show"
                  id="collapseTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="filter-content-list">
                    <div className="mb-2 icon-form">
                      <span className="form-icon">
                        <i className="ti ti-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Pipeline"
                      />
                    </div>
                    <ul>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox"  />
                            <span className="checkmarks" />
                            Sales
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Marketing
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Calls
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Email
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Chats
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="filter-set-content">
                <div className="filter-set-content-head">
                  <Link
                    to="#"
                    className="collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#stage"
                    aria-expanded="false"
                    aria-controls="stage"
                  >
                    Stages
                  </Link>
                </div>
                <div
                  className="filter-set-contents accordion-collapse collapse"
                  id="stage"
                  data-bs-parent="#accordionExample"
                >
                  <div className="filter-content-list">
                    <div className="mb-2 icon-form">
                      <span className="form-icon">
                        <i className="ti ti-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Stages"
                      />
                    </div>
                    <ul>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" defaultChecked />
                            <span className="checkmarks" />
                            Win
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            In Pipeline
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Conversation
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Schedule Service
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Lost
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="filter-set-content">
                <div className="filter-set-content-head">
                  <Link
                    to="#"
                    className="collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#Status"
                    aria-expanded="false"
                    aria-controls="Status"
                  >
                    Status
                  </Link>
                </div>
                <div
                  className="filter-set-contents accordion-collapse collapse"
                  id="Status"
                  data-bs-parent="#accordionExample"
                >
                  <div className="filter-content-list">
                    <ul>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" defaultChecked />
                            <span className="checkmarks" />
                            Active
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            Inactive
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="filter-set-content">
                <div className="filter-set-content-head">
                  <Link
                    to="#"
                    className="collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Created Date
                  </Link>
                </div>
                <div
                  className="filter-set-contents accordion-collapse collapse"
                  id="collapseOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="filter-content-list">
                    <ul>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" defaultChecked />
                            <span className="checkmarks" />
                            17 Nov 2023
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            23 Nov 2023
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            14 Dec 2023
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="filter-checks">
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                            09 Dec 2023
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-reset-btns">
              <div className="row">
                <div className="col-6">
                  <Link to="#" className="btn btn-light">
                    Reset
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="#" className="btn btn-primary">
                    Filter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        to="#"
        className="btn btn-primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas_pipeline"
      >
        <i className="ti ti-square-rounded-plus me-2" />
        Add Pipeline
      </Link>
    </div>
  </div>
  {/* /Filter */}
</>

                  {/* Pipeline List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={data} columns={columns} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Pipeline List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <>
  {/* Add New Pipeline */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_pipeline"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Add New Pipeline</h4>
      <button
        type="button"
        className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i className="ti ti-x" />
      </button>
    </div>
    <div className="offcanvas-body">
      <form>
        <div>
          <div className="mb-3">
            <label className="col-form-label">
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input className="form-control" type="text" />
          </div>
          <div className="mb-3">
            <div className="pipe-title d-flex align-items-center justify-content-between">
              <h5 className="form-title">Pipeline Stages</h5>
              <Link
                to="#"
                className="add-stage"
                data-bs-toggle="modal"
                data-bs-target="#add_stage"
              >
                <i className="ti ti-square-rounded-plus" />
                Add New
              </Link>
            </div>
            <div className="pipeline-listing">
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Inpipeline
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Follow Up
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Schedule Service
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h5 className="form-title">Access</h5>
            <div className="d-flex flex-wrap access-item nav">
              <div
                className="radio-btn"
                data-bs-toggle="tab"
                data-bs-target="#all"
              >
                <input
                  type="radio"
                  className="status-radio"
                  id="all"
                  name="status"
                  defaultChecked
                />
                <label htmlFor="all">All</label>
              </div>
              <div
                className="radio-btn"
                data-bs-toggle="tab"
                data-bs-target="#select-person"
              >
                <input
                  type="radio"
                  className="status-radio"
                  id="select"
                  name="status"
                />
                <label htmlFor="select">Select Person</label>
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade" id="select-person">
                <div className="access-wrapper">
                  <div className="access-view">
                    <div className="access-img">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-21.jpg"
                        alt="Image"
                      />
                      Vaughan
                    </div>
                    <Link to="#">Remove</Link>
                  </div>
                  <div className="access-view">
                    <div className="access-img">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-01.jpg"
                        alt="Image"
                      />
                      Jessica
                    </div>
                    <Link to="#">Remove</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button
            type="button"
            data-bs-dismiss="offcanvas"
            className="btn btn-light me-2"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
           
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Add New Pipeline */}
</>
<>
  {/* Edit Pipeline */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Edit Pipeline</h4>
      <button
        type="button"
        className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i className="ti ti-x" />
      </button>
    </div>
    <div className="offcanvas-body">
      <form>
        <div>
          <div className="mb-3">
            <label className="col-form-label">
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              defaultValue="Inpipeline"
            />
          </div>
          <div className="mb-3">
            <div className="pipe-title d-flex align-items-center justify-content-between">
              <h5 className="form-title">Pipeline Stages</h5>
              <Link
                to="#"
                className="add-stage"
                data-bs-toggle="modal"
                data-bs-target="#add_stage"
              >
                <i className="ti ti-square-rounded-plus" />
                Add New
              </Link>
            </div>
            <div className="pipeline-listing">
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Inpipeline
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Follow Up
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Schedule Service
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h5 className="form-title">Access</h5>
            <div className="d-flex flex-wrap access-item nav">
              <div
                className="radio-btn"
                data-bs-toggle="tab"
                data-bs-target="#all"
              >
                <input
                  type="radio"
                  className="status-radio"
                  id="all"
                  name="status"
                  defaultChecked
                />
                <label htmlFor="all">All</label>
              </div>
              <div
                className="radio-btn"
                data-bs-toggle="tab"
                data-bs-target="#select-person"
              >
                <input
                  type="radio"
                  className="status-radio"
                  id="select"
                  name="status"
                />
                <label htmlFor="select">Select Person</label>
              </div>
            </div>
            <div className="tab-content mb-3">
              <div className="tab-pane fade" id="select-person">
                <div className="access-wrapper">
                  <div className="access-view">
                    <div className="access-img">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-21.jpg"
                        alt="Image"
                      />
                      Vaughan
                    </div>
                    <Link to="#">Remove</Link>
                  </div>
                  <div className="access-view">
                    <div className="access-img">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-01.jpg"
                        alt="Image"
                      />
                      Jessica
                    </div>
                    <Link to="#">Remove</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button
           type="submit"
            data-bs-dismiss="offcanvas"
            className="btn btn-light me-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary"  data-bs-dismiss="offcanvas">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Edit Pipeline */}
</>
<>
  {/* Delete Pipeline */}
  <div className="modal fade" id="delete_pipeline" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Pipeline?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> pipeline you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Stage */}
  {/* Delete Stage */}
  <div className="modal fade" id="delete_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Stage?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> stage you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Stage */}
  {/* Add New View */}
  <div className="modal custom-modal fade" id="save_view" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New View</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="mb-3">
              <label className="col-form-label">View Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="submit" className="btn btn-danger"  data-bs-dismiss="offcanvas">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add New View */}
  {/* Add New Stage */}
  <div className="modal custom-modal fade" id="add_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Stage</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="mb-3">
              <label className="col-form-label">Stage Name *</label>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="submit" className="btn btn-danger"  data-bs-dismiss="modal">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add New Stage */}
  {/* Edit Stage */}
  <div className="modal custom-modal fade" id="edit_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Stage</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="mb-3">
              <label className="col-form-label">Stage Name *</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Inpipeline"
              />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <Link  to="#" className="btn btn-danger"  data-bs-dismiss="modal">
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Edit Stage */}
</>

    </>
  );
};

export default Pipeline;
