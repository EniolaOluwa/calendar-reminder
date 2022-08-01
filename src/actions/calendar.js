import uniqid from "uniqid";
import {
  ADD_REMINDER,
  TOGGLE_FORM_MODAL,
  TOGGLE_LIST_MODAL,
} from "../types/calendar";

export const addNewReminder = (info) => {
  return { type: ADD_REMINDER, data: { ...info, id: uniqid() } };
};

export const toggleFormModal = () => ({ type: TOGGLE_FORM_MODAL });
export const toggleListModal = () => ({ type: TOGGLE_LIST_MODAL });
