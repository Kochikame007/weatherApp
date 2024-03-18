export interface Forecast {
    temp_min: number;
    temp_max: number;
    day: string;
    description?: string;
    dt_txt: string;
    iconUrl: string;
}