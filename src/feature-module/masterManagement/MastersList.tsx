import React from "react";
import Table from "../../core/common/dataTable/index";
import { rolesPermissionsData } from "../../core/data/json/rolesPermissions";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { TableData } from "../../core/data/interface";
import CollapseHeader from "../../core/common/collapse-header";
import EditModal from "./EditModal";
import { AddModal } from "./AddModal";
import DepartmentModal from "./DepartmentModal";
import { contactresetHandler, resetHandler } from "./modifyForm";
import ContactModal from "./ContactModal";
import CustomerModal from "./CustomerModal";
const route = all_routes;

const MastersList = ({
  paramId,
  loading,
  columns,
  data,
  inputValue,
  handleInputField,
  Header,
  setLoading,
  setInputValue,
  RecallFunctionHandler,
  selectedInput,
  setSelectedInput,
  handleSelectChange,
  dates,
  setDates,
  handleDateChange,
  contypeoftrade,
  contype,
  conlocation,
  businessNatureList,
  handlecontactSelectChange,
  mobiledata,
  selectedOptions
  
}: any) => {
  //   const dataSource = rolesPermissionsData;
  //   const columns = [
  //     {
  //       title: "Role Name",
  //       dataIndex: "roleName",
  //       sorter: (a: TableData, b: TableData) =>
  //       a.roleName.length - b.roleName.length,
  //       key: "roleName",
  //       width: "235px",
  //     },
  //     {
  //       title: "Created at",
  //       dataIndex: "createdAt",
  //       sorter: (a: TableData, b: TableData) =>
  //       a.createdAt.length - b.createdAt.length,
  //       key: "createdAt",
  //       width: "316px",
  //     },
  //     {
  //       title: "Action",
  //       dataIndex: "action",
  //       key: "action",
  //       width: "128px",
  //       render: () => (
  //         <div className="dropdown table-action">
  //           <Link
  //             to="#"
  //             className="action-icon"
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             <i className="fa fa-ellipsis-v" />
  //           </Link>
  //           <div className="dropdown-menu dropdown-menu-right">
  //             <Link
  //               className="dropdown-item edit-popup"
  //               to="#"
  //               data-bs-toggle="modal"
  //               data-bs-target="#edit_role"
  //             >
  //               <i className="ti ti-edit text-blue" /> Edit
  //             </Link>
  //             <Link className="dropdown-item" to={route.permissions}>
  //               <i className="ti ti-shield text-success" /> Permission
  //             </Link>
  //           </div>
  //         </div>
  //       ),
  //     },
  //   ];
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
                    <h4 className="page-title">{Header} List</h4>
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
                      {/* {paramId != 3 &&(
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                        //   data-bs-target="#add_role"
                          data-bs-target="#add_role"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add New {Header}
                        </Link>)} */}
                       {paramId == 3 ? (
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#department_add"
                          onClick={()=>resetHandler(setInputValue)}
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Department
                        </Link>) :
                       paramId == 5 ? (
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#contact_add"
                          onClick={()=>contactresetHandler(setInputValue,setSelectedInput,setDates,contypeoftrade,contype,conlocation)}
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Contact
                        </Link>): paramId == 2 ? (
                           <Link
                            to="#"
                            className="btn btn-primary"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#customer_add"
                          >
                            <i className="ti ti-square-rounded-plus me-2" />
                            Add New Customer
                          </Link>
                        ): 
                        (<Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                        //   data-bs-target="#add_role"
                          data-bs-target="#add_role"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add New {Header}
                        </Link>)} 
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>
                <div className="card-body">
                  {/* Roles List */}
                  <div className="table-responsive custom-table">
                    <Table columns={columns} dataSource={data} />
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
      <AddModal 
      Header={Header} 
      paramId={paramId}
      inputValue={inputValue}
      handleInputField={handleInputField}
      setLoading={setLoading}
      setInputValue={setInputValue}
      RecallFunctionHandler={RecallFunctionHandler}
      />
      {/* /Add Role */}
      {/* Edit Role */}
      <EditModal
        paramId={paramId}
        Header={Header}
        inputValue={inputValue}
        handleInputField={handleInputField}
        setLoading={setLoading}
        setInputValue={setInputValue}
        RecallFunctionHandler={RecallFunctionHandler}
      />
      {/* /Edit Role */}
      {/* /Department */}
      <DepartmentModal
       inputValue={inputValue}
       handleInputField={handleInputField}
       setLoading={setLoading}
       setInputValue={setInputValue}
       RecallFunctionHandler={RecallFunctionHandler}
      />

      <ContactModal
      inputValue={inputValue}
      handleInputField={handleInputField}
      setLoading={setLoading}
      setInputValue={setInputValue}
      RecallFunctionHandler={RecallFunctionHandler}
      selectedInput={selectedInput}
      setSelectedInput={setSelectedInput}
      handleSelectChange={ handleSelectChange}
      dates={dates}
      setDates={setDates}
      handleDateChange={handleDateChange}
      contypeoftrade={contypeoftrade}
      contype={contype}
      conlocation={conlocation}
      />

      <CustomerModal 
      businessNatureList={businessNatureList}
      handlecontactSelectChange={handlecontactSelectChange}
      mobiledata={mobiledata}
      selectedOptions={selectedOptions}
      inputValue={inputValue}
      handleInputField={handleInputField}
      setLoading={setLoading}
      setInputValue={setInputValue}
      />
      
    </>
  );
};

export default MastersList;
