import { Forecast } from "../model/forecast";
import { Weather } from "../model/weather";
import { weatherIcon } from "./weatherIcon";

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
    sunrise: weatherData.sys.sunrise,
    sunset: weatherData.sys.sunset,
    iconUrl: getIcon(weatherData),
    day: getLocaleDayNames(weatherData.dt + weatherData.timezone),
    forecast: transformForecast(forecastData, weatherData.timezone)
  };

  return weather;

}


export function getLocaleDayNames(data) {
  const date = new Date(data * 1000);
  const day = date.toLocaleDateString('en-US', {
    day: '2-digit', weekday: 'long'
  })
  return day;
}

function transformForecast(dataset, timezone) {
  const forecast: Forecast[] = [];
  console.log(dataset.list)
  const list = dataset.list;
  for (const data of list) {
    const existing = forecast.find(entry => entry.dt_txt === data.dt_txt.split(" ")[0]);
    if (existing) {
      existing.temp_min = Math.min(data.main.temp_min, existing.temp_min);
      existing.temp_max = Math.min(data.main.temp_max, existing.temp_max);
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

  console.log("forecsat", forecast);

  return forecast.slice(1);

}

function isSunUp(data) {
  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;
  const currentTimestamp = data.dt;
  const timezoneOffset = data.timezone;


  const sunriseTime = new Date(sunriseTimestamp * 1000);
  const sunsetTime = new Date(sunsetTimestamp * 1000);
  const currentLocalTime = new Date((currentTimestamp + timezoneOffset) * 1000);

  // Check if current time is between sunrise and sunset
  const isDaytime = currentLocalTime > sunriseTime && currentLocalTime < sunsetTime;

  if (isDaytime) {
    return true;
  } else {
    return false;
  }
}

function getIcon(data) {

  const isDay = isSunUp(data);
  const weatherDescription = data.weather[0].main;
  console.log("weatherDes ", weatherDescription)
  const icon = weatherIcon.find(icon => icon.description.toLowerCase() === weatherDescription.toLowerCase());
  console.log("icon ", icon.iconUrl)
  return icon.iconUrl;
}



// Math.max(list[i].main.temp_max, forecast[k].temp_max);