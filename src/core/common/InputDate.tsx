import React from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';

const InputDate = ({onChange,selected,labelName,required,star}:any) => {
  return (
    <div className="mb-3">
    <label className="col-form-label">
      {labelName} <span className='text-danger'>{star}</span>
    </label>
    <div className="icon-form-end">
      <span className="form-icon">
        <i className="ti ti-calendar-event" />
      </span>
      <DatePicker
          className="form-control datetimepicker deals-details"
          selected={selected}
          onChange={onChange}
          dateFormat="dd-MM-yyyy"
          required={required}
        />
    </div>
  </div>
  )
}

export default InputDate

export const convert =(str:any)=> {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var timeString = date.getHours() + ':' + date.getMinutes() + ':00';

    return [date.getFullYear(), mnth, day].join("-") + " " +timeString;
};


// var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

export const convertDate =(str:any)=> {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
   
    return [date.getFullYear(), mnth, day].join("-");
  }

  export const convertToIST = (dateString: string) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const dateObject = new Date(year, month - 1, day); // JavaScript months are 0-indexed
  
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata", // Indian Standard Time
      year: "numeric",         // Allowed values are "numeric" or "2-digit"
      month: "long",          // Allowed values include "long", "short", "numeric", "2-digit"
      day: "numeric",         // Same options as above
      hour: "numeric",        // Same options as above
      minute: "numeric",      // Same options as above
      second: "numeric",      // Same options as above
    };
  
    return new Intl.DateTimeFormat("en-IN", options).format(dateObject);
  };

  export const convertToISTDateObject = (dateString:any) => {
    // Parse the date in "DD/MM/YYYY" format and set it to Indian Standard Time
    return moment.tz(dateString, "DD/MM/YYYY", "Asia/Kolkata").toDate();
  };
  
  