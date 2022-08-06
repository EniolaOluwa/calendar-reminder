import React from "react";
import moment from "moment";

import "./style.scss";

function CalendarHeader() {
  return (
    <div className="calendar-header">
      <ul className="calendar-header__weekdays">
        {moment.weekdays().map((day, index) => (
          <li key={index} className="calendar-header__weekday">
            {day}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarHeader;
