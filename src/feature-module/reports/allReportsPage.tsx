import React, { useState } from "react";
import AllReports from "./allReports";
import { Leadcolumns } from "./AllReportsColumn";
import { leadsData } from "../../core/data/json/leads";
import { all_routes } from "../router/all_routes";
import { convert, convertDate } from "../../core/common/InputDate";
import { getTableDataList } from "./utils";
import useFetch from "../../core/Hooks/useFetch";
import { useParams } from "react-router";

const AllReportsPage = () => {
  let callFetch = useFetch();
  const route = all_routes;
  const param:any = useParams();
  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    select2: null,
  });
  const[reset, setReset] = useState(0)
  const [userCode, setUserCode] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [departmentCode, setDepartmentCode] = React.useState(0);
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  const [dates, setDates] = useState({
    date1: oneMonthAgo,
    date2: currentDate,
  });
  const [tableData, setTableData] = useState([]);
  const [tablecolumn, setTablecolumn] = useState([]);

  const handleDateChange = (dateFieldName: string, dateValue: Date) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  const handleSelectChange = (
    selectedOption: any,
    selectName: any,
    setSelectedValues: any
  ) => {
    if (selectName === "select1") {
      setUserCode(selectedOption.value);
    } else if (selectName === "select2") {
      setDepartmentCode(selectedOption.value);
    }

    setSelectedValues((prevSelectedValues: any) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  const [chartOptions1] = useState<any>({
    series: [44, 55, 41, 17],
    chart: {
      type: "donut",
    },
    colors: ["#0092E4", "#4A00E5", "#E41F07", "#FFA201"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
  });

  const [chartOptions2] = useState<any>({
    series: [
      {
        name: "Reports",
        colors: ["#FFC38F"],
        data: [
          { x: "Jan", y: 400 },
          { x: "Feb", y: 130 },
          { x: "Mar", y: 240 },
          { x: "Apr", y: 450 },
          { x: "May", y: 250 },
          { x: "Jun", y: 180 },
          { x: "Jul", y: 300 },
          { x: "Aug", y: 240 },
          { x: "Sep", y: 300 },
          { x: "Oct", y: 150 },
          { x: "Nov", y: 250 },
          { x: "Dec", y: 500 },
        ],
      },
    ],
    colors: ["#00918E"],
    chart: {
      type: "bar",
      height: 275,
    },
    plotOptions: {
      bar: {
        borderRadiusApplication: "around",
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      group: {
        style: {
          fontSize: "0px",
          fontWeight: 700,
        },
      },
    },
  });

  // const dataSource = leadsData;
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
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };
  const leadSummarycolumns: any = Leadcolumns();

  const resetHandler = () => {
    setDates((previous: any) => {
      return { ...previous, date1: oneMonthAgo, date2: currentDate };
    });
    setUserCode(0);
    setDepartmentCode(0);
    setSelectedValues({
      select1: null,
      select2: null,
    });
    setReset(1)
console.log(dates,'dddd')
    // RecallFunctionHandler();
  };
  const getFunctinFilter = () => {
    RecallFunctionHandler();
    console.log("called");
  };

  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  const fetchData = (reportType: any, depCode: any) => {
    const sdate = formatDate(dates.date1);
    const edate = formatDate(dates.date2);
    getTableDataList(
      reportType,
      depCode,
      callFetch,
      userCode,
      departmentCode,
      sdate,
      edate,
      setTableData,
      setTablecolumn,
      leadSummarycolumns,
      setLoading,
      param.id
    );
  };

  const RecallFunctionHandler = () => {
    switch (param.id) {
      case "1":
        fetchData("LeadSummaryReport", "Department");
        break;
      case "2":
        fetchData("LeadTrailreport", "DepCode");
        break;

      default:
    }
  };

  React.useEffect(() => {
    RecallFunctionHandler();
    setReset(0)
  }, [param.id,reset]);

  return (
    <>
      <AllReports
        tablecolumn={tablecolumn}
        initialSettings={initialSettings}
        dataSource={tableData}
        chartOptions2={chartOptions2}
        route={route}
        chartOptions1={chartOptions1}
        dates={dates}
        setSelectedValues={setSelectedValues}
        handleSelectChange={handleSelectChange}
        selectedValues={selectedValues}
        handleDateChange={handleDateChange}
        getFunctinFilter={getFunctinFilter}
        resetHandler={resetHandler}
        Header={`${
          param.id == 1
            ? "Lead Summary"
            : param.id == 2
            ? "Lead Trail"
            : "List"
        }`}
      />
    </>
  );
};

export default AllReportsPage;
