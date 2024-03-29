import { Forecast } from "./forecast";

export interface Weather {
    city: string;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    description: string;
    weatherTitle: string;
    timezone: number;
    dt: number,
    day: string,
    localtime: number;
    sunrise: string;
    sunset: string;
    iconUrl: string;
    forecast: Forecast[];

}