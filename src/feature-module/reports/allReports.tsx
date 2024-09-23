import Table from "../../core/common/dataTable/index";

import ImageWithBasePath from "../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import ReportsModal from "../../core/modals/reports_modal";
import { TableData } from "../../core/data/interface";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import CollapseHeader from "../../core/common/collapse-header";
import { leadsData } from "../../core/data/json/leads";
import { Leadcolumns } from "./AllReportsColumn";
import FilterHeader from "./FilterHeader";

const AllReports = ({
  tablecolumn,
  dataSource,
  initialSettings,
  chartOptions2,
  route,
  chartOptions1,
  dates,
  setSelectedValues,
  handleSelectChange,
  selectedValues,
  handleDateChange,
  getFunctinFilter,
  resetHandler,
  Header
}: any) => {
  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h4 className="page-title">
                      {Header} Report <span className="count-title">{dataSource.length}</span>
                    </h4>
                  </div>
                  <div className="col-sm-4 text-sm-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="card ">
                <div className="card-header">
                  {/* Search */}
                  <div className="row">
                    <div className="col-md-5 col-sm-4">
                      <div className="icon-form mb-3 mb-sm-0">
                        <span className="form-icon">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Leads"
                        />
                      </div>
                    </div>
                    <div className="col-md-7 col-sm-8">
                      <div className="text-sm-end">
                        <Link
                          to="download_report"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#download_report"
                        >
                          <i className="ti ti-file-download me-2" />
                          Download Report
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Search */}
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7 d-flex">
                      <div className="card shadow flex-fill">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                          <h4>Leads by Year</h4>
                          <div className="icon-form">
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
                        <div className="card-body">
                          <div id="leads-report">
                            <Chart
                              options={chartOptions2}
                              series={chartOptions2.series}
                              type="bar"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex">
                      <div className="card shadow flex-fill">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                          <h4>Leads by Source</h4>
                          <div className="icon-form">
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
                        <div className="card-body">
                          <div id="leads-analysis">
                            <Chart
                              options={chartOptions1}
                              series={chartOptions1.series}
                              type="donut"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Filter */}
                  <FilterHeader
                    dates={dates}
                    handleDateChange={handleDateChange}
                    setSelectedValues={setSelectedValues}
                    handleSelectChange={handleSelectChange}
                    selectedValues={selectedValues}
                    getFunctinFilter={getFunctinFilter}
                    resetHandler={resetHandler}
                  />
                  {/* /Filter */}
                  {/* Report List */}
                  <div className="table-responsive custom-table">
                    <Table columns={tablecolumn} dataSource={dataSource} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Report List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /Page Wrapper */}
      <ReportsModal />
    </div>
  );
};

export default AllReports;
