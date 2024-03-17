import { Forecast } from "../model/forecast";
import { Weather } from "../model/weather";
import { weatherIcon } from "./weatherIcon";


/**
 * Maps raw weather and forecast data to Weather object.
 * @param {any} weatherData - Raw weather data from the API.
 * @param {any} forecastData - Raw forecast data from the API.
 * @returns {Weather} The mapped Weather object.
 */
export function weatherMapper(weatherData: any, forecastData: any) {
  let weather: Weather;
  weather = {
    city: weatherData.name,
    feels_like: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    pressure: weatherData.main.pressure,
    temp: weatherData.main.temp,
    temp_max: weatherData.main.temp_max,
    temp_min: weatherData.main.temp_min,
    description: weatherData.weather[0].description,
    weatherTitle: weatherData.weather[0].main,
    timezone: weatherData.timezone,
    dt: weatherData.dt,
    localtime: weatherData.dt + weatherData.timezone,
    sunrise: getSunsetSunrise(weatherData.sys.sunrise + weatherData.timezone),
    sunset: getSunsetSunrise(weatherData.sys.sunset + weatherData.timezone),
    iconUrl: getIcon(weatherData),
    day: getLocaleDayNames(weatherData.dt + weatherData.timezone),
    forecast: transformForecast(forecastData, weatherData.timezone)
  };

  return weather;

}

function getSunsetSunrise(time) {
  const formatedTime = new Date(time * 1000);
  return formatedTime.toLocaleTimeString('en-US');
}

/**
 * Gets localized day name from timestamp.
 * @param {number} data - Timestamp data.
 * @returns {string} Localized day name.
 */
export function getLocaleDayNames(data) {
  const date = new Date(data * 1000);
  const day = date.toLocaleDateString('en-US', {
    day: '2-digit', weekday: 'long'
  })
  return day;
}


/**
 * Transforms forecast data into array of Forecast objects.
 * @param {any} dataset - Raw forecast data.
 * @param {number} timezone - Timezone offset.
 * @returns {Forecast[]} Array of Forecast objects.
 */
function transformForecast(dataset, timezone) {
  const forecast: Forecast[] = [];
  const list = dataset.list;
  for (const data of list) {
    const existing = forecast.find(entry => entry.dt_txt === data.dt_txt.split(" ")[0]);
    if (existing) {
      existing.temp_min = Math.min(data.main.temp_min, existing.temp_min);
      existing.temp_max = Math.max(data.main.temp_max, existing.temp_max);
    } else {
      forecast.push(
        {
          day: getLocaleDayNames((data.dt + timezone)),
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          description: data.weather.main,
          dt_txt: data.dt_txt.split(" ")[0],
          iconUrl: getIcon(data),
        })
    }
  }

  return forecast.slice(1);

}

/**
 * Checks if it is daytime.
 * @param {any} data - Weather data.
 * @returns {boolean} True if it is daytime, false otherwise.
 * This method is not in use, will be used later on
 */
function isSunUp(data) {
  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;
  const currentTimestamp = data.dt;
  const timezoneOffset = data.timezone;
  const sunriseTime = new Date(sunriseTimestamp * 1000);
  const sunsetTime = new Date(sunsetTimestamp * 1000);
  const currentLocalTime = new Date((currentTimestamp + timezoneOffset) * 1000);

  // Check if current time is between sunrise and sunset
  return currentLocalTime > sunriseTime && currentLocalTime < sunsetTime;

}

/**
 * Gets icon URL based on weather description.
 * @param {any} data - Weather data.
 * @returns {string} Icon URL.
 */
function getIcon(data) {
  // const isDay = isSunUp(data);
  const weatherDescription = data.weather[0].main;
  let icon = weatherIcon.find(icon => icon.description.toLowerCase() === weatherDescription.toLowerCase());
  // console.log("icon day", icon, "descr", weatherDescription.toLowerCase())

  return icon.iconUrl;
}
