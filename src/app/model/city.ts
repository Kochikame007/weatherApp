import { Weather } from "./weather";

export interface City {
    name: string,
    country: string,
    lon:number,
    lat:number,
    weather?:Weather,
    description?:string,
    countryCode:string
}