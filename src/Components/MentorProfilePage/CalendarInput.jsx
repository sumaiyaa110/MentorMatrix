import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarInput.css';

const CalendarInput = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    // Add the selected date to the mentor's available slots
    console.log(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      showTimeSelect
      dateFormat="Pp"
      placeholderText="Select a date and time"
    />
  );
};

export default CalendarInput;
