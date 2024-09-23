import React, { useState, useEffect } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'daterangepicker/daterangepicker.css';
import moment from 'moment';

// Reusable DateRangePicker component
const MyDateRangePicker = ({ 
  name, 
  startDateInit, 
  endDateInit, 
  onDateChange, 
  inputClassName = 'form-control' 
}:any) => {
  const [dates, setDates] = useState({
    startDate: startDateInit || moment().subtract(30, 'days'),
    endDate: endDateInit || moment()
  });

  const [ranges, setRanges] = useState({});

  useEffect(() => {
    // Fetch or set your initial ranges dynamically
    const fetchedRanges = {
      "Last 30 Days": [
        moment().subtract(30, 'days'),
        moment()
      ],
      "Last 7 Days": [
        moment().subtract(7, 'days'),
        moment()
      ],
      "Last Month": [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
      ],
      "This Month": [
        moment().startOf('month'),
        moment().endOf('month')
      ],
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')]
    };
    setRanges(fetchedRanges);
  }, []);

  const handleApply = (event:any, picker:any) => {
    const { startDate, endDate } = picker;
    setDates({ startDate, endDate });
    if (onDateChange) {
      onDateChange(name, { startDate, endDate });
    }
  };

  return (
    <DateRangePicker
      initialSettings={{
        startDate: dates.startDate,
        endDate: dates.endDate,
        ranges,
        opens: 'left',
        timePicker: false
      }}
      onApply={handleApply}
    >
      <input
        type="text"
        className={inputClassName}
        value={
          dates.startDate && dates.endDate
            ? `${dates.startDate.format('MM/DD/YYYY')} - ${dates.endDate.format('MM/DD/YYYY')}`
            : ''
        }
        readOnly
      />
    </DateRangePicker>
  );
};

export default MyDateRangePicker;
