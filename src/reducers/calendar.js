import moment from "moment";
import {
  ADD_REMINDER,
  TOGGLE_FORM_MODAL,
  TOGGLE_LIST_MODAL,
  UPDATE_CURRENT_FORM,
  UPDATE_REMINDER,
} from "../types/calendar";

const initialState = {
  reminders: [
    {
      city: "Abijan",
      icon: "rain",
      date: "2022-08-09",
      dateReminders: [
        {
          id: "uuid-6373",
          time: "11:45",
          title: "example",
        },
      ],
    },
  ],
  currentFormId: "",
  showFormModal: false,
  showListModal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
      return {
        ...state,
        reminders: state.reminders.find((reminder) =>
          moment(reminder.date).isSame(action.data.date)
        )
          ? [
              ...state.reminders.map((reminder) => {
                if (
                  moment(reminder.date).isSame(moment(action.data.date), "day")
                ) {
                  return {
                    ...reminder,
                    city: action.data.city,
                    icon: action.data.icon,
                    dateReminders: [
                      ...reminder.dateReminders,
                      {
                        id: action.data.id,
                        title: action.data.title,
                        time: action.data.time,
                      },
                    ],
                  };
                }
                return reminder;
              }),
            ]
          : [
              ...state.reminders,
              {
                city: action.data.city,
                icon: action.data.icon,
                date: action.data.date,
                dateReminders: [
                  {
                    title: action.data.title,
                    id: action.data.id,
                    time: action.data.time,
                  },
                ],
              },
            ],
      };

    case UPDATE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map((reminder) => {
          if (moment(reminder.date).isSame(moment(action.data.date), "day")) {
            return {
              ...reminder,
              city: action.data.city,
              icon: action.data.icon,
              dateReminders: reminder.dateReminders.map((dateReminder) => {
                if ((dateReminder.id = action.data.id)) {
                  return {
                    ...dateReminder,
                    title: action.data.title,
                    time: action.data.time,
                  };
                }
                return dateReminder;
              }),
            };
          }
          return reminder;
        }),
      };

    case TOGGLE_FORM_MODAL:
      return {
        ...state,
        showFormModal: !state.showFormModal,
      };

    case TOGGLE_LIST_MODAL:
      return {
        ...state,
        showListModal: !state.showListModal,
      };

    case UPDATE_CURRENT_FORM:
      return {
        ...state,
        currentFormId: action.value,
      };

    default:
      return initialState;
  }
};

export default reducer;
