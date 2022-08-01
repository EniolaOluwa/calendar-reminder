import moment from "moment";

export default function (day, state) {
  return (
    state.reminders.filter((reminder) =>
      moment(reminder.date).isSame(moment(day), "day")
    )[0] || []
  );
}
