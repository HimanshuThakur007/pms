import React, { useState, useEffect } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS
import moment from "moment";

interface DateRangePickerComponentProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (selectedRange: { startDate: Date; endDate: Date }) => void;
  validation: (selectedRange: { startDate: Date; endDate: Date }) => boolean;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  startDate,
  endDate,
  onChange,
  validation,
}) => {
  // Function to generate default settings
  const generateDefaultSettings = () => {
    const today = new Date();

    // Reset today to avoid mutation
    const todayCopy = new Date(today);
    const last30Days = new Date(todayCopy);
    last30Days.setDate(todayCopy.getDate() - 30);
    
    const last7Days = new Date(todayCopy);
    last7Days.setDate(todayCopy.getDate() - 7);

    const thisMonthStart = new Date(todayCopy.getFullYear(), todayCopy.getMonth(), 1);
    const thisMonthEnd = new Date(todayCopy.getFullYear(), todayCopy.getMonth() + 1, 0);

    const lastMonthStart = new Date(todayCopy.getFullYear(), todayCopy.getMonth() - 1, 1);
    const lastMonthEnd = new Date(todayCopy.getFullYear(), todayCopy.getMonth(), 0);

    const yesterday = new Date(todayCopy);
    yesterday.setDate(todayCopy.getDate() - 1);
    
    return {
      endDate: endDate || today,
      ranges: {
        "Last 30 Days": [last30Days, today],
        "Last 7 Days": [last7Days, today],
        "This Month": [thisMonthStart, today],
        "Last Month": [lastMonthStart, lastMonthEnd],
        Today: [today, today],
        Yesterday: [yesterday, today],
      },
      startDate: startDate || today,
      timePicker: false,
    };
  };

  const [settings, setSettings] = useState(generateDefaultSettings());

  useEffect(() => {
    // Update the settings whenever startDate or endDate changes
    setSettings(generateDefaultSettings());
  }, [startDate, endDate]);

  const handleApply = (event: any, picker: any) => {
    const selectedRange = {
      startDate: picker.startDate.toDate(),
      endDate: picker.endDate.toDate(),
    };

    if (validation(selectedRange)) {
      setSettings({
        ...settings,
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
      });
      onChange(selectedRange);
    } else {
      alert("Invalid date range. Please check your selection.");
    }
  };

  return (
    <DateRangePicker initialSettings={settings} onApply={handleApply}>
      <input
        className="form-control bookingrange"
        type="text"
        value={`${moment(settings.startDate).format("DD/MM/YYYY")} - ${moment(settings.endDate).format("DD/MM/YYYY")}`}
        readOnly
      />
    </DateRangePicker>
  );
};

export default DateRangePickerComponent;
