import { countryDTO } from "./countryDTO";

export class patientDTO{
    id!:number;
    firstName!:string;
    lastName!:string;
    phone!:string;
    dob!:Date;
    country_Id!:number;
    country!:countryDTO
}