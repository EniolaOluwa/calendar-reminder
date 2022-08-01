import React, { useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ReminderModal from "../ReminderModal";
import ReminderList from "../ReminderList";
import ReminderListModal from "../ReminderListModal";
import getDailyReminder from "../../utils/getDailyReminder";
import generateMonthData from "../../utils/generateMonthData";
import { toggleFormModal, toggleListModal } from "../../actions/calendar";

import "./style.scss";

function Calendar() {
  const present = moment();
  const monthData = generateMonthData(present);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState();

  const dispatch = useDispatch();
  const calendarStore = useSelector((state) => state.calendar);
  const [listModalIsOpen, setListModalIsOpen] = useState(false);

  function isToday(day) {
    return moment(day).isSame(new Date(), "day");
  }

  function getCalendarTitle() {
    return `${present.format("MMMM")} ${present.format("YYYY")}`;
  }

  function openListModal(day) {
    setSelectedDay(day);
    dispatch(toggleListModal());
  }

  function openModal(day) {
    setSelectedDay(day);
    dispatch(toggleFormModal());
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getDayClass(day) {
    const cssName = "calendar__day";
    if (isToday(day)) {
      return `${cssName}--today`;
    } else if (dayIsInCurrentMonth(day)) {
      return `${cssName}--current`;
    } else {
      return "";
    }
  }

  function dayIsInCurrentMonth(day) {
    return moment(moment(day)).isBetween(
      moment(present).startOf("month").subtract(1, "day").format("YYYY-MM-DD"),
      moment(present).endOf("month").add(1, "day").format("YYYY-MM-DD")
    );
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <h1>{getCalendarTitle()}</h1>
      </div>

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
                <p className={getDayClass(day)}>
                  <span>{day.format("D")}</span>
                </p>
                <ReminderList day={day} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <ReminderModal
        toast={toast}
        selectedDay={selectedDay}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
      <ReminderListModal
        day={selectedDay}
        modalIsOpen={listModalIsOpen}
        closeModal={() => dispatch(toggleListModal())}
      />
      <Toaster />
    </div>
  );
}

export default Calendar;
