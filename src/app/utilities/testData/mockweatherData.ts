import { Weather } from "../../model/weather";

export const weatherdata :Weather = {
    "city": "Calgary",
    "feels_like": 7.95,
    "humidity": 59,
    "pressure": 1016,
    "temp": 9.58,
    "temp_max": 11.47,
    "temp_min": 6.44,
    "description": "few clouds",
    "weatherTitle": "Clouds",
    "timezone": -21600,
    "dt": 1710732992,
    "localtime": 1710711392,
    "sunrise": "1:44:21 AM",
    "sunset": "1:44:32 PM",
    "iconUrl": "../assets/cloudy.svg",
    "day": "17 Sunday",
    "forecast": [
        {
            "day": "18 Monday",
            "temp_min": 1.28,
            "temp_max": 13.86,
            "dt_txt": "2024-03-19",
            "iconUrl": "../assets/clear-day.svg"
        },
        {
            "day": "19 Tuesday",
            "temp_min": -3.22,
            "temp_max": 2.98,
            "dt_txt": "2024-03-20",
            "iconUrl": "../assets/cloudy.svg"
        },
        {
            "day": "20 Wednesday",
            "temp_min": -5.63,
            "temp_max": -2.44,
            "dt_txt": "2024-03-21",
            "iconUrl": "../assets/snow.svg"
        },
        {
            "day": "21 Thursday",
            "temp_min": -9.26,
            "temp_max": -2.38,
            "dt_txt": "2024-03-22",
            "iconUrl": "../assets/cloudy.svg"
        },
        {
            "day": "22 Friday",
            "temp_min": -8.92,
            "temp_max": -7.44,
            "dt_txt": "2024-03-23",
            "iconUrl": "../assets/snow.svg"
        }
    ]
}

export const mockWeatherData = {
    "coord": {
        "lon": -114.071,
        "lat": 51.0455
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 9.48,
        "feels_like": 7.95,
        "temp_min": 6.97,
        "temp_max": 11.44,
        "pressure": 1017,
        "humidity": 59
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.09,
        "deg": 110
    },
    "clouds": {
        "all": 20
    },
    "dt": 1710734029,
    "sys": {
        "type": 2,
        "id": 2007302,
        "country": "CA",
        "sunrise": 1710683062,
        "sunset": 1710726274
    },
    "timezone": -21600,
    "id": 5913490,
    "name": "Calgary",
    "cod": 200
};
