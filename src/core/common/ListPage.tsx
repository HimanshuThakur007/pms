import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../core/common/dataTable/index";
import CollapseHeader from "./collapse-header";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import DateRangePickerComponent from "./DateRangePickerComponent";
import Select from "react-select";
import CenteredButton from "./CenteredButton";
import ExportDropdown from "./ExportDropdown";
// import AddUserModal from "./AddUserModal";
const customStyles = {
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};
const excludedAddButton = [
  "Task List",
  "Quality Check",
  "Preventive Maintenance",
  "Task Status",
  "Notification",
  "Task Details",
  "Task Approval",
]
const excludedFilter = [
  "Annual Performance Review/Appraisal", 
  "Goal", 
  "Site",
  "Designation", 
  "Department",
  "User",
  "Customer",
  "Store",
  "Work Order",
  "Check",
  "Categories",
  "Unit",
  "Role",
  "Brand",
  "Category",
  "SubCategory",
  "Unit",
  "Sub Task",
  "Task Category",
  "Task Type",
  "Task List"
]
const ListPage = ({
  columns,
  data,
  Heading,
  modalId,
  resetForm,
  allData,
  selectHandler,
  handleDateChange,
  dateRange,
  validateDateRange,
  loading,
  handelPassValue,
  rights
}: any) => {
  //   const data = manageusersData;
  const [searchQuery, setSearchQuery] = useState("");
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  
  const yearRange = `${previousYear} - ${currentYear}`;
  useEffect(() => {
    setSearchQuery("");
  }, [Heading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item: any) => {
    return columns.some((column: any) => {
      const value = item[column.dataIndex];
      return (
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  });

  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //   XLSX.writeFile(wb, "table_data.xlsx");
  // };
  // const exportToExcel = () => {
  //   if (!data || !columns) return;

  //   const columnHeaders = columns.map((col: any) => col.title); 
  //   const columnKeys = columns.map((col: any) => col.dataIndex);
  
  //   const filteredData = data.map((row: any) => {
  //     let filteredRow: any = {};
  //     columnKeys.forEach((key:any, index:number) => {
  //       filteredRow[columnHeaders[index]] = row[key] || "";
  //     });
  //     return filteredRow;
  //   });
  
  //   // Create a worksheet and workbook
  //   const ws = XLSX.utils.json_to_sheet(filteredData);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
  //   // Write and download file
  //   XLSX.writeFile(wb, "table_data.xlsx");
  // };

  const exportToExcel = () => {
    if (!data || !columns) return;
  
    // Exclude the "Action" column
    const filteredColumns = columns.filter((col: any) => col.title !== "Action");
  
    // Extract visible column headers and their data keys
    const columnHeaders = filteredColumns.map((col: any) => col.title); 
    const columnKeys = filteredColumns.map((col: any) => col.dataIndex); 
  
    const filteredData = data.map((row: any) => {
      let filteredRow: any = {};
      
      filteredColumns.forEach((col: any, index:number) => {
        let value = row[col.dataIndex];
  
        if (col.render && typeof col.render === "function") {
          value = col.render(value);
          // Extracting plain text if render returns JSX
          if (typeof value === "object" && value?.props?.children) {
            value = Array.isArray(value.props.children) 
              ? value.props.children.map((child: any) => (typeof child === "string" ? child : "")).join(" ")
              : (typeof value.props.children === "string" ? value.props.children : "");
          }
        }
  
        filteredRow[columnHeaders[index]] = value || ""; 
      });
  
      return filteredRow;
    });
  
    // Create a worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Write and download file
    XLSX.writeFile(wb, `${Heading}.xlsx`);
  };
  
  

  // Export to PDF
  // const exportToPDF = () => {
  //   const doc = new jsPDF();

  //   // Table columns (header)
  //   const tableColumn = columns.map((col: any) => col.title);

  //   // Table rows (data)
  //   const tableRows = data.map((row: any) => columns.map((col: any) => row[col.dataIndex]));

  //   // Generate the table in the PDF document
  //   doc.autoTable({
  //     head: [tableColumn],
  //     body: tableRows,
  //     startY: 20, // Start position of the table
  //   });

  //   // Save the PDF
  //   doc.save('table_data.pdf');
  // };
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
                    <h4 className="page-title">
                      {Heading === "Annual Performance Review/Appraisal" ? (<span style={{color:'#000080'}}>Annual Performance / Goal Review {previousYear} And Goal Setting {currentYear}</span>) :<>{Heading}</>}
                      <span className="count-title">{data?.length}</span>
                    </h4>
                    {Heading === "Annual Performance Review/Appraisal" && (
                      <span>
                        <h6 className="mb-2" style={{fontFamily:'italic'}}>
                          We welcome you to the Annual Performance/Goal Review{" "}
                          {previousYear} and Goal Setting {currentYear}{" "}
                          window, providing you opportunity to reflect on your
                          last year performance and get valuable insights and
                          feedback from your manager.
                        </h6>
                        <span className="mb-2">
                          <span className="d-flex mb-1">
                            <h5 style={{color:'#000080'}}>Review Period :- </h5>
                            <p className="ms-1" style={{fontFamily:'italic'}}>
                              {" "}
                              Performance/Goal Review {previousYear} and Goal Setting {currentYear} 
                            </p>
                          </span>
                          <h5 className="mb-1" style={{color:'#000080'}}>
                          {previousYear} Goal Review Process Flow
                          </h5>
                          <p className="mb-1">
                          Self Review &gt; Manager’s Review &gt; HOD’s Review
                          </p>
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="col-4 text-end">
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
                      {rights?.mView === 1 && (
                        <div className="icon-form mb-3 mb-sm-0">
                          <span className="form-icon">
                            <i className="ti ti-search" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Search ${Heading}`}
                            value={searchQuery}
                            onChange={handleSearchChange}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                        {Heading !== "Annual Performance Review/Appraisal" &&
                          rights?.mView === 1 && (
                            <ExportDropdown
                              onExportExcel={exportToExcel}
                              onExportPDF={() => {}}
                            />
                          )}
                        {!excludedAddButton.includes(Heading) &&
                          rights?.mCreate === 1 && (
                            <Link
                              to="#"
                              className="btn btn-primary"
                              data-bs-toggle="offcanvas"
                              onClick={resetForm}
                              //   data-bs-target="#offcanvas_add"
                              data-bs-target={modalId}
                            >
                              <i className="ti ti-square-rounded-plus me-2" />
                              {Heading !== "Annual Performance Review/Appraisal" ? `Add ${Heading}` : `Click Here for Annual Performance / Goal Review ${previousYear} and Goal Setting ${currentYear}`}
                              {/* Click Here for Annual Performance / Goal Review Form */}
                            </Link>
                          )}

                        {Heading === "Preventive Maintenance" &&
                          rights?.mCreate === 1 && (
                            <CenteredButton
                              buttonLabel="Create Preventive Maintenance"
                              handelPassValue={handelPassValue}
                              resetForm={resetForm}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>
                <div className="card-body">
                  {/* Filter */}
                  {!excludedFilter.includes(Heading) && (
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                      {Heading !== "Quality Check" &&
                        Heading !== "Notification" &&
                        Heading !== "Task Approval" && (
                          <div className="d-flex align-items-center flex-wrap row-gap-2">
                            <div className="icon-form">
                              <span className="form-icon">
                                <i className="ti ti-calendar" />
                              </span>
                              <DateRangePickerComponent
                                startDate={dateRange.startDate}
                                endDate={dateRange.endDate}
                                onChange={handleDateChange}
                                validation={validateDateRange}
                              />
                            </div>
                          </div>
                        )}
                      <div className="d-flex align-items-center flex-wrap row-gap-2">
                        <div className="dropdown me-2">
                          {Heading !== "Task Approval" ? (
                            <Select
                              placeholder="Select User..."
                              styles={customStyles}
                              options={allData?.user}
                              value={allData.userSelect}
                              onChange={(option: any) =>
                                selectHandler(option, "userSelect")
                              }
                              isClearable
                            />
                          ) : (
                            <Select
                              placeholder="Select Approval..."
                              styles={customStyles}
                              options={allData?.approval}
                              value={
                                allData.approvalSelect || {
                                  value: 1,
                                  label: "Reassign/Shift",
                                }
                              }
                              onChange={(option: any) =>
                                selectHandler(option, "approvalSelect")
                              }
                            />
                          )}
                        </div>
                        {Heading === "Task Details" &&
                          Heading !== "Task Approval" && (
                            <div className="form-sorts dropdown">
                              <Select
                                placeholder="Select Site..."
                                styles={customStyles}
                                options={allData?.site}
                                value={allData.siteSelect}
                                onChange={(option: any) =>
                                  selectHandler(option, "siteSelect")
                                }
                                isClearable
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  {/* /Filter */}
                  {/* Manage Users List */}
                  <div className="table-responsive custom-table">
                    <Table
                      columns={columns}
                      dataSource={filteredData}
                      loading={loading}
                      rights={rights?.mView}
                    />
                  </div>

                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Manage Users List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
