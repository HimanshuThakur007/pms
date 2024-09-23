// eslint-disable-next-line @typescript-eslint/no-unused-expressions
import React from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import InputSelect from "../../core/common/InputSelect";
import InputDate, { convert, convertDate } from "../../core/common/InputDate";
import useFetch from "../../core/Hooks/useFetch";

const FilterHeader = ({
  dates,
  setSelectedValues,
  handleSelectChange,
  selectedValues,
  handleDateChange,
  getFunctinFilter,
  resetHandler,
}: any) => {
  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"),
    timePicker: false,
  };

  const api = useFetch();

  const [userList, setUserList] = React.useState([]);
  const [departmentList, setDepartmentList] = React.useState([]);

  const getuserCreationList = async () => {
    let currData: any = [];
    const userUrl = `/api/LoadUserMasterList?ProjType=1`;
    try {
      let { res, got } = await api(userUrl, "GET", "");
      if (res.status === 200) {
        const list = got.data;
        currData = list.map((element: any) => ({
          value: element.code,
          label: element.name,
        }));
        setUserList(currData);
      } else {
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      alert(err);
    }
  };

  const getDepartmentList = async () => {
    let depData: any = [];
    const Url = `/api/LoadDepMasterList`;
    try {
      let { res, got } = await api(Url, "GET", "");
      if (res.status === 200) {
        const list = got.data;
        depData = list.map((element: any) => ({
          value: element.code,
          label: element.name,
        }));
        setDepartmentList(depData);
      } else {
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      alert(err);
    }
  };

  React.useEffect(() => {
    getuserCreationList();
    getDepartmentList();
  }, []);
  

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-4 row-gap-2">
        <div className="d-flex align-items-center flex-wrap row-gap-2">
          <div className="dropdown me-2">
            <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
              <i className="ti ti-sort-ascending-2 me-2" />
              Sort{" "}
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
          <div className="icon-form">
            <span className="form-icon">
              <i className="ti ti-calendar" />
            </span>
            <DateRangePicker initialSettings={initialSettings}>
              <input className="form-control bookingrange" type="text" />
            </DateRangePicker>
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
                Please drag and drop your column to reorder your table and
                enable see option as you want.
              </p>
              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Lead Name
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-name" className="check" />
                    <label htmlFor="col-name" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Phone
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-phone" className="check" />
                    <label htmlFor="col-phone" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Email
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-email" className="check" />
                    <label htmlFor="col-email" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Company Name
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-tag" className="check" />
                    <label htmlFor="col-tag" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Lead Status
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-loc" className="check" />
                    <label htmlFor="col-loc" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Lead Owner
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-rate" className="check" />
                    <label htmlFor="col-rate" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Source
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-owner" className="check" />
                    <label htmlFor="col-owner" className="checktoggle" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-grip-vertical me-2" />
                    Created
                  </p>
                  <div className="status-toggle">
                    <input type="checkbox" id="col-status" className="check" />
                    <label htmlFor="col-status" className="checktoggle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-sorts dropdown">
            <Link to="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">
              <i className="ti ti-filter-share" />
              Filter
            </Link>
            <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-end p-3">
              <div className="filter-set-view">
                <div className="filter-set-head">
                  <h4>
                    <i className="ti ti-filter-share" />
                    Filter
                  </h4>
                </div>
                <InputSelect
                  selectName="User"
                  options={userList}
                  placeholder="Choose"
                  value={selectedValues.select1}
                  onChange={(selectedOption: any) =>
                    handleSelectChange(
                      selectedOption,
                      "select1",
                      setSelectedValues
                    )
                  }
                />
                <InputSelect
                  selectName="Department"
                  options={departmentList}
                  placeholder="Choose"
                  value={selectedValues.select2}
                  onChange={(selectedOption: any) =>
                    handleSelectChange(
                      selectedOption,
                      "select2",
                      setSelectedValues
                    )
                  }
                />
                <InputDate
                  labelName="from"
                  selected={dates.date1}
                  onChange={(date: any) => handleDateChange("date1", date)}
                />
                <InputDate
                  labelName="To"
                  selected={dates.date2}
                  onChange={(date: any) => handleDateChange("date2", date)}
                />

                <div className="filter-reset-btns">
                  <div className="row">
                    <div className="col-6">
                      <Link
                        to="#"
                        className="btn btn-light"
                        onClick={() => resetHandler()}
                      >
                        Reset
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        className="btn btn-primary"
                        onClick={() => {
                          getFunctinFilter();
                        }}
                      >
                        Filter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterHeader;
