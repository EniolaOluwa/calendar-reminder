import moment from "moment";

const generateMonthData = (value) => {
  const firstDayOfCalenderMonth = moment(value)
    .startOf("month")
    .startOf("week");
  const lastDayOfCalenderMonth = moment(value).endOf("month").endOf("week");
  const referenceDay = moment(firstDayOfCalenderMonth).subtract(1, "day");

  const monthData = [];
  while (referenceDay.isBefore(lastDayOfCalenderMonth, "day")) {
    monthData.push(
      Array(7)
        .fill("")
        .map(() => moment(referenceDay.add(1, "day")))
    );
  }

  return monthData;
};

export default generateMonthData;
