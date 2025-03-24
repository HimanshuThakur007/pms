import React from "react";
import ListPage from "../../core/common/ListPage";
import TaskList from "../taskManagement/TaskList";

interface UserManagementListProps {
  columns: any;
  tableData: any;
  resetFormFunction: () => void;
  displayName: string;
  selectHandler: any;
  allData: any;
  dateRange: any;
  handleDateChange: (dates: any) => void;
  validateDateRange: any;
  loading: boolean;
  handelPassValue: (value: any) => void;
  rights:any;
}

const getModalId = (displayName: string) => {
  const modalMapping: { [key: string]: string } = {
    Task: "#task_add",
    User: "#offcanvas_add",
    Department: "#department_add",
    Designation: "#designation_add",
    Site: "#designation_add",
    Role: "#designation_add",
    Unit: "#designation_add",
    Customer: "#customer_add",
    Store: "#store_add",
    Assets: "#assets_add",
    Brand: "#assetsmanagement_add",
    Category: "#assetsmanagement_add",
    SubCategory: "#assetsmanagement_add",
    "Sub Task": "#taskmanagement_add",
    "Task Category": "#taskmanagement_add",
    "Task Type": "#taskmanagement_add",
    Goal: "#goal_add",
    Performance: "#performance_add",
    "Quality Task": "#qualityTask_add",
    "Work Order": "#workorder_add",
    "Preventive Maintenance": "#pm_add",
    Check: "#custom_add",
    Categories: "#custom_add",
    "Annual Performance Review/Appraisal": "#review_add",
  };

  return modalMapping[displayName] || "#";
};

const UserManagementList: React.FC<UserManagementListProps> = ({
  columns,
  tableData,
  resetFormFunction,
  displayName,
  selectHandler,
  allData,
  dateRange,
  handleDateChange,
  validateDateRange,
  loading,
  handelPassValue,
  rights
}) => {
  return (
    <>
      {displayName === "Task" ? (
        <TaskList
          data={tableData}
          Heading={displayName}
          columns={columns}
          modalId={getModalId(displayName)}
          rights={rights}
        />
      ) : (
        <ListPage
        rights={rights}
          loading={loading}
          columns={columns}
          data={tableData}
          Heading={displayName}
          dateRange={dateRange}
          handleDateChange={handleDateChange}
          validateDateRange={validateDateRange}
          handelPassValue={handelPassValue}
          modalId={getModalId(displayName)}
          resetForm={resetFormFunction}
          allData={allData}
          selectHandler={selectHandler}
        />
      )}
    </>
  );
};

export default UserManagementList;
