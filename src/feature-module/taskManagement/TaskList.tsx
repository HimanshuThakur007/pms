import React, { useState } from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import CollapseHeader from "../../core/common/collapse-header";
import {
  initialSettings,
} from "../../core/common/selectoption/selectoption";

const TaskList = ({ data, Heading, modalId, columns, rights }: any) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

const filteredData = data.filter((item: any) =>
    Object.values(item)
      .join(" ") 
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredData.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const simulateRowClick = (record: any,  e:any) => {
      e.preventDefault()
      if (columns[0]) {
        columns[0](record);
      } 
    }
    const simulateDeleteRowClick = (record: any,  e:any) => {
      e.preventDefault()
      if (columns[1]){
        //  console.log(columns[1],'delete called')
        columns[1](record)
      }
    }

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
                      {Heading} <span className="count-title">{filteredData.length || 0}</span>
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
                      <div className="icon-form mb-sm-0">
                        <span className="form-icon">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Task"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                    {rights?.mCreate === 1 && (
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end mb-3 mb-sm-0">
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target={modalId}
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add New {Heading}
                        </Link>
                      </div>
                    )}
                    </div>
                  </div>
                  {/* /Search */}
                </div>

                <div className="card-body">
                  {/* Filter */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="icon-form me-2">
                        <span className="form-icon">
                          <i className="ti ti-calendar" />
                        </span>
                        <DateRangePicker initialSettings={initialSettings}>
                          <input
                            className="form-control bookingrange"
                            type="text"
                          />
                        </DateRangePicker>
                      </div>
                    </div>
                  </div>
                  {/* /Filter */}

                  {/* Recent Task List */}
                  {rights?.mView === 1 ? (
                    <>
                  
                  <div className="task-wrapper">
                    <div className="tasks-activity tasks collapse show" id="recent">
                      <ul>
                        {currentTasks.map((item: any) => (
                          <li className="task-wrap pending" key={item.code}>
                            <div className="task-info">
                              <span className="task-icon">
                                <i className="ti ti-grip-vertical" />
                              </span>
                              <div className="set-star rating-select">
                                <i className="fa fa-star" />
                              </div>
                              <p>{item.name}</p>
                              <span className="badge badge-tag bg-pending">
                                {item.categoryName}
                              </span>
                              <span
                                className={`badge badge-pill badge-status ${
                                  item.priority === 2
                                    ? "bg-warning"
                                    : item.priority === 3
                                    ? "bg-green"
                                    : "bg-danger"
                                }`}
                              >
                                {item.priorityName}
                              </span>
                            </div>

                            <div className="task-actions">
                              <ul>
                                <li className="task-time">
                                  {item.status === 2 && (
                                    <span className="badge badge-tag badge-danger-light">
                                      {item.statusName}
                                    </span>
                                  )}
                                  {item.status === 1 && (
                                    <span className="badge badge-tag badge-success-light">
                                      {item.statusName}
                                    </span>
                                  )}
                                </li>

                                <li className="task-date">
                                  <i className="ti ti-calendar-exclamation" />
                                  {item.sDate} - {item.eDate}
                                </li>
                                {(rights?.mEdit === 1 || rights?.mDelete === 1 )&& (
                                <li className="task-owner">
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
                                        className="dropdown-item"
                                        data-bs-toggle="offcanvas"
                                        to="#"
                                        data-bs-target={modalId}
                                        onClick={(e)=>simulateRowClick(item, e)}
                                      >
                                        <i className="ti ti-edit text-blue"></i> Edit
                                      </Link>
                                    )}
                                      {rights?.mDelete === 1 && (
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={(e) => simulateDeleteRowClick(item, e)}
                                      >
                                        <i className="ti ti-trash text-danger" /> Delete
                                      </Link>
                                      )}
                                    </div>
                                  </div>
                                </li>
                                )}
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* /Recent Task List */}

                  {/* Pagination Controls */}
                  <div className="pagination-controls mt-4 d-flex justify-content-between">
                    {/* Items per page */}
                    <div className="mb-3">
                      {/* <label htmlFor="items-per-page" className="form-label">
                        Items per page:
                      </label> */}
                      <select
                        id="items-per-page"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="form-select"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    {/* Pagination */}
                    <div>
                      <nav aria-label="Page navigation">
                        <ul className="pagination ant-pagination">
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(1)}
                              disabled={currentPage === 1}
                            >
                              First
                            </button>
                          </li>
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {[...Array(totalPages)].map((_, index) => (
                            <li
                              key={index + 1}
                              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </li>
                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(totalPages)}
                              disabled={currentPage === totalPages}
                            >
                              Last
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  </>
                  ):"You don't have right's to access task"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
