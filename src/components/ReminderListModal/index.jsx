import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import getDailyReminder from "../../utils/getDailyReminder";
import {
  toggleFormModal,
  toggleListModal,
  updateCurrentForm,
} from "../../actions/calendar";

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

function ReminderListModal({ day }) {
  const dispatch = useDispatch();
  const calendarStore = useSelector((state) => state.calendar);
  const reminders = getDailyReminder(day, calendarStore);

  const closeModal = () => dispatch(toggleListModal());
  const addNewReminder = () => {
    dispatch(toggleListModal());
    dispatch(toggleFormModal());
  };

  const updateExistingReminder = (id) => {
    dispatch(updateCurrentForm(id));
    dispatch(toggleListModal());
    dispatch(toggleFormModal());
  };

  return (
    <Modal
      isOpen={calendarStore.showListModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="reminder-list-modal" style={{ width: "60" }}>
        <div className="reminder-list-modal__header">
          <p>Reminders</p>
          {/* TODO: Abstract close button into it's own component */}
          <button
            className="reminder-list-modal__close-btn"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <ul className="reminder-list-modal__list">
          {reminders.dateReminders &&
            reminders.dateReminders.length &&
            reminders.dateReminders.map(({ title, id }) => (
              <li key={id} onClick={() => updateExistingReminder(id)}>
                {title}
              </li>
            ))}
        </ul>

        <button
          className="reminder-list-modal__add-reminder"
          onClick={addNewReminder}
        >
          Add Reminder
        </button>
      </div>
    </Modal>
  );
}

export default ReminderListModal;
