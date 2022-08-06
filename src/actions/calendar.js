import uniqid from "uniqid";
import {
  ADD_REMINDER,
  TOGGLE_FORM_MODAL,
  TOGGLE_LIST_MODAL,
  UPDATE_CURRENT_FORM,
  UPDATE_REMINDER,
} from "../types/calendar";

export const addNewReminder = (info) => {
  return { type: ADD_REMINDER, data: { ...info, id: uniqid() } };
};
export const updateReminder = (data) => ({ type: UPDATE_REMINDER, data });
export const toggleFormModal = () => ({ type: TOGGLE_FORM_MODAL });
export const toggleListModal = () => ({ type: TOGGLE_LIST_MODAL });
export const updateCurrentForm = (value) => ({
  type: UPDATE_CURRENT_FORM,
  value,
});
