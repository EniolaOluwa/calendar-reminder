import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ReminderModal from "../ReminderModal";
import ReminderList from "../ReminderList";
import CalendarHeader from "../CalendarHeader";
import ReminderListModal from "../ReminderListModal";
import getDailyReminder from "../../utils/getDailyReminder";
import generateMonthData from "../../utils/generateMonthData";
import { getCalendarMonth, getDayClass } from "../../utils/calendarHelpers";
import {
  toggleFormModal,
  toggleListModal,
  updateCurrentForm,
} from "../../actions/calendar";

import "./style.scss";

Modal.setAppElement("#root");

function Calendar() {
  const present = moment();
  const monthData = generateMonthData(present);
  const [selectedDay, setSelectedDay] = useState();

  const dispatch = useDispatch();
  const calendarStore = useSelector((state) => state.calendar);

  const openListModal = (day) => {
    setSelectedDay(day);
    dispatch(toggleListModal());
  };

  const openModal = (day) => {
    setSelectedDay(day);
    updateCurrentForm("");
    dispatch(toggleFormModal());
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <h1>{getCalendarMonth(present)}</h1>
      </div>

      <CalendarHeader />

      <div className="calendar__month">
        {monthData.map((week, weekInd) => (
          <div className="calendar__week" key={weekInd}>
            {week.map((day, dayInd) => (
              <div
                key={dayInd}
                className="calendar__day"
                onClick={() =>
                  getDailyReminder(day, calendarStore)?.dateReminders?.length
                    ? openListModal(day)
                    : openModal(day)
                }
              >
                <p className={getDayClass(day, present)}>
                  <span>{day.format("D")}</span>
                </p>
                <ReminderList day={day} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <ReminderModal toast={toast} selectedDay={selectedDay} />
      <ReminderListModal
        day={selectedDay}
        closeModal={() => dispatch(toggleListModal())}
      />
      <Toaster />
    </div>
  );
}

export default Calendar;
