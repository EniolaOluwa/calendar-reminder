import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "react-modal";
import TimePicker from "react-time-picker";
import CloseModalBtn from "../CloseModalBtn";
import customStyles from "../../utils/modalCustomStyles";
import getDailyReminder from "../../utils/getDailyReminder";
import getForecastForLocation from "../../utils/getForecastForLocation";
import {
  addNewReminder,
  toggleFormModal,
  updateReminder,
  updateCurrentForm,
} from "../../actions/calendar";

import "./style.scss";

function ReminderModal({ selectedDay, toast }) {
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const { showFormModal, currentFormId, reminders } = useSelector(
    (state) => state.calendar
  );

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleFormModal());
  };

  useEffect(() => {
    if (currentFormId) {
      setBtnIsDisabled(false);
      const currentDate = getDailyReminder(selectedDay, { reminders });
      const currentReminder = currentDate.dateReminders.find(
        (rem) => rem.id === currentFormId
      );
      setTitle(currentReminder.title);
      setLocation(currentDate.city);
      setWeather(currentDate.icon);
      setTime(currentReminder.time);
    }
  }, [currentFormId, selectedDay]);

  const getLocationInformation = async () => {
    if (!location) return;
    const icon = await getForecastForLocation(
      selectedDay,
      location,
      setBtnIsDisabled
    );
    setWeather(icon);
  };

  const submitReminder = (e) => {
    e.preventDefault();
    const info = {
      title,
      icon: weather,
      city: location,
      time,
      date: moment(selectedDay).format("YYYY-MM-DD"),
    };

    if (currentFormId) {
      info.id = currentFormId;
      dispatch(updateReminder(info));
      toast.success("Reminder has been updated");
    } else {
      dispatch(addNewReminder(info));
      toast.success("Reminder has been created");
    }
    setBtnIsDisabled(true);
    [setLocation, setTime, setTitle, setWeather].forEach((setter) =>
      setter("")
    );
    dispatch(toggleFormModal());
    dispatch(updateCurrentForm(""));
  };

  return (
    <Modal
      isOpen={showFormModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="reminder-modal__header">
        <h3>
          Reminder for
          {selectedDay && moment(selectedDay).format(" dddd MMMM DD, YYYY")}
        </h3>
        <CloseModalBtn onClick={closeModal} />
      </div>

      <form className="reminder-modal__form" onSubmit={submitReminder}>
        <div className="reminder-modal__form-group">
          <input
            placeholder="Reminder Title 30 character max"
            value={title}
            maxLength={30}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="reminder-modal__form-group">
          <input
            placeholder="Location/City"
            value={location}
            onBlur={getLocationInformation}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="reminder-modal__form-group">
          <TimePicker
            value={time}
            onChange={setTime}
            className="reminder-modal__time-picker"
          />
        </div>

        <div className="reminder-modal__form-group">
          <input placeholder="Weather" disabled value={weather} />
        </div>

        <button
          type="submit"
          className="reminder-modal__button"
          disabled={btnIsDisabled}
        >
          {currentFormId ? "Update Reminder" : " Add Reminder"}
        </button>
      </form>
    </Modal>
  );
}

export default ReminderModal;
