import moment from "moment";

function isToday(day) {
  return moment(day).isSame(new Date(), "day");
}

function dayIsInCurrentMonth(day, present) {
  return moment(moment(day)).isBetween(
    moment(present).startOf("month").subtract(1, "day").format("YYYY-MM-DD"),
    moment(present).endOf("month").add(1, "day").format("YYYY-MM-DD")
  );
}

function getCalendarMonth(present) {
  return `${present.format("MMMM")} ${present.format("YYYY")}`;
}

function getDayClass(day, present) {
  const cssName = "calendar__day";
  if (isToday(day)) {
    return `${cssName}--today`;
  } else if (dayIsInCurrentMonth(day, present)) {
    if (["Sunday", "Saturday"].includes(moment(day).format("dddd"))) {
      return `${cssName}--weekend`;
    }
    return `${cssName}--current`;
  } else {
    return "";
  }
}

export { getDayClass, getCalendarMonth };
