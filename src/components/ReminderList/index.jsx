import React from "react";
import { useSelector } from "react-redux";
import getDailyReminder from "../../utils/getDailyReminder";

import "./style.scss";

function ReminderList({ day }) {
  const calendarStore = useSelector((state) => state.calendar);
  const reminders = getDailyReminder(day, calendarStore);

  return (
    <div className="reminder-list">
      {reminders.dateReminders && reminders.dateReminders.length > 0 && (
        <div className="reminder-list__container">
          <p className="reminder-list__header">{`${
            reminders.city
          } (${reminders.icon.replaceAll("-", " ")})`}</p>
          <ul className="reminder-list__list">
            {reminders.dateReminders.map(({ title, id }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReminderList;
