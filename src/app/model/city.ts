import { Weather } from "./weather";

export interface Country {
    name: string,
    country: string,
    lon:number,
    lat:number,
    weather?:Weather,
    description?:string,
    countryCode:string
}