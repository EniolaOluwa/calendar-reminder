import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "react-modal";
import TimePicker from "react-time-picker";
import { addNewReminder, toggleFormModal } from "../../actions/calendar";

import "./style.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function ReminderModal({ selectedDay, toast }) {
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const { showFormModal } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch(toggleFormModal());
  }

  const apiKey = `BSJ998UF4TZW7KG9LDUXLCU2D`;
  const getUrlForForecast = (location) =>
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${moment(
      selectedDay
    ).format("YYYY-MM-DD")}?key=${apiKey}`;

  const getForecast = async (location) => {
    setBtnIsDisabled(true);
    try {
      const response = await fetch(getUrlForForecast(location));
      if (!response.ok) return "Failed to get weather";
      const { days } = await response.json();
      setBtnIsDisabled(false);
      return days[0].icon;
    } catch (error) {
      return "Error occur while getting weather";
    }
  };

  const getLocationInformation = async () => {
    if (!location) return;
    const icon = await getForecast(location);
    setWeather(icon);
  };

  const addReminder = (e) => {
    e.preventDefault();
    const info = {
      title,
      icon: weather,
      city: location,
      time,
      date: moment(selectedDay).format("YYYY-MM-DD"),
    };
    dispatch(addNewReminder(info));
    toast.success("Reminder has been created");
    setBtnIsDisabled(true);
    [setLocation, setTime, setTitle, setWeather].forEach((setter) =>
      setter("")
    );
    dispatch(toggleFormModal());
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
        <button className="reminder-modal__close-btn" onClick={closeModal}>
          Close
        </button>
      </div>

      <form className="reminder-modal__form" onSubmit={addReminder}>
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
          Add Reminder
        </button>
      </form>
    </Modal>
  );
}

export default ReminderModal;
