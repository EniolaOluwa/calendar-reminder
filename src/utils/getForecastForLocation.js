import moment from "moment";

const getUrlForForecast = (location, day) =>
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${moment(
    day
  ).format("YYYY-MM-DD")}?key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}`;

const getForecastForLocation = async (day, location, setterFunction) => {
  setterFunction(true);
  try {
    const response = await fetch(getUrlForForecast(location, day));
    if (!response.ok) return "Failed to get weather";
    const { days } = await response.json();
    setterFunction(false);
    return days[0].icon;
  } catch (error) {
    return "Error occur while getting weather";
  }
};

export default getForecastForLocation;
